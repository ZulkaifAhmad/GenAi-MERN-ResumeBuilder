# 🎯 AI Resume Analyzer & Interview Strategy Builder

A full-stack MERN application that uses **Google Gemini AI** to analyze your resume against a job description and generate a personalized interview preparation strategy.

Upload your resume (PDF) or describe yourself, paste the target job description, and get:

- **Match Score** — How well your profile fits the role (0–100%)
- **Skill Gap Analysis** — Missing or weak skills ranked by severity
- **Technical Questions** — Likely interview questions with ideal answers
- **Behavioral Questions** — HR-style questions with STAR-method answers
- **7-Day Preparation Plan** — A structured daily study plan

---

## 📸 How It Works

```
1. Sign up / Log in
2. Paste the job description
3. Upload your resume (PDF) OR write a self-description
4. Click "Generate My Interview Strategy"
5. View your AI-generated report
6. Access all past reports from "My Reports"
```

---

## 🛠️ Tech Stack

| Layer      | Technology                                                  |
| ---------- | ----------------------------------------------------------- |
| Frontend   | React 19, React Router, Vite, Tailwind CSS 4, Axios         |
| Backend    | Node.js, Express 5, Mongoose (MongoDB), JWT, Multer, Bcrypt |
| AI         | Google Gemini API (`@google/genai`)                         |
| Validation | Zod (backend schema validation)                             |
| PDF        | pdf-parse (extract text from uploaded PDFs)                 |

---

## 📁 Project Structure

```
resume-analyzer-builder/
├── Backend/
│   ├── server.js                        # Entry point — starts Express server
│   ├── package.json
│   ├── .env                             # Environment variables (not committed)
│   └── src/
│       ├── app.js                       # Express app setup, middleware, routes
│       ├── config/
│       │   └── db.js                    # MongoDB connection
│       ├── controller/
│       │   ├── auth.controller.js       # Register, Login, Logout, GetMe
│       │   └── aiReport.controller.js   # Generate AI report, Get user reports
│       ├── middleware/
│       │   ├── auth.middleware.js        # JWT token verification
│       │   └── multer.js                # File upload (memory storage)
│       ├── model/
│       │   ├── user.model.js            # User schema (username, email, password)
│       │   ├── interviewReport.model.js # AI report schema (scores, questions, plan)
│       │   └── blockList.model.js       # Blocklisted JWT tokens
│       ├── router/
│       │   ├── auth.router.js           # /api/auth/* routes
│       │   └── aiReport.router.js       # /api/interview/* routes
│       └── services/
│           └── ai.services.js           # Gemini AI prompt + response parsing
│
└── Frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── src/
        ├── main.jsx                     # Router setup + app entry
        ├── App.jsx                      # Home page — interview form
        ├── index.css                    # Tailwind import
        └── features/
            ├── auth/
            │   ├── Login.jsx            # Login page
            │   ├── Signup.jsx           # Signup page
            │   └── services/
            │       ├── auth.api.js      # Auth API calls (register, login, logout, getme)
            │       ├── auth.context.jsx # React context for user state
            │       └── report.api.js    # Report API calls (generate, get all)
            ├── components/
            │   ├── Navbar.jsx           # Top navigation bar
            │   ├── Footer.jsx           # Footer
            │   └── Protected.jsx        # Auth guard — redirects to /login if not logged in
            └── pages/
                ├── Layout.jsx           # Navbar + Outlet + Footer wrapper
                ├── ReportsList.jsx      # My Reports — list of all past reports
                └── Report.jsx           # Single report detail view
```

---

## 🔌 API Endpoints

### Auth Routes (`/api/auth`)

| Method | Endpoint    | Access  | Description                |
| ------ | ----------- | ------- | -------------------------- |
| POST   | `/register` | Public  | Create a new user account  |
| POST   | `/login`    | Public  | Login and receive JWT      |
| POST   | `/logout`   | Public  | Blocklist token and logout |
| GET    | `/getme`    | Private | Get current user's data    |

### Interview Routes (`/api/interview`)

| Method | Endpoint      | Access  | Description                                |
| ------ | ------------- | ------- | ------------------------------------------ |
| POST   | `/ai-report`  | Private | Upload resume + job desc → get AI analysis |
| GET    | `/my-reports` | Private | Get all reports for logged-in user         |

---

## ⚙️ Setup & Installation

### Prerequisites

- **Node.js** v20.16+ or v22.3+
- **MongoDB** (local or Atlas)
- **Google Gemini API Key** — get one free at [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the repo

```bash
git clone https://github.com/ZulkaifAhmad/Gen-Ai-MERN-Stack-Resume-Analyzer-Builder.git
cd Gen-Ai-MERN-Stack-Resume-Analyzer-Builder
```

### 2. Setup Backend

```bash
cd Backend
npm install
```

Create a `.env` file in the `Backend/` folder:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/resume-analyzer
JWT_SECRET=your_jwt_secret_here
GOOGLE_GEN_AI=your_gemini_api_key_here
```

Start the backend:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd Frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:3000`.

---

## 🧠 How the AI Works

1. User submits a **job description** + **resume PDF** (or self-description)
2. Backend extracts text from the PDF using `pdf-parse`
3. A detailed prompt is sent to **Google Gemini** asking for structured JSON output
4. Gemini returns: skill gaps, technical questions, behavioral questions, a 7-day prep plan, and a match score
5. The response is validated with **Zod** to ensure correct data shape
6. The report is saved to MongoDB and returned to the frontend
7. Built-in retry logic handles API rate limits (429) and overload (503) with exponential backoff

---

## 🔐 Authentication Flow

1. User registers with username, email, and password
2. Password is hashed with **bcrypt** before saving
3. A **JWT token** is set as an HTTP cookie (expires in 3 days)
4. Protected routes check the cookie for a valid, non-blocklisted token
5. On logout, the token is added to a **blocklist** collection (auto-expires after 3 days via MongoDB TTL index)

---

## 📝 Environment Variables

| Variable       | Description                          |
| -------------- | ------------------------------------ |
| `PORT`         | Backend server port (default: 3000)  |
| `MONGODB_URI`  | MongoDB connection string            |
| `JWT_SECRET`   | Secret key for signing JWT tokens    |
| `GOOGLE_GEN_AI`| Google Gemini API key                |

---

## 📜 License

ISC
