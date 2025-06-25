"use client";

import React from 'react';

const Alert = ({ 
  type = 'success', 
  title, 
  message, 
  onClose, 
  showCloseButton = true,
  className = '',
  children 
}) => {
  const alertConfig = {
    success: {
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-500',
      iconBg: 'bg-green-500',
      titleColor: 'text-green-800 dark:text-green-200',
      messageColor: 'text-green-700 dark:text-green-300',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_961_15637)">
            <path d="M8.99998 0.506248C4.3031 0.506248 0.506226 4.30312 0.506226 9C0.506226 13.6969 4.3031 17.5219 8.99998 17.5219C13.6969 17.5219 17.5219 13.6969 17.5219 9C17.5219 4.30312 13.6969 0.506248 8.99998 0.506248ZM8.99998 16.2562C5.00623 16.2562 1.77185 12.9937 1.77185 9C1.77185 5.00625 5.00623 1.77187 8.99998 1.77187C12.9937 1.77187 16.2562 5.03437 16.2562 9.02812C16.2562 12.9937 12.9937 16.2562 8.99998 16.2562Z" fill="white"/>
            <path d="M11.4187 6.38437L8.07183 9.64687L6.55308 8.15625C6.29996 7.90312 5.90621 7.93125 5.65308 8.15625C5.39996 8.40937 5.42808 8.80312 5.65308 9.05625L7.45308 10.8C7.62183 10.9687 7.84683 11.0531 8.07183 11.0531C8.29683 11.0531 8.52183 10.9687 8.69058 10.8L12.3187 7.3125C12.5718 7.05937 12.5718 6.66562 12.3187 6.4125C12.0656 6.15937 11.6718 6.15937 11.4187 6.38437Z" fill="white"/>
          </g>
          <defs>
            <clipPath id="clip0_961_15637">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )
    },
    error: {
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-500',
      iconBg: 'bg-red-500',
      titleColor: 'text-red-800 dark:text-red-200',
      messageColor: 'text-red-700 dark:text-red-300',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 0.506248C4.3031 0.506248 0.506226 4.30312 0.506226 9C0.506226 13.6969 4.3031 17.5219 9 17.5219C13.6969 17.5219 17.5219 13.6969 17.5219 9C17.5219 4.30312 13.6969 0.506248 9 0.506248ZM9 16.2562C5.00623 16.2562 1.77185 12.9937 1.77185 9C1.77185 5.00625 5.00623 1.77187 9 1.77187C12.9937 1.77187 16.2562 5.03437 16.2562 9.02812C16.2562 12.9937 12.9937 16.2562 9 16.2562Z" fill="white"/>
          <path d="M12.3187 5.68125L10.3187 7.68125L12.3187 9.68125C12.5718 9.93437 12.5718 10.3281 12.3187 10.5812C12.0656 10.8344 11.6718 10.8344 11.4187 10.5812L9.4187 8.58125L7.4187 10.5812C7.16558 10.8344 6.77183 10.8344 6.5187 10.5812C6.26558 10.3281 6.26558 9.93437 6.5187 9.68125L8.5187 7.68125L6.5187 5.68125C6.26558 5.42812 6.26558 5.03437 6.5187 4.78125C6.77183 4.52812 7.16558 4.52812 7.4187 4.78125L9.4187 6.78125L11.4187 4.78125C11.6718 4.52812 12.0656 4.52812 12.3187 4.78125C12.5718 5.03437 12.5718 5.42812 12.3187 5.68125Z" fill="white"/>
        </svg>
      )
    },
    warning: {
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-500',
      iconBg: 'bg-yellow-500',
      titleColor: 'text-yellow-800 dark:text-yellow-200',
      messageColor: 'text-yellow-700 dark:text-yellow-300',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 0.506248C4.3031 0.506248 0.506226 4.30312 0.506226 9C0.506226 13.6969 4.3031 17.5219 9 17.5219C13.6969 17.5219 17.5219 13.6969 17.5219 9C17.5219 4.30312 13.6969 0.506248 9 0.506248ZM9 16.2562C5.00623 16.2562 1.77185 12.9937 1.77185 9C1.77185 5.00625 5.00623 1.77187 9 1.77187C12.9937 1.77187 16.2562 5.03437 16.2562 9.02812C16.2562 12.9937 12.9937 16.2562 9 16.2562Z" fill="white"/>
          <path d="M9 4.5C9.82843 4.5 10.5 5.17157 10.5 6C10.5 6.82843 9.82843 7.5 9 7.5C8.17157 7.5 7.5 6.82843 7.5 6C7.5 5.17157 8.17157 4.5 9 4.5Z" fill="white"/>
          <path d="M9 8.25C9.41421 8.25 9.75 8.58579 9.75 9V12.75C9.75 13.1642 9.41421 13.5 9 13.5C8.58579 13.5 8.25 13.1642 8.25 12.75V9C8.25 8.58579 8.58579 8.25 9 8.25Z" fill="white"/>
        </svg>
      )
    },
    info: {
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-500',
      iconBg: 'bg-blue-500',
      titleColor: 'text-blue-800 dark:text-blue-200',
      messageColor: 'text-blue-700 dark:text-blue-300',
      icon: (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 0.506248C4.3031 0.506248 0.506226 4.30312 0.506226 9C0.506226 13.6969 4.3031 17.5219 9 17.5219C13.6969 17.5219 17.5219 13.6969 17.5219 9C17.5219 4.30312 13.6969 0.506248 9 0.506248ZM9 16.2562C5.00623 16.2562 1.77185 12.9937 1.77185 9C1.77185 5.00625 5.00623 1.77187 9 1.77187C12.9937 1.77187 16.2562 5.03437 16.2562 9.02812C16.2562 12.9937 12.9937 16.2562 9 16.2562Z" fill="white"/>
          <path d="M9 4.5C9.82843 4.5 10.5 5.17157 10.5 6C10.5 6.82843 9.82843 7.5 9 7.5C8.17157 7.5 7.5 6.82843 7.5 6C7.5 5.17157 8.17157 4.5 9 4.5Z" fill="white"/>
          <path d="M9 8.25C9.41421 8.25 9.75 8.58579 9.75 9V12.75C9.75 13.1642 9.41421 13.5 9 13.5C8.58579 13.5 8.25 13.1642 8.25 12.75V9C8.25 8.58579 8.58579 8.25 9 8.25Z" fill="white"/>
        </svg>
      )
    }
  };

  const config = alertConfig[type] || alertConfig.success;

  return (
    <div className={`py-10 bg-white dark:bg-dark ${className}`}>
      <div className="container">
        <div className={`${config.bgColor} flex w-full rounded-lg border-l-[6px] ${config.borderColor} px-7 py-8 md:p-9`}>
          <div className={`${config.iconBg} mr-5 flex h-[34px] w-full max-w-[34px] items-center justify-center rounded-md`}>
            {config.icon}
          </div>
          <div className="w-full">
            {title && (
              <h5 className={`mb-3 text-lg font-semibold ${config.titleColor}`}>
                {title}
              </h5>
            )}
            {message && (
              <p className={`text-base leading-relaxed ${config.messageColor}`}>
                {message}
              </p>
            )}
            {children}
            {showCloseButton && onClose && (
              <button
                onClick={onClose}
                className={`mt-3 inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md ${config.messageColor} hover:bg-opacity-10 hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-${type}-500`}
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert; 