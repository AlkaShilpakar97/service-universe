# routes/doctors.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Doctor
from pydantic import BaseModel

router = APIRouter(prefix="/doctors", tags=["Doctors"])

# -------------------- Schemas --------------------

class DoctorCreate(BaseModel):
    name: str
    specialty: str
    hospital: str
    available_slots: str

class DoctorResponse(BaseModel):
    id: int
    name: str
    specialty: str
    hospital: str
    available_slots: str

    class Config:
        orm_mode = True  # or from_attributes=True if using Pydantic v2

# -------------------- Routes --------------------

@router.get("/", response_model=List[DoctorResponse])
def get_doctors(db: Session = Depends(get_db)):
    return db.query(Doctor).all()

@router.post("/", response_model=DoctorResponse)
def create_doctor(doctor: DoctorCreate, db: Session = Depends(get_db)):
    new_doctor = Doctor(
        name=doctor.name,
        specialty=doctor.specialty,
        hospital=doctor.hospital,
        available_slots=doctor.available_slots,
    )
    db.add(new_doctor)
    db.commit()
    db.refresh(new_doctor)
    return new_doctor
