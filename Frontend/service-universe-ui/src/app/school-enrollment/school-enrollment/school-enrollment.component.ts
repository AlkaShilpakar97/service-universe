import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-school-enrollment',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './school-enrollment.component.html',
  styleUrls: ['./school-enrollment.component.scss']
})
export class SchoolEnrollmentComponent implements OnInit {
  enrollForm!: FormGroup;
  grades: number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  schools: any[] = []; // fetched from backend
  submitted = false;
  responseMessage = '';
  newEnrollment: any = null;

  private baseUrl = 'http://localhost:5000/schools';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', Validators.required],
      dob: ['', Validators.required],
      grade: ['', Validators.required],
      guardianName: ['', Validators.required],
      contact: ['', Validators.required],
      address: ['', Validators.required],
      documents: [null, Validators.required],
      school: ['', Validators.required]
    });

    this.fetchSchools();
  }

  fetchSchools() {
    this.http.get(`${this.baseUrl}/`).pipe(
      map((res: any) => res || [])
    ).subscribe({
      next: (data: any[]) => {
        this.schools = data;
      },
      error: (err) => {
        console.error('Failed to fetch schools:', err);
      }
    });
  }

  submitEnrollment() {
    if (this.enrollForm.invalid) return;

    // Prepare payload according to backend schema
    const formValue = this.enrollForm.value;
    const payload = {
      student_name: formValue.studentName,
      dob: formValue.dob,
      grade: formValue.grade,
      school_id: formValue.school, // school id from select
      documents: JSON.stringify([formValue.documents]) // convert to JSON string
    };

    this.http.post(`${this.baseUrl}/enrollments/`, payload).subscribe({
      next: (res) => {
        this.submitted = true;
        this.newEnrollment = res;
        this.responseMessage = 'Enrollment application submitted successfully!';
        this.enrollForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.responseMessage = 'Failed to submit enrollment. Please try again.';
      }
    });
  }

  submitNew() {
    this.submitted = false;
    this.responseMessage = '';
  }

  goBack() {
    this.submitted = false;
    this.responseMessage = '';
    this.newEnrollment = null;
    this.router.navigate(['/education']);
  }
}
