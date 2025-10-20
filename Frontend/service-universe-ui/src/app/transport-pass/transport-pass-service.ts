import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TransportPass {
  id?: number;
  full_name: string;
  email: string;
  address: string;
  pass_type: string;
  start_date: string;
  payment_method: string;
  card_number?: string;
  cvv?: string;
  id_proof_path?: string;
  payment_status?: string;
  submitted_at?: string;
}

export interface TransportPayment {
  id?: number;
  application_id: number;
  payment_method: string;
  amount: number;
  status: string;
  transaction_id?: string;
  created_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class TransportService {
  private apiUrl = 'http://localhost:5001/transport';

  constructor(private http: HttpClient) {}

  /** 🚀 Create a new transport pass */
  createPass(passData: TransportPass): Observable<TransportPass> {
    return this.http.post<TransportPass>(`${this.apiUrl}/`, passData);
  }

  /** 📋 Get all transport passes */
  getAllPasses(): Observable<TransportPass[]> {
    return this.http.get<TransportPass[]>(`${this.apiUrl}/`);
  }

  /** 🔍 Get single pass by ID */
  getPassById(passId: number): Observable<TransportPass> {
    return this.http.get<TransportPass>(`${this.apiUrl}/${passId}`);
  }

/** 🔍 Get single pass by ID */
  getPassByEmail(email: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/email/${email}`);
}

  /** ✏️ Update pass */
  updatePass(passId: number, passData: Partial<TransportPass>): Observable<TransportPass> {
    return this.http.put<TransportPass>(`${this.apiUrl}/${passId}`, passData);
  }

  /** 🗑️ Delete pass */
  deletePass(passId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${passId}`);
  }

  /** 💳 Create a payment */
  createPayment(paymentData: TransportPayment): Observable<TransportPayment> {
    return this.http.post<TransportPayment>(`${this.apiUrl}/payments`, paymentData);
  }

  /** 💰 Get payments for a specific application */
  getPayments(applicationId: number): Observable<TransportPayment[]> {
    return this.http.get<TransportPayment[]>(`${this.apiUrl}/payments/${applicationId}`);
  }
}
