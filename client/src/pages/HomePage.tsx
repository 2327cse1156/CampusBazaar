import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, ArrowRight, BookOpen, Laptop, ShoppingCart, DollarSign, MessageCircle, Award } from 'lucide-react';
import Layout from '../components/layout/Layout';
import { useProducts } from '../context/ProductContext';
import ProductList from "../components/products/ProductList"

const HomePage: React.FC = () => {
  const { products, isLoading } = useProducts();
  
  // Get the most recent 4 products
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="max-w-lg">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Buy, Sell, and Exchange Within Your Campus Community
              </h1>
              <p className="text-lg mb-8 text-emerald-100">
                CampusBazaar connects college students to buy and sell textbooks, electronics, 
                furniture, and more. Save money and reduce waste by trading within your campus.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/products"
                  className="bg-white text-emerald-700 hover:bg-emerald-50 py-3 px-6 rounded-lg font-bold text-center transition-colors flex items-center justify-center"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Browse Products
                </Link>
                <Link
                  to="/sell"
                  className="bg-emerald-800 text-white hover:bg-emerald-900 py-3 px-6 rounded-lg font-bold text-center transition-colors flex items-center justify-center"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Sell an Item
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center relative">
              <div className="bg-white p-5 rounded-lg shadow-xl transform rotate-3 absolute top-10 -left-8 z-10">
                <img 
                  src="https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Student selling textbook" 
                  className="w-64 h-48 object-cover rounded"
                />
              </div>
              <div className="bg-white p-5 rounded-lg shadow-xl z-20">
                <img 
                  src="https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Student marketplace" 
                  className="w-64 h-48 object-cover rounded"
                />
              </div>
              <div className="bg-white p-5 rounded-lg shadow-xl transform -rotate-3 absolute bottom-10 -right-8 z-10">
                <img 
                  src="https://images.pexels.com/photos/6646915/pexels-photo-6646915.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Students exchanging items" 
                  className="w-64 h-48 object-cover rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Browse by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find exactly what you need for your college life by exploring our categories
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-6 gap-6">
            <Link 
              to="/products?category=books" 
              className="bg-white p-6 rounded-lg shadow-md text-center transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="bg-emerald-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Books</h3>
            </Link>
            
            <Link 
              to="/products?category=electronics" 
              className="bg-white p-6 rounded-lg shadow-md text-center transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="bg-blue-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Laptop className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Electronics</h3>
            </Link>
            
            <Link 
              to="/products?category=furniture" 
              className="bg-white p-6 rounded-lg shadow-md text-center transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="bg-amber-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <DollarSign className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Furniture</h3>
            </Link>
            
            <Link 
              to="/products?category=clothing" 
              className="bg-white p-6 rounded-lg shadow-md text-center transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="bg-purple-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <ShoppingCart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Clothing</h3>
            </Link>
            
            <Link 
              to="/products?category=hostel" 
              className="bg-white p-6 rounded-lg shadow-md text-center transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="bg-red-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Hostel Essentials</h3>
            </Link>
            
            <Link 
              to="/products?category=sports" 
              className="bg-white p-6 rounded-lg shadow-md text-center transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="bg-orange-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-800">Sports</h3>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Listings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Recent Listings</h2>
            <Link 
              to="/products" 
              className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center"
            >
              View all
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <ProductList products={recentProducts} loading={isLoading} />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How CampusBazaar Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to buy and sell within your college community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-emerald-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <ShoppingBag className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">List Your Items</h3>
              <p className="text-gray-600">
                Take photos, write a description, and set your price. Your items will be visible to students at your college.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-emerald-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <MessageCircle className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Connect & Chat</h3>
              <p className="text-gray-600">
                Interested buyers can message you directly through our platform to ask questions or arrange meetups.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-emerald-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
                <DollarSign className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Complete the Sale</h3>
              <p className="text-gray-600">
                Meet in person to exchange the item and payment. Mark your item as sold once the transaction is complete.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/register"
              className="bg-emerald-600 text-white hover:bg-emerald-700 py-3 px-8 rounded-lg font-bold inline-flex items-center transition-colors"
            >
              Join CampusBazaar
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;