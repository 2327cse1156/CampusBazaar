import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { SignUp } from '@clerk/clerk-react';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center text-emerald-600 mb-5">
          <ShoppingBag className="h-10 w-10" />
        </Link>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Join CampusBazaar
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create an account to start buying and selling
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <SignUp routing="path" path="/register" signInUrl="/login" />
      </div>
    </div>
  );
};

export default RegisterPage;