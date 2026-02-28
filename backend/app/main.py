from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import LoanRequest
from app.inference import predict
from app.logger import logger


app = FastAPI(
    title="Loan Intelligence API",
    description="AI-powered credit risk scoring",
    version="2.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return {"status": "API running"}


@app.post("/predict")
def get_prediction(request: LoanRequest):

    try:
        prediction, probability = predict(request)

        decision = "Approved" if prediction == 1 else "Rejected"

        risk_score = round((1 - probability) * 100)

        logger.info(
            f"Decision: {decision} | Probability: {probability:.4f}"
        )

        return {
            "prediction": decision,
            "probability": round(probability * 100),
            "risk_score": risk_score,
            "explanation": [
                "Debt-to-income ratio evaluated",
                "Credit score impact assessed",
                "Loan burden analyzed against income"
            ]
        }

    except Exception as e:
        logger.error(f"Inference error: {str(e)}")
        raise HTTPException(status_code=500, detail="Prediction failed")