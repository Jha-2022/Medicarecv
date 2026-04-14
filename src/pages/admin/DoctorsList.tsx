import { useContext } from 'react';
import { AdminContext } from '@/context/AdminContext';

export default function DoctorsList() {
  const context = useContext(AdminContext);
  if (!context) return null;
  const { doctors, changeAvailability } = context;

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-foreground mb-8">All Doctors</h2>
      
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {doctors.map((item, index) => (
          <div 
            key={index} 
            className="border border-border/50 bg-card rounded-2xl overflow-hidden hover:shadow-xl hover:border-border transition-all duration-300"
          >
            <div className="bg-accent aspect-[4/3] w-full flex items-center justify-center p-4">
              <img className="w-full h-full object-cover rounded-xl" src={item.image} alt={item.name} />
            </div>
            <div className="p-5 flex flex-col gap-2">
              <p className="text-foreground text-lg font-bold truncate">{item.name}</p>
              <p className="text-muted-foreground text-sm truncate">{item.speciality}</p>
              
              <div className="mt-3 flex items-center gap-2 text-sm font-medium">
                <input 
                  onChange={() => changeAvailability(item._id)} 
                  type="checkbox" 
                  checked={item.available} 
                  className="w-4 h-4 accent-primary cursor-pointer border-border rounded"
                />
                <p className="text-foreground">Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
