import { useContext, useState } from 'react';
import { DoctorContext } from '@/context/DoctorContext';
import { AppContext } from '@/context/AppContext';
import { toast } from 'react-toastify';

export default function DoctorProfile() {
  const dContext = useContext(DoctorContext);
  const aContext = useContext(AppContext);
  
  const [isEdit, setIsEdit] = useState(false);

  if (!dContext || !aContext) return null;
  const { profileData, setProfileData } = dContext;
  const { currencySymbol } = aContext;

  if (!profileData) return null;

  const handleSave = () => {
    setIsEdit(false);
    toast.success("Profile saved");
  }

  return (
    <div className="max-w-4xl flex flex-col gap-6">
      
      <div className="flex flex-col sm:flex-row gap-8 bg-card p-8 rounded-3xl border border-border/60 shadow-sm">
        <div className="w-full sm:max-w-64 rounded-3xl overflow-hidden shadow-inner bg-accent aspect-square flex items-center justify-center p-2 border border-border">
          <img className="w-full h-full object-cover rounded-2xl" src={profileData.image} alt={profileData.name} />
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <p className="flex items-center gap-2 text-3xl font-bold text-foreground">
            {profileData.name}
          </p>
          <div className="flex items-center gap-3 text-sm mt-2 text-muted-foreground font-medium">
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className="py-1 px-3 border border-border text-xs rounded-full bg-muted">{profileData.experience}</button>
          </div>

          <div className="mt-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">About</p>
            {isEdit ? (
               <textarea 
                 value={profileData.about} 
                 onChange={e => setProfileData({...profileData, about: e.target.value})}
                 className="w-full p-4 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px] text-sm text-foreground"
               />
            ) : (
              <p className="text-sm text-muted-foreground max-w-[700px] leading-relaxed">
                {profileData.about}
              </p>
            )}
          </div>

          <p className="text-muted-foreground font-medium mt-6">
            Appointment fee: <span className="text-foreground text-xl font-bold">
              {currencySymbol} {isEdit ? (
                <input 
                  type="number" 
                  value={profileData.fees} 
                  onChange={e => setProfileData({...profileData, fees: Number(e.target.value)})}
                  className="w-20 p-1 border-b border-border bg-transparent outline-none focus:border-primary text-center"
                />
              ) : profileData.fees}
            </span>
          </p>

          <div className="flex gap-4 pt-6">
             <div className="flex items-center gap-3">
               <input 
                 type="checkbox" 
                 id="availability"
                 checked={profileData.available} 
                 onChange={() => isEdit && setProfileData({...profileData, available: !profileData.available})}
                 className="w-5 h-5 accent-primary border-border rounded cursor-pointer"
                 disabled={!isEdit}
               />
               <label htmlFor="availability" className="text-foreground font-medium">Available</label>
             </div>
          </div>

          <div className="mt-8">
            {isEdit ? (
              <button onClick={handleSave} className="bg-primary text-primary-foreground px-10 py-3.5 rounded-full font-bold shadow-lg shadow-primary/25 hover:-translate-y-0.5 transition-all">
                Save
              </button>
            ) : (
              <button onClick={() => setIsEdit(true)} className="bg-white border-2 border-primary text-primary px-10 py-3 rounded-full font-bold hover:bg-primary hover:text-white hover:shadow-lg transition-all">
                Edit Profile
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
