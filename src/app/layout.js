import './globals.css';
import { AlertProvider } from '../components/AlertProvider';

export const metadata = {
  title: 'Framo',
  description: 'Developed by mtalgatly7',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased bg-black text-white `}>
        <AlertProvider>
          <div className="relative h-screen flex flex-col">{children}</div>
        </AlertProvider>
      </body>
    </html>
  );
}
