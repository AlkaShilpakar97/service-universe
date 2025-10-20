import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import components
import {DoctorAppointmentComponent} from "./doctor-appointment/doctor-appointment/doctor-appointment.component";
import { HomeComponent } from './home/home.component';
import { TransportPassComponent } from './transport-pass/transport-pass/transport-pass.component';
import { SchoolEnrollmentComponent } from './school-enrollment/school-enrollment/school-enrollment.component';
import { EducationHomePageComponent } from './school-enrollment/education-home-page/education-home-page.component';
import { SchoolEnrollmentStatusComponent } from './school-enrollment/school-enrollment-status/school-enrollment-status.component';
import { DoctorSlotsComponent } from './doctor-appointment/doctor-slots/doctor-slots.component';
import { ApplyPassComponent } from './transport-pass/apply-pass/apply-pass.component';
import { CheckPassStatusComponent } from './transport-pass/check-pass-status/check-pass-status.component';
import { ViewPassComponent } from './transport-pass/view-pass/view-pass.component';

export const routes: Routes = [
  { path: '', component: HomeComponent  },
  { path: 'education', component: EducationHomePageComponent },
  { path: 'school/enroll', component: SchoolEnrollmentComponent },
  { path: 'school/enroll/status', component: SchoolEnrollmentStatusComponent },
  { path: 'doctor/appointments', component: DoctorAppointmentComponent },
  { path: 'transport/pass', component: TransportPassComponent },
  {path: 'doctor/slots', component: DoctorSlotsComponent},
  {path: 'transport/apply', component: ApplyPassComponent},
  {path: 'transport/status', component: CheckPassStatusComponent},
  {path: 'transport/view-pass', component: ViewPassComponent},
  { path: '**', redirectTo: '' } // Redirect unknown routes to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ViewPassComponent, ApplyPassComponent, CheckPassStatusComponent, DoctorAppointmentComponent, HomeComponent, TransportPassComponent, SchoolEnrollmentComponent, EducationHomePageComponent, SchoolEnrollmentStatusComponent, DoctorSlotsComponent],
  exports: [RouterModule, DoctorAppointmentComponent, HomeComponent, TransportPassComponent, SchoolEnrollmentComponent]
})
export class AppRoutingModule { }
