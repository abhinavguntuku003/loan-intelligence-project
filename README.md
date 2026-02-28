# 🚀 Loan Intelligence System  
### AI-Powered Credit Risk Assessment Platform

An end-to-end full-stack machine learning application that simulates a real-world fintech credit decision engine.

This system evaluates loan applications and classifies them into:

- 🟢 **Approved**
- 🟡 **Manual Review**
- 🔴 **Rejected**

Along with:
- 📊 Approval Probability
- 📈 Risk Score (0–100)
- 🧠 Factor Analysis Explanation

---

## 🌐 Live Demo

Frontend: https://loan-intelligence-project.vercel.app

Backend API Docs: https://loan-intelligence-project.onrender.com/docs

---

# 📸 Screenshots

## 📝 Application Form
![Application Form](docs/screenshots/loan-form-ui.png)

## 🟢 Approved Case
![Approved](docs/screenshots/loan-approved.png)

## 🟡 Manual Review Case
![Manual Review](docs/screenshots/loan-manual-review.png)

## 🔴 Rejected Case
![Rejected](docs/screenshots/loan-rejected.png)

---

# 🏗 System Architecture
<img width="1536" height="1024" alt="architecture_diagram" src="https://github.com/user-attachments/assets/b506af17-c991-42f8-85f5-78bdb96fae96" />


---

# 🧠 Project Overview

Loan Intelligence is designed to replicate how real banking credit systems evaluate loan applications using machine learning probability instead of simple binary classification.

Instead of only predicting **Yes / No**, the system:

- Calculates approval probability
- Converts probability into risk score
- Uses threshold-based decision segmentation
- Supports manual review logic

This mimics real-world credit workflows used in fintech systems.

---

# 🔄 End-to-End Workflow

### 1️⃣ User Input (React Frontend)

Applicant enters financial details:
- Age
- Monthly Income
- Credit Score
- Loan Amount
- Existing Loans
- Spending Ratio
- Employment Type

---

### 2️⃣ API Request (Frontend → Backend)

Frontend sends:

```bash
POST /predict
```
### 3️⃣ Backend Processing (FastAPI)

Backend performs
- Request validation using Pydantic schema
- Feature preprocessing
- Scaling & transformation
- Model inference
- Probability extraction
- Spending Ratio
- Employment Type

### 4️⃣ Decision Engine Logic
```python
if probability >= 0.65:
    decision = "Approved"
elif probability >= 0.40:
    decision = "Manual Review"
else:
    decision = "Rejected"
```

### 5️⃣ Risk Score Calculation
```python
risk_score = (1 - probability) * 100
```
Higher risk score → Higher default risk.

### 6️⃣ API Response Example
```json
{
  "prediction": "Manual Review",
  "probability": 57.37,
  "risk_score": 43,
  "explanation": [
    "Debt-to-income ratio evaluated",
    "Credit score impact assessed",
    "Loan burden analyzed against income"
  ]
}
```
### 7️⃣ UI Rendering

React dynamically updates:
- Verdict color
- Probability gauge
- Risk gradient bar
- Factor explanation
- Timestamp

# 🛠 Tech Stack

## 🔹 Frontend
- React.js
- Custom SVG Gauge Visualization
- Dynamic Risk Gradient System
- Real-time API Integration (Fetch API)
- Modern Fintech-Inspired UI Design

## 🔹 Backend
- FastAPI
- Pydantic (Data Validation)
- Modular Project Structure
- Structured Logging System
- RESTful API Design

## 🔹 Machine Learning
- Scikit-learn Classifier
- Probability-Based Prediction
- Feature Preprocessing & Scaling
- Threshold-Based Decision Engine
- Risk Score Calculation Logic

## 🔹 Deployment
- Frontend → Vercel
- Backend → Render

---

# 📊 Decision Categories

| Category         | Probability Range |
|-----------------|------------------|
| 🟢 Approved      | ≥ 65% |
| 🟡 Manual Review | 40% – 64% |
| 🔴 Rejected      | < 40% |

---

# 📂 Project Structure
<img width="875" height="456" alt="image" src="https://github.com/user-attachments/assets/d47b51e7-4111-4a51-8e4f-0c118005b02c" />

---

# ⚙ Installation (Local Setup)

## Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
Access API docs at:
```bash
http://localhost:8000/docs
```

Frontend Setup
```bash
cd frontend
npm install
npm start
```
# 🔄 System Workflow

1. User submits loan details through the React frontend.
2. Frontend sends a `POST /predict` request to the FastAPI backend.
3. Backend validates input using Pydantic schemas.
4. Features are preprocessed and transformed for model compatibility.
5. The Scikit-learn model predicts approval probability.
6. A threshold-based decision engine categorizes the application:
   - 🟢 Approved (≥ 65%)
   - 🟡 Manual Review (40%–64%)
   - 🔴 Rejected (< 40%)
7. Risk score is calculated dynamically:
    Risk Score = (1 - Probability) × 100
8. Backend returns a structured JSON response.
9. Frontend dynamically updates:
- Verdict (color-coded)
- Approval Probability Gauge
- Risk Gradient Bar
- Factor Analysis Section
- Timestamp

---

# 🎯 Key Highlights

- Full-stack ML deployment (React + FastAPI)
- Probability-based credit risk modeling
- 3-tier decision segmentation (Real-world fintech simulation)
- Dynamic risk scoring (0–100 scale)
- Production-style REST API architecture
- Modular backend structure
- Modern fintech-inspired dashboard UI

---

# 📈 Model Logic Overview

Instead of simple binary classification, this system uses probability segmentation:

```python
if probability >= 0.65:
 decision = "Approved"
elif probability >= 0.40:
 decision = "Manual Review"
else:
 decision = "Rejected"
```
# 🚀 Future Improvements

- SHAP-based feature importance visualization for model explainability  
- Probability calibration (Platt Scaling / Isotonic Regression)  
- User authentication & role-based access control  
- Database integration to store loan applications and history  
- Admin dashboard for monitoring predictions and analytics  
- Docker containerization for consistent deployment  
- CI/CD pipeline automation  
- Model retraining pipeline for continuous improvement  

---

# 📬 Contact

If you'd like to test your loan approval probability or collaborate:

- LinkedIn: www.linkedin.com/in/abhinav-guntuku 
- Email: abhinavguntuku2022@gmail.com  

---

⭐ If you found this project interesting, feel free to star the repository!
