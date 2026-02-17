import axios from "axios";

export interface jobType<T> {
  job_id: T;
  title: string;
  company: string;
  description: string;
  location: string;
  salary: number;
  posteddate: string;
  externalurl: string;
  jobtype: string;
  status: string;
}

export interface JobsResponse {
  data: jobType<string>[];
}

const BASE_URL = import.meta.env.VITE_BACKEND_API_ENDPOINT;

export const useJobsQuery = async (): Promise<JobsResponse> => {
  try {
    const response = await axios.get<JobsResponse>(
      `http://localhost:8080/api/v1/jobs`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return { data: [] };
  }
};

export const useJobsByIDQuery = async <T>(id: T): Promise<jobType<T>[]> => {
  try {
    const response = await axios.get<jobType<T>[]>(`${BASE_URL}jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};
