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

Frontend: https://your-frontend-link.vercel.app  
Backend API Docs: https://your-backend-link.onrender.com/docs  

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

![Architecture Diagram](docs/screenshots/architecture.png)

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
