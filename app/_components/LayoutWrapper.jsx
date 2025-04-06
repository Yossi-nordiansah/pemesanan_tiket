"use client"

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";
import Navtop from "./navtop";

export default function LayoutWrapper({ children }) { 
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");
  const isLoginPage = pathname.startsWith("/auth/login");
  const shouldHideLayout = isAdminPage || isLoginPage;

  return (
    <>
      {!shouldHideLayout && <Navtop />}
      {!shouldHideLayout && <Navbar />}
      {children}
      {!shouldHideLayout && <Footer />}
    </>
  );
}
