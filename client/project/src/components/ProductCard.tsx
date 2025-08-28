import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Tag, Clock, Truck, Plus, Award, Store, Heart } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import ProductRating from './ProductRating';
import WishlistButton from './WishlistButton';

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
  variant?: 'default' | 'compact' | 'featured';
}

export default function ProductCard({ product, showCategory = false, variant = 'default' }: ProductCardProps) {
  const { state, dispatch } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleProductView = () => {
    dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', payload: product.id });
  };

  const discountedPrice = product.discount > 0 
    ? product.prixTTC * (1 - product.discount / 100)
    : product.prixTTC;

  const isInCart = state.cart.some(item => item.product.id === product.id);
  const cartQuantity = state.cart.find(item => item.product.id === product.id)?.quantity || 0;

  if (variant === 'compact') {
    return (
      <Link 
        to={`/product/${product.id}`} 
        className="group cursor-pointer block h-full"
        onClick={handleProductView}
      >
        <div className="bg-white/70 dark:bg-neutral-800/70 backdrop-blur-soft rounded-soft-lg shadow-soft hover:shadow-soft-lg transform hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-white/20 dark:border-neutral-700/30 h-full flex flex-col">
          <div className="relative overflow-hidden">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.imageURL}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.feature && (
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-soft flex items-center gap-1">
                  <Award className="w-3 h-3" />
                  En vedette
                </div>
              )}
              {product.discount > 0 && (
                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-soft flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  -{product.discount}%
                </div>
              )}
              {product.stockQuantity > 0 && product.stockQuantity < 10 && (
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium shadow-soft">
                  {product.stockQuantity} restants
                </div>
              )}
            </div>

            {/* Wishlist button */}
            <div className="absolute top-3 right-3">
              <WishlistButton productId={product.id} variant="floating" size="sm" />
            </div>

            {/* Quick add button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stockQuantity === 0}
              className="absolute bottom-3 right-3 w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full flex items-center justify-center shadow-soft hover:shadow-glow transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed opacity-0 group-hover:opacity-100"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="p-4 flex flex-col flex-1">
            <h3 className="font-semibold text-neutral-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 mb-2 text-sm">
              {product.name}
            </h3>
            
            <div className="mb-3">
              <ProductRating product={product} compact={true} showReviews={false} />
            </div>
            
            {/* Fournisseur info */}
            {product.fournisseurName && (
              <div className="flex items-center gap-1 mb-2">
                <Store className="w-3 h-3 text-neutral-500 dark:text-neutral-400" />
                <span className="text-xs text-neutral-600 dark:text-neutral-400">
                  {product.fournisseurName}
                </span>
              </div>
            )}
            
            <div className="flex items-center justify-between mt-auto">
              <div className="flex flex-col">
                {product.discount > 0 && (
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 line-through">
                    {product.prixTTC.toFixed(2)} TND
                  </span>
                )}
                <span className="font-bold text-primary-600 dark:text-primary-400 text-sm">
                  {discountedPrice.toFixed(2)} TND
                </span>
              </div>
              
              {isInCart && (
                <div className="flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                  <ShoppingCart className="w-3 h-3" />
                  <span>{cartQuantity}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group cursor-pointer block h-full"
      onClick={handleProductView}
    >
      <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-soft rounded-soft-xl shadow-soft hover:shadow-soft-xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-white/40 dark:border-neutral-700/40 hover:border-primary-200 dark:hover:border-primary-800 h-full flex flex-col">
        <div className="relative overflow-hidden">
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={product.imageURL}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.feature && (
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-soft-lg flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                En vedette
              </div>
            )}
            {product.discount > 0 && (
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-soft-lg flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                -{product.discount}%
              </div>
            )}
            {product.stockQuantity > 0 && product.stockQuantity < 10 && (
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-soft-lg">
                Il ne reste que {product.stockQuantity}
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <WishlistButton productId={product.id} variant="floating" />
          </div>

          {/* Quick info overlay */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-white/95 dark:bg-neutral-800/95 backdrop-blur-soft rounded-soft p-3 shadow-soft-lg">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span className="text-green-600 font-medium">15-20 min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-primary-600" />
                  <span className="text-primary-600 font-medium">Livraison gratuite</span>
                </div>
              </div>
            </div>
          </div>

          {/* Out of stock overlay */}
          {product.stockQuantity === 0 && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-white/90 dark:bg-neutral-800/90 backdrop-blur-soft px-6 py-3 rounded-full shadow-soft-lg">
                <span className="text-neutral-800 dark:text-white font-semibold">Rupture de stock</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6 flex flex-col flex-1">
          {/* Fixed height container for consistent alignment */}
          <div className="flex flex-col h-full">
            {/* Title section - fixed height */}
            <div className="h-14 mb-3">
              <h3 className="text-lg font-bold text-neutral-800 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2 leading-tight">
                {product.name}
              </h3>
            </div>
            
            {/* Description section - fixed height */}
            <div className="h-12 mb-4">
              <p className="text-neutral-600 dark:text-neutral-300 text-sm line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            </div>
            
            {/* Fournisseur info - fixed height */}
            <div className="h-6 mb-3">
              {product.fournisseurName && (
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300 font-medium truncate">
                    {product.fournisseurName}
                  </span>
                </div>
              )}
            </div>
            
            {/* Tags section - fixed height */}
            <div className="h-8 mb-4">
              {product.Tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {product.Tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gradient-to-r from-primary-50 to-soft-50 dark:from-primary-900/30 dark:to-soft-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full font-medium border border-primary-100 dark:border-primary-800 truncate"
                    >
                      {tag}
                    </span>
                  ))}
                  {product.Tags.length > 2 && (
                    <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-xs rounded-full border border-neutral-200 dark:border-neutral-600">
                      +{product.Tags.length - 2}
                    </span>
                  )}
                </div>
              )}
            </div>
            
            {/* Rating section - fixed height */}
            <div className="h-6 mb-4">
              <ProductRating product={product} compact={true} showReviews={false} />
            </div>
            
            {/* Price and action section - fixed at bottom */}
            <div className="mt-auto">
              {/* Price section */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col">
                  {product.discount > 0 && (
                    <span className="text-sm text-neutral-500 dark:text-neutral-400 line-through">
                      {product.prixTTC.toFixed(2)} TND
                    </span>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                      {discountedPrice.toFixed(2)} TND
                    </span>
                    <span className="text-sm text-neutral-600 dark:text-neutral-400">par {product.unit}</span>
                  </div>
                </div>
                
                {isInCart && (
                  <div className="flex items-center gap-1.5 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 px-3 py-1.5 rounded-full text-sm font-medium border border-green-200 dark:border-green-800">
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>{cartQuantity}</span>
                  </div>
                )}
              </div>
              
              {/* Action button */}
              <button
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0}
                className="w-full px-4 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium rounded-soft shadow-soft hover:shadow-glow transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{product.stockQuantity === 0 ? 'Rupture de stock' : isInCart ? 'Ajouter plus' : 'Ajouter'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}