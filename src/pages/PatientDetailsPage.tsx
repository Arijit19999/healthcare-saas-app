import React, { useMemo, useState } from 'react';
import Layout from '../components/Layout';
import { Card, Input, Switch, GridIcon, ListIcon, SearchIcon } from '../components/ui';
import PatientCard from '../components/patient/PatientCard';
import PatientList from '../components/patient/PatientList';
import { patients } from '../data/patients';
import { useStore } from '../store/useStore';

const PatientDetailsPage: React.FC = () => {
  const { viewMode, setViewMode } = useStore();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.diagnosis.toLowerCase().includes(q) ||
        p.doctor.toLowerCase().includes(q) ||
        p.status.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Patient Details</h1>
          <p className="text-gray-600 mt-1">
            Showing {filtered.length} of {patients.length} patients
          </p>
        </div>
      </div>

      <Card padding="sm" className="mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex-1">
            <Input
              type="search"
              leftIcon={<SearchIcon size={18} />}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, diagnosis, doctor, or status..."
            />
          </div>
          <div className="flex items-center gap-3 sm:gap-4 sm:border-l sm:pl-4 sm:border-gray-200">
            <span
              className={`flex items-center gap-1 text-sm font-medium ${
                viewMode === 'grid' ? 'text-indigo-600' : 'text-gray-500'
              }`}
            >
              <GridIcon size={16} />
              Grid
            </span>
            <Switch
              checked={viewMode === 'list'}
              onChange={(checked) => setViewMode(checked ? 'list' : 'grid')}
            />
            <span
              className={`flex items-center gap-1 text-sm font-medium ${
                viewMode === 'list' ? 'text-indigo-600' : 'text-gray-500'
              }`}
            >
              <ListIcon size={16} />
              List
            </span>
          </div>
        </div>
      </Card>

      {filtered.length === 0 ? (
        <Card padding="lg">
          <p className="text-center text-gray-500">No patients match your search.</p>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <PatientCard key={p.id} patient={p} />
          ))}
        </div>
      ) : (
        <PatientList patients={filtered} />
      )}
    </Layout>
  );
};

export default PatientDetailsPage;
