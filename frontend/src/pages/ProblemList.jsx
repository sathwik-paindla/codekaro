import React, { useEffect, useState } from "react";

import { getAllProblemsApi } from "../api/problemApi";
import { Link } from "react-router-dom";

export default function ProblemsList() {

  //State for problems
  const [problems, setProblems] = useState([]);

  // useEffect runs on component mount
  useEffect(() => {
    let mounted = true; //To avoid state updatation 

    //To get all problems
    getAllProblemsApi()
      .then((res) => {
        // Only update state if component is still mounted
        if (mounted) setProblems(res.data); //store fetched problem
      })
      .catch((err) => console.error(err)); //API errors

    //runs when component unmounts
    return () => (mounted = false);
  }, []); // Empty dependency i.e. runs only once when component mounts

  return (

    <div className="p-8"> 
     
      <div className="flex justify-between items-center mb-6">

       
        <h1 className="text-3xl font-bold">Problems</h1>

        
        <Link 
          to="/problems/add"
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          Add Problem
        </Link>

      </div>

      
       <div className="bg-white rounded shadow">
    <div className="grid grid-cols-3 font-semibold p-4 border-b bg-gray-800 text-white">
      <div>Title</div>
      <div>Difficulty</div>
      <div className="text-right pr-4">Actions</div>
    </div>

    {problems.map((p) => (
      <div
        key={p._id}
        className="grid grid-cols-3 items-center p-4 border-b hover:bg-gray-100 transition"
      >
        
        <div className="font-medium">
            <Link
            to={`/problems/${p._id}`}
            className="text-blue-600 hover:underline"
          >
            {p.title}
          </Link>
        </div>

        
        <div className="text-gray-600">{p.difficulty}</div>

        
        <div className="text-right space-x-4">
          <Link
            to={`/problems/${p._id}`}
            className="text-blue-600 hover:underline"
          >
            View Problem
          </Link>

          <Link
            to={`/problems/${p._id}/submissions`}
            className="text-gray-600 hover:underline"
          >
            Submissions
          </Link>
        </div>
      </div>
   

        ))}
      </div>
    </div>
  );
}
