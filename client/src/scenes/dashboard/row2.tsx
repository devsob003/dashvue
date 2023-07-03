import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from '@/state/api';
import { useTheme } from '@emotion/react';
import React from 'react'
import { LineChart, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Bar} from 'recharts';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { ResponsiveContainer } from 'recharts';

type Props = {
  
}
const Row2 = (props: Props) => {
  const { data } = useGetKpisQuery();
  const { palette } = useTheme();
  
  console.log('data',data)
    return (
      <>
        <DashboardBox gridArea="c">
         
          
        </DashboardBox>
        
      </>
    )
  }
  export default Row2