import Header from '@/components/Header';
import './globals.css';
import ChatInput from '@/components/ChatInput';
import SideBar from '@/components/SideBar';
import VideoPlayer from '@/components/VideoPlayer';
import InstrumentsBar from '@/components/InstrumentsBar';
import TimeLine from '@/components/TimeLine';

export const metadata = {
  title: 'Framo',
  description: 'Developed by mtalgatly7',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-black text-white relative h-screen flex flex-col`}>
        <Header />
        {children}
        <section className="w-full flex flex-wrap gap-[10px] h-96 justify-between bg-[#101010] pt-[42px] pb-[15px] px-[8px]">
          <SideBar />
          <VideoPlayer />
          <InstrumentsBar />
        </section>

        <section className="w-full flex-1 h-full overflow-auto px-[4px]">
          <TimeLine />
        </section>
        <div className="relative bottom-3 w-[60%] mx-auto">
          <ChatInput />
        </div>
      </body>
    </html>
  );
}
