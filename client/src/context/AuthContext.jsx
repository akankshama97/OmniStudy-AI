import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

// Use relative '/api' so Vite proxy works in dev, and production server proxy works in prod
const API_BASE = '/api';

export const DEFAULT_GUEST_USER = {
  id: 'guest_student',
  name: 'Student',
  email: 'student@omnistudy.ai',
  isGuest: true
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(DEFAULT_GUEST_USER);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('omni_token');
    if (token) {
      setLoading(true);
      const source = axios.CancelToken.source();
      const timeoutId = setTimeout(() => {
        source.cancel('Auth verification timeout');
        setLoading(false);
      }, 2000);

      axios.get(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
        cancelToken: source.token,
        timeout: 2000
      }).then(res => {
        clearTimeout(timeoutId);
        if (res.data?.success && res.data?.user) {
          setUser({ ...res.data.user, isGuest: false });
        } else {
          localStorage.removeItem('omni_token');
          setUser(DEFAULT_GUEST_USER);
        }
      }).catch(() => {
        clearTimeout(timeoutId);
        localStorage.removeItem('omni_token');
        setUser(DEFAULT_GUEST_USER);
      }).finally(() => {
        setLoading(false);
      });
    } else {
      setUser(DEFAULT_GUEST_USER);
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    setError(null);
    const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
    if (res.data.success) {
      localStorage.setItem('omni_token', res.data.token);
      setUser({ ...res.data.user, isGuest: false });
      setShowAuthModal(false);
      return true;
    }
    throw new Error(res.data.error || 'Login failed');
  };

  const register = async (name, email, password) => {
    setError(null);
    const res = await axios.post(`${API_BASE}/auth/register`, { name, email, password });
    if (res.data.success) {
      localStorage.setItem('omni_token', res.data.token);
      setUser({ ...res.data.user, isGuest: false });
      setShowAuthModal(false);
      return true;
    }
    throw new Error(res.data.error || 'Registration failed');
  };

  const logout = () => {
    localStorage.removeItem('omni_token');
    setUser(DEFAULT_GUEST_USER);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      login,
      register,
      logout,
      showAuthModal,
      setShowAuthModal
    }}>
      {children}
    </AuthContext.Provider>
  );
}
