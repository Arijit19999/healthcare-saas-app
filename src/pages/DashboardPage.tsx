import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import {
  Card,
  StatCard,
  Badge,
  Button,
  UsersIcon,
  HeartIcon,
  ActivityIcon,
  PlusIcon,
  BellIcon,
} from '../components/ui';
import { patients, statusTone } from '../data/patients';
import { useStore } from '../store/useStore';
import { requestPermission, showNotification } from '../services/notifications';

const DashboardPage: React.FC = () => {
  const { user, setNotificationsEnabled, notificationsEnabled } = useStore();

  const totalPatients = patients.length;
  const critical = patients.filter((p) => p.status === 'Critical').length;
  const recovering = patients.filter((p) => p.status === 'Recovering').length;
  const avgScore = Math.round(
    patients.reduce((sum, p) => sum + p.healthScore, 0) / patients.length
  );

  const recent = [...patients]
    .sort((a, b) => b.admittedOn.localeCompare(a.admittedOn))
    .slice(0, 5);

  const triggerNotification = async () => {
    const permission = await requestPermission();
    if (permission !== 'granted') {
      alert('Notification permission denied. Please allow it in your browser settings.');
      return;
    }
    setNotificationsEnabled(true);
    const sent = await showNotification({
      title: 'Healthcare Portal',
      body: `You have ${critical} critical patient${critical === 1 ? '' : 's'} needing attention.`,
      tag: 'critical-alert',
    });
    if (!sent) {
      alert('Could not send notification. Check browser/Windows notification settings.');
    }
  };

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  })();

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'there';

  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {greeting}, <span className="capitalize">{displayName}</span> 👋
          </h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your patients today.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<BellIcon size={16} />}
            onClick={triggerNotification}
          >
            {notificationsEnabled ? 'Test notification' : 'Enable notifications'}
          </Button>
          <Link to="/patient-details">
            <Button size="sm" leftIcon={<PlusIcon size={16} />}>
              View Patients
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total Patients"
          value={totalPatients}
          icon={<UsersIcon size={22} />}
          iconBg="bg-indigo-100 text-indigo-600"
          trend={{ value: 12, positive: true }}
          hint="vs last month"
        />
        <StatCard
          label="Critical Cases"
          value={critical}
          icon={<HeartIcon size={22} />}
          iconBg="bg-red-100 text-red-600"
          trend={{ value: 4, positive: false }}
          hint="vs last week"
        />
        <StatCard
          label="Recovering"
          value={recovering}
          icon={<ActivityIcon size={22} />}
          iconBg="bg-yellow-100 text-yellow-600"
          trend={{ value: 8, positive: true }}
          hint="vs last week"
        />
        <StatCard
          label="Avg Health Score"
          value={`${avgScore}%`}
          icon={<HeartIcon size={22} />}
          iconBg="bg-emerald-100 text-emerald-600"
          trend={{ value: 3, positive: true }}
          hint="vs last month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card padding="md" className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Admissions</h2>
            <Link to="/patient-details" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recent.map((p) => (
              <div key={p.id} className="flex items-center gap-3 py-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${p.avatarColor}`}
                >
                  {p.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{p.name}</p>
                  <p className="text-sm text-gray-500 truncate">{p.diagnosis}</p>
                </div>
                <div className="hidden sm:block text-right">
                  <Badge tone={statusTone[p.status]}>{p.status}</Badge>
                  <p className="text-xs text-gray-500 mt-1">Admitted {p.admittedOn}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="md">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Bed Occupancy</span>
                <span className="font-semibold text-gray-900">76%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-indigo-500 to-purple-500" style={{ width: '76%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Staff Available</span>
                <span className="font-semibold text-gray-900">88%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-emerald-500 to-teal-500" style={{ width: '88%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Equipment Ready</span>
                <span className="font-semibold text-gray-900">92%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-amber-500 to-orange-500" style={{ width: '92%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Patient Satisfaction</span>
                <span className="font-semibold text-gray-900">94%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-pink-500 to-rose-500" style={{ width: '94%' }} />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default DashboardPage;
