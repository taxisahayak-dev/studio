
'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from 'lucide-react';
import AdminPanelContent from './AdminPanelContent'; 

export default function AdminPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminFlag = localStorage.getItem("isAdmin") === "true";
    if (!adminFlag) {
      router.push("/login");
    } else {
      setIsAdmin(true);
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
    </div>;
  }

  return isAdmin ? <AdminPanelContent /> : null;
}
