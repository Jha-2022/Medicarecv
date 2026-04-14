import { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function MyAppointments() {
  const context = useContext(AppContext);
  const navigate = useNavigate();

  if (!context) return null;
  const { appointments, doctors, cancelAppointment, payForAppointment } = context;

  const userAppointments = appointments.filter(a => a.userId === context.userData?._id);

  return (
    <div className="py-5">
      <p className="text-xl font-bold text-foreground mb-8 pb-3 border-b border-border">My Appointments</p>
      
      <div className="flex flex-col gap-6">
        {userAppointments.length === 0 && (
           <div className="text-center py-20 text-muted-foreground bg-card rounded-3xl border border-border/50 shadow-sm">
             <p className="text-lg">No appointments booked yet.</p>
             <button onClick={() => navigate('/doctors')} className="mt-4 text-primary underline">Browse doctors</button>
           </div>
        )}

        {userAppointments.map((item, index) => {
          const doc = doctors.find(d => d._id === item.docId);
          if (!doc) return null;
          
          return (
            <div key={index} className="flex flex-col sm:flex-row gap-6 sm:gap-8 bg-card border border-border/60 p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-32 h-32 bg-accent rounded-2xl flex-shrink-0 flex items-center justify-center p-2">
                <img className="w-full h-full object-cover rounded-xl" src={doc.image} alt={doc.name} />
              </div>
              
              <div className="flex-1 text-sm text-muted-foreground flex flex-col justify-center">
                <p className="text-foreground text-xl font-bold mb-1">{doc.name}</p>
                <p className="mb-4">{doc.speciality}</p>
                <p className="text-foreground font-semibold mb-1">Address:</p>
                <p>{doc.address.line1}</p>
                <p>{doc.address.line2}</p>
                <p className="mt-4 text-foreground">
                  <span className="font-semibold text-sm">Date & Time:</span> {item.date} | {item.time}
                </p>
              </div>
              
              <div className="flex flex-col justify-end gap-3 w-full sm:w-48 sm:min-w-48">
                {!item.cancelled && !item.isCompleted && !item.payment && (
                  <button 
                    onClick={() => payForAppointment(item._id)} 
                    className="text-sm font-medium bg-primary text-white text-center sm:w-full py-3 rounded-full hover:bg-primary/90 hover:shadow-md transition-all"
                  >
                    Pay Online
                  </button>
                )}
                {!item.cancelled && !item.isCompleted && item.payment && (
                  <button className="text-sm font-medium bg-green-50 text-green-600 border border-green-200 text-center sm:w-full py-3 rounded-full cursor-default">
                    Paid
                  </button>
                )}
                {item.isCompleted && (
                  <button className="text-sm font-medium bg-blue-50 text-blue-600 border border-blue-200 text-center sm:w-full py-3 rounded-full cursor-default">
                    Completed
                  </button>
                )}
                {!item.cancelled && !item.isCompleted && (
                  <button 
                    onClick={() => cancelAppointment(item._id)} 
                    className="text-sm font-medium text-foreground bg-white border border-border text-center sm:w-full py-3 rounded-full hover:bg-destructive hover:text-white hover:border-destructive transition-all"
                  >
                    Cancel appointment
                  </button>
                )}
                {item.cancelled && (
                  <button className="text-sm font-medium text-destructive border border-destructive bg-destructive/5 text-center sm:w-full py-3 rounded-full cursor-default">
                    Appointment Cancelled
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
