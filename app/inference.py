import pandas as pd
from app.config import model, preprocessor


def predict(data):

    input_dict = {
        "age": data.age,
        "income": data.income,
        "credit_score": data.credit_score,
        "employment_type": data.employment_type,
        "loan_amount": data.loan_amount,
        "existing_loans": data.existing_loans,
        "spending_ratio": data.spending_ratio
    }

    input_df = pd.DataFrame([input_dict])

    # IMPORTANT: Add engineered features
    input_df["debt_ratio"] = input_df["existing_loans"] / input_df["income"]
    input_df["loan_burden"] = input_df["loan_amount"] / input_df["income"]

    input_transformed = preprocessor.transform(input_df)

    prediction = model.predict(input_transformed)[0]
    probability = model.predict_proba(input_transformed)[0][1]

    return prediction, probability