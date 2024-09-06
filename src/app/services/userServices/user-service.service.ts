import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { ApiResponse } from '../../interfaces/apiResponse';
import { apiUrls } from '../../API';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  http = inject(HttpClient)
  constructor() { }
  getCouresList(){
    return this.http.get<ApiResponse>(`${apiUrls.adminApi}getCourses`,{withCredentials:true});
  }

  getCourse(id:string){
    return this.http.get<ApiResponse>(`${apiUrls.usersApi}getCourseData/${id}`,{withCredentials:true});
  }

  getStudentData(){
    return this.http.get<ApiResponse>(`${apiUrls.usersApi}getStudentData`,{withCredentials:true});
  }
  getStudentClasses(){
    return this.http.get<ApiResponse>(`${apiUrls.usersApi}getStudentClasses`,{withCredentials:true});
  }

}
