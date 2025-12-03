import React, { useEffect, useState } from "react";
import { getUserSubmissionsApi } from "../api/submissionApi";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserSubmissions() {
  const [subs, setSubs] = useState([]);
  const {user}=useAuth();

  const verdictStyle=(verdict)=>{
    return verdict=="Accepted"
    ?"bg-green-100 text-green-700 border border-green-300 px-2 py-1 rounded-full text-sm font-semibold w-fit"
    :"bg-red-100 text-red-700 border border-red-300 px-2 py-1 rounded-full text-sm font-semibold w-fit";
  };

  useEffect(() => {
    getUserSubmissionsApi()
      .then((res) => setSubs(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">My Submissions</h1>
    
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
                  {user?.firstname} {user?.lastname}
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
