import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  private HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };

  backendURL = "https://backend-gm109526-angular.onrender.com/api/assignments"

  constructor (private loggingService: LoggingService, private http: HttpClient) { }

  getAssignments():Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.backendURL);
  }

  getAssignment(id:number): Observable<Assignment|undefined> {
    return this.http.get<Assignment|undefined>(this.backendURL + '/' + id)
    .pipe(map(a => {
      a.nom += " transformé avec un pipe....";
      return a;
    }),
    tap(_ => {
      console.log("tap: assignment avec id = " + id + " requête GET envoyée sur MongoDB Cloud")
    }),
    catchError(this.handleError<Assignment>(`getAssignment(id=${id})`))
  );
  }

  private handleError<T>(operation, result?: T) {
    return (error:any) : Observable<T> => {
      console.error(error);
      console.log(operation + " a échoué " + error.message);

      return of(result as T);
    };
  }

  addAssignment(assignment: Assignment): Observable<any> {
    return this.http.post<Assignment>(this.backendURL, assignment, this.HttpOptions);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    assignment.rendu = true;
    return this.http.put<String>(this.backendURL, assignment);
  }

  editAssignment(assignment: Assignment): Observable<any> {
    return this.http.put<Assignment>(this.backendURL, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    console.log(this.backendURL);
    console.log(assignment);
    return this.http.delete<Assignment>(this.backendURL + '/' + assignment._id);
  }

  getAssignmentsPagine(page: number, limit: number): Observable<any> {
    return this.http.get<any>(this.backendURL + '?page=' + page + '&limit=' + limit);
  }
}
