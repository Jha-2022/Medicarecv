import { useState, useContext } from 'react';
import { AdminContext } from '@/context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';

export default function AddDoctor() {
  const context = useContext(AdminContext);
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('1 Year');
  const [fees, setFees] = useState('');
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!context) return;

    const docData = {
      name, email, password, experience, fees: Number(fees), about, speciality, degree,
      address: { line1: address1, line2: address2 }
    };

    context.addDoctor(docData);
    navigate('/admin/doctors-list');
  };

  return (
    <form onSubmit={onSubmitHandler} className="w-full max-w-4xl bg-card p-8 rounded-3xl border border-border/60 shadow-sm">
      <p className="mb-8 text-2xl font-bold text-foreground">Add Doctor</p>

      <div className="flex items-center gap-6 mb-8">
        <label htmlFor="doc-img" className="w-24 h-24 bg-accent border-2 border-dashed border-primary/40 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-primary/5 transition-colors group">
           <Upload className="text-primary/60 group-hover:text-primary mb-1" size={24} />
           <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Upload</span>
        </label>
        <input type="file" id="doc-img" hidden />
        <p className="text-muted-foreground text-sm font-medium">Upload doctor <br/> picture</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 text-foreground font-medium text-sm">
        
        {/* Left Column */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label>Doctor name</label>
            <input onChange={e=>setName(e.target.value)} value={name} className="border border-border rounded-xl px-4 py-3 bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" type="text" placeholder="Name" required />
          </div>
          <div className="flex flex-col gap-2">
            <label>Doctor Email</label>
            <input onChange={e=>setEmail(e.target.value)} value={email} className="border border-border rounded-xl px-4 py-3 bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" type="email" placeholder="Email" required />
          </div>
          <div className="flex flex-col gap-2">
            <label>Doctor Password</label>
            <input onChange={e=>setPassword(e.target.value)} value={password} className="border border-border rounded-xl px-4 py-3 bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" type="password" placeholder="Password" required />
          </div>
          <div className="flex flex-col gap-2">
            <label>Experience</label>
            <select onChange={e=>setExperience(e.target.value)} value={experience} className="border border-border rounded-xl px-4 py-3 bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
              {[1,2,3,4,5,6,7,8,9,10].map(yr => <option key={yr} value={`${yr} Year${yr>1?'s':''}`}>{yr} Year{yr>1?'s':''}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label>Fees</label>
            <input onChange={e=>setFees(e.target.value)} value={fees} className="border border-border rounded-xl px-4 py-3 bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" type="number" placeholder="Fees amount" required />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label>Speciality</label>
            <select onChange={e=>setSpeciality(e.target.value)} value={speciality} className="border border-border rounded-xl px-4 py-3 bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
              {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label>Education Degree</label>
            <input onChange={e=>setDegree(e.target.value)} value={degree} className="border border-border rounded-xl px-4 py-3 bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" type="text" placeholder="MBBS, MD..." required />
          </div>
          <div className="flex flex-col gap-2">
            <label>Address</label>
            <input onChange={e=>setAddress1(e.target.value)} value={address1} className="border border-border rounded-xl px-4 py-3 bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all mb-2" type="text" placeholder="Address 1" required />
            <input onChange={e=>setAddress2(e.target.value)} value={address2} className="border border-border rounded-xl px-4 py-3 bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all" type="text" placeholder="Address 2" required />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-8">
        <label className="font-medium text-sm text-foreground">About Doctor</label>
        <textarea onChange={e=>setAbout(e.target.value)} value={about} className="border border-border rounded-xl px-4 py-3 bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all min-h-[120px]" placeholder="Write about doctor..." required />
      </div>

      <button type="submit" className="bg-primary text-white px-12 py-4 rounded-full font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 hover:-translate-y-0.5 transition-all w-full sm:w-auto">
        Add doctor
      </button>
    </form>
  );
}
