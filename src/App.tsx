import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppContextProvider } from './context/AppContext';
import { AdminContextProvider } from './context/AdminContext';
import { DoctorContextProvider } from './context/DoctorContext';

// Shared Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Patient Pages
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import Appointment from './pages/Appointment';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';

// Layouts
import AdminLayout from './components/AdminLayout';
import DoctorLayout from './components/DoctorLayout';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminAppointments from './pages/admin/Appointments';
import AddDoctor from './pages/admin/AddDoctor';
import DoctorsList from './pages/admin/DoctorsList';

// Doctor Pages
import DoctorDashboard from './pages/doctor/Dashboard';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorProfile from './pages/doctor/DoctorProfile';

// Patient Layout Component
function PatientLayout() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AppContextProvider>
      <AdminContextProvider>
        <DoctorContextProvider>
          <BrowserRouter>
            <ToastContainer autoClose={3000} hideProgressBar />
            <Routes>
              
              {/* PATIENT PORTAL */}
              <Route path="/" element={<PatientLayout />}>
                <Route index element={<Home />} />
                <Route path="doctors" element={<Doctors />} />
                <Route path="doctors/:speciality" element={<Doctors />} />
                <Route path="appointment/:docId" element={<Appointment />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="login" element={<Login />} />
                <Route path="my-profile" element={<MyProfile />} />
                <Route path="my-appointments" element={<MyAppointments />} />
              </Route>

              {/* ADMIN PORTAL */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="appointments" element={<AdminAppointments />} />
                <Route path="add-doctor" element={<AddDoctor />} />
                <Route path="doctors-list" element={<DoctorsList />} />
              </Route>

              {/* DOCTOR PORTAL */}
              <Route path="/doctor" element={<DoctorLayout />}>
                <Route index element={<DoctorDashboard />} />
                <Route path="appointments" element={<DoctorAppointments />} />
                <Route path="profile" element={<DoctorProfile />} />
              </Route>

            </Routes>
          </BrowserRouter>
        </DoctorContextProvider>
      </AdminContextProvider>
    </AppContextProvider>
  );
}

export default App;
