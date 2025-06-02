import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Card, { CardHeader, CardBody, CardFooter } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { LogIn } from 'lucide-react';

interface LocationState {
  from?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const locationState = location.state as LocationState;
  const from = locationState?.from || '/profile';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const success = await login(email, password);
      
      if (success) {
        navigate(from);
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred while logging in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center animate-fade-in">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>
        
        <Card className="animate-slide-up">
          <form onSubmit={handleSubmit}>
            <CardBody>
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                  {error}
                </div>
              )}
              
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
              />
              
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                required
              />
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                    Forgot password?
                  </a>
                </div>
              </div>
            </CardBody>
            
            <CardFooter className="flex flex-col">
              <Button 
                type="submit" 
                variant="primary" 
                fullWidth 
                isLoading={isLoading}
                icon={<LogIn size={20} />}
              >
                Sign in
              </Button>
              
              <div className="mt-4 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
        
        {/* Demo info - for testing purposes */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md shadow-sm">
          <h3 className="text-sm font-medium text-blue-800">Demo Credentials</h3>
          <p className="mt-1 text-sm text-blue-600">
            Email: john@example.com<br />
            Password: password123
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;