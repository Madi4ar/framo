"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';
import Alert from './Alert';
import Toast from './Toast';

const AlertContext = createContext();

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);
  const [toasts, setToasts] = useState([]);

  const addAlert = useCallback((alert) => {
    const id = Date.now() + Math.random();
    const newAlert = { ...alert, id };
    setAlerts(prev => [...prev, newAlert]);
    return id;
  }, []);

  const removeAlert = useCallback((id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const showSuccessAlert = useCallback((title, message, options = {}) => {
    return addAlert({
      type: 'success',
      title,
      message,
      ...options
    });
  }, [addAlert]);

  const showErrorAlert = useCallback((title, message, options = {}) => {
    return addAlert({
      type: 'error',
      title,
      message,
      ...options
    });
  }, [addAlert]);

  const showWarningAlert = useCallback((title, message, options = {}) => {
    return addAlert({
      type: 'warning',
      title,
      message,
      ...options
    });
  }, [addAlert]);

  const showInfoAlert = useCallback((title, message, options = {}) => {
    return addAlert({
      type: 'info',
      title,
      message,
      ...options
    });
  }, [addAlert]);

  const showSuccessToast = useCallback((title, message, options = {}) => {
    return addToast({
      type: 'success',
      title,
      message,
      ...options
    });
  }, [addToast]);

  const showErrorToast = useCallback((title, message, options = {}) => {
    return addToast({
      type: 'error',
      title,
      message,
      ...options
    });
  }, [addToast]);

  const showWarningToast = useCallback((title, message, options = {}) => {
    return addToast({
      type: 'warning',
      title,
      message,
      ...options
    });
  }, [addToast]);

  const showInfoToast = useCallback((title, message, options = {}) => {
    return addToast({
      type: 'info',
      title,
      message,
      ...options
    });
  }, [addToast]);

  const value = {
    alerts,
    toasts,
    addAlert,
    removeAlert,
    addToast,
    removeToast,
    showSuccessAlert,
    showErrorAlert,
    showWarningAlert,
    showInfoAlert,
    showSuccessToast,
    showErrorToast,
    showWarningToast,
    showInfoToast
  };

  return (
    <AlertContext.Provider value={value}>
      {children}
      
      {/* Render Alerts */}
      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => removeAlert(alert.id)}
          showCloseButton={alert.showCloseButton !== false}
          className={alert.className}
        >
          {alert.children}
        </Alert>
      ))}
      
      {/* Render Toasts */}
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          onClose={() => removeToast(toast.id)}
          duration={toast.duration}
          position={toast.position}
          showCloseButton={toast.showCloseButton !== false}
          className={toast.className}
          style={{ 
            top: toast.position?.includes('top') ? `${4 + (index * 80)}px` : undefined,
            bottom: toast.position?.includes('bottom') ? `${4 + (index * 80)}px` : undefined
          }}
        >
          {toast.children}
        </Toast>
      ))}
    </AlertContext.Provider>
  );
}; 