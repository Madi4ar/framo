'use client';

import Image from 'next/image';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import withReactContent from 'sweetalert2-react-content';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import * as yup from 'yup';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useChatStore } from '../store/chatStore';
import bgMain from '../../../public/images/background-main.png';
import logo from '../../../public/images/main-logo.svg';
import registerBg from '../../../public/images/register-bg.jpg';

const schema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Minimum 3 characters')
    .required('Username required'),
  email: yup.string().email('Invalid email').required('Email required'),
  password1: yup
    .string()
    .min(6, 'Minimum 6 characters')
    .required('Password required'),
  password2: yup
    .string()
    .oneOf([yup.ref('password1')], 'Passwords do not match')
    .required('Confirm your password'),
  inviteCode: yup.string().required('Confirm your activate code'),
});

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function SignUp() {
  const inviteCode = useChatStore((state) => state.inviteCode);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      invite_code: inviteCode || '',
    },
  });

  useEffect(() => {
    if (inviteCode) {
      reset((prev) => ({
        ...prev,
        inviteCode,
      }));
    }
  }, [inviteCode, reset]);

  const MySwal = withReactContent(Swal);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const { confirmPassword, ...rest } = data;
      const payload = {
        ...rest,
        invite_code: data.inviteCode,
      };
      await axios.post(`${API_URL}auth/registration/`, payload);
      MySwal.fire({
        title: 'Registration was successful!',
        icon: 'success',
        draggable: true,
      });
      router.push('/login');
      reset();
    } catch (error) {
      console.error(error);
      alert('Error during registration');
    }
  };
  const setInviteCode = useChatStore((state) => state.setInviteCode);

  console.log('Invite', inviteCode);

  const [showPop, setShowPop] = useState(false);
  const [code, setCode] = useState();
  const [serverError, setServerError] = useState('');

  const handleActivateSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { invite_code: code };
      await axios.post(`${API_URL}auth/validate-invite/`, payload);
      setInviteCode(code);
      setShowPop(true);
    } catch (error) {
      console.error(error);
      // alert('Invalid or already used invite code');

      if (error.response?.data?.invite_code?.[0]) {
        setServerError(error.response.data.invite_code[0]);
      } else if (error.response?.data?.detail) {
        setServerError(error.response.data.detail);
      } else {
        setServerError('Invalid or already used invite code');
      }
    }
  };
  return (
    <>
      <div className="w-full h-screen flex flex-wrap">
        <div
          className={`${
            showPop ? 'hidden' : 'flex'
          } h-full w-full bg-[#181818] fixed top-0 left-0 z-9999 flex items-center justify-center px-2`}>
          <div className="w-full md:w-1/2 bg-[#212121] rounded-lg border-y border-gray-500 ">
            <div className="flex w-full items-center justify-between ">
              <div className="flex flex-col items-center px-4 py-8 w-full md:w-1/2">
                <Image src={logo} alt="" className="mb-5" />
                <p className="font-semibold">Activate your account</p>
                <p className="text-center text-[#666262] text-sm">
                  To start using all features, please confirm your email and
                  activate your account.
                </p>

                <form
                  className="mt-6 w-full"
                  method="POST"
                  onSubmit={handleActivateSubmit}>
                  <div className="flex flex-col w-full">
                    <label htmlFor="code">Invitation code</label>
                    <input
                      name="code"
                      type="text"
                      className="w-full mt-2 outline-none bg-[#333333] rounded-lg border border-[#3F3F3F] px-[13px] py-2"
                      placeholder="Enter your invitation code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />

                    {serverError && (
                      <p className="text-red-500 text-sm mt-2">{serverError}</p>
                    )}

                    <button className="cursor-pointer bg-white rounded-lg text-black font-medium text-center py-2 mt-4">
                      Get started
                    </button>
                  </div>
                </form>

                <div className="flex items-center gap-2 mt-6">
                  <span className="text-[#BDB6B6]">Already activated? </span>
                  <Link className="" href="/login">
                    Sign in now
                  </Link>
                </div>
              </div>

              <div className="hidden md:block md:w-1/2">
                <Image src={registerBg} alt="" />
              </div>
            </div>
          </div>
        </div>
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
          <p className="text-3xl font-semibold">Sign up</p>
          <p className="font-light mt-3">
            Enter your credentials to create your account
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full md:w-1/2 mt-10">
            <div className="flex flex-col w-full mb-8">
              <label
                htmlFor="textInput"
                className="text-[#CACFCD] text-base mb-2">
                Username
              </label>
              <input
                type="text"
                id="textInput"
                className="outline-none bg-[#1B1B1B] rounded-xl px-3 py-2 w-full"
                placeholder="Username"
                {...register('username')}
              />

              {errors.username?.message}
            </div>

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
              {errors.email?.message}
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
                {...register('password1')}
              />

              {errors.password1?.message}
            </div>

            <div className="flex flex-col w-full mt-8">
              <label
                htmlFor="textInput"
                className="text-[#CACFCD] text-base mb-2">
                Confirm password
              </label>
              <input
                type="password"
                id="textInput"
                className="outline-none bg-[#1B1B1B] rounded-xl px-3 py-2 w-full"
                placeholder="Password"
                {...register('password2')}
              />
              {errors.password2?.message}
            </div>

            <div className="flex flex-col w-full mt-8">
              <label
                htmlFor="inviteCode"
                className="text-[#CACFCD] text-base mb-2">
                Activate code
              </label>
              <input
                type="text"
                id="inviteCode"
                className="outline-none bg-[#1B1B1B] rounded-xl px-3 py-2 w-full"
                placeholder="Activation code"
                {...register('inviteCode')}
              />
              {errors.inviteCode?.message}
            </div>

            <button
              disabled={isSubmitting}
              className="w-full bg-[#136CFF] mt-10 py-2 rounded-xl font-bold">
              {isSubmitting ? 'Sigining...' : 'Sign up'}
            </button>

            <Link href="/login" className="mt-5 text-center">
              Already have account?{' '}
              <span className="text-[#136CFF] font-semibold underline">
                Login
              </span>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
