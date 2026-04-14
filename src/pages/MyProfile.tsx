import { useContext, useState } from 'react';
import { AppContext } from '@/context/AppContext';
import { toast } from 'react-toastify';

export default function MyProfile() {
  const context = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);

  if (!context || !context.userData) return null;
  const { userData, setUserData } = context;

  const handleSave = () => {
    setIsEdit(false);
    toast.success('Profile updated successfully');
  };

  return (
    <div className="max-w-2xl flex flex-col gap-8 text-sm pt-5">
      {/* Profile Image & Name */}
      <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
        <div className="relative group">
          <img className="w-36 h-36 rounded-3xl object-cover shadow-lg shadow-black/5" src={userData.image} alt={userData.name} />
          {isEdit && (
             <div className="absolute inset-0 bg-black/40 rounded-3xl flex items-center justify-center text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                Upload
             </div>
          )}
        </div>
        <div className="flex-1 w-full text-center sm:text-left">
          {isEdit ? (
            <input 
              className="bg-accent text-3xl font-bold text-foreground w-full p-2 px-4 rounded-xl border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" 
              type="text" 
              value={userData.name} 
              onChange={(e) => setUserData(prev => prev ? { ...prev, name: e.target.value } : prev)} 
            />
          ) : (
            <p className="font-bold text-4xl text-foreground tracking-tight">{userData.name}</p>
          )}
        </div>
      </div>

      <hr className="border-border bg-border h-[1px] border-none" />

      {/* Contact Info */}
      <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm">
        <p className="text-muted-foreground font-semibold uppercase tracking-wider text-xs mb-5">Contact Information</p>
        <div className="grid grid-cols-[100px_1fr] gap-y-6 text-base items-center">
          <p className="font-medium text-foreground">Email id:</p>
          <p className="text-primary font-medium">{userData.email}</p>

          <p className="font-medium text-foreground">Phone:</p>
          {isEdit ? (
            <input 
              className="bg-accent text-foreground max-w-64 p-2 px-4 rounded-xl border border-border focus:border-primary focus:outline-none transition-all" 
              type="text" 
              value={userData.phone} 
              onChange={(e) => setUserData(prev => prev ? { ...prev, phone: e.target.value } : prev)} 
            />
          ) : (
            <p className="text-primary font-medium">{userData.phone}</p>
          )}

          <p className="font-medium text-foreground self-start mt-2">Address:</p>
          {isEdit ? (
            <div className="flex flex-col gap-2 max-w-sm">
              <input 
                className="bg-accent text-foreground p-2 px-4 rounded-xl border border-border focus:border-primary focus:outline-none transition-all" 
                type="text" 
                value={userData.address.line1} 
                onChange={(e) => setUserData(prev => prev ? { ...prev, address: { ...prev.address, line1: e.target.value } } : prev)} 
              />
              <input 
                className="bg-accent text-foreground p-2 px-4 rounded-xl border border-border focus:border-primary focus:outline-none transition-all" 
                type="text" 
                value={userData.address.line2} 
                onChange={(e) => setUserData(prev => prev ? { ...prev, address: { ...prev.address, line2: e.target.value } } : prev)} 
              />
            </div>
          ) : (
            <p className="text-muted-foreground">
              {userData.address.line1} <br /> {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm">
        <p className="text-muted-foreground font-semibold uppercase tracking-wider text-xs mb-5">Basic Information</p>
        <div className="grid grid-cols-[100px_1fr] gap-y-6 text-base items-center">
          <p className="font-medium text-foreground">Gender:</p>
          {isEdit ? (
            <select 
              className="max-w-40 bg-accent text-foreground p-2 px-4 rounded-xl border border-border focus:border-primary focus:outline-none transition-all" 
              onChange={(e) => setUserData(prev => prev ? { ...prev, gender: e.target.value } : prev)} 
              value={userData.gender}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-muted-foreground">{userData.gender}</p>
          )}

          <p className="font-medium text-foreground">Birthday:</p>
          {isEdit ? (
            <input 
              className="max-w-40 bg-accent text-foreground p-2 px-4 rounded-xl border border-border focus:border-primary focus:outline-none transition-all" 
              type="date" 
              onChange={(e) => setUserData(prev => prev ? { ...prev, dob: e.target.value } : prev)} 
              value={userData.dob} 
            />
          ) : (
            <p className="text-muted-foreground">{userData.dob}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        {isEdit ? (
          <button 
            className="bg-primary text-primary-foreground px-10 py-3.5 rounded-full font-semibold hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300" 
            onClick={handleSave}
          >
            Save information
          </button>
        ) : (
          <button 
            className="bg-white text-primary border-2 border-primary px-10 py-3.5 rounded-full font-semibold hover:bg-primary hover:text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300" 
            onClick={() => setIsEdit(true)}
          >
            Edit profile
          </button>
        )}
      </div>

    </div>
  );
}
