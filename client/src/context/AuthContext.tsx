import React, { createContext, useContext } from 'react';
import { useUser, useAuth as useClerkAuth } from '@clerk/clerk-react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>; // 👈 ADD logout
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoaded: isClerkLoaded, isSignedIn, signOut } = useClerkAuth(); // 👈 get signOut from Clerk
  const { user: clerkUser } = useUser();

  const user: User | null = clerkUser ? {
    id: clerkUser.id,
    name: `${clerkUser.firstName} ${clerkUser.lastName}`,
    email: clerkUser.primaryEmailAddress?.emailAddress || '',
    college: (clerkUser.publicMetadata.college as string) || 'Not specified',
    avatar: clerkUser.imageUrl,
    isAdmin: (clerkUser.publicMetadata.isAdmin as boolean) || false
  } : null;

  const logout = async () => {
    await signOut(); // 👈 Clerk logout
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!isSignedIn,
        isLoading: !isClerkLoaded,
        logout, // 👈 PROVIDE logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
