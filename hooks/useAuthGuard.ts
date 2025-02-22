// hooks/useAuthGuard.ts
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useAuthGuard = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // Token yoksa giriş sayfasına yönlendir
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  return isAuthenticated;
};

export default useAuthGuard;
