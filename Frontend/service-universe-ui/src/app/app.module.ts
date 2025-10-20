import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Routing
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { DoctorAppointmentComponent } from './doctor-appointment/doctor-appointment/doctor-appointment.component';
import { SchoolEnrollmentComponent } from './school-enrollment/school-enrollment/school-enrollment.component';
import { TransportPassComponent } from './transport-pass/transport-pass/transport-pass.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { DoctorListComponent } from './doctor-appointment/doctor-list/doctor-list.component';
import { DoctorSlotsComponent } from './doctor-appointment/doctor-slots/doctor-slots.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DoctorAppointmentComponent,
    DoctorListComponent,
    DoctorSlotsComponent,
    SchoolEnrollmentComponent,
    TransportPassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
