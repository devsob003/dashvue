// types.ts

export interface DailyData {
    "SHIFT DATE\n(dd-mm-yyyy)": string;
    "SHIFT ID": string;
    "OPERATOR NAME": string;
    "DUMPER NO": string;
    "ASSIGNED TO SHOVEL": string;
    "LOAD LOCATION\nNAME": string;
    "MATERIAL": string;
    "DUMP LOCATION\nNAME": string;
    "LOAD TONS": number;
  }
  
  export interface GetKpisResponse {
    __v: number;
    __id: string;
    _id: string;
    dailyData: DailyData[];
  }
  