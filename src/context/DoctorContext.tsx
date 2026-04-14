import { createContext, useState, ReactNode, useContext } from "react";
import { Appointment, AppContext, Doctor } from "./AppContext";
import { toast } from "react-toastify";

interface DoctorContextType {
  dToken: string | null;
  setDToken: (token: string | null) => void;
  appointments: Appointment[];
  dashData: { earnings: number; appointments: number; patients: number; latestAppointments: Appointment[] };
  profileData: Doctor | null;
  setProfileData: (data: Doctor) => void;
  completeAppointment: (appId: string) => void;
  cancelAppointment: (appId: string) => void;
}

export const DoctorContext = createContext<DoctorContextType | null>(null);

export const DoctorContextProvider = ({ children }: { children: ReactNode }) => {
  const [dToken, setDToken] = useState<string | null>(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : null);
  
  const appContext = useContext(AppContext);
  const currentDoc = appContext?.doctors[0] || null; // Mocking logged in as first doctor
  
  const [profileData, setProfileData] = useState<Doctor | null>(currentDoc);
  
  const [appointments, setAppointments] = useState<Appointment[]>([
    { _id: 'd_app1', docId: 'doc1', userId: 'user1', date: '20_08_2024', time: '10:00 AM', fees: 50, cancelled: false, payment: true, isCompleted: false },
    { _id: 'd_app2', docId: 'doc1', userId: 'user2', date: '21_08_2024', time: '11:00 AM', fees: 50, cancelled: false, payment: false, isCompleted: false },
    { _id: 'd_app3', docId: 'doc1', userId: 'user3', date: '22_08_2024', time: '09:00 AM', fees: 50, cancelled: true, payment: false, isCompleted: false },
  ]);

  const dashData = {
    earnings: appointments.filter(a => a.payment).reduce((acc, curr) => acc + curr.fees, 0),
    appointments: appointments.length,
    patients: new Set(appointments.map(a => a.userId)).size,
    latestAppointments: appointments.slice(0, 5)
  };

  const completeAppointment = (appId: string) => {
    setAppointments(prev => prev.map(app => app._id === appId ? { ...app, isCompleted: true } : app));
    toast.success('Appointment completed');
  };

  const cancelAppointment = (appId: string) => {
    setAppointments(prev => prev.map(app => app._id === appId ? { ...app, cancelled: true } : app));
    toast.info('Appointment cancelled');
  };

  const value = {
    dToken,
    setDToken,
    appointments,
    dashData,
    profileData,
    setProfileData,
    completeAppointment,
    cancelAppointment
  };

  return (
    <DoctorContext.Provider value={value}>
      {children}
    </DoctorContext.Provider>
  );
};
