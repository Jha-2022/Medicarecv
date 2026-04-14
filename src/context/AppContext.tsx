import { createContext, useState, useEffect, ReactNode } from "react";
import { toast } from "react-toastify";

export interface Doctor {
  _id: string;
  name: string;
  image: string;
  speciality: string;
  degree: string;
  experience: string;
  about: string;
  fees: number;
  address: { line1: string; line2: string };
  available: boolean;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: { line1: string; line2: string };
  gender: string;
  dob: string;
  image: string;
}

export interface Appointment {
  _id: string;
  docId: string;
  userId: string;
  date: string;
  time: string;
  fees: number;
  cancelled: boolean;
  payment: boolean;
  isCompleted: boolean;
}

interface AppContextType {
  doctors: Doctor[];
  currencySymbol: string;
  token: string | null;
  setToken: (token: string | null) => void;
  userData: User | null;
  setUserData: (user: User | null) => void;
  appointments: Appointment[];
  bookAppointment: (docId: string, date: string, time: string) => void;
  cancelAppointment: (id: string) => void;
  payForAppointment: (id: string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

const MOCK_DOCTORS: Doctor[] = [
  { _id: 'doc1', name: 'Dr. Richard James', image: '/images/doc1.jpg', speciality: 'General physician', degree: 'MBBS', experience: '4 Years', about: 'Dr. Richard has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.', fees: 500, address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' }, available: true },
  { _id: 'doc2', name: 'Dr. Emily Larson', image: '/images/doc2.jpg', speciality: 'Gynecologist', degree: 'MBBS, MS', experience: '3 Years', about: 'Dr. Emily focuses on providing compassionate and comprehensive care for women of all ages, from adolescence through menopause.', fees: 500, address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' }, available: true },
  { _id: 'doc3', name: 'Dr. Sarah Patel', image: '/images/doc3.jpg', speciality: 'Dermatologist', degree: 'MBBS', experience: '1 Year', about: 'Dr. Sarah specializes in diagnosing and treating conditions related to the skin, hair, and nails with modern medical practices.', fees: 500, address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' }, available: true },
  { _id: 'doc4', name: 'Dr. Christopher Davis', image: '/images/doc4.jpg', speciality: 'Pediatricians', degree: 'MBBS', experience: '2 Years', about: 'Dr. Christopher is dedicated to the health and well-being of infants, children, and adolescents.', fees: 500, address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' }, available: true },
  { _id: 'doc5', name: 'Dr. Ryan Martinez', image: '/images/doc5.jpg', speciality: 'Neurologist', degree: 'MBBS', experience: '4 Years', about: 'Dr. Ryan is an expert in managing complex neurological conditions, providing state-of-the-art care for the nervous system.', fees: 500, address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }, available: true },
  { _id: 'doc6', name: 'Dr. Timothy White', image: '/images/doc6.jpg', speciality: 'Gastroenterologist', degree: 'MBBCh BAO', experience: '4 Years', about: 'Dr. Timothy treats disorders of the digestive system and provides comprehensive gastrointestinal care.', fees: 500, address: { line1: '67th Cross, Richmond', line2: 'Circle, Ring Road, London' }, available: true },
  { _id: 'doc7', name: 'Dr. Ava Mitchell', image: '/images/doc7.jpg', speciality: 'Gynecologist', degree: 'MBBS, MS', experience: '5 Years', about: 'Dr. Ava has extensive experience in maternal-fetal medicine and advanced gynecological surgeries.', fees: 500, address: { line1: '77th Cross, Richmond', line2: 'Circle, Ring Road, London' }, available: true },
  { _id: 'doc8', name: 'Dr. Jeffrey King', image: '/images/doc8.jpg', speciality: 'General physician', degree: 'MBBS', experience: '4 Years', about: 'Dr. Jeffrey believes in holistic healthcare and works closely with patients to maintain overall wellness.', fees: 500, address: { line1: '87th Cross, Richmond', line2: 'Circle, Ring Road, London' }, available: true },
  { _id: 'doc9', name: 'Dr. Zoe Kelly', image: '/images/doc9.jpg', speciality: 'Dermatologist', degree: 'MBBS', experience: '1 Year', about: 'Dr. Zoe offers advanced aesthetic dermatology treatments and comprehensive skin care.', fees: 500, address: { line1: '97th Cross, Richmond', line2: 'Circle, Ring Road, London' }, available: true },
  { _id: 'doc10', name: 'Dr. Patrick Harris', image: '/images/doc10.jpg', speciality: 'Pediatricians', degree: 'MBBS', experience: '2 Years', about: 'Dr. Patrick is known for his friendly approach to pediatric care, making children feel comfortable during visits.', fees: 500, address: { line1: '107th Cross, Richmond', line2: 'Circle, Ring Road, London' }, available: true },
];

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const currencySymbol = '₹';
  const [doctors, setDoctors] = useState<Doctor[]>(MOCK_DOCTORS);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token') ? localStorage.getItem('token') : null);
  const [userData, setUserData] = useState<User | null>(
    token ? {
      _id: 'user1',
      name: 'Edward Vincent',
      email: 'edward@example.com',
      phone: '+1 123 456 7890',
      address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' },
      gender: 'Male',
      dob: '2000-01-20',
      image: 'https://picsum.photos/seed/user1/200/200'
    } : null
  );
  
  const [appointments, setAppointments] = useState<Appointment[]>([
    { _id: 'app1', docId: 'doc1', userId: 'user1', date: '25_07_2024', time: '10:00 AM', fees: 50, cancelled: false, payment: false, isCompleted: false },
    { _id: 'app2', docId: 'doc2', userId: 'user1', date: '28_07_2024', time: '11:30 AM', fees: 60, cancelled: true, payment: false, isCompleted: false },
  ]);

  const bookAppointment = (docId: string, date: string, time: string) => {
    if (!token) {
      toast.error('Please login to book an appointment');
      return;
    }
    const doc = doctors.find(d => d._id === docId);
    if (!doc) return;

    const newApp: Appointment = {
      _id: `app${Date.now()}`,
      docId,
      userId: userData?._id || 'user1',
      date,
      time,
      fees: doc.fees,
      cancelled: false,
      payment: false,
      isCompleted: false
    };
    
    setAppointments(prev => [newApp, ...prev]);
    toast.success('Appointment booked successfully!');
  };

  const cancelAppointment = (id: string) => {
    setAppointments(prev => prev.map(app => app._id === id ? { ...app, cancelled: true } : app));
    toast.info('Appointment cancelled');
  };

  const payForAppointment = (id: string) => {
    setAppointments(prev => prev.map(app => app._id === id ? { ...app, payment: true } : app));
    toast.success('Payment successful');
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      if (!userData) {
        setUserData({
          _id: 'user1',
          name: 'Edward Vincent',
          email: 'edward@example.com',
          phone: '+1 123 456 7890',
          address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' },
          gender: 'Male',
          dob: '2000-01-20',
          image: 'https://picsum.photos/seed/user1/200/200'
        });
      }
    } else {
      localStorage.removeItem('token');
      setUserData(null);
    }
  }, [token]);

  const value = {
    doctors,
    currencySymbol,
    token,
    setToken,
    userData,
    setUserData,
    appointments,
    bookAppointment,
    cancelAppointment,
    payForAppointment
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
