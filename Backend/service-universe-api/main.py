from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routes import transport_pass, doctor_appointment, school_enrollment, doctors

# Initialize FastAPI app
app = FastAPI(title="Service Universe API")

# Create all database tables
Base.metadata.create_all(bind=engine)

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
app.include_router(transport_pass.router)
app.include_router(school_enrollment.router)
app.include_router(doctor_appointment.router)
app.include_router(doctors.router)

# Root route for testing
@app.get("/")
def root():
    return {"message": "Service Universe API is running"}
