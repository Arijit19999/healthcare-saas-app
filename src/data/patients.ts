export type PatientStatus = "Stable" | "Critical" | "Recovering" | "Discharged";
export type Gender = "Male" | "Female" | "Other";

export interface Patient {
  id: number;
  name: string;
  age: number;
  gender: Gender;
  email: string;
  phone: string;
  diagnosis: string;
  status: PatientStatus;
  healthScore: number;
  admittedOn: string;
  doctor: string;
  avatarColor: string;
}

const colors = [
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-blue-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
];

export const patients: Patient[] = [
  {
    id: 1,
    name: "John Doe",
    age: 34,
    gender: "Male",
    email: "john.doe@example.com",
    phone: "+1 555-0142",
    diagnosis: "Hypertension",
    status: "Stable",
    healthScore: 82,
    admittedOn: "2026-04-12",
    doctor: "Dr. Sarah Lin",
    avatarColor: colors[0],
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 28,
    gender: "Female",
    email: "jane.smith@example.com",
    phone: "+1 555-0119",
    diagnosis: "Asthma",
    status: "Recovering",
    healthScore: 75,
    admittedOn: "2026-04-18",
    doctor: "Dr. Mark Patel",
    avatarColor: colors[1],
  },
  {
    id: 3,
    name: "Robert Brown",
    age: 42,
    gender: "Male",
    email: "robert.brown@example.com",
    phone: "+1 555-0173",
    diagnosis: "Type 2 Diabetes",
    status: "Stable",
    healthScore: 90,
    admittedOn: "2026-03-30",
    doctor: "Dr. Aiko Tanaka",
    avatarColor: colors[2],
  },
  {
    id: 4,
    name: "Emily Davis",
    age: 50,
    gender: "Female",
    email: "emily.davis@example.com",
    phone: "+1 555-0107",
    diagnosis: "Coronary Artery Disease",
    status: "Critical",
    healthScore: 58,
    admittedOn: "2026-04-22",
    doctor: "Dr. Sarah Lin",
    avatarColor: colors[3],
  },
  {
    id: 5,
    name: "Michael Wilson",
    age: 65,
    gender: "Male",
    email: "michael.wilson@example.com",
    phone: "+1 555-0188",
    diagnosis: "Pneumonia",
    status: "Recovering",
    healthScore: 71,
    admittedOn: "2026-04-15",
    doctor: "Dr. Mark Patel",
    avatarColor: colors[4],
  },
  {
    id: 6,
    name: "Sophia Martinez",
    age: 31,
    gender: "Female",
    email: "sophia.martinez@example.com",
    phone: "+1 555-0166",
    diagnosis: "Migraine",
    status: "Stable",
    healthScore: 88,
    admittedOn: "2026-04-25",
    doctor: "Dr. Aiko Tanaka",
    avatarColor: colors[5],
  },
  {
    id: 7,
    name: "David Lee",
    age: 47,
    gender: "Male",
    email: "david.lee@example.com",
    phone: "+1 555-0151",
    diagnosis: "Lower Back Pain",
    status: "Discharged",
    healthScore: 95,
    admittedOn: "2026-04-02",
    doctor: "Dr. Sarah Lin",
    avatarColor: colors[6],
  },
  {
    id: 8,
    name: "Olivia Garcia",
    age: 22,
    gender: "Female",
    email: "olivia.garcia@example.com",
    phone: "+1 555-0134",
    diagnosis: "Appendicitis (post-op)",
    status: "Recovering",
    healthScore: 80,
    admittedOn: "2026-04-21",
    doctor: "Dr. Mark Patel",
    avatarColor: colors[7],
  },
  {
    id: 9,
    name: "Liam Thompson",
    age: 58,
    gender: "Male",
    email: "liam.thompson@example.com",
    phone: "+1 555-0192",
    diagnosis: "COPD",
    status: "Critical",
    healthScore: 52,
    admittedOn: "2026-04-26",
    doctor: "Dr. Aiko Tanaka",
    avatarColor: colors[0],
  },
];

export const statusTone: Record<PatientStatus, "green" | "red" | "yellow" | "gray"> = {
  Stable: "green",
  Recovering: "yellow",
  Critical: "red",
  Discharged: "gray",
};
