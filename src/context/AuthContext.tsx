import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - in a real app, this would come from an API
const mockUsers: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1234567890',
    address: '123 Main St, City, Country',
    userType: 'bidder'
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        localStorage.removeItem('user');
        setAuthState({ user: null, isAuthenticated: false, isLoading: false });
      }
    } else {
      setAuthState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find(u => u.email === email);
        
        if (user && password === 'password123') {
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
          localStorage.setItem('user', JSON.stringify(user));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const register = async (userData: Omit<User, 'id'>): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingUser = mockUsers.find(u => u.email === userData.email);
        
        if (existingUser) {
          resolve(false);
          return;
        }
        
        const newUser: User = {
          id: `${mockUsers.length + 1}`,
          ...userData
        };
        
        mockUsers.push(newUser);
        
        setAuthState({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
        });
        
        localStorage.setItem('user', JSON.stringify(newUser));
        resolve(true);
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};