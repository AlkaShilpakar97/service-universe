# Service Universe - Microservice Platform

## Service List

* **gateway_app** – Gateway and Authentication service
* **transport_app** – Transport Pass service(default port: 5001)
* **doctor_app** – Doctor Appointment service(default port: 5002)
* **school_app** – School Enrollment service(default port: 5003)

---

## Launch Requirements

* Python 3.11 or newer recommended
* Node.js & Angular CLI for frontend
* Docker and Docker Compose installed for containerized setup

---

## Install Dependencies and Run Locally

### Backend (Python Services)

#### Using Bash Shell

```bash
cd gateway_app
sh exec_install.sh    # Install dependencies
sh exec_run.sh        # Run service
```

Repeat for other services (`transport_app`, `doctor_app`, `school_app`) **one at a time** or modify host ports.

#### Without Bash (Windows)

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python main.py         # Ensure port 5000 or change host port if running multiple services
```

---

### Frontend (Angular)

```bash
cd frontend
npm install
npm run start           # Runs Angular dev server (default port 4200)
```

---

## Docker Setup

### Build and Run Services

```bash
docker-compose build
docker-compose up
```

> Only one backend service runs per host port unless ports are mapped differently in `docker-compose.yml`.

### Stop Services

```bash
docker-compose down
```

---

## Functional Overview

* **Gateway** – Handles user registration, login, and routes requests to microservices.
* **Transport Pass** – Apply for passes, track status, view pass info, and process payments.
* **Doctor Appointment** – Browse doctors, book appointments, and manage schedules.
* **School Enrollment** – Submit enrollment forms, upload documents, and track status.
