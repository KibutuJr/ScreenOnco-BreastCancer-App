# backend/ml/train_model.py

import pandas as pd
import joblib
from pathlib import Path
from sklearn.ensemble import RandomForestClassifier

# 1. Load & clean the data from UCI
columns = [
    "SampleID", "ClumpThickness", "CellSizeUniformity", "CellShapeUniformity",
    "MarginalAdhesion", "EpithelialCellSize", "BareNuclei", "BlandChromatin",
    "NormalNucleoli", "Mitoses", "Class"
]

# You can swap this for a local CSV if you prefer:
DATA_URL = (
    "https://archive.ics.uci.edu/ml/machine-learning-databases/"
    "breast-cancer-wisconsin/breast-cancer-wisconsin.data"
)

print("⏳ Loading data...")
df = pd.read_csv(
    DATA_URL,
    names=columns,
    header=None,
    na_values="?"
)

print("⏳ Cleaning data...")
df_clean = (
    df
    .dropna()                    # remove rows with missing "BareNuclei"
    .drop_duplicates()           # dedupe if needed
)

# Recode the target to strings
df_clean["Class"] = df_clean["Class"].map({2: "Benign", 4: "Malignant"})

# 2. Split features & target
X = df_clean.drop(["SampleID", "Class"], axis=1)
y = df_clean["Class"].map({"Benign": 0, "Malignant": 1})

print(f"✅ Data ready: {X.shape[0]} samples, {X.shape[1]} features.")

# 3. Train the model
print("⏳ Training RandomForestClassifier...")
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)
print("✅ Model training complete.")

# 4. Serialize to model.pkl in this folder
output_path = Path(__file__).parent / "model.pkl"
joblib.dump(model, output_path)
print(f"✅ Saved trained model to {output_path.resolve()}")
