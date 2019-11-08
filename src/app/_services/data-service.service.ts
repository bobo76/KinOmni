import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError, BehaviorSubject } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { UnitDto, DomainSearchDto, UnitDomain, UnitSearchDto, DomainDto, User } from "../model/model";
import { environment } from 'src/environments/environment';
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
        return this.http.get(`${environment.apiUrl}/api/domain`)
            .pipe(map((data: any[]) => {
                this.domain = data;
                return true;
            }), catchError(this.handleError));
    }
    getDomain(id: number): Observable<DomainDto> {
        return this.http.get(`${environment.apiUrl}/api/domain/${id}`)
            .pipe(catchError(this.handleError));
    }
    searchDomain(filter: string): Observable<DomainSearchDto[]> {
        return this.http.get(`${environment.apiUrl}/api/domain?filter=${filter}`)
            .pipe(catchError(this.handleError));
    }
    searchUnit(filter: string): Observable<UnitSearchDto[]> {
        return this.http.get(`${environment.apiUrl}/api/unit?filter=${filter}`)
            .pipe(catchError(this.handleError));
    }
    getUnit(id: number): Observable<UnitDto> {
        // const searchUnit: SearchUnit = { id };
        return this.http.get(`${environment.apiUrl}/api/unit/${id}`)
            .pipe(catchError(this.handleError));
    }
    saveUnit(unit: UnitDto): Observable<boolean> {
        // const searchUnit: SearchUnit = { id };
        return this.http.post(`${environment.apiUrl}/api/unit`, unit)
            .pipe(map(_ => true), catchError(this.handleError));
    }
    getUnitDomainList(id: string): Observable<UnitDomain[]> {
        // const searchUnit: SearchUnit = { id };
        return this.http.get(`${environment.apiUrl}/api/unit/${id}/domains`)
            .pipe(catchError(this.handleError));
    }
    private handleError(error: HttpErrorResponse): Observable<any> {
        if (error.error instanceof ErrorEvent) {
            // a client-side or network error occurred. Handle it accordingly.
            console.error("An error occurred:", error.error.message);
        }
        else {
            // the backend returned an unsuccessful response code.
            // the response body may contain clues as to what went wrong,
            console.error(`Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError("Something bad happened; please try again later.");
    }
}
