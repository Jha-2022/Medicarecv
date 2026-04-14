import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '@/context/AppContext';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  if (!context) return null;
  const { token, setToken, userData } = context;

  const logout = () => {
    setToken(null);
    navigate('/login');
  };

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ALL DOCTORS', path: '/doctors' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-border bg-background sticky top-0 z-50">
      <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 duration-300">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md shadow-primary/25">✚</div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Medicare</h1>
      </div>

      <ul className="hidden md:flex items-start gap-5 font-medium">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              cn(
                "py-1 hover:text-primary transition-colors relative",
                isActive ? "text-primary" : "text-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                {link.name}
                <hr className={cn("absolute bottom-0 left-0 w-full h-0.5 bg-primary border-none rounded-full transition-all duration-300", isActive ? "opacity-100" : "opacity-0")} />
              </>
            )}
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-10 h-10 rounded-full border-2 border-primary/20 object-cover" src={userData.image} alt="" />
            <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-muted-foreground z-20 hidden group-hover:block transition-all">
              <div className="min-w-48 bg-card rounded-xl flex flex-col gap-1 p-3 shadow-xl border border-border/50">
                <p onClick={() => navigate('/my-profile')} className="hover:bg-muted hover:text-foreground px-4 py-2 flex items-center gap-2 rounded-md transition-colors cursor-pointer">My Profile</p>
                <p onClick={() => navigate('/my-appointments')} className="hover:bg-muted hover:text-foreground px-4 py-2 flex items-center gap-2 rounded-md transition-colors cursor-pointer">My Appointments</p>
                <div className="h-[1px] bg-border my-1"></div>
                <p onClick={logout} className="hover:bg-destructive/10 text-destructive px-4 py-2 flex items-center gap-2 rounded-md transition-colors cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hidden md:block hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Create account
          </button>
        )}
        <button onClick={() => setShowMenu(true)} className="md:hidden w-6 h-6 text-foreground">
          <Menu />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={cn("md:hidden fixed inset-0 z-50 bg-background transition-transform duration-300 transform", showMenu ? "translate-x-0" : "translate-x-full")}>
        <div className="flex items-center justify-between px-5 py-6 border-b border-border">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">✚</div>
             <h1 className="text-2xl font-bold tracking-tight text-foreground">Medicare</h1>
          </div>
          <button onClick={() => setShowMenu(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-muted text-foreground">
            <X size={20} />
          </button>
        </div>
        <ul className="flex flex-col items-center gap-4 mt-10 px-5 text-lg font-medium">
          {navLinks.map((link) => (
            <NavLink key={link.name} onClick={() => setShowMenu(false)} to={link.path} className="px-4 py-3 rounded-xl w-full text-center hover:bg-muted transition-colors">
              {link.name}
            </NavLink>
          ))}
          {!token && (
            <button onClick={() => { setShowMenu(false); navigate('/login'); }} className="mt-4 bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium w-full shadow-md shadow-primary/20">
              Create account
            </button>
          )}
        </ul>
      </div>
    </div>
  );
}
