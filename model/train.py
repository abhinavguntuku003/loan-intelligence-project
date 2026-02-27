import os
import joblib
from xgboost import XGBClassifier
from preprocess import load_data, preprocess_data
from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    roc_auc_score,
    roc_curve
)
import matplotlib.pyplot as plt
def train():


    df = load_data("../data/raw/loan_data.csv")

    X_train, X_test, y_train, y_test, preprocessor = preprocess_data(df)

    model = XGBClassifier(
        n_estimators=200,
        max_depth=4,
        learning_rate=0.1,
        random_state=42,
        eval_metric="logloss"
    )

    model.fit(X_train, y_train)

    print(f"Training Accuracy: {model.score(X_train, y_train)}")
    print(f"Testing Accuracy: {model.score(X_test, y_test)}")

    # 🔥 Ensure directory exists
    os.makedirs("../saved_models", exist_ok=True)

    joblib.dump(model, "../saved_models/model.pkl")
    joblib.dump(preprocessor, "../saved_models/preprocessor.pkl")

    print("Model and Preprocessor saved successfully.")
    y_pred = model.predict(X_test)

    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))

    print("\nConfusion Matrix:")
    print(confusion_matrix(y_test, y_pred))
    
    # Predictions
    y_pred = model.predict(X_test)
    y_proba = model.predict_proba(X_test)[:, 1]

    # Reports
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))

    print("\nConfusion Matrix:")
    print(confusion_matrix(y_test, y_pred))

    # ROC-AUC
    roc_auc = roc_auc_score(y_test, y_proba)
    print(f"\nROC-AUC Score: {roc_auc}")

    # Threshold tuning
    threshold = 0.4
    y_pred_custom = (y_proba > threshold).astype(int)

    print(f"\nClassification Report (Threshold={threshold}):")
    print(classification_report(y_test, y_pred_custom))
    print(confusion_matrix(y_test, y_pred_custom))

if __name__ == "__main__":
    train() 