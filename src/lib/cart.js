// src/lib/cart.js

const CART_STORAGE_KEY = 'cart_items';

// Get cart from localStorage
export const getCart = () => {
  if (typeof window === 'undefined') return [];
  
  try {
    const cart = localStorage.getItem(CART_STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return [];
  }
};

// Save cart to localStorage
export const saveCart = (cart) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    // Dispatch custom event for cart updates
    window.dispatchEvent(new Event('cartUpdated'));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Add item to cart
export const addToCart = (item) => {
  const cart = getCart();
  
  // Check if item already exists in cart (same product and variant)
  const existingItemIndex = cart.findIndex(
    cartItem => cartItem.product_id === item.product_id && 
                cartItem.variant_id === item.variant_id
  );

  if (existingItemIndex !== -1) {
    // Update quantity if item exists
    const newQuantity = cart[existingItemIndex].quantity + 1;
    if (newQuantity <= cart[existingItemIndex].max_quantity) {
      cart[existingItemIndex].quantity = newQuantity;
    }
  } else {
    // Add new item
    cart.push(item);
  }

  saveCart(cart);
  return cart;
};

// Remove item from cart
export const removeFromCart = (productId, variantId) => {
  const cart = getCart();
  const updatedCart = cart.filter(
    item => !(item.product_id === productId && item.variant_id === variantId)
  );
  saveCart(updatedCart);
  return updatedCart;
};

// Update item quantity
export const updateCartItemQuantity = (productId, variantId, newQuantity) => {
  const cart = getCart();
  const itemIndex = cart.findIndex(
    item => item.product_id === productId && item.variant_id === variantId
  );

  if (itemIndex !== -1) {
    if (newQuantity <= 0) {
      // Remove item if quantity is 0 or negative
      cart.splice(itemIndex, 1);
    } else {
      // Update quantity if within limits
      const maxQuantity = cart[itemIndex].max_quantity;
      cart[itemIndex].quantity = Math.min(newQuantity, maxQuantity);
    }
  }

  saveCart(cart);
  return cart;
};

// Clear entire cart
export const clearCart = () => {
  saveCart([]);
};

// Get cart total items count
export const getCartCount = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};

// Get cart subtotal
export const getCartSubtotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.sale_price * item.quantity), 0);
};

// Get cart total with discounts
export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.sale_price * item.quantity), 0);
};