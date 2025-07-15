# ScreenOnco Breast Cancer App

**Live Demo:** [https://screenonco-health-app.netlify.app/](https://screenoncobreastcancerapp.netlify.app/)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Backstory](#Backstory)
3. [Problem Statement](#problem-statement)
4. [Key Features](#key-features)
5. [Technology Stack](#technology-stack)
6. [AI Prompt Engineering](#ai-prompt-engineering)
7. [Setup & Installation](#setup--installation)
8. [Running Locally](#running-locally)
9. [Deployment to Netlify](#deployment-to-netlify)
10. [Homepage Screenshot](#Homepagescreenshot)
11. [Video Desktop Walkthrough](#Desktopwalkthrough)
12. [Pitch Deck Summary](#pitch-deck-summary)
13. [Contributing](#contributing)
14. [License](#license)

---

## Project Overview

ScreenOnco Health App is a comprehensive, AI-powered platform designed to improve breast cancer screening, follow­-up, and patient engagement. It bridges gaps in clinical workflows by offering appointment scheduling, automated reminders, personalized risk assessments, educational content, and a 24/7 AI chatbot. Our mission is to ensure no patient is ever left without guidance or support during their breast health journey.

---

## Backstory

This project was born from heartache. Having lost someone close to me to breast cancer after a critical follow-up was inadvertently missed. In that painful moment of loss, I vowed to prevent other families from enduring the same tragedy. ScreenOnco is the realization of that promise—transforming grief into a platform of hope, connection, and proactive care. Every line of code, every feature, and every reminder sent is driven by a personal commitment: **no patient should ever feel alone or fall through the cracks**.

---

## Problem Statement

1. **Missed Follow-Ups:** Despite advances in diagnostics, many clinics and private practices lack robust, automated systems to track patient follow-ups. As a result, abnormal findings can go unaddressed, leading to delayed diagnoses and worsened outcomes.

2. **Fragmented Communication:** Patients leave appointments unsure of next steps. Without reliable reminders via SMS, WhatsApp, or Email, important screening or consultation dates are often forgotten.

3. **Low Patient Engagement:** Breast cancer patients often experience anxiety, confusion, and information overload. They need an accessible, empathetic source of educational content and personalized guidance beyond clinic hours.

4. **Data-Driven Risk Assessment Gap:** Clinicians need support to triage cases efficiently. Manual assessment of clinical data and family history is time-consuming and error-prone, especially in under-resourced settings.

ScreenOnco addresses these pain points by providing a seamless, end-to-end solution for doctors, patients, and providers.

---

## Key Features

### 1. Appointment Scheduling & Automated Reminders

* **User-Friendly Booking:** Patients browse available specialists and screening slots through an intuitive calendar interface.
* **Multi-Channel Reminders:** Automated notifications are sent via SMS, WhatsApp, and email at configurable intervals (e.g., 7 days, 24 hours, 12 hours, 6hours, and 1 hour before appointment).
* **Provider Dashboard:** Doctors view upcoming appointments, confirmation statuses, and can manually adjust schedules.

Example Booking Flow
1. Patient selects "Book Appointment"
2. Chooses specialty (e.g., Mammography, Oncology)
3. Picks an available date and time
4. Confirms contact preferences
5. Receives immediate confirmation and reminder schedule

### 2. AI-Powered Risk Assessment

* **Machine Learning Model:** Trained on the Wisconsin Breast Cancer Dataset (569 tumor samples) to predict malignancy risk based on user-provided data: age, family history, imaging results, etc.
* **Personalized Risk Score:** Displays a probability score (0–100%) and categorizes risk (Low, Moderate, High).
* **Triage Alerts:** Automatically flags high-risk patients to providers for rapid follow-up.

### 3. Risk History & Trend Tracking

* **Time-Series Dashboard:** Visualizes changes in individual risk scores over multiple assessments.
* **Data Export:** Doctors can export risk history for research or inclusion in EHRs.

### 4. Educational Insights & Resources

* **Interactive Library:** Articles, infographics, videos on breast anatomy, screening guidelines, lifestyle factors.
* **Tailored Content:** Based on user risk profile and stage (e.g., pre-screening guidance vs. post-diagnosis resources).

### 5. 24/7 AI Chatbot Support

* **Empathetic Conversation:** Powered by OpenAI, the chatbot answers FAQs, explains medical terms, and provides emotional support.
* **Appointment Assistance:** Users can ask the bot to reschedule or clarify reminder details.

### 6. Multi-User Roles

* **Patients:** Book, view resources, chat, track risk.
* **Doctors:** Manage appointments, review risk dashboards, send manual messages.
* **Caregivers:** Linked accounts to monitor loved ones’ schedules and resources.

---

## Technology Stack

| Layer               | Technology                                             |
| ------------------- | ------------------------------------------------------ |
| Frontend            | React (Next.js), Tailwind CSS                          |
| Backend             | Supabase (Postgres, Auth, Realtime), Bolt.new          |
| ML & Data Science   | Python, scikit-learn, TensorFlow, Wisconsin BC Dataset |
| Chatbot             | OpenAI API                                          |
| Documentation & Dev | Lovable.dev, Cursor AI, MGX, Rork.app, ChatGPT, Claude ai                  |
| Deployment          | Netlify (CI/CD, Serverless Functions)                  |

---

## AI Prompt Engineering
Used state-of-the-art AI tools throughout development. Here’s how to replicate this site using each tool, with example prompts:
Supabase + Lovable.dev:
Use Lovable’s chat interface to create and integrate a Supabase backend. For example, in Lovable’s UI, prompt:
“Create a new Supabase project for ScreenOnco. Define tables: patients(id, name, email, dob, history) and appointments(id, patient_id, doctor_id, date, time, status). Set up user authentication (email/password).”
Lovable will generate the SQL schema and configure authentication. Its docs note that “Lovable can automatically generate the necessary tables and schema based on your prompts.”

Cursor AI (Code Generation & Debugging):
Use natural language to generate or fix code. Examples:
“Write a React component for a booking form: it should fetch available appointment slots from Supabase and allow selection. Use Material-UI styling.”
If there’s a bug, prompt:
“Debug this React code: the Supabase sign-up is failing with an authentication error. Provide a corrected version.”
Cursor will output code snippets or explanations, helping write frontend logic quickly.

MGX (UI Design):
We leveraged MGX (MetaGPT X) to design user interfaces. For example, prompt MGX:
“Design a mobile-friendly dashboard screen that shows upcoming appointments on a calendar and a quick summary of the user’s current breast cancer risk score. Use a clean, teal-themed color palette.”
MGX can iterate on wireframes and even generate HTML/CSS prototypes. The screenshots above were influenced by ideas from such prompts.

Rork.app (Mobile Prototyping):
To visualize a mobile app, use Rork:
“Given the ScreenOnco web design, create a linked mobile prototype focusing on the main flows: patient signup, appointment booking, and chatting with the chatbot.”
Rork allows uploading images or Figma designs (outputs from MGX) to quickly produce an interactive mobile prototype for user testing.

Bolt.new (Backend Workflows):
For automations, Bolt.new lets you create event-driven workflows with no code. For example:
“When a new appointment record is inserted into the Supabase database, send a confirmation email to the patient and schedule a text reminder 24 hours before the appointment.”
Bolt.new can connect to Supabase and email/SMS services to implement this trigger. Similarly, you can set:
“If a risk assessment score is above a threshold, trigger an alert to the assigned doctor and schedule an urgent follow-up call.”

OpenAI (Chatbot Prompts):
Designed the patient chatbot using OpenAI. The key is crafting empathetic health prompts. For example:
“You are a compassionate health assistant specializing in breast cancer information. A patient asks about their risk and screening schedule. Respond in a supportive, clear manner, and remind them about their upcoming mammogram if needed.”
Additionally, OpenAI was used to refine the prompts themselves. Example testing prompt:
“Translate medical terminology: Explain ‘mammogram’ in simple terms to a 30-year-old patient.”

The output is evaluated and prompts are tweaked until the chatbot’s tone and accuracy match clinical guidelines.
By combining these AI tools, we could rapidly prototype and build ScreenOnco end-to-end. From database schemas in Lovable, to UI in MGX, to workflows in Bolt and conversational logic in OpenAI, each step is driven by carefully engineered natural language prompts.

---

## Setup & Installation

1. **Clone Repository**
   
   git clone https://github.com/YourUsername/screenonco-breastcancer-app.git
   cd screenonco-breastcancer-app


2. **Environment Variables**
   Create a `.env.local` file:

   NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_anon_key>
   SUPABASE_SERVICE_ROLE_KEY=<your_service_role_key>
  OPENAI_API_KEY=<your_openai_api_key>
   ```

3. **Install Dependencies**
   
   npm install


5. **Run Development Server**

   npm run dev

   Open [http://localhost:3000](http://localhost:3000) in your browser.

6. **Build for Production**


   npm run build
   npm start

---

## Deployment to Netlify

1. Push your code to a GitHub repository.
2. In Netlify, select **Add New Site > From Git > GitHub**.
3. Choose your repository and main branch.
4. Set build command: `npm run build`.
5. Set publish directory: `out/` (Next.js) or `build/` (CRA).
6. Click **Deploy**. Netlify will automatically trigger on every push.

---


## 📸 Screenshot - Home Page

Here’s a preview of the ScreenOnco Health App homepage:

![ScreenOnco Home Page](https://i.imgur.com/ow7VjKV.jpeg)

## 🎥 Demo Walkthrough

Watch a full walkthrough of the **ScreenOnco Health App** in action:

🔗 [Click here to watch on Loom](https://www.loom.com/share/64a31235eeac41f188f446e74b8cdc3c?sid=bad14b16-36dc-4b1d-a872-6c6d880ec869)



---

## Pitch Deck Summary

1. **Title Slide:** ScreenOnco – Empowering Breast Health Through AI & Care
2. **Problem (20%):** Missed follow-up rates, patient disengagement, global breast cancer burden.
3. **Solution (25%):** AI-driven scheduling, reminders, risk scoring, chatbot.
4. **Market & Users (15%):** Women 25+, clinics, caregivers; \$6.7B screening market by 2033.
5. **Business Model (20%):** B2B subscriptions, freemium patient tier, enterprise licensing, data services.
6. **Design & Delivery (20%):** Visually engaging slides, clear narrative, demo walkthrough.

## 📂 Full Pitch Deck

Full pitch deck available at [Canva Link](https://www.canva.com/design/DAGok5K03O8/cfVYqgfnt39fWCqNuh0FfQ/view?utm_content=DAGok5K03O8&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hb35b7885ff)


---

## Contributing

We welcome contributions! Please review our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on submitting issues and pull requests.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## Contact Information

Email: [Kibutujr@gmail.com](kibutujr@gmail.com)

LinkedIn: [Fredrick Kibutu](https://www.linkedin.com/in/fred-kibutu/)

Portfolio: [KibutuJr](kibutujr.github.io/Portfolio-KibutuJr/)

