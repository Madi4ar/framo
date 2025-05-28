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

            <Link
              href=""
              className="gap-2 flex items-center bg-[#383945] rounded-[30px] px-[16px] py-[20px]">
              <Image src={logoGoogle} alt="" />
              <p className="text-[16px]">Sign in with Google</p>
            </Link>

            <Link
              href="/signup"
              className="gap-2 flex items-center bg-[#383945] rounded-[30px] px-[16px] py-[20px]">
              <Image src={email} alt="" className="w-6" />
              <p className="text-[16px]">Sign up with email</p>
            </Link>

            <Link href="/login">
              <p className="text-[16px] underline">
                Already have account? Sign in with email
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
