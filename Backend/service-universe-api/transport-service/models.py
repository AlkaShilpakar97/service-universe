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

