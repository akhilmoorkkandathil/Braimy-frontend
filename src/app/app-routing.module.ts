import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingLayoutComponent } from './layouts/landing-layout/landing-layout.component';
import { LandingHomeComponent } from './components/landing/landing-home/landing-home.component'; 
import { LandingCoursesComponent } from './components/shared/landing-courses/landing-courses.component'; 
import { LandingTutorsComponent } from './components/landing/landing-tutors/landing-tutors.component';
import { LandingCourseComponent } from './components/shared/landing-course/landing-course.component'; 
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserOtpVerifyComponent } from './components/user/user-otp-verify/user-otp-verify.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { TutorLayoutComponent } from './layouts/tutor-layout/tutor-layout.component';
import { TutorDashboardComponent } from './components/tutor/tutor-dashboard/tutor-dashboard.component';
import { CoordinatorLayoutComponent } from './layouts/coordinator-layout/coordinator-layout.component';
import { CoordinatorDashboardComponent } from './components/coordinator/coordinator-dashboard/coordinator-dashboard.component';
import { adminGuard } from './guards/adminGuard/admin.guard';
import { studentGuard } from './guards/studentGuard/student.guard'
import { tutorGuard } from './guards/tutorGuard/tutor.guard';
import { coordinatorGuard } from './guards/coordinatorGuard/coordinator.guard';
import { AdminUserListComponent } from './components/admin/admin-user-list/admin-user-list.component';
import { AdminTutorsListComponent } from './components/admin/admin-tutors-list/admin-tutors-list.component';
import { AdminCoordinatorsListComponent } from './components/admin/admin-coordinators-list/admin-coordinators-list.component';
import { AdminCourseListComponent } from './components/admin/admin-course-list/admin-course-list.component';
import { AdminPaymentListComponent } from './components/admin/admin-payment-list/admin-payment-list.component';
import { AdminExpenseListComponent } from './components/admin/admin-expense-list/admin-expense-list.component';
import { TutorClassesComponent } from './components/tutor/tutor-classes/tutor-classes.component';
import { TutorCoursesComponent } from './components/tutor/tutor-courses/tutor-courses.component';
import { TutorChatComponent } from './components/tutor/tutor-chat/tutor-chat.component';
import { TutorNotificationsComponent } from './components/tutor/tutor-notifications/tutor-notifications.component';
import { CoordinatorClassesComponent } from './components/coordinator/coordinator-classes/coordinator-classes.component';
import { CoordinatorNotificationsComponent } from './components/coordinator/coordinator-notifications/coordinator-notifications.component';
import { UserCoursesComponent } from './components/user/user-courses/user-courses.component';
import { UserNotificationComponent } from './components/user/user-notification/user-notification.component';
import { AdminAddCourseComponent } from './components/admin/admin-add-course/admin-add-course.component';
import { AdminAddPaymentComponent } from './components/admin/admin-add-payment/admin-add-payment.component';
import { AdminAddExpenseComponent } from './components/admin/admin-add-expense/admin-add-expense.component';
import { AdminAddStudentComponent } from './components/admin/admin-add-student/admin-add-student.component';
import { AdminAddTutorComponent } from './components/admin/admin-add-tutor/admin-add-tutor.component';
import { AdminAddCoordinatorComponent } from './components/admin/admin-add-coordinator/admin-add-coordinator.component';
import { CoordinatorStuedentsComponent } from './components/coordinator/coordinator-stuedents/coordinator-stuedents.component';
import { ManageStudentComponent } from './components/coordinator/manage-student/manage-student.component';
import { UserCourseComponent } from './components/user/user-course/user-course.component';
import { SmartLearnMentorComponentComponent } from './components/user/smart-learn-mentor-component/smart-learn-mentor-component.component';
import { UserPaymentComponent } from './components/user/user-payment/user-payment.component';
import { InternetErrorComponent } from './components/shared/error-page/internet-error/internet-error.component';
import { ChatLayoutComponent } from './components/user/userChat/chat-layout/chat-layout.component';
import { VideoCallComponent } from './components/user/video-call/video-call.component';
import { tutorVideoCallComponent } from './components/tutor/video-call/video-call.component';




