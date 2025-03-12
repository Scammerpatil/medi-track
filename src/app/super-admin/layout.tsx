"use client";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import { UserProvider, useUser } from "@/context/UserContext";
import SideNav from "./SideNav";
import { useEffect } from "react";
import axios from "axios";

const Component = ({ children }: { children: React.ReactNode }) => {
  const { setUser } = useUser();
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get("/api/auth/verifytoken");
      if (response.data) {
        setUser(response.data.data);
      }
    };
    fetchUser();
  }, [setUser]);
  return (
    <html lang="en">
      <head>
        <title>MediTrack - Health Care System</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="MediTrack is a secure and efficient Health Care System designed to streamline hospital workflows, manage electronic medical records (EMR), and facilitate seamless doctor-patient communication. Built with Next.js, DaisyUI, and MongoDB, MediTrack offers role-based access, appointment scheduling, prescription management, and a robust data-sharing system with permissions. Ensure secure, organized, and accessible healthcare records for hospitals, doctors, and patients with MediTrack. 🚀"
        />
      </head>
      <body className={`antialiased`}>
        <Toaster />
        <SideNav>{children}</SideNav>
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
