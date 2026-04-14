import { createContext, useState, ReactNode, useContext } from "react";
import { Doctor, Appointment, AppContext } from "./AppContext";
import { toast } from "react-toastify";

interface AdminContextType {
  aToken: string | null;
  setAToken: (token: string | null) => void;
  doctors: Doctor[];
  appointments: Appointment[];
  dashData: { doctors: number; appointments: number; patients: number; latestAppointments: Appointment[] };
  changeAvailability: (docId: string) => void;
  cancelAppointment: (appId: string) => void;
  completeAppointment: (appId: string) => void;
  addDoctor: (doc: any) => void;
}

export const AdminContext = createContext<AdminContextType | null>(null);

export const AdminContextProvider = ({ children }: { children: ReactNode }) => {
  const [aToken, setAToken] = useState<string | null>(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : null);
  
  const appContext = useContext(AppContext);
  const allDoctors = appContext?.doctors || [];
  const [doctors, setDoctors] = useState<Doctor[]>(allDoctors);
  
  // Generating some mock admin appointments spanning across multiple users
  const [appointments, setAppointments] = useState<Appointment[]>([
    { _id: 'adm_app1', docId: 'doc1', userId: 'user1', date: '20_08_2024', time: '10:00 AM', fees: 50, cancelled: false, payment: true, isCompleted: false },
    { _id: 'adm_app2', docId: 'doc2', userId: 'user2', date: '21_08_2024', time: '11:00 AM', fees: 60, cancelled: false, payment: false, isCompleted: false },
    { _id: 'adm_app3', docId: 'doc3', userId: 'user3', date: '22_08_2024', time: '09:00 AM', fees: 30, cancelled: true, payment: false, isCompleted: false },
    { _id: 'adm_app4', docId: 'doc4', userId: 'user4', date: '23_08_2024', time: '14:00 PM', fees: 40, cancelled: false, payment: true, isCompleted: true },
    { _id: 'adm_app5', docId: 'doc5', userId: 'user5', date: '24_08_2024', time: '16:00 PM', fees: 50, cancelled: false, payment: false, isCompleted: false },
  ]);

  const dashData = {
    doctors: doctors.length,
    appointments: appointments.length,
    patients: new Set(appointments.map(a => a.userId)).size,
    latestAppointments: appointments.slice(0, 5)
  };

  const changeAvailability = (docId: string) => {
    setDoctors(prev => prev.map(doc => doc._id === docId ? { ...doc, available: !doc.available } : doc));
    toast.success('Availability changed');
  };

  const cancelAppointment = (appId: string) => {
    setAppointments(prev => prev.map(app => app._id === appId ? { ...app, cancelled: true } : app));
    toast.info('Appointment cancelled');
  };

  const completeAppointment = (appId: string) => {
    setAppointments(prev => prev.map(app => app._id === appId ? { ...app, isCompleted: true } : app));
    toast.success('Appointment marked as completed');
  };

  const addDoctor = (doc: any) => {
    const newDoc: Doctor = {
      ...doc,
      _id: `doc${Date.now()}`,
      image: '/images/doc1.jpg',
      available: true
    };
    setDoctors(prev => [newDoc, ...prev]);
    toast.success('Doctor added successfully');
  };

  const value = {
    aToken,
    setAToken,
    doctors,
    appointments,
    dashData,
    changeAvailability,
    cancelAppointment,
    completeAppointment,
    addDoctor
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
