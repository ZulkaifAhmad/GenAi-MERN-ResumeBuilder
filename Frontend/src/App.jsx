import { useActionState, useRef } from "react";

async function submitAction(_prevState, formData) {
  try {
    const jobDescription = formData.get("jobDescription");
    const selfDescription = formData.get("selfDescription");
    const resume = formData.get("resume");
  
    if (!jobDescription?.trim()) {
      return { error: "Job description is required." };
    }
  
    if ((!resume || resume.size === 0) && !selfDescription?.trim()) {
      return { error: "Please upload a resume or fill in the self-description." };
    }
  
    if (resume && resume.size > 0) {
      if (resume.type !== "application/pdf") {
        return { error: "Only PDF files are allowed." };
      }
      if (resume.size > 3 * 1024 * 1024) {
        return { error: "File size must be under 3MB." };
      }
    }
  
    // TODO: call your Gemini API here
    console.log(jobDescription , selfDescription , resume);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error : true}
  }
}

export default function InterviewPage() {
  const [state, formAction, isPending] = useActionState(submitAction, null);
  const fileInputRef = useRef(null);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
        Create Your Custom Interview Plan
      </h1>
      <p className="text-gray-500 text-sm text-center mb-10 max-w-md">
        Let our AI analyze the job requirements and your unique profile to build
        a winning strategy.
      </p>

      <form
        action={formAction}
        className="w-full max-w-5xl border border-gray-200 rounded-2xl p-6 shadow-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT: Job Description */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-sm">
                Target Job Description
              </label>
              <span className="text-xs font-bold text-red-600 border border-red-300 px-2 py-0.5 rounded">
                REQUIRED
              </span>
            </div>
            <textarea
              name="jobDescription"
              maxLength={5000}
              placeholder="Paste the full job description here... e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript...'"
              className="flex-1 min-h-[320px] bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:border-black transition-colors"
            />
          </div>

          {/* RIGHT: Profile */}
          <div className="flex flex-col gap-4">
            <span className="font-semibold text-sm">Your Profile</span>

            {/* Upload Resume */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Upload Resume</span>
                <span className="text-xs font-bold text-green-700 border border-green-400 px-2 py-0.5 rounded">
                  BEST RESULTS
                </span>
              </div>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-xl py-10 cursor-pointer hover:border-black transition-colors bg-gray-50"
              >
                <p className="text-sm text-gray-700 font-medium">
                  Click to upload or drag & drop
                </p>
                <p className="text-xs text-gray-400">PDF only · Max 3MB</p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                name="resume"
                accept=".pdf"
                className="hidden"
              />
            </div>

            {/* OR divider */}
            <div className="flex items-center gap-3 text-gray-400 text-xs">
              <hr className="flex-1 border-gray-200" />
              OR
              <hr className="flex-1 border-gray-200" />
            </div>

            {/* Self Description */}
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-sm font-medium">
                Quick Self-Description
              </label>
              <textarea
                name="selfDescription"
                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                className="flex-1 min-h-[120px] bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:border-black transition-colors"
              />
            </div>

            {/* Info note */}
            <p className="text-xs text-gray-500 border border-gray-200 rounded-lg px-4 py-3 bg-gray-50">
              Either a <strong>Resume</strong> or a{" "}
              <strong>Self Description</strong> is required to generate a
              personalized plan.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            AI-Powered Strategy Generation · Approx 30s
          </p>

          <div className="flex flex-col items-end gap-2">
            {state?.error && (
              <p className="text-xs text-red-500">{state.error}</p>
            )}
            {state?.success && (
              <p className="text-xs text-green-600">Strategy generated!</p>
            )}
            <button
              type="submit"
              disabled={isPending}
              className="bg-black hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors"
            >
              {isPending ? "Generating..." : "Generate My Interview Strategy"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}