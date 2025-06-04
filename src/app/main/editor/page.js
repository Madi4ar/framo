'use client';
import React from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import InstrumentsBar from '@/components/InstrumentsBar';
import TimeLine from '@/components/TimeLine';

export default function EditorPage() {
  return (
    <>
      <div className="flex w-full">
        <VideoPlayer />
        <InstrumentsBar />
      </div>

      <section className="w-full absolute bottom-30 overflow-auto px-[4px]">
        <TimeLine />
      </section>
    </>
  );
}
