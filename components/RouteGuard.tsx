"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { API_ME } from '@/lib/api';
import axios from "axios";

const ADMIN_ROUTES = {
  superadmin: ["*"],
  admin: [
    "/admin",
    "/admin/users",
    "/admin/animes",
    "/admin/comments",
    "/admin/create-anime",
    "/admin/upload",
    "/admin/uploaded-animes",
    "/admin/create-blog",
  ],
  blogger: ["/admin/create-blog"],
  uploader: ["/admin/upload"],
};

const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const checkUserRole = async () => {
      try {
        const response = await axios.get(API_ME, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const roles: (keyof typeof ADMIN_ROUTES)[] = response.data.data.roles?.map((role: any) => role.name) || [];

        console.log("Kullanıcı rolleri:", roles);

        if (!roles || roles.length === 0) {
          router.push("/login");
          return;
        }

        if (roles.includes("super-admin")) {
          setIsAuthorized(true);
          return;
        }

        const hasAccess = roles.some((role) =>
          ADMIN_ROUTES[role as keyof typeof ADMIN_ROUTES]?.includes(pathname)
        );

        if (!hasAccess) {
          router.push("/unauthorized");
          return; 
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error("Yetkilendirme hatası:", error);
        router.push("/login");
      }
    };

    checkUserRole();
  }, [router, pathname]);

  if (isAuthorized === null) {
    return <p>Loading...</p>;
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
};

export default RouteGuard;
