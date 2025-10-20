import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  private baseUrl = 'http://localhost:5003/schools';

  constructor(private http: HttpClient) {}

  // Schools
  getAllSchools(): Observable<any> {
    return this.http.get(`${this.baseUrl}/`);
  }

  getSchoolById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createSchool(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/`, data);
  }

  // Enrollments
  getAllEnrollments(): Observable<any> {
    return this.http.get(`${this.baseUrl}/enrollments/`);
  }

  getEnrollmentById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/enrollments/${id}`);
  }

  createEnrollment(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/enrollments/`, data);
  }

  updateEnrollmentStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/enrollments/${id}?status=${status}`, {});
  }

  deleteEnrollment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/enrollments/${id}`);
  }
}
