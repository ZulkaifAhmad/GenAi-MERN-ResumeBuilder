import React, { useState } from 'react';

const mockApiResponse = {
  matchScore: 78,
  skillGaps: [
    { skills: "System Architecture", severity: "high" },
    { skills: "Advanced State Management", severity: "medium" },
    { skills: "CI/CD Deployment", severity: "medium" },
    { skills: "GraphQL", severity: "high" },
    { skills: "Agile Methodologies", severity: "low" }
  ],
  technicalQuestions: [
    { question: "Explain event-driven architecture.", intention: "Assess system design basics.", answer: "Focus on pub/sub models and decoupling services." },
    { question: "How to optimize React renders?", intention: "React performance knowledge.", answer: "Discuss useMemo, useCallback, and React.memo." },
    { question: "Difference between SQL and NoSQL?", intention: "Database selection rationale.", answer: "Contrast ACID vs BASE, and structured vs document." },
    { question: "Implement a rate limiter.", intention: "Algorithmic thinking.", answer: "Explain the token bucket or leaky bucket algorithm." },
    { question: "Explain CORS.", intention: "Web security fundamentals.", answer: "Define Cross-Origin Resource Sharing and preflight requests." }
  ],
  behaviouralQuestions: [
    { question: "Tell me about a time you failed.", intention: "Assess accountability and growth.", answer: "Use the STAR method, focusing on learnings." },
    { question: "How do you handle scope creep?", intention: "Project management skills.", answer: "Discuss communication, documentation, and prioritization." },
    { question: "Describe a conflict with a teammate.", intention: "Conflict resolution.", answer: "Highlight professionalism, empathy, and compromise." }
  ],
  preparationPlan: [
    { day: 1, focus: "System Design Basics", tasks: "Review microservices and monolithic architecture patterns." },
    { day: 2, focus: "React Optimization", tasks: "Build a small app utilizing useMemo and useCallback." },
    { day: 3, focus: "Database Design", tasks: "Compare use cases for PostgreSQL and MongoDB." },
    { day: 4, focus: "Algorithm Practice", tasks: "Solve rate-limiting and caching problems." },
    { day: 5, focus: "Web Security", tasks: "Review the OWASP top 10 and CORS documentation." },
    { day: 6, focus: "Behavioral Prep", tasks: "Draft 5 stories using the STAR method." },
    { day: 7, focus: "Mock Interview", tasks: "Conduct a 1-hour mock technical interview with a peer." }
  ]
};

const SeverityBadge = ({ severity }) => {
  const colors = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-green-100 text-green-800 border-green-200"
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${colors[severity]}`}>
      {severity}
    </span>
  );
};

const QACard = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-gray-200 rounded-xl mb-4 bg-white shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-5 font-semibold text-gray-800 hover:bg-gray-50 flex justify-between items-center focus:outline-none"
      >
        <span className="pr-4">{data.question}</span>
        <span className="text-gray-400 bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center shrink-0">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      
      {isOpen && (
        <div className="p-5 border-t border-gray-100 bg-gray-50 flex flex-col gap-3">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">The Intention</span>
            <p className="text-sm text-gray-700 mt-1">{data.intention}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Suggested Answer</span>
            <p className="text-sm text-indigo-700 font-medium mt-1">{data.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function InterviewCoachDashboard() {
  const { matchScore, skillGaps, technicalQuestions, behaviouralQuestions, preparationPlan } = mockApiResponse;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 md:p-8 rounded-2xl shadow-sm mb-8 border border-gray-100">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Interview Strategy Plan</h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">Customized based on your resume and target job description</p>
        </div>
        <div className="flex items-center flex-col bg-gray-50 px-6 py-4 rounded-xl border border-gray-100">
          <div className={`text-5xl font-black ${getScoreColor(matchScore)}`}>
            {matchScore}<span className="text-2xl text-gray-400 ml-1">%</span>
          </div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Match Score</div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 flex flex-col gap-8">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-5 text-gray-900 border-b pb-3">Critical Skill Gaps</h2>
            <ul className="flex flex-col gap-3">
              {skillGaps.map((gap, index) => (
                <li key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <span className="text-sm font-semibold text-gray-700">{gap.skills}</span>
                  <SeverityBadge severity={gap.severity} />
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-6 text-gray-900 border-b pb-3">7-Day Preparation Plan</h2>
            <div className="flex flex-col gap-0">
              {preparationPlan.map((plan, index) => (
                <div key={plan.day} className="flex gap-4 relative">
                  <div className="flex flex-col items-center">
                    <div className="bg-indigo-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center shrink-0 z-10 shadow-md">
                      {plan.day}
                    </div>
                    {index !== preparationPlan.length - 1 && (
                      <div className="w-0.5 h-full bg-indigo-100 absolute top-8 left-4 -ml-px"></div>
                    )}
                  </div>
                  <div className="pb-8 pt-1">
                    <h3 className="font-bold text-gray-900 leading-none">{plan.focus}</h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">{plan.tasks}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-8">
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">Tech</span> 
              Technical Questions
            </h2>
            <div className="flex flex-col gap-2">
              {technicalQuestions.map((q, i) => <QACard key={i} data={q} />)}
            </div>
          </section>

          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-sm">HR</span> 
              Behavioral Questions
            </h2>
            <div className="flex flex-col gap-2">
              {behaviouralQuestions.map((q, i) => <QACard key={i} data={q} />)}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}