import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, ShoppingBag, DollarSign, MessageCircle, Tag } from 'lucide-react';
import Layout from '../components/layout/Layout';
import ProductList from '../components/products/ProductList';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { useChat } from '../context/ChatContext';
import { Product } from '../types';

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { products, getUserProducts, isLoading } = useProducts();
  const { conversations } = useChat();
  const [activeTab, setActiveTab] = useState<'buying' | 'selling'>('buying');
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    if (user) {
      const userProducts = getUserProducts(user.id);
      setMyProducts(userProducts);
    }
  }, [user, getUserProducts, products]);

  // Get most recent products for the "buying" tab
  const recentProducts = [...products]
    .filter(product => !product.isSold && product.seller.id !== user?.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  // Separate active listings from sold ones
  const activeListings = myProducts.filter(product => !product.isSold);
  const soldListings = myProducts.filter(product => product.isSold);

  // Calculate statistics
  const totalListings = myProducts.length;
  const totalActiveSales = activeListings.length;
  const totalSold = soldListings.length;
  const totalEarned = soldListings.reduce((sum, product) => sum + product.price, 0);
  const unreadMessages = conversations.reduce((count, conv) => count + conv.unreadCount, 0);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome back, {user?.name?.split(' ')[0] || 'User'}!
            </h1>
            <p className="text-gray-600">
              Manage your marketplace activities
            </p>
          </div>
          <Link to="/sell">
            <Button
              variant="primary"
              icon={<PlusCircle className="h-5 w-5" />}
              className="mt-4 md:mt-0"
            >
              Sell an Item
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">My Listings</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-1">{totalListings}</h3>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <ShoppingBag className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {totalActiveSales} active, {totalSold} sold
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">Sales</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-1">{totalSold}</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Tag className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {totalActiveSales} active listings
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">Earned</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-1">
                  ${totalEarned.toFixed(0)}
                </h3>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              From {totalSold} completed sales
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">Messages</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-1">
                  {conversations.length}
                </h3>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <MessageCircle className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {unreadMessages} unread messages
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('buying')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'buying'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Buying
            </button>
            <button
              onClick={() => setActiveTab('selling')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'selling'
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Selling
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'buying' ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Recently Added</h2>
              <Link
                to="/products"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                View all products
              </Link>
            </div>
            <ProductList
              products={recentProducts}
              loading={isLoading}
              emptyMessage="No products available. Check back later for new listings!"
            />
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">My Active Listings</h2>
              <Link
                to="/sell"
                className="text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Add new listing
              </Link>
            </div>
            <ProductList
              products={activeListings}
              loading={isLoading}
              emptyMessage="You don't have any active listings. Click 'Sell an Item' to get started!"
            />

            {soldListings.length > 0 && (
              <>
                <div className="mt-12 mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Sold Items</h2>
                </div>
                <ProductList products={soldListings} />
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DashboardPage;