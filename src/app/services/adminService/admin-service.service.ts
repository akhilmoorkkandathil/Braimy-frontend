import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../../interfaces/user';
import { ApiResponse } from '../../interfaces/apiResponse';
import { apiUrls } from '../../API';
import { Course } from '../../interfaces/course';
import { Expense } from '../../interfaces/expense';
import { Payment } from '../../interfaces/payment';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  http = inject(HttpClient)
  constructor() { }

  getUsersList(){
    return this.http.get<ApiResponse>(`${apiUrls.usersApi}getUser`,{withCredentials:true});
  }
  addStudent(studentData:FormData){
    return this.http.post<ApiResponse>(`${apiUrls.usersApi}addStudent`,studentData,{withCredentials:true});
  }
  blockStudent(id: string) {
    return this.http.patch<ApiResponse>(`${apiUrls.usersApi}blockStudent/${id}`, { withCredentials: true });
  }  
  unblockStudent(id: string) {
    return this.http.patch<ApiResponse>(`${apiUrls.usersApi}unblockStudent/${id}`, { withCredentials: true });
  }  
  getStudent(id:string){
    return this.http.get<ApiResponse>(`${apiUrls.usersApi}getStudent/${id}`,{withCredentials:true});
  }
  updateStudent(id:string,studentData:FormData){
    return this.http.post<ApiResponse>(`${apiUrls.usersApi}updateStudent/${id}`,studentData,{withCredentials:true});
  }
  addManagement(studentData:User){
    return this.http.post<ApiResponse>(`${apiUrls.coordinatorApi}manageStudent`,studentData,{withCredentials:true});
  }
  getTutorsList(){
    return this.http.get<ApiResponse>(`${apiUrls.tutorsApi}getTutors`,{withCredentials:true});
  }
  addTutor(courseData:Course){
    return this.http.post<ApiResponse>(`${apiUrls.tutorsApi}addTutor`,courseData,{withCredentials:true})
  }
  blockTutor(id:string){
    return this.http.patch<ApiResponse>(`${apiUrls.tutorsApi}blockTutor/${id}`,{withCredentials:true});
  }
  unblockTutor(id:string){
    return this.http.patch<ApiResponse>(`${apiUrls.tutorsApi}unblockTutor/${id}`,{withCredentials:true});
  }
  verifyTutor(id:string){
    return this.http.patch<ApiResponse>(`${apiUrls.tutorsApi}verifyTutor/${id}`,{withCredentials:true});
  }
  getTutor(id:string){
    return this.http.get<ApiResponse>(`${apiUrls.tutorsApi}getTutor/${id}`,{withCredentials:true});
  }
  deleteTutor(id:string){
    return this.http.delete<ApiResponse>(`${apiUrls.tutorsApi}deleteTutor/${id}`,{withCredentials:true});
  }
  updateTutor(id:string,tutorData:FormData){
    return this.http.put<ApiResponse>(`${apiUrls.tutorsApi}updateTutor/${id}`,tutorData,{withCredentials:true});
  }
  getCoordinatorsList(){
    return this.http.get<ApiResponse>(`${apiUrls.coordinatorApi}getCoordinators`,{withCredentials:true})
  }
  
  addCoordinator(courseData:Course){
    return this.http.post<ApiResponse>(`${apiUrls.coordinatorApi}addCoordinator`,courseData,{withCredentials:true})
  }
  blockCoordinator(id:string){
    return this.http.patch<ApiResponse>(`${apiUrls.coordinatorApi}blockCoordinator/${id}`,{withCredentials:true});
  }
  unblockCoordinator(id:string){
    return this.http.patch<ApiResponse>(`${apiUrls.coordinatorApi}unblockCoordinator/${id}`,{withCredentials:true});
  }
  verifyCoordinator(id:string){
    return this.http.patch<ApiResponse>(`${apiUrls.coordinatorApi}verifyCoordinator/${id}`,{withCredentials:true});
  }
  getCoordinator(id:string){
    return this.http.get<ApiResponse>(`${apiUrls.coordinatorApi}getCoordinator/${id}`,{withCredentials:true});
  }
  deleteCoordinator(id:string){
    return this.http.delete<ApiResponse>(`${apiUrls.coordinatorApi}deleteCoordinator/${id}`,{withCredentials:true});
  }
  updateCoordinator(id:string,coordinatorData:User){
    return this.http.post<ApiResponse>(`${apiUrls.coordinatorApi}updateCoordinator/${id}`,{coordinatorData},{withCredentials:true});
  }

  addCourse(formData:FormData){    
    return this.http.post<ApiResponse>(`${apiUrls.adminApi}addCourse`,formData,{withCredentials:true})
  }
  getCouresList(){
    return this.http.get<ApiResponse>(`${apiUrls.adminApi}getCourses`,{withCredentials:true})

  }
  getCourse(id:string){
    return this.http.get<ApiResponse>(`${apiUrls.adminApi}getCourse/${id}`,{withCredentials:true});
  }
  deleteCourse(id:string){
    return this.http.delete<ApiResponse>(`${apiUrls.adminApi}deleteCourse/${id}`,{withCredentials:true});
  }
  updateCourse(id: string, courseData: FormData) {
    return this.http.post<ApiResponse>(`${apiUrls.adminApi}updateCourse/${id}`, courseData, {
      withCredentials: true
    });
  }  

  addExpense(expenseData:Expense){
    return this.http.put<ApiResponse>(`${apiUrls.adminApi}addExpense`,expenseData,{withCredentials:true})
  }
  getExpense(id:string){
    return this.http.get<ApiResponse>(`${apiUrls.adminApi}getExpense/${id}`,{withCredentials:true});
  }
  deleteExpense(id:string){
    return this.http.post<ApiResponse>(`${apiUrls.adminApi}deleteExpense/${id}`,{withCredentials:true});
  }
  updateExpense(id:string,expenseData:User){
    return this.http.put<ApiResponse>(`${apiUrls.adminApi}updateExpense/${id}`,{expenseData},{withCredentials:true});
  }
  addPayment(paymentData:Payment){
    return this.http.post<ApiResponse>(`${apiUrls.adminApi}addPayment`,paymentData,{withCredentials:true})
  }

  getPaymentList(){
    return this.http.get<ApiResponse>(`${apiUrls.adminApi}getPayments`,{withCredentials:true})

  }
  getPayment(id:string){
    return this.http.get<ApiResponse>(`${apiUrls.adminApi}getPayment/${id}`,{withCredentials:true});
  }
  deletePayment(id:string){
    return this.http.post<ApiResponse>(`${apiUrls.adminApi}deletePayment/${id}`,{withCredentials:true});
  }
  updatePayment(id:string,paymentData:User){
    return this.http.post<ApiResponse>(`${apiUrls.adminApi}updatePayment/${id}`,{paymentData},{withCredentials:true});
  }

  getExpenseList(){
    return this.http.get<ApiResponse>(`${apiUrls.adminApi}getExpenses`,{withCredentials:true})

  }
  addPushSubscriber(){
    return this.http.get<ApiResponse>(`${apiUrls.adminApi}getExpenses`,{withCredentials:true})
  }
  getTutorStudentList(){
    return this.http.get<ApiResponse>(`${apiUrls.tutorsApi}getTutorStudent`,{withCredentials:true});
  }
  getTodaysClasses(){
    return this.http.get<ApiResponse>(`${apiUrls.coordinatorApi}todaysClasses`,{withCredentials:true});
  }
  getTodaysUpcomingClasses(){
    return this.http.get<ApiResponse>(`${apiUrls.coordinatorApi}upcomingClasses`,{withCredentials:true});
  }
  getTutorUpcomingClasses(){
    return this.http.get<ApiResponse>(`${apiUrls.tutorsApi}getTutorUpcomingClasses`,{withCredentials:true});
  }
  markCompleted(id:string){
    return this.http.get<ApiResponse>(`${apiUrls.tutorsApi}markCompleted/${id}`,{withCredentials:true});
  }
  approveClass(id:string){
    return this.http.get<ApiResponse>(`${apiUrls.coordinatorApi}approveClass/${id}`,{withCredentials:true});
  }
  sendNotification(id:string){
    return this.http.get<ApiResponse>(`${apiUrls.coordinatorApi}notificationSend/${id}`,{withCredentials:true});
  }
  getDashBoardData(){    
    return this.http.get<ApiResponse>(`${apiUrls.adminApi}dashboardData`,{withCredentials:true});
  }
}


