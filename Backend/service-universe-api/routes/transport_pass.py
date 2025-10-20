from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import get_db
from models import TransportPassApplication, TransportPassPayment
from pydantic import BaseModel
from typing import Optional, List
from datetime import date, datetime
from decimal import Decimal

router = APIRouter(prefix="/transport", tags=["Transport Pass"])

# ------------------ SCHEMAS ------------------

class TransportPassApplicationBase(BaseModel):
    full_name: str
    email: str
    address: str
    pass_type: str
    start_date: date
    payment_method: str
    card_number: Optional[str] = None
    cvv: Optional[str] = None
    id_proof_path: Optional[str] = None

class TransportPassApplicationCreate(TransportPassApplicationBase):
    payment_status: str = "Pending"

class TransportPassApplicationUpdate(BaseModel):
    address: Optional[str] = None
    pass_type: Optional[str] = None
    start_date: Optional[date] = None
    payment_status: Optional[str] = None

class TransportPassApplicationResponse(TransportPassApplicationBase):
    id: int
    payment_status: str
    submitted_at: datetime

    class Config:
        orm_mode = True


class TransportPassPaymentBase(BaseModel):
    application_id: int
    payment_method: str
    amount: Decimal
    status: str
    transaction_id: Optional[str] = None

class TransportPassPaymentResponse(TransportPassPaymentBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

# ------------------ ROUTES ------------------

## Create new transport pass
@router.post("/", response_model=TransportPassApplicationResponse)
def create_pass(
    pass_data: TransportPassApplicationCreate,
    db: Session = Depends(get_db)
):
    new_pass = TransportPassApplication(**pass_data.dict())
    db.add(new_pass)
    db.commit()
    db.refresh(new_pass)
    return new_pass


## Get all passes
@router.get("/", response_model=List[TransportPassApplicationResponse])
def get_all_passes(db: Session = Depends(get_db)):
    return db.query(TransportPassApplication).all()


## Get single pass by ID
@router.get("/{pass_id}", response_model=TransportPassApplicationResponse)
def get_pass(pass_id: int, db: Session = Depends(get_db)):
    transport_pass = db.query(TransportPassApplication).filter(TransportPassApplication.id == pass_id).first()
    if not transport_pass:
        raise HTTPException(status_code=404, detail="Transport pass not found")
    return transport_pass

@router.get("/email/{email}", response_model=List[TransportPassApplicationResponse])
def get_pass_by_email(email: str, db: Session = Depends(get_db)):
    passes = db.query(TransportPassApplication).filter(TransportPassApplication.email == email).all()
    if not passes:
        raise HTTPException(status_code=404, detail="No transport passes found for this email")
    return passes

## Update transport pass
@router.put("/{pass_id}", response_model=TransportPassApplicationResponse)
def update_pass(pass_id: int, pass_data: TransportPassApplicationUpdate, db: Session = Depends(get_db)):
    transport_pass = db.query(TransportPassApplication).filter(TransportPassApplication.id == pass_id).first()
    if not transport_pass:
        raise HTTPException(status_code=404, detail="Transport pass not found")

    for key, value in pass_data.dict(exclude_unset=True).items():
        setattr(transport_pass, key, value)
    
    db.commit()
    db.refresh(transport_pass)
    return transport_pass


## Delete pass
@router.delete("/{pass_id}")
def delete_pass(pass_id: int, db: Session = Depends(get_db)):
    transport_pass = db.query(TransportPassApplication).filter(TransportPassApplication.id == pass_id).first()
    if not transport_pass:
        raise HTTPException(status_code=404, detail="Transport pass not found")

    db.delete(transport_pass)
    db.commit()
    return {"message": "Transport pass deleted successfully"}


# ------------------ PAYMENTS ------------------

@router.post("/payments", response_model=TransportPassPaymentResponse)
def create_payment(payment_data: TransportPassPaymentBase, db: Session = Depends(get_db)):
    # Ensure application exists
    app = db.query(TransportPassApplication).filter(TransportPassApplication.id == payment_data.application_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Associated application not found")

    payment = TransportPassPayment(**payment_data.dict())
    db.add(payment)
    db.commit()
    db.refresh(payment)

    # Optionally update application status
    app.payment_status = payment.status
    db.commit()

    return payment


@router.get("/payments/{application_id}", response_model=List[TransportPassPaymentResponse])
def get_payments_for_application(application_id: int, db: Session = Depends(get_db)):
    return db.query(TransportPassPayment).filter(TransportPassPayment.application_id == application_id).all()
