import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiResponse } from '../../interfaces/apiResponse';
import { apiUrls } from '../../API';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  http = inject(HttpClient)

  constructor() { }

  searchCourses(term: string) {
    return this.http.get<ApiResponse>(`${apiUrls.usersApi}searchCourses`, {
      params: { term }
    });
}
}
