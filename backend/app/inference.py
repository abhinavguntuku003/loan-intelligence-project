import pandas as pd
from app.config import model, preprocessor, MODEL_THRESHOLD


def predict(data):

    input_dict = {
        "age": data.age,
        "income": data.income,
        "credit_score": data.credit_score,
        "loan_amount": data.loan_amount,
        "existing_loans": data.existing_loans,
        "spending_ratio": data.spending_ratio,
        "employment_type": data.employment_type
    }

    input_df = pd.DataFrame([input_dict])

    # Prevent division by zero
    if data.income == 0:
        return 0, 0.0

    # Engineered features
    input_df["debt_ratio"] = input_df["existing_loans"] / input_df["income"]
    input_df["loan_burden"] = input_df["loan_amount"] / input_df["income"]

    input_transformed = preprocessor.transform(input_df)

    probability = float(model.predict_proba(input_transformed)[0][1])
    prediction = 1 if probability > MODEL_THRESHOLD else 0

    return prediction, probability