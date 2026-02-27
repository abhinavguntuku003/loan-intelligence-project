import pandas as pd
import numpy as np

np.random.seed(42)

n = 5000

age = np.random.randint(21, 60, n)
income = np.random.randint(20000, 150000, n)
credit_score = np.random.randint(300, 850, n)
employment_type = np.random.randint(0, 3, n)  # 0=unemployed,1=private,2=govt
loan_amount = np.random.randint(5000, 500000, n)
existing_loans = np.random.randint(0, 5, n)
spending_ratio = np.random.uniform(0.2, 0.9, n)

# Create logical target
base_rule = (
    (credit_score > 650) &
    (spending_ratio < 0.6) &
    (income > 40000)
).astype(int)

# Add randomness (noise)
noise = np.random.binomial(1, 0.05, n)  # 5% noise

loan_status = np.abs(base_rule - noise)

df = pd.DataFrame({
    "age": age,
    "income": income,
    "credit_score": credit_score,
    "employment_type": employment_type,
    "loan_amount": loan_amount,
    "existing_loans": existing_loans,
    "spending_ratio": spending_ratio,
    "loan_status": loan_status
})

df.to_csv("../data/raw/loan_data.csv", index=False)

print("Synthetic dataset created.")