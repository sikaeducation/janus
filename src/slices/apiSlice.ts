import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Activity } from "../types";
import tokenAccessors from "../utilities/security";

const { getToken } = tokenAccessors;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_ACTIVITY_SERVICE_BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await getToken();

      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Activity"],
  endpoints: (builder) => ({
    getActivities: builder.query<Activity[], void>({
      query: () => "activities",
      providesTags: ["Activity"],
      transformResponse: (response) => response.data,
    }),
    createActivity: builder.mutation<Activity, Activity>({
      query: (activity) => ({
        url: "activities",
        method: "POST",
        body: activity,
      }),
      invalidatesTags: ["Activity"],
    }),
  }),
});

export const { useGetActivitiesQuery, useCreateActivityMutation } = apiSlice;
