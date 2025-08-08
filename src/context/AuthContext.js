import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// Simulated user database (in-memory)
const mockUserDB = [];

const validateUserData = (userData) => {
  const errors = [];
  if (!userData.email) errors.push('Email is required');
  if (!userData.password) errors.push('Password is required');
  if (userData.password && userData.password.length < 6)
    errors.push('Password must be at least 6 characters');
  return errors;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulate login
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const errors = validateUserData({ email, password });
      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }
      const foundUser = mockUserDB.find(u => u.email === email && u.password === password);
      if (!foundUser) {
        throw new Error('Invalid email or password');
      }
      setUser({ email: foundUser.email });
      setIsLoggedIn(true);
      return { success: true, user: { email: foundUser.email } };
    } catch (err) {
      setError(err.message || 'Login failed');
      return { success: false, message: err.message || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  // Simulate register
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const errors = validateUserData(userData);
      if (errors.length > 0) {
        throw new Error(errors.join(', '));
      }
      const exists = mockUserDB.some(u => u.email === userData.email);
      if (exists) {
        throw new Error('User already exists');
      }
      mockUserDB.push({ ...userData });
      setUser({ email: userData.email });
      setIsLoggedIn(true);
      return { success: true, user: { email: userData.email } };
    } catch (err) {
      setError(err.message || 'Registration failed');
      return { success: false, message: err.message || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  // Simulate logout
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setError(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn,
      loading,
      error,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
