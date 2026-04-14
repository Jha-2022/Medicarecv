import { useContext, useState, useEffect } from 'react';
import { AppContext } from '@/context/AppContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [state, setState] = useState<'Login' | 'Sign Up'>('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();
  const context = useContext(AppContext);

  useEffect(() => {
    if (context?.token) {
      navigate('/');
    }
  }, [context?.token, navigate]);

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!context) return;
    
    // Mock login/register
    const mockToken = "mock_jwt_token_12345";
    context.setToken(mockToken);
    navigate('/');
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="flex flex-col gap-4 m-auto items-start p-10 min-w-[340px] sm:min-w-96 border rounded-3xl bg-card text-muted-foreground shadow-2xl shadow-black/5">
        <h2 className="text-2xl font-bold text-foreground mb-1">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </h2>
        <p className="text-sm mb-4 text-muted-foreground">
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment
        </p>

        {state === 'Sign Up' && (
          <div className="w-full">
            <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
            <input 
              className="border border-border rounded-xl w-full p-3 px-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-background text-foreground" 
              type="text" 
              onChange={(e) => setName(e.target.value)} 
              value={name} 
              required 
              placeholder="John Doe"
            />
          </div>
        )}

        <div className="w-full">
          <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
          <input 
            className="border border-border rounded-xl w-full p-3 px-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-background text-foreground" 
            type="email" 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            required 
            placeholder="hello@example.com"
          />
        </div>

        <div className="w-full">
          <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
          <input 
            className="border border-border rounded-xl w-full p-3 px-4 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-background text-foreground" 
            type="password" 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            required 
            placeholder="••••••••"
          />
        </div>

        <button type="submit" className="bg-primary text-primary-foreground w-full py-3.5 rounded-xl font-semibold text-base mt-4 shadow-lg shadow-primary/25 hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-300">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        <p className="text-sm text-center w-full mt-4">
          {state === 'Sign Up' ? "Already have an account? " : "Create a new account? "}
          <span 
            onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')} 
            className="text-primary font-semibold underline cursor-pointer hover:text-primary/80 transition-colors"
          >
            {state === 'Sign Up' ? 'Login here' : 'Click here'}
          </span>
        </p>

        {/* Mock Admin/Doc Login Links */}
        <div className="w-full flex justify-between mt-6 pt-6 border-t border-border/50 text-xs">
           <span onClick={() => { localStorage.setItem('aToken', 'mock'); window.location.href='/admin' }} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">Admin Login</span>
           <span onClick={() => { localStorage.setItem('dToken', 'mock'); window.location.href='/doctor' }} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors">Doctor Login</span>
        </div>
      </div>
    </form>
  );
}
