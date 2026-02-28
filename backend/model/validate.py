import pandas as pd

def validate_dataset(path):
    df = pd.read_csv(path)

    assert "loan_status" in df.columns, "Target column missing"

    assert df["income"].min() > 0, "Income must be positive"

    assert df["credit_score"].between(300, 850).all(), \
        "Invalid credit score values"

    print("Dataset validation passed.")