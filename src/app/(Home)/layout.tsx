"use client";
import "../globals.css";
import Header from "@/Components/Header";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/context/UserContext";

const Component = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" data-theme="lemonade">
      <head>
        <title>MediTrack - Patient Record Management System</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="MediTrack is a secure and efficient Patient Record Management System (PRMS) designed to streamline hospital workflows, manage electronic medical records (EMR), and facilitate seamless doctor-patient communication. Built with Next.js, DaisyUI, and MongoDB, MediTrack offers role-based access, appointment scheduling, prescription management, and a robust data-sharing system with permissions. Ensure secure, organized, and accessible healthcare records for hospitals, doctors, and patients with MediTrack. 🚀"
        />
      </head>
      <body className={`antialiased`}>
        <Header />
        <Toaster />
        {children}
      </body>
    </html>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <Component>{children}</Component>
    </UserProvider>
  );
}
