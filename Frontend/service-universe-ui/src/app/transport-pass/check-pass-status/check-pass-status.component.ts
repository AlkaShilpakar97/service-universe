import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransportService } from '../transport-pass-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-check-pass-status',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './check-pass-status.component.html',
  styleUrl: './check-pass-status.component.scss'
})
export class CheckPassStatusComponent {
  statusForm: FormGroup;
  statusResult: { status: string; remarks: string } | null = null;

  constructor(private fb: FormBuilder, private api: TransportService, private router: Router) {
    this.statusForm = this.fb.group({
      appId: [''],
      email: ['', [Validators.email]]
    });
  }

  onSubmit() {
    if (this.statusForm.invalid) return;

    const { appId, email } = this.statusForm.value;
    this.checkStatus(appId, email);
  }

  checkStatus(appId: string, email: string) {
    let statusResult = null;
    this.api.getPassByEmail(email).subscribe(res => {
      console.log(res);
      if (res[0].payment_status === 'Approved') {
        statusResult = { status: 'Approved', remarks: 'Your pass is ready for collection.' };
      } else {
        statusResult = { status: 'Pending', remarks: 'Your application is still under review.' };
      }
      this.statusResult = statusResult;
    });
  }

  goBack() {
    this.router.navigate(['/transport/pass']);
  }
}
