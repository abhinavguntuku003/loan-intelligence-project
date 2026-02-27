import joblib

MODEL_PATH = "saved_models/model.pkl"
PREPROCESSOR_PATH = "saved_models/preprocessor.pkl"

model = joblib.load(MODEL_PATH)
preprocessor = joblib.load(PREPROCESSOR_PATH)