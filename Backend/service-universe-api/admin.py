# admin.py
import asyncio
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi_admin.app import app as admin_app
from fastapi_admin.factory import app as create_admin_app
from fastapi_admin.site import Site
from fastapi_admin.resources import Model
from database import engine, Base
from models import TransportPassApplication, SchoolEnrollment, DoctorAppointment, Doctor

# --------------------- FastAPI App ---------------------
app = FastAPI(title="Community Services Admin")

# --------------------- Admin Resources ---------------------
class TransportPassResource(Model):
    model = TransportPassApplication
    label = "Transport Pass Applications"
    fields = ["id", "full_name", "email", "address", "pass_type", "start_date", "payment_method", "payment_status", "submitted_at"]

class SchoolEnrollmentResource(Model):
    model = SchoolEnrollment
    label = "School Enrollments"
    fields = ["id", "student_name", "dob", "grade", "school_id", "status", "submitted_at"]

class DoctorAppointmentResource(Model):
    model = DoctorAppointment
    label = "Doctor Appointments"
    fields = ["id", "patient_name", "email", "doctor_id", "appointment_date", "status", "submitted_at"]

# --------------------- Mount Static ---------------------
# This is required for FastAPI Admin assets
app.mount("/static", StaticFiles(directory="static"), name="static")

# --------------------- Init FastAPI Admin ---------------------
async def init_admin():
    await admin_app.configure(
        admin_secret="admin123",  # change this
        site=Site(
            name="Community Services Admin",
            resources=[
                TransportPassResource,
                SchoolEnrollmentResource,
                DoctorAppointmentResource,
            ],
        ),
        database_url="sqlite+aiosqlite:///./test.db",  # or your DB
    )

@app.on_event("startup")
async def startup():
    await init_admin()

# Mount the admin app under /admin
app.mount("/admin", admin_app)
