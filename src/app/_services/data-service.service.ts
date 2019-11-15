import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { UnitDto, DomainSearchDto, UnitDomain, UnitSearchDto, DomainDto, User, unitTableDto, DomainGroupDto } from "../model/model";
import { environment } from 'environments/environment';
@Injectable({
    providedIn: "root"
})
export class DataService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public units: UnitDto[] = [];
    public domain: DomainSearchDto[] = [];
    // private baseUrl = "https://localhost:44353";
    // private baseUrl = "https://localhost:8083";
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/Account/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
    loadDomain(): Observable<boolean> {
        return this.http.get<DomainSearchDto[]>(`${environment.apiUrl}/api/domain`)
            .pipe(map((data: any[]) => {
                this.domain = data;
                return true;
            }), catchError(this.handleError));
    }
    getDomain(id: number): Observable<DomainDto> {
        return this.http.get<DomainDto>(`${environment.apiUrl}/api/domain/${id}`);
    }
    searchDomain(filter: string): Observable<DomainSearchDto[]> {
        return this.http.get<DomainSearchDto[]>(`${environment.apiUrl}/api/domain?filter=${filter}`);
    }
    saveDomain(domain: DomainDto): Observable<boolean> {
        return this.http.post<boolean>(`${environment.apiUrl}/api/domain`, domain);
    }
    saveDomainGroup(domainGroup: DomainGroupDto): Observable<boolean> {
        return this.http.post<boolean>(`${environment.apiUrl}/api/domainGroup`, domainGroup);
    }
    searchUnit(filter: string): Observable<UnitSearchDto[]> {
        return this.http.get<UnitSearchDto[]>(`${environment.apiUrl}/api/unit?filter=${filter}`);
    }
    getUnit(id: number): Observable<UnitDto> {
        // const searchUnit: SearchUnit = { id };
        return this.http.get<UnitDto>(`${environment.apiUrl}/api/unit/${id}`);
    }
    saveUnit(unit: UnitDto): Observable<boolean> {
        return this.http.post<boolean>(`${environment.apiUrl}/api/unit`, unit);
    }
    getUnitDomainList(id: string): Observable<UnitDomain[]> {
        // const searchUnit: SearchUnit = { id };
        return this.http.get<UnitDomain[]>(`${environment.apiUrl}/api/unit/${id}/domains`)
            .pipe(catchError(this.handleError));
    }
    getWaveList(): Observable<unitTableDto[]> {
        console.log("getWaveList");
        return this.http.get<unitTableDto[]>(`${environment.apiUrl}/api/system?systemname=unittable`);
    }
    private handleError(error: HttpErrorResponse): Observable<any> {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // a client-side or network error occurred. Handle it accordingly.
            errorMessage = "An error occurred:", error.error.message;
        }
        else {
            // the backend returned an unsuccessful response code.
            // the response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${error.statusText}, ` + `body was: ${error.message}`;
        }
        console.error(errorMessage);
        // return an observable with a user-facing error message
        return throwError(errorMessage);
    }
}
