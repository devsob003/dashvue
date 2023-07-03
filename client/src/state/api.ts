import { ImportExport } from "@mui/icons-material";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import exp from "constants";
import { GetKpisResponse } from "./types";
import { build } from "vite";

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL}),
    reducerPath: "main",
    tagTypes: ["Kpis"],
    endpoints: (build) =>({
        
        getKpis: build.query<Array<getKpisResponse>, void>({
            query: () => "kpi/kpis/",
        providesTags : ["Kpis"]
        }),
    })
})

export const { useGetKpisQuery } = api;