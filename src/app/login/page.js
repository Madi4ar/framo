'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import bgMain from '../../../public/images/background-main.png';
import logo from '../../../public/images/main-logo.svg';

function LoginPage() {
  return (
    <>
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

          <div className="flex flex-col w-full md:w-1/2 mt-10">
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
              />
            </div>

            <button className="w-full bg-[#136CFF] mt-10 py-2 rounded-xl font-bold">
              Login
            </button>

            <Link href="/signup" className="mt-5 text-center">
              Not a member?{' '}
              <span className="text-[#136CFF] font-semibold underline">
                Create an account
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
