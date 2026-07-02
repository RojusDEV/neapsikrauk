import axios from "axios";

export interface IJobType<T> {
  job_id: T;
  title: string;
  company: string;
  description: string;
  location: string;
  salary_min: number;
  salary_max: number;
  posteddate: string;
  externalurl: string;
  jobtype: string;
  status: string;
  category: string;
}

export interface JobsResponse {
  data: IJobType<string>[];
  total_count: number;
}

const BASE_URL = import.meta.env.VITE_BACKEND_API_ENDPOINT;

export const useJobsQuery = async (
  filters?: Record<string, string | string[]>,
  page?: number | null,
): Promise<JobsResponse> => {
  try {
    const params = new URLSearchParams();
    if (filters) {
      Object.entries(filters).forEach(([key, values]) => {
        if (Array.isArray(values)) {
          values.forEach((value) => params.append(key, value));
        } else {
          params.append(key, values);
        }
      });
    }

    if (page !== null && page !== undefined) {
      params.set("page", String(page));
    }

    const queryString = params.toString();
    const url = `${BASE_URL}jobs${queryString ? `?${queryString}` : ""}`;

    console.log("Fetching jobs from:", url);
    const response = await axios.get<JobsResponse>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return { data: [], total_count: 0 };
  }
};

export const fetchJobsByIDQuery = async <T>(
  id: T,
): Promise<IJobType<string>> => {
  try {
    const response = await axios.get<{ data: IJobType<string> }>(
      `${BASE_URL}jobs/${id}`,
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};
