import React, { useState } from "react";
import { addProblemApi } from "../api/problemApi";
import { useNavigate } from "react-router-dom";

export default function AddProblem() {
  //Form fields
  const [form, setForm] = useState({
    title: "",
    description: "",
    difficulty: "Easy",
    constraints: "",
    sampleInput: "",
    sampleOutput: "",
  });

  //test cases
  const [testCases, setTestCases] = useState([
    { input: "", expectedOutput: "", hidden: false },
  ]);

  const navigate = useNavigate();

  //filling form
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  //Update a specific test case
  const updateTestCase = (index, field, value) => {
    const updated = [...testCases];
    updated[index][field] = value;
    setTestCases(updated);
  };

  //Add new test case
  const addTestCase = () => {
    setTestCases([
      ...testCases,
      { input: "", expectedOutput: "", hidden: false },
    ]);
  };

  // Remove test case block
  const removeTestCase = (index) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  //Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build payload for API
    const payload = {
      title: form.title,
      description: form.description,
      difficulty: form.difficulty,
      constraints: form.constraints,
      sampleInput: form.sampleInput,
      sampleOutput: form.sampleOutput,
      testCases,
    };

    try {
      await addProblemApi(payload);
      alert("Problem added successfully");
      navigate("/problems");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to add problem");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add Problem</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          placeholder="Title"
          className="w-full border p-2"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2"
          rows={4}
          onChange={handleChange}
        />

        <label className="font-semibold px-2 py-2">Difficulty :</label>
        <select
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
          className="border p-2"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <input
          name="constraints"
          placeholder="Constraints"
          className="w-full border p-2"
          onChange={handleChange}
        />

        <input
          name="sampleInput"
          placeholder="Sample Input"
          className="w-full border p-2"
          onChange={handleChange}
        />

        <input
          name="sampleOutput"
          placeholder="Sample Output"
          className="w-full border p-2"
          onChange={handleChange}
        />

        {/*UI for New Test Case*/}
        <div className="border p-4 rounded">
          <h2 className="font-semibold mb-3 text-lg">Test Cases</h2>

          {testCases.map((tc, index) => (
            <div
              key={index}
              className="border p-3 rounded mb-3 bg-gray-50 shadow-sm"
            >
              <div className="flex flex-col gap-2">
                <input
                  className="border p-2 w-full"
                  placeholder="Input"
                  value={tc.input}
                  onChange={(e) =>
                    updateTestCase(index, "input", e.target.value)
                  }
                />

                <input
                  className="border p-2 w-full"
                  placeholder="Expected Output"
                  value={tc.expectedOutput}
                  onChange={(e) =>
                    updateTestCase(index, "expectedOutput", e.target.value)
                  }
                />

                <button
                  type="button"
                  className="bg-red-500 text-white px-3 py-1 rounded self-start"
                  onClick={() => removeTestCase(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={addTestCase}
          >
            + Add Test Case
          </button>
        </div>

        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Add Problem
        </button>
      </form>
    </div>
  );
}
