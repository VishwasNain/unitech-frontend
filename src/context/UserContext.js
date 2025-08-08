import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resetPasswordStep, setResetPasswordStep] = useState(0); // 0: initial, 1: enter mobile, 2: enter OTP
  const [resetMobile, setResetMobile] = useState('');
  const [resetOTP, setResetOTP] = useState('');
  const [resetError, setResetError] = useState('');

  // No localStorage or backend: always start with no user
  useEffect(() => {
    setLoading(false);
  }, []);

  // In-memory mock user DB
  const mockUserDB = React.useRef([
    { name: 'Test User', email: 'test@example.com', password: 'password123', mobile: '1234567890', role: 'customer', createdAt: new Date().toISOString() }
  ]);

  const validateUserData = (userData) => {
    const errors = [];
    if (!userData.email) errors.push('Email is required');
    if (!userData.password) errors.push('Password is required');
    if (userData.password && userData.password.length < 6)
      errors.push('Password must be at least 6 characters');
    return errors;
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const errors = validateUserData({ email, password });
      if (errors.length > 0) {
        return { success: false, message: errors.join(', ') };
      }
      const foundUser = mockUserDB.current.find(u => u.email === email && u.password === password);
      if (!foundUser) {
        return { success: false, message: 'Invalid email or password' };
      }
      setUser({ ...foundUser, password: undefined });
      return { success: true, message: 'Login successful' };
    } catch (error) {
      return { success: false, message: 'Login failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, mobile) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const errors = validateUserData({ email, password });
      if (!name) errors.push('Name is required');
      if (!mobile) errors.push('Mobile is required');
      if (errors.length > 0) {
        return { success: false, message: errors.join(', ') };
      }
      const exists = mockUserDB.current.some(u => u.email === email);
      if (exists) {
        return { success: false, message: 'User already exists' };
      }
      const newUser = { name, email, password, mobile, role: 'customer', createdAt: new Date().toISOString() };
      mockUserDB.current.push(newUser);
      setUser({ ...newUser, password: undefined });
      return { success: true, message: 'Registration successful' };
    } catch (error) {
      return { success: false, message: 'Registration failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };


  const requestPasswordReset = async (mobile) => {
    setLoading(true);
    setResetError('');
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful OTP request
      setResetMobile(mobile);
      setResetPasswordStep(2);
      return { success: true, message: 'OTP sent successfully. Please check your mobile.' };
    } catch (error) {
      return { success: false, message: 'Failed to send OTP. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (otp) => {
    setLoading(true);
    setResetError('');
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful OTP verification
      setResetPasswordStep(3);
      return { success: true, message: 'OTP verified successfully. You can now reset your password.' };
    } catch (error) {
      return { success: false, message: 'Invalid OTP. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (newPassword) => {
    setLoading(true);
    setResetError('');
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate successful password reset
      return { success: true, message: 'Password reset successful. You can now login with your new password.' };
    } catch (error) {
      return { success: false, message: 'Failed to reset password. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };


  const value = {
    user,
    loading,
    login,
    register,
    logout,
    resetPasswordStep,
    resetMobile,
    resetOTP,
    resetError,
    requestPasswordReset,
    verifyOTP,
    resetPassword,
    setResetPasswordStep,
    setResetMobile,
    setResetOTP,
    setResetError
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
