import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CountUp from 'react-countup';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

type StatsCardProps = {
  title: string;
  value: number;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'primary' | 'error' | 'success' | 'warning';
  sparklineData?: number[];
};

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  trend = 'neutral',
  color = 'primary',
  sparklineData = [],
}) => {
  const theme = useTheme();

  const getTrendIcon = () => {
    if (trend === 'up') return <ArrowDropUpIcon color="success" />;
    if (trend === 'down') return <ArrowDropDownIcon color="error" />;
    return null;
  };

  // Transform sparklineData into { value }[]
  const chartData = sparklineData.map((v, i) => ({ index: i, value: v }));

  return (
    <Card sx={{ borderLeft: `4px solid`, borderColor: `${color}.main`, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {title}
        </Typography>

        <Box display="flex" alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            <CountUp end={value} duration={0.6} />
          </Typography>
          <Box ml={1}>{getTrendIcon()}</Box>
        </Box>

        {sparklineData.length > 0 && (
          <Box mt={1} height={40}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={theme.palette[color].main}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
