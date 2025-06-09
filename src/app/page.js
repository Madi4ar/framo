import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/images/main-logo.svg';
import tv from '../../public/images/icons/tv.svg';
import bgMain from '../../public/images/background-main.png';
import logoGoogle from '../../public/images/icons/logo-google.svg';
import email from '../../public/images/icons/email.svg';

export default function Home() {
  return (
    <>
      <div className="container h-full px-4 md:px-[40px] py-[32px] mx-auto relative">
        <Image
          src={bgMain}
          alt=""
          className="w-full h-full object-cover absolute top-0 left-0"
        />
        <div className="w-full h-full flex flex-col items-center justify-between z-50 relative">
          <div className="w-full flex items-center justify-between">
            <Link href="">
              <Image src={logo} alt="" />
            </Link>

            <Link
              href=""
              className="px-[12px] py-[10px] rounded-[20px] bg-[rgba(51,56,58,0.25)] text-white flex items-center gap-2"
              style={{
                boxShadow:
                  'inset 0px 1px 1px rgba(255, 255, 255, 0.25), 0px 8px 4px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.25)',
              }}>
              <Image src={tv} alt="" />
              Watch Framo TV
            </Link>
          </div>

          <div className="flex flex-col items-center absolute top-1/2 -translate-y-1/2 gap-5">
            <p className="text-6xl md:text-[128px] font-semibold">Framo</p>
            <p className="text-xl md:text-[32px]">
              The end of editing. The rise of vision.
            </p>

            <div className="flex gap-5">
              <Link
                href="/login"
                className="px-[24px] py-[10px] rounded-[30px] bg-[rgba(51,56,58,0.25)] backdrop-blur-[50px] shadow-[inset_0px_-1px_1px_rgba(255,255,255,0.25),0px_8px_4px_6px_rgba(0,0,0,0.05),inset_0px_1px_1px_rgba(255,255,255,0.25)]">
                Log in
              </Link>

              <Link
                href="/signup"
                className="px-[24px] py-[10px] rounded-[30px] bg-[rgba(51,56,58,0.25)] backdrop-blur-[50px] shadow-[inset_0px_-1px_1px_rgba(255,255,255,0.25),0px_8px_4px_6px_rgba(0,0,0,0.05),inset_0px_1px_1px_rgba(255,255,255,0.25)]">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
