import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '../../interfaces/apiResponse';
import { apiUrls } from '../../API';
import { Tutor } from '../../interfaces/tutor';
import { courseBucket } from '../../interfaces/courseBucket';

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  http = inject(HttpClient)

  constructor() { }

  getTutors() {
    return this.http.get<ApiResponse>(`${apiUrls.tutorsApi}getTutors`,{withCredentials:true});
  }

  getTutorData(){
    return this.http.get<ApiResponse>(`${apiUrls.tutorsApi}getTutuorData`,{withCredentials:true})
  }
  getStudentTutorsWithLastMessage(){
    return this.http.get<ApiResponse>(`${apiUrls.usersApi}getStudentTutorsWithLastMessage`,{withCredentials:true});
  }

  searchTutor(term: string) {
    return this.http.get<ApiResponse>(`${apiUrls.tutorsApi}searchTutor`, {
      params: { term }
    });
  }
  uploadTutorProfilePhoto(formData:FormData){    
    return this.http.post<ApiResponse>(`${apiUrls.tutorsApi}uploadTutorProfilePhoto`,formData,{withCredentials:true});
  }
  editTutorProfileInfo(tutorData:Tutor){    
    return this.http.post<ApiResponse>(`${apiUrls.tutorsApi}editProfileInfo`,tutorData,{withCredentials:true});
  }
  getTutorClasses(){
    return this.http.get<ApiResponse>(`${apiUrls.tutorsApi}getTutorClasses`,{withCredentials:true});
  }
  markCompleted(completedClass:courseBucket){
    return this.http.post<ApiResponse>(`${apiUrls.tutorsApi}markCompleted`,completedClass,{withCredentials:true});
  }
  getTutorCompletedClasses(){
    return this.http.get<ApiResponse>(`${apiUrls.tutorsApi}getTutorCompletedClasses`,{withCredentials:true});

  }
  getAllCoordinatorCompletedClass(){
    return this.http.get<ApiResponse>(`${apiUrls.coordinatorApi}getAllCompletedClasses`,{withCredentials:true});
  }

}