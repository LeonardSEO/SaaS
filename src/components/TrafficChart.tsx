import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TrafficChart: React.FC = () => {
  const data = {
    labels: ['Feb 2023', 'Mar 2023', 'Apr 2023', 'May 2023', 'Jun 2023', 'Jul 2023', 'Aug 2023', 'Sep 2023', 'Oct 2023', 'Nov 2023', 'Dec 2023'],
    datasets: [
      {
        label: 'Clicks',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
        yAxisID: 'y',
      },
      {
        label: 'Impressions',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: '#9333EA',
        backgroundColor: 'rgba(147, 51, 234, 0.5)',
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Clicks',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Impressions',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default TrafficChart;