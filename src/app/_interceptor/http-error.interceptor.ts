import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export class HttpErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: Error | ErrorEvent | HttpErrorResponse) => {
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
                        } else {
                            // Handle Http Error (error.status === 403, 404...)
                            errorMessage = `Error status : ${error.statusText}(${error.status})`;
                        }
                    } 
                    console.error('It happens: ', errorMessage);
                    window.alert(errorMessage);
                    return throwError(errorMessage);
                })
            )
    }
}