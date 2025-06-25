'use client';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { Toast, useAlert } from '../../components';
import bgMain from '../../../public/images/background-main.png';
import logo from '../../../public/images/main-logo.svg';

const loginSchema = yup.object().shape({
  email: yup.string().email('Неверный email').required('Email обязателен'),
  password: yup
    .string()
    .min(6, 'Минимум 6 символов')
    .required('Пароль обязателен'),
});

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function LoginPage() {
  const [loginError, setLoginError] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const { showErrorToast, showSuccessToast: showSuccessToastAlert } = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const { ...payload } = data;
      const response = await axios.post(`${API_URL}auth/login/`, payload);
      
      // Show success toast
      setShowSuccessToast(true);
      
      // Auto-hide after 2 seconds and redirect
      setTimeout(() => {
        setShowSuccessToast(false);
        reset();
        Cookies.set('access_token', response.data.access, {
          expires: 7,
          secure: true,
          sameSite: 'Lax',
        });
        router.push('/main');
      }, 2000);
      
    } catch (error) {
      console.error(error);
      let errorMessage = 'Error signing in. Please try again.';
      
      if (
        error.response &&
        error.response.data &&
        error.response.data.non_field_errors
      ) {
        errorMessage = error.response.data.non_field_errors[0];
        setLoginError(errorMessage);
      } else {
        setLoginError(errorMessage);
      }
      
      // Show error toast instead of SweetAlert
      showErrorToast('Login Failed', errorMessage, {
        duration: 5000,
        position: 'top-right'
      });
    }
  };

  return (
    <>
      {/* Success Toast */}
      {showSuccessToast && (
        <Toast
          type="success"
          title="Login successful!"
          message="Redirecting to dashboard..."
          onClose={() => setShowSuccessToast(false)}
          duration={2000}
          position="top-right"
        />
      )}

      <div className="w-full h-screen flex flex-wrap">
        <div className="hidden md:block md:w-1/2 h-full relative">
          <Image className="w-full h-full object-cover " src={bgMain} alt="" />
          <div className="flex w-full flex-col items-center absolute top-1/2 left-1/2 -translate-1/2 gap-5">
            <Link href="/">
              <Image src={logo} alt="" />
            </Link>
            <p className="text-xl md:text-2xl text-center">
              The end of editing. The rise of vision.
            </p>
          </div>
        </div>

        <div className="w-full px-4 md:px-0 lg:w-1/2 flex flex-col items-center absolute top-1/2 -translate-y-1/2 right-0">
          <p className="text-3xl font-semibold">Login</p>
          <p className="font-light mt-3">
            Enter your credentials to access your account
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full md:w-1/2 mt-10">
            <div className="flex flex-col w-full">
              <label
                htmlFor="textInput"
                className="text-[#CACFCD] text-base mb-2">
                Email
              </label>
              <input
                type="text"
                id="textInput"
                className="outline-none bg-[#1B1B1B] rounded-xl px-3 py-2 w-full"
                placeholder="example@gmail.com"
                {...register('email')}
              />
            </div>

            <div className="flex flex-col w-full mt-8">
              <label
                htmlFor="textInput"
                className="text-[#CACFCD] text-base mb-2">
                Password
              </label>
              <input
                type="password"
                id="textInput"
                className="outline-none bg-[#1B1B1B] rounded-xl px-3 py-2 w-full"
                placeholder="Password"
                {...register('password')}
              />
            </div>

            <button
              disabled={isSubmitting}
              className="w-full bg-[#136CFF] mt-10 py-2 rounded-xl font-bold">
              {isSubmitting ? 'Logining...' : 'Login'}
            </button>

            {loginError && (
              <p className="text-red-500 text-sm text-center mt-4">
                {loginError}
              </p>
            )}

            <Link href="/signup" className="mt-5 text-center">
              Not a member?{' '}
              <span className="text-[#136CFF] font-semibold underline">
                Create an account
              </span>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
