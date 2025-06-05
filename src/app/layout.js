import './globals.css';

export const metadata = {
  title: 'Framo',
  description: 'Developed by mtalgatly7',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased bg-black text-white `}>
        <div className="relative h-screen flex flex-col">{children}</div>
      </body>
    </html>
  );
}
