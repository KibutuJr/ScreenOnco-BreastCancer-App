from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from pathlib import Path
import pandas as pd

# Initialize Flask
app = Flask(__name__)
CORS(app)

# Load the trained model (for /predict route)
MODEL_PATH = Path(__file__).parent / "model.pkl"
model = joblib.load(MODEL_PATH)
FEATURE_NAMES = list(model.feature_names_in_)

@app.route("/predict", methods=["POST"])
def predict():
    """
    Clinical prediction route using model.pkl
    Expects 9 numeric inputs:
      ClumpThickness, CellSizeUniformity, CellShapeUniformity, MarginalAdhesion,
      EpithelialCellSize, BareNuclei, BlandChromatin, NormalNucleoli, Mitoses
    """
    data = request.get_json()

    # Validate required fields
    missing = [k for k in FEATURE_NAMES if k not in data]
    if missing:
        return jsonify({"error": f"Missing features: {missing}"}), 400

    # Create DataFrame for prediction
    X = pd.DataFrame([data], columns=FEATURE_NAMES)
    prob = float(model.predict_proba(X)[0][1])
    label = "High Risk" if prob > 0.7 else "Low Risk"

    return jsonify({"riskScore": round(prob, 2), "label": label})


@app.route("/assess-risk", methods=["POST"])
def assess_risk():
    """
    Non-clinical AI-like rule-based risk assessment.
    Expects:
      age, bmi, familyHistory, geneticMutation, menarcheAge,
      menopauseAge (number or 'ongoing'), children, hormoneTherapy
    Returns JSON: { riskScore: float, label: "Low Risk"|"Moderate Risk"|"High Risk" }
    """
    data = request.get_json()

    try:
        age = int(data.get("age", 0))
        bmi = float(data.get("bmi", 0))
        family_history = data.get("familyHistory", "no").lower()
        genetic_mutation = data.get("geneticMutation", "no").lower()
        menarche_age = int(data.get("menarcheAge", 0))
        menopause_age = data.get("menopauseAge", "0")
        children = str(data.get("children", "0"))
        hormone_therapy = data.get("hormoneTherapy", "no").lower()

        score = 0
        score += 0.2 if age > 50 else 0.1
        score += 0.2 if family_history == "yes" else 0
        score += 0.3 if genetic_mutation == "yes" else 0
        score += 0.2 if bmi > 30 else 0.05
        score += 0.1 if hormone_therapy == "yes" else 0
        score += 0.1 if menarche_age <= 12 else 0

        if menopause_age == "ongoing":
            score += 0.05
        else:
            try:
                menopause_age_val = int(menopause_age)
                score += 0.1 if menopause_age_val < 50 else 0
            except ValueError:
                pass  # Ignore invalid menopause input

        score += 0.1 if children == "0" else 0
        score = min(score, 1)

        # Categorize
        if score >= 0.5:
            label = "High Risk"
        elif score >= 0.2:
            label = "Moderate Risk"
        else:
            label = "Low Risk"

        return jsonify({"riskScore": round(score, 2), "label": label})

    except Exception as e:
        return jsonify({"error": f"Failed to process input: {str(e)}"}), 400


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=6000)
