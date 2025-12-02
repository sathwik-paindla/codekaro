import axios from "./axiosInstance";

export const getUserSubmissionsApi = () => axios.get("/submissions/user");//gets all user submissions

export const getSingleSubmissionApi = (id) => axios.get(`/submissions/${id}`);//gets single submission

export const getProblemSubmissionsApi = (id) => axios.get(`/submissions/problem/${id}`);//gets all submissions for a particular problem

