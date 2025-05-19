import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ReactNode } from 'react';
import ReduxProvider from './ReduxProvider';
import Navbar from '@/components/common/Navbar';
import { Poppins } from "next/font/google";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; 

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "The Vault",
  description: "Secure, modern file management",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <ReduxProvider>
          <Navbar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}