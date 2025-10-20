import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorAppointmentService } from '../doctor-appointment.service';
import { HttpClient } from '@angular/common/http';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  available_slots: string;
}

@Component({
  selector: 'app-doctor-appointment',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './doctor-appointment.component.html',
  styleUrl: './doctor-appointment.component.scss'
})
export class DoctorAppointmentComponent {
  searchForm!: FormGroup;
  specialties = ['General Physician', 'Dentist', 'Cardiologist', 'Dermatologist'];
  doctors: Doctor[] = [];
  doctorsList: Doctor[] = [];

  constructor(private fb: FormBuilder, private router: Router, private api: DoctorAppointmentService) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      name: [''],
      specialty: [''],
      hospital: ['']
    });
    this.loadDoctors();
  }

  loadDoctors() {
    this.api.getDoctors().subscribe(res =>{
      this.doctors = res;
      this.doctorsList = this.doctors;
    });
  }

  searchDoctors() {
    const { name, specialty, hospital } = this.searchForm.value;

    this.doctorsList = this.doctors.filter(d => 
      (!name || d.name.toLowerCase().includes(name.toLowerCase())) &&
      (!specialty || d.specialty === specialty) &&
      (!hospital || d.hospital.toLowerCase().includes(hospital.toLowerCase()))
    );
  }

  public navigateToSlots(doctorId: number): void {
    this.router.navigate([`doctor/slots`], { queryParams: { id: doctorId } });
  }
}
