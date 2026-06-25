import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { GetMyReportsApi } from "../auth/services/report.api.js";

const SeverityBadge = ({ severity }) => {
  const colors = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-green-100 text-green-800 border-green-200",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${colors[severity]}`}
    >
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
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <div className="p-5 border-t border-gray-100 bg-gray-50 flex flex-col gap-3">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              The Intention
            </span>
            <p className="text-sm text-gray-700 mt-1">{data.intention}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Suggested Answer
            </span>
            <p className="text-sm text-indigo-700 font-medium mt-1">
              {data.answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function InterviewCoachDashboard() {
  const { id } = useParams();
  const location = useLocation();
  const [report, setReport] = useState(location.state?.report || null);
  const [loading, setLoading] = useState(!report);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If we already have the report from navigation state, skip fetch
    if (report) return;

    async function fetchReport() {
      try {
        const data = await GetMyReportsApi();
        const found = data.reports?.find((r) => r._id === id);
        if (found) {
          setReport(found);
        } else {
          setError("Report not found");
        }
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || "Failed to load report");
      } finally {
        setLoading(false);
      }
    }
    fetchReport();
  }, [id, report]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg
            className="animate-spin h-10 w-10 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <p className="text-gray-500 text-sm font-medium">Loading report...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-red-100 p-8 max-w-md text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-red-600 font-semibold mb-2">{error || "Report not found"}</p>
          <Link
            to="/report"
            className="inline-block mt-4 bg-black hover:bg-gray-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
          >
            ← Back to My Reports
          </Link>
        </div>
      </div>
    );
  }

  const {
    matchScore,
    skillGaps,
    technicalQuestions,
    behaviouralQuestions,
    preparationPlan,
    createdAt,
    jobDescription,
  } = report;

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      {/* Back link */}
      <Link
        to="/report"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 font-medium mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        All Reports
      </Link>

      <header className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-6 md:p-8 rounded-2xl shadow-sm mb-8 border border-gray-100">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Interview Strategy Plan
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Customized based on your resume and target job description
          </p>
          {createdAt && (
            <p className="text-xs text-gray-400 mt-1">
              Generated on{" "}
              {new Date(createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          )}
        </div>
        <div className="flex items-center flex-col bg-gray-50 px-6 py-4 rounded-xl border border-gray-100">
          <div className={`text-5xl font-black ${getScoreColor(matchScore)}`}>
            {matchScore}
            <span className="text-2xl text-gray-400 ml-1">%</span>
          </div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">
            Match Score
          </div>
        </div>
      </header>

      {/* Job Description Preview */}
      {jobDescription && (
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-8 border border-gray-100">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
            Target Job Description
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {jobDescription.length > 500
              ? jobDescription.substring(0, 500) + "..."
              : jobDescription}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 flex flex-col gap-8">
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-5 text-gray-900 border-b pb-3">
              Critical Skill Gaps
            </h2>
            {skillGaps && skillGaps.length > 0 ? (
              <ul className="flex flex-col gap-3">
                {skillGaps.map((gap, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <span className="text-sm font-semibold text-gray-700">
                      {gap.skills}
                    </span>
                    <SeverityBadge severity={gap.severity} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">No skill gaps identified.</p>
            )}
          </section>

          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold mb-6 text-gray-900 border-b pb-3">
              7-Day Preparation Plan
            </h2>
            {preparationPlan && preparationPlan.length > 0 ? (
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
                      <h3 className="font-bold text-gray-900 leading-none">
                        {plan.focus}
                      </h3>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                        {plan.tasks}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No preparation plan available.</p>
            )}
          </section>
        </div>

        <div className="lg:col-span-8 flex flex-col gap-8">
          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">
                Tech
              </span>
              Technical Questions
            </h2>
            {technicalQuestions && technicalQuestions.length > 0 ? (
              <div className="flex flex-col gap-2">
                {technicalQuestions.map((q, i) => (
                  <QACard key={i} data={q} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No technical questions available.</p>
            )}
          </section>

          <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-gray-900 flex items-center gap-2">
              <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-sm">
                HR
              </span>
              Behavioral Questions
            </h2>
            {behaviouralQuestions && behaviouralQuestions.length > 0 ? (
              <div className="flex flex-col gap-2">
                {behaviouralQuestions.map((q, i) => (
                  <QACard key={i} data={q} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">
                No behavioral questions available.
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}