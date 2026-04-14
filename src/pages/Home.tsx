import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '@/context/AppContext';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const specialitiesData = [
  { speciality: 'General physician', icon: '🏥' },
  { speciality: 'Gynecologist', icon: '👩‍⚕️' },
  { speciality: 'Dermatologist', icon: '🩺' },
  { speciality: 'Pediatricians', icon: '👶' },
  { speciality: 'Neurologist', icon: '🧠' },
  { speciality: 'Gastroenterologist', icon: '🫄' },
];

export default function Home() {
  const navigate = useNavigate();
  const context = useContext(AppContext);

  if (!context) return null;
  const { doctors } = context;

  return (
    <div className="flex flex-col gap-16">

      {/* ── Hero Section ── */}
      <div className="flex flex-col md:flex-row bg-primary rounded-3xl overflow-hidden shadow-2xl shadow-primary/20 relative">
        {/* decorative blur */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        {/* Left – text content */}
        <div className="w-full md:w-1/2 flex flex-col items-start justify-center gap-5 px-8 md:px-12 lg:px-16 py-12 md:py-16 z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-white leading-tight">
            Book Appointment <br />With Trusted Doctors
          </h1>

          {/* Avatars row – always stacked above the description */}
          <div className="flex items-center -space-x-3 flex-shrink-0">
            <img className="w-10 h-10 rounded-full border-2 border-primary object-cover" src="/images/doc1.jpg" alt="" />
            <img className="w-10 h-10 rounded-full border-2 border-primary object-cover" src="/images/doc2.jpg" alt="" />
            <img className="w-10 h-10 rounded-full border-2 border-primary object-cover" src="/images/doc3.jpg" alt="" />
          </div>

          {/* Description – its own line, full width, never overlaps avatars */}
          <p className="text-white/85 text-sm sm:text-base leading-relaxed max-w-md">
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
          </p>

          <button
            onClick={() => navigate('/doctors')}
            className="flex items-center gap-2 bg-white text-primary px-7 py-3 rounded-full font-semibold text-sm hover:scale-105 hover:shadow-xl transition-all duration-300"
          >
            Book appointment <ArrowRight size={16} />
          </button>
        </div>

        {/* Right – hero image */}
        <div className="w-full md:w-1/2 flex justify-center items-end overflow-hidden z-10">
          <img
            className="w-3/4 md:w-[85%] lg:w-[70%] object-contain drop-shadow-2xl translate-y-6"
            src={`${import.meta.env.BASE_URL}images/header_img.png`}
            alt="Doctors"
          />
        </div>
      </div>

      {/* ── Find by Speciality ── */}
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Find by Speciality</h2>
        <p className="text-muted-foreground text-sm max-w-md leading-relaxed">
          Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6 w-full pt-2 pb-4">
          {specialitiesData.map((item) => (
            <button
              key={item.speciality}
              onClick={() => navigate(`/doctors/${item.speciality}`)}
              className="flex flex-col items-center gap-2 sm:gap-3 cursor-pointer hover:-translate-y-2 transition-all duration-300 group focus:outline-none"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-accent rounded-full flex items-center justify-center text-2xl sm:text-3xl md:text-4xl shadow-sm border border-border group-hover:border-primary transition-all duration-300 mx-auto">
                {item.icon}
              </div>
              <span className="font-medium text-foreground text-[11px] sm:text-xs md:text-sm text-center leading-tight break-words w-full">{item.speciality}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Top Doctors ── */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Top Doctors to Book</h2>
        <p className="text-muted-foreground text-sm text-center max-w-md">
          Simply browse through our extensive list of trusted doctors.
        </p>

        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 pt-4">
          {doctors.slice(0, 10).map((item) => (
            <div
              key={item._id}
              onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0); }}
              className="border border-border/50 bg-card rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:border-border hover:-translate-y-1 transition-all duration-300"
            >
              <div className="bg-accent aspect-square w-full flex items-center justify-center p-3">
                <img className="w-full h-full object-cover rounded-xl" src={item.image} alt={item.name} />
              </div>
              <div className="p-4 flex flex-col gap-1">
                <div className={cn('flex items-center gap-2 text-xs', item.available ? 'text-green-500' : 'text-muted-foreground')}>
                  <div className={cn('w-2 h-2 rounded-full flex-shrink-0', item.available ? 'bg-green-500' : 'bg-muted-foreground')} />
                  <span>{item.available ? 'Available' : 'Not Available'}</span>
                </div>
                <p className="text-foreground font-bold text-sm sm:text-base leading-snug line-clamp-2">{item.name}</p>
                <p className="text-muted-foreground text-xs sm:text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => { navigate('/doctors'); window.scrollTo(0, 0); }}
          className="mt-6 bg-accent text-foreground px-10 py-3 rounded-full font-medium hover:bg-muted transition-colors"
        >
          more
        </button>
      </div>

      {/* ── CTA Banner ── */}
      <div className="bg-primary rounded-3xl px-8 md:px-14 lg:px-20 py-14 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-primary/20 relative overflow-hidden mb-4">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white opacity-5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="flex flex-col gap-6 z-10 text-center md:text-left items-center md:items-start">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Book Appointment <br />With 100+ Trusted Doctors
          </h2>
          <button
            onClick={() => { navigate('/login'); window.scrollTo(0, 0); }}
            className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300 w-max"
          >
            Create account
          </button>
        </div>

        <div className="hidden md:flex justify-center items-end w-1/3 z-10 overflow-hidden">
          <img
            className="w-full h-auto drop-shadow-2xl translate-y-8 scale-110"
            src={`${import.meta.env.BASE_URL}images/appointment_img.png`}
            alt=""
          />
        </div>
      </div>

    </div>
  );
}
