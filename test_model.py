import joblib
import sklearn

MODEL_PATH = "churn_model.joblib"

print("Scikit-learn version:", sklearn.__version__)

try:
    model = joblib.load(MODEL_PATH)

    print("\nModel loaded successfully!")
    print("\nModel details:")
    print(model)

except Exception as error:
    print("\nCould not load the model.")
    print("Error:", error)