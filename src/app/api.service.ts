import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user.model';



@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  private url:string="http://localhost:3000/userList"
  constructor(private http:HttpClient){}

   

  postRegisterUser(registerObj:User){
    return this.http.post<User>(`${this.url}`,registerObj)
  }

  getAllUser(){
    return this.http.get<User>(`${this.url}`)
  }

  updateUser(registerObj:User,id:number){
    return this.http.put<User>(`${this.url}/${id}`,registerObj)
  }

  deleteUser(id:number){
    return this.http.delete<User>(`${this.url}/${id}`)
  }

  getResgisterId(id:number){
    return this.http.get<User>(`${this.url}/${id}`)
  }


}
