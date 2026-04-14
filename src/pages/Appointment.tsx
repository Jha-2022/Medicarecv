import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext, Doctor } from '@/context/AppContext';
import { Info, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { addDays, format } from 'date-fns';

export default function Appointment() {
  const { docId } = useParams();
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [docInfo, setDocInfo] = useState<Doctor | null>(null);
  const [relatedDocs, setRelatedDocs] = useState<Doctor[]>([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  if (!context) return null;
  const { doctors, currencySymbol, bookAppointment, token } = context;

  const fetchDocInfo = () => {
    const doc = doctors.find(doc => doc._id === docId);
    if (doc) {
      setDocInfo(doc);
      setRelatedDocs(doctors.filter(d => d.speciality === doc.speciality && d._id !== doc._id));
    }
  };

  useEffect(() => {
    fetchDocInfo();
    window.scrollTo(0, 0);
  }, [doctors, docId]);

  if (!docInfo) return <div className="py-20 text-center text-muted-foreground text-lg">Loading...</div>;

  // Generate 7 days
  const days = Array.from({ length: 7 }).map((_, i) => addDays(new Date(), i));
  
  // Generate time slots 8am to 5pm
  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 8; i <= 17; i++) {
      slots.push(`${i > 12 ? i - 12 : i}:00 ${i >= 12 ? 'PM' : 'AM'}`);
      if (i !== 17) slots.push(`${i > 12 ? i - 12 : i}:30 ${i >= 12 ? 'PM' : 'AM'}`);
    }
    return slots;
  };
  const timeSlots = generateTimeSlots();

  const handleBook = () => {
    if (!token) {
      navigate('/login');
      return;
    }
    if (!slotTime) {
      alert("Please select a time slot");
      return;
    }
    bookAppointment(docInfo._id, format(days[slotIndex], 'dd_MM_yyyy'), slotTime);
    navigate('/my-appointments');
  };

  return (
    <div className="py-8">
      {/* Doctor Details */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="bg-accent rounded-3xl w-full sm:max-w-72 h-80 flex items-center justify-center p-4 border border-border/50 shadow-inner">
          <img className="w-full h-full object-cover rounded-2xl shadow-sm" src={docInfo.image} alt={docInfo.name} />
        </div>

        <div className="flex-1 border border-border/60 rounded-3xl p-8 py-10 bg-card shadow-lg shadow-black/5">
          <p className="flex items-center gap-2 text-3xl font-bold text-foreground">
            {docInfo.name}
            <CheckCircle2 className="w-6 h-6 text-primary fill-primary/10" />
          </p>
          <div className="flex items-center gap-3 text-sm mt-2 text-muted-foreground font-medium">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className="py-1 px-3 border border-border text-xs rounded-full bg-muted">{docInfo.experience}</button>
          </div>

          <div className="mt-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              About <Info className="w-4 h-4 text-muted-foreground" />
            </p>
            <p className="text-sm text-muted-foreground max-w-[700px] leading-relaxed">
              {docInfo.about}
            </p>
          </div>

          <p className="text-muted-foreground font-medium mt-8">
            Appointment fee: <span className="text-foreground text-xl font-bold">{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="sm:ml-72 sm:pl-6 mt-12 font-medium text-foreground">
        <p className="text-xl font-bold mb-6">Booking slots</p>
        
        {/* Days */}
        <div className="flex flex-wrap gap-3 items-center w-full pb-4">
          {days.map((day, index) => (
            <div 
              key={index} 
              onClick={() => { setSlotIndex(index); setSlotTime(''); }}
              className={cn(
                "text-center py-4 px-5 min-w-[80px] rounded-2xl cursor-pointer transition-all duration-300 border",
                slotIndex === index ? "bg-primary text-white border-primary shadow-lg shadow-primary/30 -translate-y-1" : "border-border text-muted-foreground hover:border-primary/50 hover:bg-accent"
              )}
            >
              <p className="text-xs font-semibold mb-1 uppercase">{format(day, 'E')}</p>
              <p className="text-xl font-bold">{format(day, 'd')}</p>
            </div>
          ))}
        </div>

        {/* Times */}
        <div className="flex flex-wrap items-center gap-3 w-full mt-6 pb-2">
          {timeSlots.map((time, index) => (
            <p 
              key={index}
              onClick={() => setSlotTime(time)}
              className={cn(
                "text-sm font-medium px-6 py-3 rounded-full cursor-pointer flex-shrink-0 transition-all duration-300 border",
                time === slotTime ? "bg-primary text-white border-primary shadow-md shadow-primary/20" : "text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              )}
            >
              {time}
            </p>
          ))}
        </div>

        <button 
          onClick={handleBook} 
          className="bg-primary text-primary-foreground font-semibold text-base px-10 py-4 rounded-full mt-10 shadow-lg shadow-primary/25 hover:-translate-y-0.5 hover:shadow-xl hover:bg-primary/90 transition-all duration-300 w-full sm:w-auto"
        >
          Book an appointment
        </button>
      </div>

      {/* Related Doctors */}
      <div className="mt-24">
        <h2 className="text-2xl font-bold text-center mb-2">Related Doctors</h2>
        <p className="text-muted-foreground text-center text-sm mb-10">Simply browse through our extensive list of trusted doctors.</p>
        
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-5">
          {relatedDocs.slice(0, 5).map((item, index) => (
            <div 
              onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }} 
              key={index} 
              className="border border-border/50 bg-card rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:border-border hover:-translate-y-1 transition-all duration-300"
            >
              <div className="bg-accent aspect-[4/3] w-full flex items-center justify-center p-4">
                <img className="w-full h-full object-cover rounded-xl" src={item.image} alt={item.name} />
              </div>
              <div className="p-5 flex flex-col gap-2">
                <div className={cn("flex items-center gap-2 text-sm", item.available ? "text-green-500" : "text-muted-foreground")}>
                  <div className={cn("w-2 h-2 rounded-full", item.available ? "bg-green-500" : "bg-muted-foreground")}></div>
                  <p>{item.available ? 'Available' : 'Not Available'}</p>
                </div>
                <p className="text-foreground text-lg font-bold truncate">{item.name}</p>
                <p className="text-muted-foreground text-sm truncate">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
