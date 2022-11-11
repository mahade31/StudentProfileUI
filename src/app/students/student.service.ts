import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable,catchError, tap, throwError } from "rxjs";
import { IStudent } from "./student";

@Injectable({
    providedIn: 'root'
})

export class StudentService{
    private Url = 'https://localhost:7193/api/Students';

    constructor (private http: HttpClient){}

    getStudents(): Observable<IStudent[]> {
       return this.http.get<IStudent[]>(this.Url).pipe(
        tap(data => console.log('All', JSON.stringify(data))), 
        catchError(this.handleError)
       );
    }
    


    private handleError(err: HttpErrorResponse) {
        let errorMessage = ' ';
        if (err.error instanceof ErrorEvent){
            errorMessage = `An error occurred: ${err.error.message}`;
        }
        else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(() => errorMessage);
    }
}