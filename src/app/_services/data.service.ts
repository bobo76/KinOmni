import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { UnitDto,
    DomainSearchDto,
    UnitDomain,
    UnitSearchDto,
    IDomainDto,
    User,
    IUnitTableDto,
    IDomainGroupDto,
    ActivationParametersDto,
    IActivationDto,
    IUserSearchDto,
    IUserDto } from "../model/model";
import { environment } from "environments/environment";
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
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("currentUser")));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    login(username: string, password: string): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/Account/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem("currentUser", JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }
    logout(): void {
        // remove user from local storage to log user out
        localStorage.removeItem("currentUser");
        this.currentUserSubject.next(null);
    }
    loadDomain(): Observable<boolean> {
        return this.http.get<DomainSearchDto[]>(`${environment.apiUrl}/api/domain`)
            .pipe(map((data: any[]) => {
                this.domain = data;
                return true;
            }), catchError(this.handleError));
    }
    getDomain(id: number): Observable<IDomainDto> {
        return this.http.get<IDomainDto>(`${environment.apiUrl}/api/domain/${id}`);
    }
    searchDomain(filter: string): Observable<DomainSearchDto[]> {
        return this.http.get<DomainSearchDto[]>(`${environment.apiUrl}/api/domain?filter=${filter}`);
    }
    saveDomain(domain: IDomainDto): Observable<boolean> {
        return this.http.post<boolean>(`${environment.apiUrl}/api/domain`, domain);
    }
    saveDomainGroup(domainGroup: IDomainGroupDto): Observable<boolean> {
        return this.http.post<boolean>(`${environment.apiUrl}/api/domainGroup`, domainGroup);
    }
    searchUnit(filter: string): Observable<UnitSearchDto[]> {
        return this.http.get<UnitSearchDto[]>(`${environment.apiUrl}/api/unit?filter=${filter}`);
    }
    getUnit(id: number): Observable<UnitDto> {
        return this.http.get<UnitDto>(`${environment.apiUrl}/api/unit/${id}`);
    }
    saveUnit(unit: UnitDto): Observable<boolean> {
        return this.http.post<boolean>(`${environment.apiUrl}/api/unit`, unit);
    }
    getUnitDomainList(id: string): Observable<UnitDomain[]> {
        return this.http.get<UnitDomain[]>(`${environment.apiUrl}/api/unit/${id}/domains`)
            .pipe(catchError(this.handleError));
    }
    getWaveList(): Observable<IUnitTableDto[]> {
        return this.http.get<IUnitTableDto[]>(`${environment.apiUrl}/api/system?systemname=unittable`);
    }
    generateActivationCode(activation: ActivationParametersDto): Observable<IActivationDto[]> {
        return this.http.post<IActivationDto[]>(`${environment.apiUrl}/api/action/activation`, activation);
    }
    searchUser(filter: string): Observable<IUserSearchDto[]> {
        return this.http.get<IUserSearchDto[]>(`${environment.apiUrl}/api/user?filter=${filter}`);
    }
    getUser(id: string, domNo: number): Observable<IUserDto> {
        return this.http.get<IUserDto>(`${environment.apiUrl}/api/user/${id}?domNo=${domNo}`);
    }
    private handleError(error: HttpErrorResponse): Observable<any> {
        let errorMessage: string = "";
        if (error.error instanceof ErrorEvent) {
            // a client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred:${error.error.message}`;
        } else {
            // the backend returned an unsuccessful response code.
            // the response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${error.statusText}, body was: ${error.message}`;
        }
        console.error(errorMessage);
        // return an observable with a user-facing error message
        return throwError(errorMessage);
    }
}
