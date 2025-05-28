import './globals.css';

export const metadata = {
  title: 'Framo',
  description: 'Developed by mtalgatly7',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-black text-white relative h-screen flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
