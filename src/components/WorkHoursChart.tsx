import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import { hoursData } from '../data/hoursData';
import { useMemo } from 'react';
import './WorkHoursChart.css';

// Custom dot component with glow effect for hours > 11
const CustomDot = (props: any) => {
  const { cx, cy, payload } = props;
  const exceeds11 = payload.hoursWorked > 11;

  if (exceeds11) {
    return (
      <g>
        {/* Glow effect */}
        <circle
          cx={cx}
          cy={cy}
          r={8}
          fill="url(#glowGradient)"
          opacity={0.6}
          style={{ filter: 'blur(4px)' }}
        />
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill="url(#glowGradient)"
          opacity={0.8}
          style={{ filter: 'blur(2px)' }}
        />
        {/* Main dot */}
        <circle
          cx={cx}
          cy={cy}
          r={5}
          fill="#ec4899"
          stroke="#f472b6"
          strokeWidth={2}
          className="drop-shadow-lg"
        />
      </g>
    );
  }

  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill="#60a5fa"
      stroke="#3b82f6"
      strokeWidth={1.5}
    />
  );
};

const WorkHoursChart = () => {
  // Calculate average hours
  const avgHours = useMemo(() => {
    const sum = hoursData.reduce((acc, d) => acc + d.hoursWorked, 0);
    return (sum / hoursData.length).toFixed(2);
  }, []);

  // Calculate max hours
  const maxHours = useMemo(() => {
    const max = Math.max(...hoursData.map((d) => d.hoursWorked));
    return max.toFixed(2);
  }, []);

  // Find the date with max hours
  const maxHoursEntry = useMemo(() => {
    const maxValue = Math.max(...hoursData.map((d) => d.hoursWorked));
    return hoursData.find((d) => d.hoursWorked === maxValue);
  }, []);

  // Calculate total days
  const totalDays = useMemo(() => {
    return hoursData.length.toString();
  }, []);

  // Prepare chart data
  const chartData = hoursData.map((item) => ({
    date: item.date,
    hoursWorked: item.hoursWorked,
    expectedHours: item.expectedHours,
  }));

  return (
    <div className="work-hours-chart-container">
      <h1 className="chart-title">Work Hours Analytics</h1>
      
      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Maximum Hours</div>
          <div className="kpi-value" style={{ color: '#60a5fa' }}>
            {maxHours} hrs
          </div>
          <div className="kpi-subtext">
            on {maxHoursEntry?.date}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Average Hours</div>
          <div className="kpi-value" style={{ color: '#60a5fa' }}>
            {avgHours} hrs
          </div>
          <div className="kpi-subtext">
            per day
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Days</div>
          <div className="kpi-value" style={{ color: '#60a5fa' }}>
            {totalDays}
          </div>
          <div className="kpi-subtext">
            tracked
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              {/* Gradient for glow effect */}
              <linearGradient id="glowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ec4899" stopOpacity={1} />
                <stop offset="100%" stopColor="#f472b6" stopOpacity={0.8} />
              </linearGradient>
              {/* Gradient for the line */}
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity={1} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255, 255, 255, 0.1)"
              opacity={0.3}
            />
            <XAxis
              dataKey="date"
              stroke="rgba(255, 255, 255, 0.7)"
              style={{ fontSize: '12px' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="rgba(255, 255, 255, 0.7)"
              style={{ fontSize: '12px' }}
              domain={[0, 20]}
              label={{
                value: 'Hours',
                angle: -90,
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: 'rgba(255, 255, 255, 0.8)' },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: '#fff',
              }}
              labelStyle={{ color: '#fff' }}
              formatter={(value: number) => [`${value.toFixed(2)} hrs`, 'Hours Worked']}
            />
            {/* Reference line for standard work hours (9 hrs) */}
            <ReferenceLine
              y={9}
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
            {/* Line for hours worked */}
            <Line
              type="monotone"
              dataKey="hoursWorked"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={<CustomDot />}
              activeDot={{
                r: 8,
                fill: '#ec4899',
                stroke: '#f472b6',
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-dot bg-blue-500"></div>
          <span>Hours Worked</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot bg-green-500 border-dashed"></div>
          <span>Standard Work Hours (9hrs)</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot bg-pink-500 glow-dot"></div>
          <span>Exceeded 11 working hours</span>
        </div>
      </div>
    </div>
  );
};

export default WorkHoursChart;

