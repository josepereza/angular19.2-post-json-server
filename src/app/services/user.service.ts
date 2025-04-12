import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { Post } from '../interfaces/post';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/users'; // Reemplazar con tu URL real
  http=inject(HttpClient)
  constructor() { }


  getUserRs(id:number | undefined) {
    return httpResource<User>(() => ({
      url: `${this.apiUrl}/${id}`,
    }));
  }

 getUser(id:number | undefined) {
  console.log('id user', id)
  return this.http.get<User>(`${this.apiUrl}/${id}`)
 }
}
