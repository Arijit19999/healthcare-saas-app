import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Patient, statusTone } from '../../data/patients';

interface PatientListProps {
  patients: Patient[];
}

const PatientList: React.FC<PatientListProps> = ({ patients }) => (
  <Card padding="none" className="overflow-hidden">
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Patient
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Age / Gender
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Diagnosis
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Score
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Doctor
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {patients.map((p) => {
            const scoreColor =
              p.healthScore >= 80
                ? 'text-emerald-600'
                : p.healthScore >= 65
                ? 'text-yellow-600'
                : 'text-red-600';
            return (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm ${p.avatarColor}`}
                    >
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {p.age} · {p.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.diagnosis}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge tone={statusTone[p.status]}>{p.status}</Badge>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${scoreColor}`}>
                  {p.healthScore}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{p.doctor}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </Card>
);

export default PatientList;
