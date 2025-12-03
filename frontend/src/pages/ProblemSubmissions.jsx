import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProblemSubmissionsApi } from "../api/submissionApi";

export default function ProblemSubmissions() {
  const { id } = useParams();//problemId
  //console.log(id);//problemId
  const [subs, setSubs] = useState([]);

  const verdictStyle=(verdict)=>{
    return verdict=="Accepted"
    ?"bg-green-100 text-green-700 border border-green-300 px-2 py-1 rounded-full text-sm font-semibold w-fit"
    :"bg-red-100 text-red-700 border border-red-300 px-2 py-1 rounded-full text-sm font-semibold w-fit";
  };

  useEffect(() => {
    getProblemSubmissionsApi(id)
      .then((res) => {
        console.log(res.data);
        setSubs(res.data);
    })
      .catch(console.error);
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Submissions for Problem : {subs[0]?.problemId?.title}</h1>

      {/* Header Row */}
      <div className="grid grid-cols-6 font-semibold p-4 border-b bg-gray-800 text-white">
        <div>Username</div>
        <div>Problem</div>
        <div>Result</div>
        <div>Language</div>
        <div>Submitted At</div>
        <div>View</div>
      </div>

      {/* Submission Rows */}
      <div className="space-y-2">
        {subs.map((s) => (
          <div
            key={s._id}
            className="grid grid-cols-6 bg-white p-3 rounded shadow items-center"
          >
            <div>
              {s.userId?.firstname} {s.userId?.lastname}
            </div>

            <div>{s.problemId?.title || "—"}</div>

            <div>
                <span className={verdictStyle(s.verdict)}>
                    {s.verdict}
                </span>
            </div>

            <div>{s.language || "—"}</div>

            <div>{new Date(s.createdAt).toLocaleString()}</div>

            <Link
              to={`/submission/${s._id}`}
              className="text-blue-600 underline"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
