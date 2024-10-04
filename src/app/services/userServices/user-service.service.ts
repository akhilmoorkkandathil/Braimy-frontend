import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '../../interfaces/apiResponse';
import { apiUrls } from '../../API';
import { map, Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { coureseShedule } from '../../interfaces/courseShedule';

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
  isStudentBlocked(): Observable<boolean> {
    return this.http.get<{ blocked: boolean }>(`${apiUrls.usersApi}blockStatus`, { withCredentials: true }).pipe(
      map(response => response.blocked)
    );
  }

  getStudentData(){
    return this.http.get<ApiResponse>(`${apiUrls.usersApi}getStudentData`,{withCredentials:true});
  }
  getStudentClasses(){
    return this.http.get<ApiResponse>(`${apiUrls.usersApi}getStudentClasses`,{withCredentials:true});
  }
  getTutorStudentWithLastMessage(){
    return this.http.get<ApiResponse>(`${apiUrls.tutorsApi}studentWithMessage`,{withCredentials:true});
  }
  uploadProfilePhoto(formData:FormData){    
    return this.http.post<ApiResponse>(`${apiUrls.usersApi}uploadProfilePhoto`,formData,{withCredentials:true});
  }
  editProfileInfo(userData:User){    
    return this.http.post<ApiResponse>(`${apiUrls.usersApi}editProfileInfo`,userData,{withCredentials:true});
  }
  addToBucket(selectedCourseData:coureseShedule){
    return this.http.post<ApiResponse>(`${apiUrls.usersApi}addToBucket`,selectedCourseData,{withCredentials:true});
  }

  fetchBucketCourses(){
    return this.http.get<ApiResponse>(`${apiUrls.usersApi}fetchBucketCourses`,{withCredentials:true});
  }
  fetchAllBucketCourses(){
    return this.http.get<ApiResponse>(`${apiUrls.usersApi}fetchAllBucketCourses`,{withCredentials:true});
  }
  fetchBucketCoursesCoordinator(userId){
    return this.http.get<ApiResponse>(`${apiUrls.coordinatorApi}fetchBucketCourses/${userId}`,{withCredentials:true});
  }
  removeFromBucket(userId,courseId){
    return this.http.delete<ApiResponse>(`${apiUrls.coordinatorApi}removeFromBucket/${userId}/${courseId}`,{withCredentials:true});
  }

  fetchPaymentHistory(){
    return this.http.get<ApiResponse>(`${apiUrls.usersApi}fetchPaymentHistory`,{withCredentials:true});
  }
  payment(data){
    return this.http.post<ApiResponse>(`${apiUrls.usersApi}payment`,data, {withCredentials:true})
  }
  updatePaymentStatus(orderId) {
    return this.http.post<ApiResponse>(`${apiUrls.usersApi}updatePaymentStatus/${orderId}`, {withCredentials:true})
  }


}
