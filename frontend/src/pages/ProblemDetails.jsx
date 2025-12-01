import React, { useEffect, useState } from "react";  
import { useParams } from "react-router-dom";  // To get ":id" param from the URL
import { getProblemByIdApi, submitSolutionApi } from "../api/problemApi";  
import CodeEditor from "../components/CodeEditor";  
import { Boilerplate } from "../components/Boilerplate";  

export default function ProblemDetails() {

  const { id } = useParams();
  //get "id" from URL → /problems/:id(problem id)

  const [problem, setProblem] = useState(null);
  //Stores the fetched problem details

  const [language, setLanguage] = useState("cpp");
  //default language and code is set in C++

  const [code, setCode] = useState(Boilerplate["cpp"]);

  const [result, setResult] = useState(null);
  //store result after submit

  useEffect(() => {
    getProblemByIdApi(id)
      .then((res) => setProblem(res.data))
      .catch(console.error);
  }, [id]);  
  //re-fetch if problem id is changed


  //to handle language
  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);            //update language state
    setCode(Boilerplate[lang] || "");  //load appropriate boilerplate template
  };


  //to handle submit button
  const handleSubmit = async () => {
    try {
      const res = await submitSolutionApi(id, { language, code });
      //send payload to backend

      setResult(res.data);
      //set results(verdict+testcase results)
    } catch (err) {
      alert(err?.response?.data?.message || "Submission failed");
      //error if submission fails
    }
  };


  //Display loading message until problem data is fetched
  if (!problem) return <div className="p-8">Loading...</div>;


  //layout-->left side(problem details)-->>right side(code area)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">

      {/*Problem Statement */}
      <div className="bg-white p-4 rounded shadow">

        <h1 className="text-2xl font-bold">{problem.title}</h1>

        <p className="mt-3 text-gray-700">{problem.description}</p>

        <h3 className="mt-4 font-semibold">Sample Input</h3>
        <pre className="bg-gray-100 p-2 rounded">{problem.sampleInput}</pre>

        <h3 className="mt-2 font-semibold">Sample Output</h3>
        <pre className="bg-gray-100 p-2 rounded">{problem.sampleOutput}</pre>

      </div>


      {/*Code Area */}
      <div className="flex flex-col">

        {/*Language Selection*/}
        <select
          value={language}
          onChange={handleLanguageChange}
          className="mb-3 p-2 border rounded"
        >
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>

        {/*Code Editor*/}
        <CodeEditor code={code} setCode={setCode} language={language} />

        {/* Submit Button */}
        <div className="mt-3 flex gap-3">
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>


        {/*Verdict and test results after SUBMISSION of code*/}
        {result && (
          <div className="mt-4 bg-white p-3 rounded shadow">

            <h4 className="font-semibold">Verdict: {result.verdict}</h4>{/*Accepted or Failed*/}

            <p>Passed {result.passedCount} / {result.totalCases}</p>

            <div className="mt-2 space-y-2">
              {result.testResults.map((t, i) => (
                <div key={i} className="p-2 border rounded">
                  {/*Result of each test case(will modify later with only test case result i.e.whether passed or failed*/}

                  <div><strong>Input:</strong> {t.input}</div>
                  <div><strong>Expected:</strong> {t.expectedOutput}</div>
                  <div><strong>Your Output:</strong> {t.userOutput}</div>
                  <div><strong>Passed:</strong> {t.passed ? "Yes" : "No"}</div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
