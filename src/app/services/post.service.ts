import { HttpClient, HttpParams, httpResource } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { Post } from '../interfaces/post';
import { Observable } from 'rxjs';

interface PostResponse {
  data: Post[];
  total: number;
  page: number;
  pageSize: number;
}


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }
http=inject(HttpClient)
  _getPosts(){
    return httpResource({
      url:'http://localhost:3000/posts'
    })
  }

  _createPost(post:Post){
    return this.http.post('http://localhost:3000/posts',post)
  }

  private apiUrl = 'http://localhost:3000/posts'; // Reemplazar con tu URL real


  getPosts(page: number = 1, pageSize: number = 10, searchTerm: string = ''): Observable<Post[]> {
   
    
    return this.http.get<Post[]>(this.apiUrl);
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }
 
  getPostRs(id: Signal<number>) {
    return httpResource<Post | undefined>(() => ({
      url: `${this.apiUrl}/${id()}`,
    }));
  }
  
  getPostUserRs(id:number){
    return httpResource<Post | undefined>(()=>({
      url: `${this.apiUrl}/${id}`,
    }))
  }
  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  updatePost(post: Post,id:number): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
