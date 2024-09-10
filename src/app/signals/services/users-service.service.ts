import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SingleUserResponse, User } from '../interfaces/user-request.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {

  private http = inject( HttpClient );
  private baseUrl = 'https://reqres.in/api/users';

  //nos creamos un metodo
  getUserById( id: number ): Observable<User> {
    //y hacemos la petición http
    return this.http.get<SingleUserResponse>(`${ this.baseUrl }/${ id }`)
    .pipe(
      map( response => response.data ),
    );
  }

}
