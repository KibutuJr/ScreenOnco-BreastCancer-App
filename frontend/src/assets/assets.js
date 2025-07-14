import appointment_img from "./appointment_img.png";
import header_img from "./header_img.png";
import group_profiles from "./group_profiles.png";
import profile_pic from "./profile_pic.png";
import contact_image from "./contact_image.png";
import about_image from "./about_image.png";
import logo from "./logo.svg";
import dropdown_icon from "./dropdown_icon.svg";
import menu_icon from "./menu_icon.svg";
import cross_icon from "./cross_icon.png";
import chats_icon from "./chats_icon.svg";
import arrow_icon from "./arrow_icon.svg";
import info_icon from "./info_icon.svg";
import upload_icon from "./upload_icon.png";
import stripe_logo from "./stripe_logo.png";
import razorpay_logo from "./razorpay_logo.png";

// doctor portraits
import doc1 from "./doc1.png";
import doc2 from "./doc2.png";
import doc3 from "./doc3.png";
import doc4 from "./doc4.png";
import doc5 from "./doc5.png";
import doc6 from "./doc6.png";
import doc7 from "./doc7.png";
import doc8 from "./doc8.png";
import doc9 from "./doc9.png";
import doc10 from "./doc10.png";
import doc11 from "./doc11.png";
import doc12 from "./doc12.png";
import doc13 from "./doc13.png";
import doc14 from "./doc14.png";
import doc15 from "./doc15.png";

// specialist icons
import Breast_Surgical_Oncology from "./specialists/breast_surgical_oncology.svg";
import Breast_Medical_Oncology from "./specialists/breast_medical_oncology.svg";
import Breast_Radiology_Imaging from "./specialists/breast_radiology_imaging.svg";
import Breast_Reconstructive_Surgery from "./specialists/breast_reconstructive_surgery.svg";
import Radiation_Oncology from "./specialists/radiation_oncology.svg";
import Breast_Cancer_Genetics from "./specialists/breast_cancer_genetics.svg";

// educational‐insights images
import Edu1 from "./EducationalInsightsImages/EduInsight1.jpg";
import Edu2 from "./EducationalInsightsImages/EduInsight2.jpg";
import Edu3 from "./EducationalInsightsImages/EduInsight3.jpg";
import Edu4 from "./EducationalInsightsImages/EduInsight4.jpg";
import Edu5 from "./EducationalInsightsImages/EduInsight5.jpg";

// any file placed in /public is served statically at “/…”
const verified_icon = "/verified_icon.svg";

export const assets = {
  // core
  appointment_img,
  header_img,
  group_profiles,
  profile_pic,
  contact_image,
  about_image,
  logo,
  dropdown_icon,
  menu_icon,
  cross_icon,
  chats_icon,
  arrow_icon,
  info_icon,
  upload_icon,
  stripe_logo,
  razorpay_logo,

  // doctor portraits
  doc1,
  doc2,
  doc3,
  doc4,
  doc5,
  doc6,
  doc7,
  doc8,
  doc9,
  doc10,
  doc11,
  doc12,
  doc13,
  doc14,
  doc15,

  // specialist menu
  Breast_Surgical_Oncology,
  Breast_Medical_Oncology,
  Breast_Radiology_Imaging,
  Breast_Reconstructive_Surgery,
  Radiation_Oncology,
  Breast_Cancer_Genetics,

  // educational insights
  Edu1,
  Edu2,
  Edu3,
  Edu4,
  Edu5,

  // public‐served icons
  verified_icon,
};

export const specialityData = [
  { speciality: "Surgical Oncology", image: Breast_Surgical_Oncology },
  { speciality: "Medical Oncology", image: Breast_Medical_Oncology },
  { speciality: "Radiology & Imaging", image: Breast_Radiology_Imaging },
  {
    speciality: "Reconstructive Surgery",
    image: Breast_Reconstructive_Surgery,
  },
  { speciality: "Radiation Oncologist", image: Radiation_Oncology },
  { speciality: "Genetics & Risk Assessment", image: Breast_Cancer_Genetics },
];

