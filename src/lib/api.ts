import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// Attach token from localStorage
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    try {
      const auth = JSON.parse(localStorage.getItem('savaria-auth') || '{}');
      const token = auth?.state?.token;
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch {}
  }
  return config;
});

// Auth
export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) => api.post('/auth/reset-password', { token, password }),
};

// Products
export const productsAPI = {
  getAll: (params?: any) => api.get('/products', { params }),
  getOne: (id: string) => api.get(`/products/${id}`),
  create: (data: any) => api.post('/products', data),
  update: (id: string, data: any) => api.put(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};

// Categories
export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  create: (data: any) => api.post('/categories', data),
  delete: (id: string) => api.delete('/categories', { data: { id } }),
};

// Orders
export const ordersAPI = {
  getAll: (params?: any) => api.get('/orders', { params }),
  getOne: (id: string) => api.get(`/orders/${id}`),
  create: (data: any) => api.post('/orders', data),
  updateStatus: (id: string, data: any) => api.put(`/orders/${id}`, data),
};

// Cart
export const cartAPI = {
  get: () => api.get('/cart'),
  add: (data: any) => api.post('/cart', data),
  update: (data: any) => api.put('/cart', data),
  remove: (id: string) => api.delete('/cart', { data: { id } }),
};

// Wishlist
export const wishlistAPI = {
  get: () => api.get('/wishlist'),
  toggle: (productId: string) => api.post('/wishlist', { productId }),
};

// Banners
export const bannersAPI = {
  getAll: () => api.get('/banners'),
  create: (data: any) => api.post('/banners', data),
  update: (data: any) => api.put('/banners', data),
  delete: (id: string) => api.delete('/banners', { data: { id } }),
};

// Coupons
export const couponsAPI = {
  validate: (code: string) => api.get(`/coupons?code=${code}`),
  getAll: () => api.get('/coupons'),
  create: (data: any) => api.post('/coupons', data),
  delete: (id: string) => api.delete('/coupons', { data: { id } }),
};

// Reviews
export const reviewsAPI = {
  getAll: () => api.get('/reviews'),
  create: (data: any) => api.post('/reviews', data),
};

// Payment
export const paymentAPI = {
  createOrder: (amount: number) => api.post('/payment/create-order', { amount }),
  verify: (data: any) => api.post('/payment/verify', data),
};

// Admin
export const adminAPI = {
  analytics: () => api.get('/admin/analytics'),
  users: () => api.get('/admin/users'),
};

// User
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data: any) => api.put('/user/profile', data),
  getAddresses: () => api.get('/user/addresses'),
  addAddress: (data: any) => api.post('/user/addresses', data),
  deleteAddress: (id: string) => api.delete('/user/addresses', { data: { id } }),
};

export default api;
