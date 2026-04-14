import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext, Doctor } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';

const specialities = ['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'];

export default function Doctors() {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState<Doctor[]>([]);
  const [showFilter, setShowFilter] = useState(false);

  if (!context) return null;
  const { doctors } = context;

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div>
      <p className="text-muted-foreground text-lg mb-6">Browse through the doctors specialist.</p>
      <div className="flex flex-col sm:flex-row items-start gap-8 mt-5">
        
        {/* Mobile Filter Toggle */}
        <button 
          className={cn("sm:hidden py-2 px-6 border rounded-full transition-all", showFilter ? "bg-primary text-white border-primary" : "bg-card border-border text-foreground")} 
          onClick={() => setShowFilter(!showFilter)}
        >
          Filters
        </button>

        {/* Filters Sidebar */}
        <div className={cn("flex flex-col gap-3 text-sm text-muted-foreground w-full sm:w-64 flex-shrink-0 transition-all duration-300", showFilter ? "flex" : "hidden sm:flex")}>
          {specialities.map((item) => (
            <p
              key={item}
              onClick={() => speciality === item ? navigate('/doctors') : navigate(`/doctors/${item}`)}
              className={cn(
                "w-full px-4 py-3 border border-border rounded-xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                speciality === item ? "bg-accent border-primary/30 text-primary font-medium shadow-sm" : "bg-card hover:border-border/80"
              )}
            >
              {item}
            </p>
          ))}
        </div>

        {/* Doctors Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-8">
          {filterDoc.map((item, index) => (
            <div 
              onClick={() => navigate(`/appointment/${item._id}`)} 
              key={index} 
              className="border border-border/50 bg-card rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:border-border hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              <div className="bg-accent aspect-[4/3] w-full flex items-center justify-center p-4">
                <img className="w-full h-full object-cover rounded-xl shadow-sm" src={item.image} alt={item.name} />
              </div>
              <div className="p-5 flex flex-col gap-2 flex-grow">
                <div className={cn("flex items-center gap-2 text-sm", item.available ? "text-green-500" : "text-muted-foreground")}>
                  <div className={cn("w-2 h-2 rounded-full", item.available ? "bg-green-500" : "bg-muted-foreground")}></div>
                  <p>{item.available ? 'Available' : 'Not Available'}</p>
                </div>
                <p className="text-foreground text-lg font-bold">{item.name}</p>
                <p className="text-muted-foreground text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
