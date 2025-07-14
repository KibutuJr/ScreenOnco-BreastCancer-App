const FEATURE_NAMES = [
  "ClumpThickness",
  "CellSizeUniformity",
  "CellShapeUniformity",
  "MarginalAdhesion",
  "EpithelialCellSize",
  "BareNuclei",
  "BlandChromatin",
  "NormalNucleoli",
  "Mitoses",
];

const form = document.getElementById("predict-form");
FEATURE_NAMES.forEach((name) => {
  const label = document.createElement("label");
  label.textContent = name + ": ";
  const input = document.createElement("input");
  input.name = name;
  input.type = "number";
  input.min = 1;
  input.max = 10;
  input.required = true;
  label.appendChild(input);
  form.appendChild(label);
  form.appendChild(document.createElement("br"));
});

document.getElementById("submit-btn").onclick = async () => {
  // Gather values
  const payload = {};
  FEATURE_NAMES.forEach((name) => {
    payload[name] = Number(form.elements[name].value);
  });

  try {
    // Build API URL to match client host
    const apiUrl = "http://localhost:6000/predict";
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || `HTTP ${res.status}`);
    }
    const { riskScore, label } = await res.json();
    document.getElementById(
      "result"
    ).textContent = `Risk: ${label} (score: ${riskScore.toFixed(2)})`;
  } catch (e) {
    document.getElementById("result").textContent = `Error: ${e.message}`;
  }
};
