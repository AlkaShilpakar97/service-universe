from sqlalchemy import Enum
from sqlalchemy import Column, Integer, String, Date, Text, TIMESTAMP, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

# ------------------ Transport Pass ------------------

class PassType(str, Enum):
    monthly = "Monthly"
    quarterly = "Quarterly"
    annual = "Annual"

class TransportPassApplication(Base):
    __tablename__ = "transport_pass_applications"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    address = Column(Text, nullable=False)
    pass_type = Column(String(20), nullable=False)
    start_date = Column(Date, nullable=False)
    payment_method = Column(String(20), nullable=False)
    card_number = Column(String(20))
    cvv = Column(String(3))
    payment_status = Column(String(20), nullable=False)
    id_proof_path = Column(Text)
    submitted_at = Column(TIMESTAMP, default=datetime.utcnow)

class TransportPassPayment(Base):
    __tablename__ = "transport_pass_payments"

    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("transport_pass_applications.id", ondelete="CASCADE"))
    payment_method = Column(String(20))
    amount = Column(Numeric(10, 2))
    status = Column(String(20))
    transaction_id = Column(String(50))
    created_at = Column(TIMESTAMP, default=datetime.utcnow)

# ------------------ School Enrollment ------------------
class School(Base):
    __tablename__ = "schools"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    address = Column(Text)
    contact_info = Column(String(100))
    enrollments = relationship("SchoolEnrollment", back_populates="school")

class SchoolEnrollment(Base):
    __tablename__ = "school_enrollments"

    id = Column(Integer, primary_key=True, index=True)
    student_name = Column(String(100), nullable=False)
    dob = Column(Date, nullable=False)
    grade = Column(String(10), nullable=False)
    school_id = Column(Integer, ForeignKey("schools.id", ondelete="CASCADE"))
    documents = Column(Text)  # JSON string of document paths
    status = Column(String(20), default="Pending")
    submitted_at = Column(TIMESTAMP, default=datetime.utcnow)
    school = relationship("School", back_populates="enrollments")

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
