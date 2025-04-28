import React from 'react';
import { Product } from '../../types';
import { Link } from 'react-router-dom';
import { Tag, Clock } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Format the date to a readable string
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.title} 
            className="w-full h-full object-cover"
          />
          {product.isFree && (
            <div className="absolute top-0 left-0 bg-emerald-500 text-white py-1 px-3 rounded-br-lg font-medium">
              Free
            </div>
          )}
          {product.isSold && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-500 text-white py-2 px-4 rounded-full font-bold">SOLD</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-lg font-semibold line-clamp-1 text-gray-800">
            <Link to={`/products/${product.id}`} className="hover:text-emerald-600 transition-colors">
              {product.title}
            </Link>
          </h3>
          <span className="text-lg font-bold text-emerald-600">
            {product.isFree ? 'FREE' : formatCurrency(product.price)}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center text-xs text-gray-500">
            <Tag className="h-3.5 w-3.5 mr-1" />
            <span className="capitalize">{product.category}</span>
          </div>
          <span className="text-gray-400">•</span>
          <div className="flex items-center text-xs text-gray-500">
            <Clock className="h-3.5 w-3.5 mr-1" />
            <span>{formatDate(product.createdAt)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img 
              src={product.seller.avatar || 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100'} 
              alt={product.seller.name} 
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs text-gray-500">{product.seller.name}</span>
          </div>
          <span className="text-xs text-gray-500">{product.college}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;