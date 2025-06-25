"use client";

import React from 'react';
import { Alert, Toast, useAlert } from './index';

const AlertDemo = () => {
  const { 
    showSuccessAlert, 
    showErrorAlert, 
    showWarningAlert, 
    showInfoAlert,
    showSuccessToast,
    showErrorToast,
    showWarningToast,
    showInfoToast
  } = useAlert();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Alert Components Demo
        </h1>

        {/* Alert Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Alert Components
          </h2>
          
          <div className="space-y-6">
            {/* Success Alert */}
            <Alert
              type="success"
              title="Message Sent Successfully"
              message="Your message has been sent successfully. We'll get back to you soon."
              onClose={() => console.log('Success alert closed')}
            />

            {/* Error Alert */}
            <Alert
              type="error"
              title="Something went wrong"
              message="There was an error processing your request. Please try again."
              onClose={() => console.log('Error alert closed')}
            />

            {/* Warning Alert */}
            <Alert
              type="warning"
              title="Please review your information"
              message="Some of the information you provided may need attention."
              onClose={() => console.log('Warning alert closed')}
            />

            {/* Info Alert */}
            <Alert
              type="info"
              title="New feature available"
              message="We've added new features to improve your experience."
              onClose={() => console.log('Info alert closed')}
            />
          </div>
        </section>

        {/* Toast Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Toast Notifications
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Success Toasts
              </h3>
              <button
                onClick={() => showSuccessToast('Success!', 'Operation completed successfully')}
                className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Show Success Toast
              </button>
              <button
                onClick={() => showSuccessToast('Login Successful', 'Welcome back!', { position: 'top-center' })}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Show Success Toast (Top Center)
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Error Toasts
              </h3>
              <button
                onClick={() => showErrorToast('Error!', 'Something went wrong')}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Show Error Toast
              </button>
              <button
                onClick={() => showErrorToast('Connection Failed', 'Unable to connect to server', { position: 'bottom-right' })}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Show Error Toast (Bottom Right)
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Warning Toasts
              </h3>
              <button
                onClick={() => showWarningToast('Warning!', 'Please check your input')}
                className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Show Warning Toast
              </button>
              <button
                onClick={() => showWarningToast('Low Storage', 'You are running low on storage space', { position: 'bottom-left' })}
                className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Show Warning Toast (Bottom Left)
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Info Toasts
              </h3>
              <button
                onClick={() => showInfoToast('Info', 'Here is some useful information')}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Show Info Toast
              </button>
              <button
                onClick={() => showInfoToast('Update Available', 'A new version is available', { position: 'top-left' })}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Show Info Toast (Top Left)
              </button>
            </div>
          </div>
        </section>

        {/* Alert Trigger Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            Alert Triggers (Context-based)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Alert Examples
              </h3>
              <button
                onClick={() => showSuccessAlert('Success Alert', 'This is a success alert using context')}
                className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Show Success Alert
              </button>
              <button
                onClick={() => showErrorAlert('Error Alert', 'This is an error alert using context')}
                className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Show Error Alert
              </button>
              <button
                onClick={() => showWarningAlert('Warning Alert', 'This is a warning alert using context')}
                className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Show Warning Alert
              </button>
              <button
                onClick={() => showInfoAlert('Info Alert', 'This is an info alert using context')}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Show Info Alert
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                Multiple Toasts
              </h3>
              <button
                onClick={() => {
                  showSuccessToast('First Toast', 'This is the first toast');
                  setTimeout(() => showErrorToast('Second Toast', 'This is the second toast'), 500);
                  setTimeout(() => showWarningToast('Third Toast', 'This is the third toast'), 1000);
                }}
                className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
              >
                Show Multiple Toasts
              </button>
              <button
                onClick={() => {
                  showInfoToast('Custom Duration', 'This toast will stay for 10 seconds', { duration: 10000 });
                }}
                className="w-full bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
              >
                Show Long Duration Toast
              </button>
            </div>
          </div>
        </section>

        {/* Usage Instructions */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Usage Instructions
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">1. Setup AlertProvider</h3>
              <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
{`import { AlertProvider } from './components';

function App() {
  return (
    <AlertProvider>
      {/* Your app content */}
    </AlertProvider>
  );
}`}
              </pre>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-2">2. Use Alert Components</h3>
              <pre className="bg-gray-100 dark:bg-gray-700 p-3 rounded text-sm overflow-x-auto">
{`import { Alert, Toast, useAlert } from './components';

// Direct usage
<Alert type="success" title="Success" message="Operation completed" />

// Context-based usage
const { showSuccessToast } = useAlert();
showSuccessToast('Success!', 'Operation completed');`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AlertDemo; 