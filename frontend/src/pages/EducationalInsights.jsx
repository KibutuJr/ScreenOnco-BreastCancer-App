// src/pages/EducationalInsights.jsx

import React, { useState, useEffect } from "react";

// Import your local images
import insight1 from "../assets/EducationalInsightsImages/EduInsight1.jpg";
import insight2 from "../assets/EducationalInsightsImages/EduInsight2.jpg";
import insight3 from "../assets/EducationalInsightsImages/EduInsight3.jpg";
import insight4 from "../assets/EducationalInsightsImages/EduInsight4.jpg";
import insight5 from "../assets/EducationalInsightsImages/EduInsight5.jpg";

export default function EducationalInsights() {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  // === Mock data with local image imports ===
  const MOCK_INSIGHTS = [
    {
      id: "1",
      title:
        "Comprehensive Molecular Portraits of Invasive Lobular Breast Cancer",
      excerpt:
        "A landmark TCGA study in Cell (2021) defining genomic subtypes of lobular carcinoma.",
      content:
        "In May 2021, The Cancer Genome Atlas researchers published in Cell an integrated analysis of >600 invasive lobular carcinoma samples. They uncovered key alterations in CDH1, FOXA1, and ESR1 pathways, pinpointing new therapeutic targets and refining breast cancer taxonomy.",
      category: "Genomics",
      publishedAt: "2021-05-15",
      image: insight1,
      link: "https://www.cell.com/cell/fulltext/S0092-8674(21)00254-7",
    },
    {
      id: "2",
      title: "AI‑Driven Mammogram Analysis for Early Detection",
      excerpt:
        "Deep learning mammography models in Nature Medicine (2022) outperform radiologists.",
      content:
        "An international team’s Nature Medicine paper (Nov 2022) trained CNNs on 200 000+ mammograms across five countries. It matched or exceeded radiologist accuracy, cut false positives by 15%, and is now FDA‑approved in clinical trials.",
      category: "AI & Imaging",
      publishedAt: "2022-11-22",
      image: insight2,
      link: "https://www.nature.com/articles/s41591-022-01845-7",
    },
    {
      id: "3",
      title: "Lifestyle Interventions to Reduce Breast Cancer Risk",
      excerpt:
        "Lancet Oncology meta‑analysis (2020): exercise vs. alcohol in risk modulation.",
      content:
        "The Lancet Oncology (Aug 2020) pooled 50 cohorts (>3 million women). Findings: +30 min/day moderate exercise → 10% risk drop; each daily drink → 5% risk increase. Public health guidance: BMI<25, ≥150 min/week exercise, alcohol <1/day.",
      category: "Prevention",
      publishedAt: "2020-08-30",
      image: insight3,
      link: "https://www.thelancet.com/journals/lanonc/article/PIIS1470-2045(20)30239-7/fulltext",
    },
    {
      id: "4",
      title: "BRCA1/2 Mutations: From Discovery to Clinical Management",
      excerpt:
        "NEJM review (2019) on hereditary breast‑ovarian cancer genes and PARP inhibitors.",
      content:
        "A January 2019 NEJM review traces BRCA1/2 discovery (1994), evolution of genetic testing, and the rise of PARP inhibitors (OlympiAD, EMBRACA trials). It’s the definitive guide to hereditary risk counseling and preventive strategies.",
      category: "Genetics",
      publishedAt: "2019-01-10",
      image: insight4,
      link: "https://www.nejm.org/doi/full/10.1056/NEJMra1810769",
    },
    {
      id: "5",
      title:
        "Immunotherapy in Triple‑Negative Breast Cancer: Checkpoint Blockade Advances",
      excerpt:
        "JCO (2021) KEYNOTE‑355 & IMpassion131 reshape TNBC standards with pembrolizumab & atezolizumab.",
      content:
        "The Journal of Clinical Oncology (Sept 2021) reported two phase III trials adding pembrolizumab or atezolizumab to chemo in PD‑L1+ TNBC, improving progression‑free survival by ~20% and securing new FDA approvals.",
      category: "Therapeutics",
      publishedAt: "2021-09-05",
      image: insight5,
      link: "https://ascopubs.org/doi/10.1200/JCO.21.00192",
    },
  ];

  useEffect(() => {
    // simulate fetching
    setTimeout(() => {
      setInsights(MOCK_INSIGHTS);
      setLoading(false);
    }, 300);
  }, []);

  // build category list
  const categories = ["All", ...new Set(insights.map((i) => i.category))];

  // apply filters
  const filtered = insights.filter((item) => {
    const inCat = category === "All" || item.category === category;
    const inSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(search.toLowerCase());
    return inCat && inSearch;
  });

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-600">Loading insights…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold text-blue-700">
        Breast Cancer Educational Insights
      </h1>
      <p className="text-gray-600">
        Explore cutting‑edge research, prevention tips & advanced therapies.
      </p>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 border rounded"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search articles…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500 text-center">
          No articles match your filters.
        </p>
      ) : (
        <ul className="space-y-8">
          {filtered.map((item) => {
            const isOpen = expandedId === item.id;
            const date = new Date(item.publishedAt).toLocaleDateString(
              undefined,
              {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            );
            return (
              <li key={item.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* local image */}
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full sm:w-48 h-32 overflow-hidden rounded"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xl font-semibold text-blue-700 hover:underline"
                      >
                        {item.title}
                      </a>
                      <span className="text-gray-500 text-sm">{date}</span>
                    </div>
                    <p className="mt-2 text-gray-700">
                      {isOpen ? item.content : item.excerpt}
                    </p>
                    <button
                      onClick={() => setExpandedId(isOpen ? null : item.id)}
                      className="mt-3 text-blue-600 hover:underline text-sm"
                    >
                      {isOpen ? "Show less" : "Read more"}
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