const routes: Routes = [
  {
    path: "", component: LandingLayoutComponent,
    children: [
      { path: "", component: LandingHomeComponent },
      { path: "courses", component: LandingCoursesComponent },
      { path: "tutors", component: LandingTutorsComponent },
      { path: "course/:id", component: LandingCourseComponent }
    ]
  },
  {
    path: 'admin', component: AdminLayoutComponent,
    canActivate: [adminGuard],
    children: [
      {path: "dashboard",component: AdminDashboardComponent},
      {path:"students",component:AdminUserListComponent},
      {path:"tutors",component:AdminTutorsListComponent},
      {path:"coordinators",component:AdminCoordinatorsListComponent},
      {path:"courses",component:AdminCourseListComponent},
      {path:"payments",component:AdminPaymentListComponent},
      {path:"expenses",component:AdminExpenseListComponent},
      {path:"addCourse",component:AdminAddCourseComponent},
      {path:"addCourse/:id",component:AdminAddCourseComponent},
      {path:"addPayment",component:AdminAddPaymentComponent},
      {path:"addPayment/:id",component:AdminAddPaymentComponent},
      {path:"addExpense",component:AdminAddExpenseComponent},
      {path:"addExpense/:id",component:AdminAddExpenseComponent},
      {path:"addStudent",component:AdminAddStudentComponent},
      {path:'addStudent/:id',component:AdminAddStudentComponent},
      {path:"addTutor",component:AdminAddTutorComponent},
      {path:'addTutor/:id',component:AdminAddTutorComponent},
      {path:"addCoordinator",component:AdminAddCoordinatorComponent},
      {path:"editCoordinator/:id",component:AdminAddCoordinatorComponent},
      
      
    ]
  },
  {
    path: 'tutor', component: TutorLayoutComponent,
    canActivateChild: [tutorGuard],
    children: [
      { path: "dashboard", component: TutorDashboardComponent },
      { path: "classes", component: TutorClassesComponent },
      { path: "courses", component: TutorCoursesComponent },
      { path: "notification", component: TutorNotificationsComponent },
    ]
  },
  {
    path: 'tutor/chat', component: TutorChatComponent,
  },
  {
    path: 'tutor/video', component: tutorVideoCallComponent,
  },
  {
    path: 'coordinator', component: CoordinatorLayoutComponent,
    canActivateChild: [coordinatorGuard],
    children: [
      { path: "dashboard", component: CoordinatorDashboardComponent },
      { path: "classes", component: CoordinatorClassesComponent },
      { path: "notification", component: CoordinatorNotificationsComponent },
      {path:"students",component:CoordinatorStuedentsComponent},
      {path:"manageStudent/:id",component:ManageStudentComponent}
    ]
  },
  {
    path: 'login', component: UserLoginComponent
  },
  {
    path: 'register', component: UserRegisterComponent,
  },
  {
    path: 'user/otpverify', component: UserOtpVerifyComponent,
  },
  {
    path: "user", 
    component: UserLayoutComponent,
    canActivateChild: [studentGuard],
    children: [
      { path: "dashboard", component: UserDashboardComponent },
      { path: "courses", component: UserCoursesComponent },
      { path: "notification", component: UserNotificationComponent },
      { path: "mentor", component: SmartLearnMentorComponentComponent },
      {path:"course-showcase/:id",component:UserCourseComponent},
      {path:'payment',component:UserPaymentComponent},
      //{path:'video',component:ChatLayoutComponent}

    ]
  },
  {
    path: 'user/chat', component: ChatLayoutComponent,
  },
  {
    path: 'user/video', component: VideoCallComponent,
  },
  {path:'error',component:InternetErrorComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
