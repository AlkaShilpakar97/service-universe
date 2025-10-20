import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { TransportService } from '../transport-pass-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-pass',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './view-pass.component.html',
  styleUrls: ['./view-pass.component.scss']
})
export class ViewPassComponent {
  viewForm: FormGroup;
  passDetails: any = null;
  errorMessage = '';

  constructor(private fb: FormBuilder, private http: HttpClient,  private api: TransportService, private router: Router) {
    this.viewForm = this.fb.group({
      appId: [''],
      email: ['', [Validators.email]]
    });
  }

  onSubmit() {
    if (this.viewForm.invalid) return;

    this.passDetails = null;
    this.errorMessage = '';

    const { appId, email } = this.viewForm.value;

    // Determine which API endpoint to call
    if (appId) {
      // Fetch by Application ID
      this.http.get(`http://localhost:5001/transport/${appId}`)
        .pipe(
          catchError(err => {
            this.errorMessage = err.status === 404 ? 'No pass found with this Application ID.' : 'Error fetching pass.';
            return of(null);
          })
        )
        .subscribe(res => {
          if (res) this.passDetails = res;
        });
    } else if (email) {
      // Fetch by Email
      this.api.getPassByEmail(email).subscribe(res => {
        console.log(res);
        this.passDetails = res[0]
        this.generateMockUsage();
      });
    } else {
      this.errorMessage = 'Please enter either Application ID or Email.';
    }
  }

  generateMockUsage() {
    if (!this.passDetails || !this.passDetails.start_date) return;

    const startDate = new Date(this.passDetails.start_date);
    this.passDetails.usageHistory = [];

    for (let i = 0; i < 5; i++) {
      const usageDate = new Date(startDate);
      usageDate.setDate(startDate.getDate() + i * 2); // every 2 days
      this.passDetails.usageHistory.push({
        date: usageDate.toISOString().split('T')[0],
        route: `Bus ${10 + i}A - Sample Route`,
        status: 'Completed'
      });
    }
  }

  goBack() {
    this.router.navigate(['/transport/pass']);
  }
}