export const doctors = [
  {
    _id: "doc1",
    name: "Dr. James Foster",
    image: doc1,
    speciality: "Senior Consultant, Breast Surgical Oncology",
    degree: "MBBS, MS (Surgical Oncology)",
    experience: "10 Years",
    about:
      "Dr. Foster is fellowship-trained in oncoplastic surgery, guiding you from biopsy through reconstruction. He explains each surgical step in plain language, uses advanced tumor-sparing techniques, and partners closely with medical and radiation oncologists to create a seamless care plan. Patients commend his for surgical precision paired with genuine empathy at every appointment.",
    fees: 150,
    address: { line1: "12 Rosewood Avenue", line2: "Camden, London" },
  },

  {
    _id: "doc2",
    name: "Dr. Rachel Kim",
    image: doc2,
    speciality: "Specialist in Breast Medical Oncology",
    degree: "MBBS, MD (Medical Oncology)",
    experience: "8 Years",
    about:
      "Dr. Kim customizes chemotherapy, hormone blockers, and targeted therapies using your tumor’s genomics. She walks you through infusion sessions, offers scalp-cooling options, manages side effects proactively, and checks in frequently to adjust doses—ensuring you stay comfortable and informed throughout treatment.",
    fees: 140,
    address: { line1: "45 Cherry Lane", line2: "Islington, London" },
  },

  {
    _id: "doc3",
    name: "Dr. David Martins",
    image: doc3,
    speciality: "Breast Radiology & Imaging Specialist",
    degree: "MBBS, DMRD",
    experience: "7 Years",
    about:
      "Dr. Martins reads your mammograms, ultrasounds, and MRIs side-by-side with prior scans to catch even subtle changes. He takes extra time to explain imaging results in everyday terms, recommends biopsy only when needed, and provides follow-up plans so you never feel left in the dark.",
    fees: 120,
    address: { line1: "88 St. Paul’s Road", line2: "Camden, London" },
  },

  {
    _id: "doc4",
    name: "Dr. Bruce Patel",
    image: doc4,
    speciality: "Consultant, Breast Reconstructive Surgery",
    degree: "MBBS, MCh (Plastic Surgery)",
    experience: "9 Years",
    about:
      "Dr. Patel specializes in oncoplastic reconstruction—using implants or DIEP flap techniques—to restore shape and confidence post-mastectomy. His 3D-imaging consults let you visualize outcomes, and he collaborates tightly with surgical and oncology teams to ensure your aesthetic and health goals align.",
    fees: 160,
    address: { line1: "23 Baker Street", line2: "Marylebone, London" },
  },

  {
    _id: "doc5",
    name: "Dr. Hannah Schultz",
    image: doc5,
    speciality: "Radiation Oncologist (Breast Cancer)",
    degree: "MBBS, FRCR",
    experience: "6 Years",
    about:
      "Dr. Schultz crafts pinpoint radiation plans—IMRT and 3D-conformal—to eliminate residual cells while sparing healthy tissue. She teaches skin-care routines, schedules regular skin checks, and offers fatigue-management strategies, making the radiation process as comfortable and supportive as possible.",
    fees: 130,
    address: { line1: "10 King’s Road", line2: "Chelsea, London" },
  },

  {
    _id: "doc6",
    name: "Dr. Lee Russo",
    image: doc6,
    speciality: "Breast Cancer Genetics & Risk Assessment",
    degree: "MBBS, PhD (Medical Genetics)",
    experience: "5 Years",
    about:
      "Dr. Russo guides you and your family through BRCA and hereditary-syndrome testing, providing clear, compassionate counseling on risk-reduction—be it enhanced surveillance or preventive surgery. His follow-ups ensure you’re supported emotionally and medically after every result.",
    fees: 145,
    address: { line1: "5 Harley Street", line2: "Westminster, London" },
  },

  {
    _id: "doc7",
    name: "Dr. Kevin Bennett",
    image: doc7,
    speciality: "Breast Surgical Oncology",
    degree: "MBBS, MS (Surgical Oncology)",
    experience: "11 Years",
    about:
      "Dr. Bennett employs nipple-sparing mastectomy techniques when appropriate, preserving sensation and appearance. He’s known for his calm reassurance in the OR and detailed post-op care instructions—making the surgical journey less intimidating for his patients.",
    fees: 155,
    address: { line1: "14 Park Lane", line2: "Westminster, London" },
  },

  {
    _id: "doc8",
    name: "Dr. Michael Chan",
    image: doc8,
    speciality: "Breast Medical Oncology",
    degree: "MBBS, MD (Medical Oncology)",
    experience: "9 Years",
    about:
      "Dr. Chan specializes in immunotherapy and CDK4/6 inhibitors for advanced breast cancer. He holds weekly group Q&A sessions, helping patients share experiences and learn coping strategies—fostering a supportive community around treatment.",
    fees: 150,
    address: { line1: "9 Elm Street", line2: "Hackney, London" },
  },

  {
    _id: "doc9",
    name: "Dr. Priya Desai",
    image: doc9,
    speciality: "Breast Radiology & Imaging Specialist",
    degree: "MBBS, DMRD",
    experience: "8 Years",
    about:
      "Dr. Desai performs image-guided biopsy procedures with minimal discomfort and rapid results. She explains each imaging modality’s pros and cons, so you understand why an MRI might be recommended over an ultrasound in your case.",
    fees: 125,
    address: { line1: "32 Green Park", line2: "Mayfair, London" },
  },

  {
    _id: "doc10",
    name: "Dr. James Carter",
    image: doc10,
    speciality: "Breast Reconstructive Surgery",
    degree: "MBBS, MCh (Plastic Surgery)",
    experience: "10 Years",
    about:
      "Dr. Carter offers hybrid oncoplastic approaches—combining tissue flap and implant when indicated—to optimize aesthetic outcomes. He’s committed to same-day reconstruction when feasible and provides hands-on lymphedema prevention training after surgery.",
    fees: 165,
    address: { line1: "5 Queen’s Road", line2: "Kensington, London" },
  },

  {
    _id: "doc11",
    name: "Dr. Aisha Rahman",
    image: doc11,
    speciality: "Radiation Oncologist (Breast Cancer)",
    degree: "MBBS, FRCR",
    experience: "7 Years",
    about:
      "Dr. Rahman integrates breath-hold techniques to minimize heart exposure in left-sided breast radiation. She discusses potential side effects ahead of time, offers physical therapy referrals, and maintains open communication for any symptom concerns.",
    fees: 135,
    address: { line1: "21 Victoria Street", line2: "Westminster, London" },
  },

  {
    _id: "doc12",
    name: "Dr. Juan Martinez",
    image: doc12,
    speciality: "Breast Cancer Genetics & Risk Assessment",
    degree: "MBBS, PhD (Medical Genetics)",
    experience: "6 Years",
    about:
      "Dr. Martinez leads family-centered counseling sessions, helping you discuss genetic risks with relatives. He provides personalized surveillance schedules—like earlier mammograms—and lifestyle recommendations backed by the latest genomic research.",
    fees: 150,
    address: { line1: "18 Baker Street", line2: "Marylebone, London" },
  },

  {
    _id: "doc13",
    name: "Dr. Zoe Kelly",
    image: doc13,
    speciality: "Breast Surgical Oncology",
    degree: "MBBS, MS (Surgical Oncology)",
    experience: "9 Years",
    about:
      "Dr. Kelly is skilled in sentinel-node biopsy and lymph-sparing techniques to reduce post-surgical swelling. She holds pre-surgery education sessions for patients and their families, demystifying the OR process and setting clear recovery expectations.",
    fees: 152,
    address: { line1: "7 Piccadilly", line2: "Mayfair, London" },
  },

  {
    _id: "doc14",
    name: "Dr. Ryan Martinez",
    image: doc14,
    speciality: "Breast Medical Oncology",
    degree: "MBBS, MD (Medical Oncology)",
    experience: "7 Years",
    about:
      "Dr. Martinez offers tailored endocrine-therapy regimens and manages side effects like bone density loss with calcium/vitamin D protocols. He ensures patients meet a dietitian and mental-health counselor as part of an integrated care team.",
    fees: 142,
    address: { line1: "30 Oxford Street", line2: "Soho, London" },
  },

  {
    _id: "doc15",
    name: "Dr. Isabella Russo",
    image: doc15,
    speciality: "Breast Radiology & Imaging Specialist",
    degree: "MBBS, DMRD",
    experience: "6 Years",
    about:
      "Dr. Russo provides same-day mammogram reports when possible, offers contrast MRI for dense-breast screening, and hosts quarterly Q&A webinars to explain evolving imaging guidelines—helping you stay confident in your surveillance plan.",
    fees: 125,
    address: { line1: "2 Regent Street", line2: "Covent Garden, London" },
  },
];
