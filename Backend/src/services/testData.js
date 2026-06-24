const resume = `
John Doe
Frontend Developer
Email: johndoe@email.com | Phone: +1 234 567 8900 | GitHub: github.com/johndoe

SUMMARY
Frontend developer with 1.5 years of experience building responsive web applications using React.js and Tailwind CSS. Familiar with REST APIs and basic Node.js backend development.

SKILLS
- Languages: JavaScript, HTML, CSS
- Frameworks/Libraries: React.js, Next.js, Tailwind CSS
- Tools: Git, GitHub, VS Code, Postman
- Basic Knowledge: Node.js, Express.js, MongoDB

EXPERIENCE
Junior Frontend Developer — TechSoft Solutions (Jan 2023 – Present)
- Built and maintained React.js components for client dashboards
- Integrated REST APIs using Axios and Fetch
- Collaborated with UI/UX team to implement Figma designs into responsive layouts
- Used Git for version control and participated in code reviews

Intern Frontend Developer — WebCraft Agency (Jun 2022 – Dec 2022)
- Developed landing pages using HTML, CSS, and vanilla JavaScript
- Assisted in migrating legacy jQuery code to React

EDUCATION
Bachelor of Computer Science — University of Agriculture Peshawar (2021 – 2025)

PROJECTS
- Portfolio Website: Personal portfolio built with Next.js 14 and Tailwind CSS
- Task Manager App: React app with local storage for task management
`;

const jobDescription = `
Job Title: Full Stack Developer (MERN)
Company: NovaTech Solutions
Location: Remote

About the Role:
We are looking for a skilled Full Stack Developer with strong hands-on experience in the MERN stack. You will be responsible for building scalable web applications from frontend to backend.

Responsibilities:
- Develop and maintain RESTful APIs using Node.js and Express.js
- Build dynamic and responsive UIs with React.js
- Design and manage MongoDB databases with Mongoose
- Implement JWT-based authentication and authorization
- Write clean, maintainable, and well-documented code
- Collaborate with cross-functional teams in an Agile environment
- Deploy applications on platforms like Vercel, Render, or AWS

Requirements:
- 1–3 years of experience in full stack development
- Strong proficiency in React.js, Node.js, Express.js, and MongoDB
- Experience with REST API design and integration
- Familiarity with Git, GitHub, and CI/CD pipelines
- Knowledge of Docker is a plus
- Experience with TypeScript is preferred
- Strong problem-solving and communication skills
`;

const selfDescription = `
Hi, my name is John Doe. I am a frontend developer with around 1.5 years of professional experience. I have strong skills in React.js, Next.js, and Tailwind CSS, and I have worked on building responsive UIs and integrating REST APIs in my current job.

I am now looking to transition into a full stack role. I have basic knowledge of Node.js, Express.js, and MongoDB from personal projects and self-learning, but I have not used them extensively in a professional setting yet.

I am a quick learner, I enjoy problem-solving, and I am comfortable working in team environments. I have worked with Git and GitHub daily. I am not yet familiar with Docker or TypeScript, but I am actively learning both.

My goal is to become a strong full stack developer, and I believe this role at NovaTech Solutions aligns perfectly with where I want to grow professionally.
`;

export { resume, jobDescription, selfDescription };




