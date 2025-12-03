import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleSubmissionApi } from "../api/submissionApi";
import CodeEditor from "../components/CodeEditor";
import { useAuth } from "../context/AuthContext";

export default function SingleSubmission() {
  const { id } = useParams();
  const [submission, setSubmission] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    getSingleSubmissionApi(id)
      .then((res) => {
        console.log(res.data);
        setSubmission(res.data);
      })
      .catch(console.error);
  }, [id]);

  if (!submission) return <div className="p-6 text-blue-500 font-semibold">Loading...</div>;

  //verdict colour
  const verdictColor =
    submission.verdict === "Accepted"
      ? "bg-green-100 text-green-700"
      :"bg-red-100 text-red-700";

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      
      {/* LEFT: Submission Details */}
      <div className="bg-white p-5 rounded-xl shadow border border-gray-200">
        <h2 className="font-bold text-xl text-gray-800 mb-3">Submission Details</h2>

        <div className="mb-2">
          <strong className="text-gray-700">Username:</strong>{" "}
          <span className="text-gray-900">{user?.firstname}</span>
        </div>

        <div className="mb-2">
          <strong className="text-gray-700">Problem:</strong>{" "}
          <span className="text-gray-900">{submission.problemId?.title}</span>
        </div>

        <div className="mb-2">
          <strong className="text-gray-700">Language:</strong>{" "}
          <span className="text-gray-900">{submission.language}</span>
        </div>

        <div className="mb-4 flex items-center gap-2">
          <strong className="text-gray-700">Verdict:</strong>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${verdictColor}`}>
            {submission.verdict}
          </span>
        </div>

        <h4 className="font-semibold text-lg text-gray-800 mt-4">Test Results</h4>
        <div className="space-y-3 mt-2">
          {submission.testResults?.map((t, i) => {
            const passColor = t.passed ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300";
            const passText = t.passed ? "text-green-700" : "text-red-700";

            return (
              <div key={i} className={`p-3 border rounded-lg ${passColor}`}>
                <div>
                  <strong className="text-gray-700">Input:</strong>
                  <pre className="bg-gray-100 p-2 rounded mt-1 text-sm whitespace-pre-wrap">
                    {t.input}
                  </pre>
                </div>

                <div className="mt-2">
                  <strong className="text-gray-700">Expected:</strong>
                  <pre className="bg-blue-50 p-2 rounded mt-1 text-sm whitespace-pre-wrap">
                    {t.expectedOutput}
                  </pre>
                </div>

                <div className="mt-2">
                  <strong className="text-gray-700">Your Output:</strong>
                  <pre className="bg-purple-50 p-2 rounded mt-1 text-sm whitespace-pre-wrap">
                    {t.userOutput}
                  </pre>
                </div>

                <div className={`mt-3 font-semibold ${passText}`}>
                  <strong>Passed:</strong> {t.passed ? "Yes" : "No"}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT: Code */}
      <div>
        <h4 className="mb-2 font-semibold text-lg text-gray-800">Submitted Code</h4>
        <div className="border rounded-lg shadow bg-white p-2">
          <CodeEditor code={submission.code} setCode={() => {}} />
        </div>
      </div>
    </div>
  );
}
