import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import tokenAccessors from "./security";

const { getToken } = tokenAccessors;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_ACTIVITY_SERVICE_BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await getToken();

      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getActivities: builder.query<Activity[], void>({
      query: () => "/activities",
    }),
  }),
});

export const { useGetActivitiesQuery } = apiSlice;
