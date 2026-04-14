import { useContext } from 'react';
import { DoctorContext } from '@/context/DoctorContext';
import { AppContext } from '@/context/AppContext';
import { Users, CalendarCheck, CircleDollarSign, CalendarRange, CheckCircle2, XCircle } from 'lucide-react';

export default function DoctorDashboard() {
  const dContext = useContext(DoctorContext);
  const aContext = useContext(AppContext);
  
  if (!dContext || !aContext) return null;
  const { dashData, completeAppointment, cancelAppointment } = dContext;
  const { currencySymbol } = aContext;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Stats Cards */}
      <div className="flex flex-wrap gap-6 mb-10">
        <div className="flex items-center gap-4 bg-card p-6 min-w-[260px] rounded-3xl border border-border/60 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <CircleDollarSign size={32} />
          </div>
          <div>
            <p className="text-3xl font-bold text-foreground">{currencySymbol}{dashData.earnings}</p>
            <p className="text-muted-foreground font-medium mt-1">Earnings</p>
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
            return (
              <div key={index} className="flex items-center justify-between px-8 py-4 hover:bg-muted/50 transition-colors border-b border-border/40 last:border-none">
                <div className="flex items-center gap-4">
                  <img className="w-12 h-12 rounded-full object-cover border border-border" src={`https://picsum.photos/seed/${item.userId}/100/100`} alt="Patient" />
                  <div>
                    <p className="text-foreground font-bold text-base">Patient {index+1}</p>
                    <p className="text-muted-foreground text-sm font-medium mt-0.5">{item.date}</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-1">
                   {item.payment ? (
                     <span className="text-xs bg-muted px-2 py-0.5 rounded text-foreground border border-border/50">Online</span>
                   ) : (
                     <span className="text-xs bg-muted px-2 py-0.5 rounded text-foreground border border-border/50">Cash</span>
                   )}

                   {item.cancelled ? (
                    <span className="text-destructive font-semibold bg-destructive/10 px-3 py-1 rounded-full text-xs mt-1">Cancelled</span>
                   ) : item.isCompleted ? (
                    <span className="text-green-600 font-semibold bg-green-100 px-3 py-1 rounded-full text-xs mt-1">Completed</span>
                   ) : (
                    <div className="flex items-center gap-2 mt-1">
                      <button onClick={() => cancelAppointment(item._id)} className="w-8 h-8 rounded-full bg-destructive/10 text-destructive flex items-center justify-center hover:bg-destructive hover:text-white transition-colors">
                        <XCircle size={18} />
                      </button>
                      <button onClick={() => completeAppointment(item._id)} className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors">
                        <CheckCircle2 size={18} />
                      </button>
                    </div>
                   )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
