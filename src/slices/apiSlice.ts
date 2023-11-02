import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken } from "@/utilities/security";
import type { Activity, Article } from "@/declarations";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_ACTIVITY_API_BASE_URL,
    prepareHeaders: async (headers, { getState }) => {
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
      transformResponse: (response: { data: Activity[] }) => response.data,
    }),
    createArticle: builder.mutation<Article, Article>({
      query: (activity) => ({
        url: "articles",
        method: "POST",
        body: activity,
      }),
      invalidatesTags: ["Activity"],
    }),
  }),
});

export const { useGetActivitiesQuery, useCreateArticleMutation } = apiSlice;
