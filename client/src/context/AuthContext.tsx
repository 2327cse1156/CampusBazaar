import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  college: string;
  collegeId: string;
  avatar?: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: Omit<User, 'id'>) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('campusbazaar-current-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('campusbazaar-users') || '[]') as User[];
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      localStorage.setItem('campusbazaar-current-user', JSON.stringify(foundUser));
      setUser(foundUser);
      return true;
    } else {
      return false;
    }
  };

  const register = async (data: Omit<User, 'id'>) => {
    const users = JSON.parse(localStorage.getItem('campusbazaar-users') || '[]') as User[];

    const emailAlreadyExists = users.some(u => u.email === data.email);
    if (emailAlreadyExists) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      ...data,
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem('campusbazaar-users', JSON.stringify(updatedUsers));
    localStorage.setItem('campusbazaar-current-user', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('campusbazaar-current-user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
