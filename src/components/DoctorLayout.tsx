import { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { DoctorContext } from '@/context/DoctorContext';
import { LayoutDashboard, Calendar, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DoctorLayout() {
  const context = useContext(DoctorContext);
  const navigate = useNavigate();

  if (!context) return null;
  const { dToken, setDToken } = context;

  const logout = () => {
    setDToken(null);
    navigate('/');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/doctor', icon: <LayoutDashboard size={20} /> },
    { name: 'Appointments', path: '/doctor/appointments', icon: <Calendar size={20} /> },
    { name: 'Profile', path: '/doctor/profile', icon: <User size={20} /> },
  ];

  if (!dToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent/30 p-4">
        <div className="bg-card p-10 rounded-3xl shadow-2xl shadow-black/5 w-full max-w-md border border-border/50">
          <div className="flex items-center gap-2 mb-8 justify-center">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-md">✚</div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Medicare <span className="text-primary text-sm align-top">Doctor</span></h1>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setDToken('mock_doctor_token'); }}>
             <div className="mb-4">
               <label className="block text-sm font-medium mb-1.5 text-foreground">Email</label>
               <input type="email" required defaultValue="doctor@medicare.com" className="w-full p-3.5 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
             </div>
             <div className="mb-6">
               <label className="block text-sm font-medium mb-1.5 text-foreground">Password</label>
               <input type="password" required defaultValue="password123" className="w-full p-3.5 px-4 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" />
             </div>
             <button type="submit" className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 hover:-translate-y-0.5 transition-all shadow-lg shadow-primary/25">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FD]">
      {/* Topbar */}
      <div className="flex justify-between items-center px-6 sm:px-10 py-4 bg-card border-b border-border sticky top-0 z-50">
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">✚</div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground hidden sm:block">Medicare</h1>
           </div>
           <span className="bg-muted text-foreground border border-border/80 text-xs font-semibold px-3 py-1 rounded-full tracking-wide">DOCTOR</span>
        </div>
        <button onClick={logout} className="bg-primary text-white text-sm px-6 py-2 rounded-full font-medium hover:bg-primary/90 transition-all shadow-md shadow-primary/20">Logout</button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-20 sm:w-64 bg-card border-r border-border flex flex-col pt-5 flex-shrink-0">
           {menuItems.map((item) => (
             <NavLink 
               key={item.name} 
               to={item.path} 
               end={item.path === '/doctor'}
               className={({isActive}) => cn(
                 "flex items-center gap-3 py-3.5 px-3 sm:px-6 cursor-pointer border-r-4 transition-all duration-200",
                 isActive ? "bg-accent border-primary text-primary font-semibold" : "border-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
               )}
             >
               <span className={cn("flex-shrink-0")}>{item.icon}</span>
               <span className="hidden sm:block">{item.name}</span>
             </NavLink>
           ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 sm:p-10 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
