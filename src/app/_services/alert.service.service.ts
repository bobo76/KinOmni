import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert message
                    this.clear();
                }
            }
        });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: 'success', text: message });
    }
    httpError(error: Error | ErrorEvent | HttpErrorResponse, keepAfterRouteChange = false) {
        let errorMessage = '';
        if (error instanceof Error) {
            // client-side error
            errorMessage = `Error: ${error.message}`;
        } else if (error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.message}`;
        } else if (error instanceof HttpErrorResponse) {
            // Server or connection error happened
            if (!navigator.onLine) {
                // Handle offline error
                errorMessage = 'Server is offline';
            } else if (error.status === 400) {
                errorMessage = `The login is invalid.`;
            } else if (error.status === 401) {
                errorMessage = `The login is now invalid. Please redo login`;
            } else if (error.status === 0) {
                errorMessage = `Error status = 0, maybe the server is offline. ${error.message}`;
            } else {
                // Handle Http Error (error.status === 403, 404...)
                errorMessage = `Error status : ${error.statusText}(${error.status})`;
            }
        }
        console.error('It happens: ', errorMessage);
        
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: 'error', text: errorMessage });
    }
    error(message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next({ type: 'error', text: message });
    }

    clear() {
        // clear by calling subject.next() without parameters
        this.subject.next();
    }
}