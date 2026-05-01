import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import Layout from '../components/Layout';
import { Card, StatCard, UsersIcon, ActivityIcon, HeartIcon, TrendUpIcon } from '../components/ui';
import { patients } from '../data/patients';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AnalyticsPage: React.FC = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  const admissions = [42, 55, 49, 63, 58, 72, 68, 81];
  const discharges = [38, 50, 47, 55, 60, 65, 70, 75];

  const lineData = {
    labels: months,
    datasets: [
      {
        label: 'Admissions',
        data: admissions,
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Discharges',
        data: discharges,
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const barData = {
    labels: ['Cardiology', 'Pulmonology', 'Endocrinology', 'Orthopedics', 'Neurology', 'General'],
    datasets: [
      {
        label: 'Patients',
        data: [24, 18, 15, 22, 12, 30],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
        ],
        borderRadius: 8,
      },
    ],
  };

  const statusCounts = patients.reduce<Record<string, number>>((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {});

  const doughnutData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          'rgba(16, 185, 129, 0.85)',
          'rgba(245, 158, 11, 0.85)',
          'rgba(239, 68, 68, 0.85)',
          'rgba(156, 163, 175, 0.85)',
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const, labels: { boxWidth: 12, padding: 16 } },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
      x: { grid: { display: false } },
    },
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-1">Patient trends, department load, and admission status.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total Visits"
          value="1,284"
          icon={<UsersIcon size={22} />}
          iconBg="bg-indigo-100 text-indigo-600"
          trend={{ value: 14, positive: true }}
          hint="vs last quarter"
        />
        <StatCard
          label="Avg Stay"
          value="4.2 days"
          icon={<ActivityIcon size={22} />}
          iconBg="bg-blue-100 text-blue-600"
          trend={{ value: 6, positive: true }}
          hint="shorter"
        />
        <StatCard
          label="Recovery Rate"
          value="87%"
          icon={<HeartIcon size={22} />}
          iconBg="bg-emerald-100 text-emerald-600"
          trend={{ value: 3, positive: true }}
          hint="vs last quarter"
        />
        <StatCard
          label="Revenue"
          value="$248k"
          icon={<TrendUpIcon size={22} />}
          iconBg="bg-purple-100 text-purple-600"
          trend={{ value: 18, positive: true }}
          hint="vs last quarter"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card padding="md" className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Admissions vs Discharges</h2>
          <p className="text-sm text-gray-500 mb-4">Last 8 months</p>
          <div className="h-72">
            <Line data={lineData} options={commonOptions} />
          </div>
        </Card>

        <Card padding="md">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Patient Status</h2>
          <p className="text-sm text-gray-500 mb-4">Current distribution</p>
          <div className="h-72">
            <Doughnut
              data={doughnutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'bottom', labels: { boxWidth: 12, padding: 16 } },
                },
                cutout: '65%',
              }}
            />
          </div>
        </Card>

        <Card padding="md" className="lg:col-span-3">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Patients by Department</h2>
          <p className="text-sm text-gray-500 mb-4">Active caseload</p>
          <div className="h-80">
            <Bar data={barData} options={{ ...commonOptions, plugins: { legend: { display: false } } }} />
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
