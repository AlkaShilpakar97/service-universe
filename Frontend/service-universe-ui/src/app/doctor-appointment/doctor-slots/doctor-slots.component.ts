import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DoctorAppointmentService } from '../doctor-appointment.service';
import { bindCallback } from 'rxjs';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  hospital: string;
  availableSlots?: string;
}

interface TimeSlot {
  date: string;
  time: string;
  booked: boolean;
}

@Component({
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  selector: 'app-doctor-slots',
  templateUrl: './doctor-slots.component.html',
  styleUrls: ['./doctor-slots.component.scss']
})
export class DoctorSlotsComponent implements OnInit {

  doctor!: Doctor;
  slotsForm!: FormGroup;
  confirmation: {   patient_name: string;
    email: string;
    doctor_id: number;
    appointment_date: string;  } | null = null;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private api: DoctorAppointmentService, private router: Router) {}

  ngOnInit(): void {
    const doctorId = Number(this.route.snapshot.queryParamMap.get('id'));
    this.api.getDoctors().subscribe(res =>{
      this.doctor = res.find(d => d.id === doctorId)!;
    });
    // Example dummy slots
    this.slotsForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

availableSlots: { time: string, booked: boolean }[] = [];
selectedDate: string = '';
selectedSlot: string | null = null;

generateDailySlots(selectedDate: string, bookedSlots: string[]) {
  const startHour = 9; // 9 AM
  const endHour = 16;  // 4 PM
  const slots: { time: string; booked: boolean }[] = [];

  for (let hour = startHour; hour <= endHour; hour++) {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour > 12 ? hour - 12 : hour;
    const formattedTime = `${displayHour.toString().padStart(2, '0')}:00 ${ampm}`;
    const fullDateTime = `${selectedDate} ${formattedTime}`;

    console.log('ooked', bookedSlots);
    console.log(fullDateTime);
    const isBooked = bookedSlots.includes(fullDateTime);

    slots.push({
      time: formattedTime,
      booked: isBooked
    });
  }

  return slots;
}


loadSlots() {
  // Dummy slots for the selected date
  let bookedSlots: string | string[] = [];
  this.api.getAppointmentById(this.doctor.id).subscribe(res => {
    res.forEach((res) => {
      bookedSlots.push(this.convertToSydneyTime(res.appointment_date).toUpperCase());
      console.log(this.selectedDate);
      console.log('booked slots', bookedSlots);
      this.availableSlots = this.generateDailySlots(
        this.selectedDate, bookedSlots
      );

    });

    this.selectedSlot = null;
  });
  
}

selectSlot(time: string) {
  this.selectedSlot = time;
}

confirmAppointment() {
  const dateString = this.selectedDate + ' ' + this.selectedSlot;
  const dateObj = this.parseFullDateTime(dateString);

  console.log(dateObj.toISOString());

  this.confirmation = {
    patient_name: 'John Doe',
    email: 'johndoe@gmail.com',
    doctor_id: this.doctor.id,
    appointment_date: dateObj.toISOString(),
  };

  this.api.createAppointment(this.confirmation).subscribe(res => {
    this.confirmation = res;
    this.confirmation.appointment_date = dateObj.toLocaleString();
    this.availableSlots = this.availableSlots.map(slot => {
      if (slot.time === this.selectedSlot) {
        return { time: slot.time, booked: true };
      }
      return slot;
    });
  })
}

parseFullDateTime(dateTimeStr: string): Date {
  const [date, time, period] = dateTimeStr.split(" ");
  const [hourStr, minuteStr] = time.split(":");
  const [year, month, day] = date.split("-").map(Number);

  let hour = Number(hourStr);
  const minute = Number(minuteStr);

  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  return new Date(year, month - 1, day, hour, minute);
}

goBack() {
  this.router.navigate(['/doctor/appointments']);
}

convertToSydneyTime(dateStr: string): string {
  const utcDate = new Date(dateStr + "Z"); // ensure it's treated as UTC

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Australia/Sydney",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const parts = new Intl.DateTimeFormat("en-AU", options).formatToParts(utcDate);

  const year = parts.find(p => p.type === "year")?.value;
  const month = parts.find(p => p.type === "month")?.value;
  const day = parts.find(p => p.type === "day")?.value;
  const hour = parts.find(p => p.type === "hour")?.value;
  const minute = parts.find(p => p.type === "minute")?.value;
  const dayPeriod = parts.find(p => p.type === "dayPeriod")?.value;

  return `${year}-${month}-${day} ${hour}:${minute} ${dayPeriod}`;
}
}