/**
 * 
 * {
  skillGaps: [
    {
      skills: 'MERN Backend Proficiency (Node.js, Express.js, MongoDB, Mongoose)',
      severity: 'high'
    },
    {
      skills: 'JWT-based Authentication and Authorization',
      severity: 'high'
    },
    { skills: 'REST API Design', severity: 'medium' },
    {
      skills: 'Deployment of Full Stack Applications (Render, AWS)',
      severity: 'medium'
    },
    { skills: 'CI/CD Pipelines', severity: 'medium' }
  ],
  technicalQuestions: [
    {
      question: 'Can you describe your experience building RESTful APIs with Node.js and Express.js, specifically focusing on how you structure your routes, controllers, and models? What challenges have you faced, and how did you overcome them?',
      intention: "To gauge his practical understanding and problem-solving skills in the core backend technologies, given his 'basic knowledge' claim.",
      answer: 'The ideal answer would detail a project structure (e.g., MVC), explain the role of routes, controllers, and models, discuss middleware usage for request processing or error handling, and provide an example of a challenge faced (e.g., asynchronous operations, data validation) and its resolution.'
    },
    {
      question: 'The job description mentions designing and managing MongoDB databases with Mongoose. Can you explain how Mongoose helps in interacting with MongoDB, and what are some best practices for defining schemas and handling relationships between collections?',
      intention: 'To assess his understanding of MongoDB and Mongoose beyond basic CRUD, focusing on schema design and data modeling, which is crucial for scalable applications.',
      answer: "The ideal answer should explain Mongoose's role as an ODM (Object Data Modeling) library, highlighting its schema validation, middleware, and query building capabilities. For best practices, it should cover defining clear schemas, using data types effectively, implementing indexing, and handling relationships using references (population) or embedding."
    },
    {
      question: 'Implementing JWT-based authentication and authorization is a key responsibility. Can you walk us through the process of setting up JWT authentication in a MERN application, from user registration to protecting routes?',
      intention: 'To directly address a critical skill gap and determine if he has theoretical knowledge or has attempted to implement this in personal projects.',
      answer: 'The ideal answer would describe the flow: user registration (hashing passwords with bcrypt), user login (verifying credentials, generating a JWT with user payload), sending the token to the client, storing it (e.g., localStorage), attaching it to subsequent requests (Authorization header), and creating a middleware on the backend to verify the token and extract user information to protect routes.'
    },
    {
      question: "When designing a REST API for a new feature, what considerations do you take into account regarding endpoint structure, request/response formats, and error handling to ensure it's both efficient for the frontend and scalable for future growth?",
      intention: 'To assess his understanding of API design principles, scalability, and the interaction between frontend and backend, moving beyond just integration.',
      answer: 'The ideal answer should discuss adhering to REST principles (resource-based URLs, HTTP verbs), consistent request/response formats (e.g., JSON), proper use of HTTP status codes, data validation, pagination/filtering for large datasets, API versioning, and a standardized, informative error response structure.'
    },
    {
      question: "You've built a portfolio with Next.js. How would your approach differ when deploying a full MERN stack application (frontend, backend, and MongoDB) to a platform like Render or AWS compared to deploying a static Next.js site?",
      intention: 'To probe his understanding of full-stack deployment complexities, including environment variables, database connections, and separate service deployments.',
      answer: 'The ideal answer would highlight the need for separate deployments: the frontend (e.g., React app) to a static hosting service (Vercel, Netlify), the backend (Node/Express) to a server environment (Render, Heroku, AWS EC2/Lambda), and the database (MongoDB) to a dedicated service (MongoDB Atlas). It should also mention managing environment variables, configuring CORS, and ensuring secure database connections.'
    }
  ],
  behaviouralQuestions: [
    {
      question: 'This role requires a transition from primarily frontend to full stack. Can you describe a time you had to quickly learn a new technology or skill to meet a project requirement? How did you approach it, and what was the outcome?',
      intention: 'To assess his learning agility, self-motivation, and ability to adapt to new challenges, directly addressing his stated goal of transitioning to a full stack role.',
      answer: 'The ideal answer would use the STAR method (Situation, Task, Action, Result). It should detail a specific instance of learning a new technology, the structured steps taken (e.g., documentation, tutorials, small projects), and the positive outcome or impact on the project.'
    },
    {
      question: 'Collaboration with cross-functional teams in an Agile environment is important. Can you give an example of a time you collaborated with a UI/UX designer or another developer on a complex feature? What was your role, and how did you ensure smooth communication and delivery?',
      intention: "To evaluate his teamwork, communication skills, and experience in a collaborative development setting, even if he hasn't explicitly worked in an 'Agile' environment.",
      answer: 'The ideal answer would provide a STAR example of successful collaboration. It should highlight his specific contributions, how he communicated effectively (e.g., daily stand-ups, specific tools), resolved any disagreements, and ensured the feature was delivered successfully and met requirements.'
    },
    {
      question: 'You mentioned you are actively learning Docker and TypeScript. How do you prioritize your self-learning, and what steps are you taking to gain proficiency in these areas, especially given the demands of a new role?',
      intention: 'To understand his proactive learning approach, time management, and commitment to professional development, especially for skills relevant to the job.',
      answer: 'The ideal answer would outline a clear strategy for self-learning, such as dedicating specific time slots, utilizing online courses/documentation, working on personal projects, and seeking feedback. It should demonstrate his commitment to acquiring new skills and how he plans to balance this with job responsibilities.'
    }
  ],
  preparationPlan: [
    {
      day: 1,
      focus: 'MERN Backend Fundamentals (Node.js & Express.js)',
      tasks: "Review official Express.js documentation. Build a simple REST API with 3-4 endpoints (GET, POST, PUT, DELETE) for a basic resource (e.g., 'products') without a database. Practice using Postman for API testing."
    },
    {
      day: 2,
      focus: 'MongoDB & Mongoose Integration',
      tasks: 'Set up a local MongoDB instance or use MongoDB Atlas. Integrate Mongoose into the Day 1 Express app. Define schemas for 2-3 related models (e.g., Product, User, Order). Implement full CRUD operations for these models.'
    },
    {
      day: 3,
      focus: 'Authentication (JWT)',
      tasks: 'Implement user registration (with password hashing using bcrypt) and login functionality. Generate and verify JWTs. Create middleware to protect specific API routes, ensuring only authenticated users can access them.'
    },
    {
      day: 4,
      focus: 'Advanced API Design & Error Handling',
      tasks: 'Refine the existing API endpoints to follow REST best practices. Implement Joi or Express-validator for input validation. Create a centralized error handling middleware for the Express app. Consider pagination and filtering for list endpoints.'
    },
    {
      day: 5,
      focus: 'Full Stack Integration & Deployment Concepts',
      tasks: 'Connect the React frontend (or a simple client) to the MERN backend. Understand how to manage environment variables for both frontend and backend. Research deployment options for MERN apps (Render, Vercel for frontend, MongoDB Atlas for DB). Watch tutorials on deploying a sample MERN app.'
    },
    {
      day: 6,
      focus: 'TypeScript & Docker Basics (Conceptual)',
      tasks: 'Complete a basic TypeScript tutorial (types, interfaces, functions). Read articles on why TypeScript is used in large projects. Understand Docker concepts: images, containers, Dockerfile, Docker Compose (no need to build complex apps, just grasp the idea).'
    },
    {
      day: 7,
      focus: 'Mock Interview & Review',
      tasks: 'Conduct a mock interview focusing on MERN stack, API design, authentication, and deployment. Review all technical concepts and practice explaining them clearly. Prepare answers for common behavioral questions, especially those related to learning new tech and collaboration.'
    }
  ],
  matchScore: 70
}

 */