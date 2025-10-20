from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import Base, engine, get_db
from models import Doctor, DoctorAppointment
from pydantic import BaseModel, EmailStr
from datetime import datetime

router = APIRouter(prefix="/appointments", tags=["Doctor Appointment"])


# -------------------- SCHEMAS --------------------

class AppointmentCreate(BaseModel):
    patient_name: str
    email: EmailStr
    doctor_id: int
    appointment_date: datetime


class AppointmentResponse(BaseModel):
    id: int
    patient_name: str
    email: str
    doctor_id: int
    appointment_date: datetime
    status: str
    submitted_at: datetime

    class Config:
        from_attributes = True  # for Pydantic v2




# -------------------- APPOINTMENT MANAGEMENT --------------------

@router.post("/", response_model=AppointmentResponse)
def create_appointment(data: AppointmentCreate, db: Session = Depends(get_db)):
    doctor = db.query(Doctor).filter(Doctor.id == data.doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    appointment = DoctorAppointment(
        patient_name=data.patient_name,
        email=data.email,
        doctor_id=data.doctor_id,
        appointment_date=data.appointment_date,
    )
    db.add(appointment)
    db.commit()
    db.refresh(appointment)
    return appointment


@router.get("/", response_model=List[AppointmentResponse])
def get_all_appointments(db: Session = Depends(get_db)):
    return db.query(DoctorAppointment).all()


@router.get("/{doctor_id}", response_model=List[AppointmentResponse])
def get_appointment(doctor_id: int, db: Session = Depends(get_db)):
    appointment = db.query(DoctorAppointment).filter(DoctorAppointment.doctor_id == doctor_id).all()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")
    return appointment


@router.put("/{appointment_id}", response_model=AppointmentResponse)
def update_status(appointment_id: int, status: str, db: Session = Depends(get_db)):
    appointment = db.query(DoctorAppointment).filter(DoctorAppointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    valid_status = ["Pending", "Confirmed", "Cancelled", "Completed"]
    if status not in valid_status:
        raise HTTPException(status_code=400, detail=f"Invalid status. Choose from {valid_status}")

    appointment.status = status
    db.commit()
    db.refresh(appointment)
    return appointment


@router.delete("/{appointment_id}")
def delete_appointment(appointment_id: int, db: Session = Depends(get_db)):
    appointment = db.query(DoctorAppointment).filter(DoctorAppointment.id == appointment_id).first()
    if not appointment:
        raise HTTPException(status_code=404, detail="Appointment not found")

    db.delete(appointment)
    db.commit()
    return {"message": "Appointment deleted successfully"}
