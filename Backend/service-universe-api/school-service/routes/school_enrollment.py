from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from datetime import date, datetime
from database import get_db
from models import School, SchoolEnrollment

router = APIRouter(prefix="/schools", tags=["School Enrollment"])

# -------------------- SCHEMAS --------------------

class SchoolCreate(BaseModel):
    name: str
    address: str
    contact_info: str

class SchoolResponse(BaseModel):
    id: int
    name: str
    contact_info: str
    address: str

    class Config:
        orm_mode = True


class EnrollmentCreate(BaseModel):
    student_name: str
    dob: date
    grade: str
    school_id: int
    documents: str  # JSON string of document paths

class EnrollmentResponse(BaseModel):
    id: int
    student_name: str
    dob: date
    grade: str
    school_id: int
    documents: str
    status: str
    submitted_at: datetime

    class Config:
        orm_mode = True

# -------------------- SCHOOL ROUTES --------------------

@router.post("/", response_model=SchoolResponse)
def create_school(school: SchoolCreate, db: Session = Depends(get_db)):
    new_school = School(
        name=school.name,
        address=school.address,
        contact_info=school.contact_info
    )
    db.add(new_school)
    db.commit()
    db.refresh(new_school)
    return new_school


@router.get("/", response_model=List[SchoolResponse])
def get_all_schools(db: Session = Depends(get_db)):
    return db.query(School).all()


@router.get("/{school_id}", response_model=SchoolResponse)
def get_school(school_id: int, db: Session = Depends(get_db)):
    school = db.query(School).filter(School.id == school_id).first()
    if not school:
        raise HTTPException(status_code=404, detail="School not found")
    return school

# -------------------- ENROLLMENT ROUTES --------------------

@router.post("/enrollments/", response_model=EnrollmentResponse)
def create_enrollment(enrollment: EnrollmentCreate, db: Session = Depends(get_db)):
    school = db.query(School).filter(School.id == enrollment.school_id).first()
    if not school:
        raise HTTPException(status_code=404, detail="School not found")

    new_enrollment = SchoolEnrollment(
        student_name=enrollment.student_name,
        dob=enrollment.dob,
        grade=enrollment.grade,
        school_id=enrollment.school_id,
        documents=enrollment.documents
    )
    db.add(new_enrollment)
    db.commit()
    db.refresh(new_enrollment)
    return new_enrollment


@router.get("/enrollments/", response_model=List[EnrollmentResponse])
def get_all_enrollments(db: Session = Depends(get_db)):
    return db.query(SchoolEnrollment).all()


@router.get("/enrollments/{enrollment_id}", response_model=EnrollmentResponse)
def get_enrollment(enrollment_id: int, db: Session = Depends(get_db)):
    enrollment = db.query(SchoolEnrollment).filter(SchoolEnrollment.id == enrollment_id).first()
    if not enrollment:
        raise HTTPException(status_code=404, detail="Enrollment not found")
    return enrollment


@router.put("/enrollments/{enrollment_id}", response_model=EnrollmentResponse)
def update_enrollment_status(enrollment_id: int, status: str, db: Session = Depends(get_db)):
    enrollment = db.query(SchoolEnrollment).filter(SchoolEnrollment.id == enrollment_id).first()
    if not enrollment:
        raise HTTPException(status_code=404, detail="Enrollment not found")

    valid_status = ["Pending", "Approved", "Rejected"]
    if status not in valid_status:
        raise HTTPException(status_code=400, detail=f"Invalid status. Choose from {valid_status}")

    enrollment.status = status
    db.commit()
    db.refresh(enrollment)
    return enrollment


@router.delete("/enrollments/{enrollment_id}")
def delete_enrollment(enrollment_id: int, db: Session = Depends(get_db)):
    enrollment = db.query(SchoolEnrollment).filter(SchoolEnrollment.id == enrollment_id).first()
    if not enrollment:
        raise HTTPException(status_code=404, detail="Enrollment not found")

    db.delete(enrollment)
    db.commit()
    return {"message": "Enrollment deleted successfully"}
