import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';
import React, { useMemo, useState } from 'react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Legend, Area, ReferenceLine, AreaChart } from 'recharts';
import { Select } from 'antd';
import { Box } from '@mui/system';
import { colors, useMediaQuery, useTheme } from '@mui/material';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { CenterFocusStrong, SmartDisplay, Style } from '@mui/icons-material';
import { green } from '@mui/material/colors';


const { Option } = Select;

type Props = {};

const Row1 = (props: Props) => {
  const { palette } = useTheme();
  const { data } = useGetKpisQuery();
  console.log("data:", data);

  const [selectedDate, setSelectedDate] = useState<string | undefined>(undefined);

  const handleDateChange = (value: string) => {
    setSelectedDate(value);
  };

  const filteredData = useMemo(() => {
    if (!data || !selectedDate || selectedDate === 'All') {
      return data ? data[0].dailyData : [];
    }

    return data[0].dailyData.filter((item: any) => item['SHIFT DATE\n(dd-mm-yyyy)'] === selectedDate );
  }, [data, selectedDate]);

  const loadLocations = Array.from(new Set(data?.[0]?.dailyData.map((item: any) => item['LOAD LOCATION\nNAME'])) ?? []);
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  const locationfilterdata = useMemo(() => {
  if (!data || !selectedLocation || selectedLocation === 'All') {
    return data ? data[0].dailyData : [];
  }

  return data[0].dailyData.filter((item: any) => item['LOAD LOCATION\nNAME'] === selectedLocation);
}, [data, selectedLocation]);
  // const chartData = useMemo(() => {
  //   if (!filteredData || !locationfilterdata) {
  //     return [];
  //   }
  //   return filteredData.map((item: any) => ({
  //     name: item['SHIFT DATE\n(dd-mm-yyyy)'],
  //     tonnage: item['LOAD TONS'],
  //     location: item['LOAD LOCATION\nNAME']
  //   }));
  // }, [filteredData,locationfilterdata]);
  const chartData = useMemo(() => {
    if (!filteredData || !locationfilterdata) {
      return [];
    }
  
    const filteredByLocationData = locationfilterdata.filter(
      (item: any) => item['SHIFT DATE\n(dd-mm-yyyy)'] === selectedDate
    );
  
    return filteredByLocationData.map((item: any) => ({
      name: item['SHIFT DATE\n(dd-mm-yyyy)'],
      tonnage: item['LOAD TONS'],
      location: item['LOAD LOCATION\nNAME'],
    }));
  }, [filteredData, locationfilterdata, selectedDate]);


  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");

  // const averageTonnage = useMemo(() => {
  //   if (!filteredData || filteredData.length === 0) {
  //     return 0;
  //   }

  //   const totalTonnage = filteredData.reduce((sum: number, item: any) => sum + item['LOAD TONS'], 0);
  //   return totalTonnage / filteredData.length;
  // }, [filteredData]);
  const averageTonnage = useMemo(() => {
  if (!locationfilterdata || locationfilterdata.length === 0) {
    return 0;
  }

  const filteredByDateData = locationfilterdata.filter(
    (item: any) => item['SHIFT DATE\n(dd-mm-yyyy)'] === selectedDate
  );

  const totalTonnage = filteredByDateData.reduce(
    (sum: number, item: any) => sum + item['LOAD TONS'],
    0
  );

  return totalTonnage / filteredByDateData.length;
}, [locationfilterdata, selectedDate]);


  const medianTonnage = useMemo(() => {
    if (!filteredData || filteredData.length === 0) {
      return 0;
    }

    const sortedTonnages = filteredData.map((item: any) => item['LOAD TONS']).sort((a: number, b: number) => a - b);
    const middleIndex = Math.floor(sortedTonnages.length / 2);
    return sortedTonnages[middleIndex];
  }, [filteredData]);
  


  return (
    <>
      <DashboardBox gridArea="a">
        
        <ResponsiveContainer width="100%" height={isAboveMediumScreens ? 1000 : 400}>
          <LineChart
      
            width={isAboveMediumScreens ? 800 : 400}
  height={isAboveMediumScreens ? 500 : 300}
  data={chartData}
  margin={{
    top: 20,
    right: 30,
    left: 20,
    bottom: 20,
  }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name"  />
            <YAxis dataKey="tonnage" domain={[60,120]}/>
            <YAxis dataKey="location"/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey= "tonnage" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Area type="monotone" dataKey="tonnage" stroke={palette.primary.main} fill="#8884d8" fillOpacity={0.2} />
            <ReferenceLine y={averageTonnage} stroke="green" label="Average" />
            <ReferenceLine y={medianTonnage} stroke="red" label="Median" />
          </LineChart>
        </ResponsiveContainer>
        <div style={{ color: 'white', display : 'block', justifyContent: 'center', alignItems: 'center'}}>
          <div>
          <h1 >Average Ton per Day: {averageTonnage.toFixed(2)}</h1>
          </div>
        <div>
          <h1 >Median Ton per Day: {medianTonnage.toFixed(2)}</h1>
        </div>
        </div>

      </DashboardBox>
      <DashboardBox gridArea="b" style={{ width: isAboveMediumScreens ? '50%' : 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>
        <select
          placeholder="Select a date"
          value={selectedDate}
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setSelectedDate(event.target.value)}
          style={{ fontSize: 24, width: 200, marginBottom: 16, color: 'blue' }}
        >
          <option value="All">All</option>
          {data &&
  data[0].dailyData.map((item: any, index: number) => (
    <option key={index} value={item['SHIFT DATE\n(dd-mm-yyyy)']}>
      {item['SHIFT DATE\n(dd-mm-yyyy)']}
    </option>
  ))}
        </select>
        </div>
        <div>
        <select
        placeholder="Select location"
        value={selectedLocation}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setSelectedLocation(event.target.value)}
        style={{ fontSize: 24, width: 200, marginBottom: 16, color: 'blue' }} >
          LOAD LOCATION 
        <option value="All" >All Locations</option>
        {loadLocations.map((location: string, index: number) => (
          <option key={index} value={location}>
            {location}
          </option>
        ))}
      </select>
        </div>
      </DashboardBox>
    </>
  );
};

export default Row1;
