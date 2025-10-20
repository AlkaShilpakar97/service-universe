from sqlalchemy import Enum
from sqlalchemy import Column, Integer, String, Date, Text, TIMESTAMP, ForeignKey, Numeric
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

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

