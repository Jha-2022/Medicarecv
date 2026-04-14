import { useContext } from 'react';
import { AdminContext } from '@/context/AdminContext';
import { AppContext } from '@/context/AppContext';
import { Users, CalendarCheck, CalendarRange, XCircle, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const adminContext = useContext(AdminContext);
  const appContext = useContext(AppContext);
  
  if (!adminContext || !appContext) return null;
  const { dashData, cancelAppointment } = adminContext;
  const { doctors } = appContext;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Stats Cards */}
      <div className="flex flex-wrap gap-6 mb-10">
        <div className="flex items-center gap-4 bg-card p-6 min-w-[260px] rounded-3xl border border-border/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <UserRound size={32} />
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground">{dashData.doctors}</p>
            <p className="text-muted-foreground font-medium mt-1">Doctors</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-card p-6 min-w-[260px] rounded-3xl border border-border/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <CalendarCheck size={32} />
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground">{dashData.appointments}</p>
            <p className="text-muted-foreground font-medium mt-1">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-card p-6 min-w-[260px] rounded-3xl border border-border/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <Users size={32} />
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground">{dashData.patients}</p>
            <p className="text-muted-foreground font-medium mt-1">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="bg-card rounded-3xl border border-border/60 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2.5 px-8 py-6 border-b border-border bg-accent/30">
          <CalendarRange size={24} className="text-primary" />
          <p className="font-bold text-xl text-foreground">Latest Appointments</p>
        </div>

        <div className="pt-2">
          {dashData.latestAppointments.map((item, index) => {
            const doc = doctors.find(d => d._id === item.docId);
            if (!doc) return null;
            return (
              <div key={index} className="flex items-center px-8 py-4 hover:bg-muted/50 transition-colors border-b border-border/40 last:border-none">
                <img className="w-12 h-12 rounded-full object-cover border border-border" src={doc.image} alt={doc.name} />
                <div className="flex-1 ml-4">
                  <p className="text-foreground font-bold text-base">{doc.name}</p>
                  <p className="text-muted-foreground text-sm font-medium mt-0.5">{item.date}</p>
                </div>
                {item.cancelled ? (
                  <span className="text-destructive font-semibold bg-destructive/10 px-3 py-1 rounded-full text-xs">Cancelled</span>
                ) : item.isCompleted ? (
                   <span className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full text-xs">Completed</span>
                ) : (
                  <button onClick={() => cancelAppointment(item._id)} className="w-10 h-10 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive hover:text-white transition-colors">
                    <XCircle size={22} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
