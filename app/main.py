from fastapi import FastAPI, HTTPException
from app.schemas import LoanRequest
from app.inference import predict
from app.logger import logger

app = FastAPI(
    title="Loan Decision AI",
    description="Production-ready ML inference API",
    version="1.0"
)


@app.get("/")
def health_check():
    return {"status": "API running"}


@app.post("/predict")
def get_prediction(request: LoanRequest):

    try:
        prediction, probability = predict(request)

        decision = "Approved" if prediction == 1 else "Rejected"

        logger.info(
            f"Prediction made | Decision: {decision} | Probability: {probability:.4f}"
        )

        return {
            "decision": decision,
            "approval_probability": round(float(probability), 4)
        }

    except Exception as e:
        logger.error(f"Inference error: {str(e)}")
        raise HTTPException(status_code=500, detail="Prediction failed")