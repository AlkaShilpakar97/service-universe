import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SchoolService } from '../school-enrollment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-school-enrollment-status',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './school-enrollment-status.component.html',
  styleUrl: './school-enrollment-status.component.scss'
})
export class SchoolEnrollmentStatusComponent {
  statusForm!: FormGroup;
  status: string | null = null;
  statusClass: string = '';

  constructor(private fb: FormBuilder, private api: SchoolService, private router: Router) {}

  ngOnInit(): void {
    this.statusForm = this.fb.group({
      applicationId: ['', Validators.required]
    });
  }

  checkStatus() {
    const appId = this.statusForm.value.applicationId;

    this.api.getEnrollmentById(appId).subscribe(res => {
      this.status = res.status;
      // Set color based on status
      switch (this.status) {
        case 'Pending': this.statusClass = 'pending'; break;
        case 'Under Review': this.statusClass = 'review'; break;
        case 'Approved': this.statusClass = 'accepted'; break;
        case 'Rejected': this.statusClass = 'rejected'; break;
      }
    });
  }

  goBack() {
    this.router.navigate(['/education']);
  }
}
