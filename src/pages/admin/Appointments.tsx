import { useContext } from 'react';
import { AdminContext } from '@/context/AdminContext';
import { AppContext } from '@/context/AppContext';
import { XCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminAppointments() {
  const adminContext = useContext(AdminContext);
  const appContext = useContext(AppContext);
  
  if (!adminContext || !appContext) return null;
  const { appointments, cancelAppointment, completeAppointment } = adminContext;
  const { doctors, currencySymbol } = appContext;

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-foreground">All Appointments</h2>

      <div className="bg-card border border-border/60 rounded-3xl shadow-sm overflow-hidden">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] items-center py-4 px-6 border-b border-border bg-accent/50 text-sm font-bold text-muted-foreground tracking-wider uppercase">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.map((item, index) => {
          const doc = doctors.find(d => d._id === item.docId);
          if (!doc) return null;
          return (
            <div key={index} className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] items-center py-4 px-6 border-b border-border/40 hover:bg-muted/30 transition-colors">
              <p className="max-sm:hidden font-medium text-muted-foreground">{index + 1}</p>
              
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 rounded-full object-cover border border-border" src={`https://picsum.photos/seed/${item.userId}/100/100`} alt="" />
                <p className="font-semibold text-foreground">Patient {index+1}</p>
              </div>
              
              <p className="max-sm:hidden text-muted-foreground font-medium">24</p>
              
              <p className="text-muted-foreground font-medium">{item.date} <br/> <span className="text-xs">{item.time}</span></p>
              
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 bg-accent rounded-full object-cover" src={doc.image} alt="" />
                <p className="font-semibold text-foreground">{doc.name}</p>
              </div>
              
              <p className="font-bold text-foreground">{currencySymbol}{item.fees}</p>
              
              <div className="flex items-center gap-2">
                {item.cancelled ? (
                  <span className="text-destructive font-semibold text-sm">Cancelled</span>
                ) : item.isCompleted ? (
                   <span className="text-green-500 font-semibold text-sm">Completed</span>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => completeAppointment(item._id)} className="text-green-500 hover:text-white hover:bg-green-500 rounded-full p-1.5 transition-colors">
                       <CheckCircle size={22} />
                    </button>
                    <button onClick={() => cancelAppointment(item._id)} className="text-destructive hover:text-white hover:bg-destructive rounded-full p-1.5 transition-colors">
                      <XCircle size={22} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
