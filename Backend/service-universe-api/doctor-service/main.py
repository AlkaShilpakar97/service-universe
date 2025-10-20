# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routes import doctor_appointment, doctors

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(
    title="Doctor Appointment Service",
    description="Microservice for managing doctors and appointments",
    version="1.0.0"
)

# ------------------ CORS ------------------
origins = [
    "http://localhost:4200",  # Angular dev server
    "http://127.0.0.1:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Or use ["*"] to allow all origins (dev only!)
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE
    allow_headers=["*"],  # Accept all headers
)

# Include routers
app.include_router(doctor_appointment.router)
app.include_router(doctors.router)

# Root route for testing
@app.get("/")
def root():
    return {"message": "Service Universe API is running"}
