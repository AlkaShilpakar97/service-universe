from sqlalchemy import Enum
from sqlalchemy import Column, Integer, String, Date, Text, TIMESTAMP, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

# ------------------ Doctor Appointments ------------------
class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    specialty = Column(String(50))
    hospital = Column(String(100))
    available_slots = Column(Text)  # JSON string of available datetime slots
    appointments = relationship("DoctorAppointment", back_populates="doctor")

class DoctorAppointment(Base):
    __tablename__ = "doctor_appointments"

    id = Column(Integer, primary_key=True, index=True)
    patient_name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctors.id", ondelete="CASCADE"))
    appointment_date = Column(TIMESTAMP, nullable=False)
    status = Column(String(20), default="Pending")
    submitted_at = Column(TIMESTAMP, default=datetime.utcnow)
    doctor = relationship("Doctor", back_populates="appointments")
