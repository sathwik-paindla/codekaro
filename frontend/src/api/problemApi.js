import axios from "./axiosInstance";

export const getAllProblemsApi = () => axios.get("/problems");//All problems

export const getProblemByIdApi = (id) => axios.get(`/problems/${id}`);
//single problem description

export const addProblemApi = (payload) => axios.post("/problems/add", payload);//Add problem by user

export const submitSolutionApi = (problemId, { language, code }) =>
  axios.post(`/problems/${problemId}/submit`, { language, code });//submit code for particular problem by user

export const getProblemSubmissionsApi = (problemId) =>
  axios.get(`/submissions/problem/${problemId}`);
//submission result of that problem at that instance

