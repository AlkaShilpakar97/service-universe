import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AppointmentCreate {
  patient_name: string;
  email: string;
  doctor_id: number;
  appointment_date: string; // ISO string
}

interface AppointmentResponse {
  id: number;
  patient_name: string;
  email: string;
  doctor_id: number;
  appointment_date: string;
  status: string;
  submitted_at: string;
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  available_slots: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorAppointmentService {
  private apiUrl = 'http://localhost:5000/appointments'; // your FastAPI base URL

  constructor(private http: HttpClient) {}

  // Appointments
  getAllAppointments(): Observable<AppointmentResponse[]> {
    return this.http.get<AppointmentResponse[]>(`${this.apiUrl}/`);
  }

  getAppointmentById(id: number): Observable<AppointmentResponse[]> {
    return this.http.get<AppointmentResponse[]>(`${this.apiUrl}/${id}`);
  }

  createAppointment(data: AppointmentCreate): Observable<AppointmentResponse> {
    return this.http.post<AppointmentResponse>(`${this.apiUrl}/`, data);
  }

  updateStatus(id: number, status: string): Observable<AppointmentResponse> {
    return this.http.put<AppointmentResponse>(`${this.apiUrl}/${id}?status=${status}`, {});
  }

  deleteAppointment(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  // Doctors
  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>("http://localhost:5000/doctors/");
  }

  createDoctor(doctor: Omit<Doctor, 'id'>): Observable<Doctor> {
    return this.http.post<Doctor>(`${this.apiUrl}/doctors`, doctor);
  }
}
