import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

def load_data(path):
    df = pd.read_csv(path)
    return df
def add_engineered_features(df):

    df["debt_ratio"] = df["existing_loans"] / df["income"]
    df["loan_burden"] = df["loan_amount"] / df["income"]

    return df

def preprocess_data(df):

    # Remove null values
    df = df.dropna()

    # Add engineered features
    df = add_engineered_features(df)

    # Separate features and target
    X = df.drop("loan_status", axis=1)
    y = df["loan_status"]

    # Define column types
    numeric_features = [
        "age", "income", "credit_score",
        "loan_amount", "existing_loans",
        "spending_ratio", "debt_ratio", "loan_burden"
    ]

    categorical_features = ["employment_type"]

    # Create transformations
    numeric_transformer = Pipeline(steps=[
        ("scaler", StandardScaler())
    ])

    categorical_transformer = Pipeline(steps=[
        ("encoder", OneHotEncoder(handle_unknown="ignore"))
    ])

    # Combine transformations
    preprocessor = ColumnTransformer(
        transformers=[
            ("num", numeric_transformer, numeric_features),
            ("cat", categorical_transformer, categorical_features)
        ]
    )

    # Split BEFORE fitting
    X_train, X_test, y_train, y_test = train_test_split(
        X, y,
        test_size=0.2,
        random_state=42,
        stratify=y
    )

    # Fit only on training data
    X_train = preprocessor.fit_transform(X_train)
    X_test = preprocessor.transform(X_test)

    return X_train, X_test, y_train, y_test, preprocessor