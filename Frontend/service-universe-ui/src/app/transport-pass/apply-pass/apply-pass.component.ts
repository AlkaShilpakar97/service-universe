import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apply-pass',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './apply-pass.component.html',
  styleUrls: ['./apply-pass.component.scss']
})
export class ApplyPassComponent {
  passForm: FormGroup;
  submitted = false;
  paymentStatus = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.passForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      passType: ['', Validators.required],
      startDate: ['', Validators.required],
      idProofPath: [null],
      paymentMethod: ['', Validators.required],
      cardNumber: [''],
      cvv: [''],
      expiryDate: ['']
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // just store file name; actual upload can be handled separately
      this.passForm.patchValue({ idProofPath: file.name });
    }
  }

  onSubmit() {
    if (this.passForm.valid) {
      // Convert camelCase to snake_case for backend
      const payload = {
        full_name: this.passForm.value.fullName,
        email: this.passForm.value.email,
        address: this.passForm.value.address,
        pass_type: this.passForm.value.passType,
        start_date: this.passForm.value.startDate,
        id_proof_path: this.passForm.value.idProofPath,
        payment_method: this.passForm.value.paymentMethod,
        card_number: this.passForm.value.cardNumber,
        cvv: this.passForm.value.cvv,
        payment_status: 'Pending'
      };

      this.http.post('http://localhost:5001/transport/', payload)
        .subscribe({
          next: (res: any) => {
            this.paymentStatus = 'Transport Pass Application Submitted Successfully!';
            this.submitted = true;
            this.passForm.reset();
          },
          error: (err) => {
            console.error(err);
            this.paymentStatus = 'Failed to submit application. Please try again.';
          }
        });
    } else {
      this.paymentStatus = 'Please fill all required fields correctly.';
    }
  }

  goBack() {
    this.router.navigate(['/transport/pass']);
  }
}
