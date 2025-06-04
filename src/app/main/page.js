'use client';
import React from 'react';
import category from '../../../public/images/icons/category-2.svg';
import Image from 'next/image';

export default function MainPage() {
  return (
    <div className="flex flex-col items-center w-full absolute top-1/2 -translate-y-1/2">
      <p className="text-[#BDBDC0] text-2xl font-semibold mb-[24px]">
        Try these:
      </p>
      <div className="flex flex-wrap items-center justify-center w-[70%] gap-2">
        {[
          'Create a motivational reel from my clips',
          'Translate this video to French',
          'Make it cinematic with color grading',
          'Highlight memorable',
          'Add subtitles',
          'Make instagram video from my videos',
        ].map((text) => (
          <button
            key={text}
            className="cursor-pointer flex items-center px-[16px] py-[10px] border border-[#212121] bg-[#0B0C0B] rounded-xl gap-2 mb-5">
            <Image src={category} alt="" />
            <p className="font-semibold">{text}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
