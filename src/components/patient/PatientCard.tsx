import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Patient, statusTone } from '../../data/patients';
import { HeartIcon, MailIcon } from '../ui/Icon';

interface PatientCardProps {
  patient: Patient;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient }) => {
  const scoreColor =
    patient.healthScore >= 80
      ? 'text-emerald-600'
      : patient.healthScore >= 65
      ? 'text-yellow-600'
      : 'text-red-600';

  return (
    <Card padding="none" className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${patient.avatarColor}`}
            >
              {patient.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{patient.name}</h3>
              <p className="text-xs text-gray-500">
                {patient.age} yrs · {patient.gender}
              </p>
            </div>
          </div>
          <Badge tone={statusTone[patient.status]}>{patient.status}</Badge>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <HeartIcon size={14} className="text-pink-500" />
            <span className="truncate">{patient.diagnosis}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MailIcon size={14} className="text-gray-400" />
            <span className="truncate">{patient.email}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Health Score</p>
            <p className={`text-2xl font-bold ${scoreColor}`}>{patient.healthScore}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Doctor</p>
            <p className="text-sm font-medium text-gray-900">{patient.doctor}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PatientCard;
