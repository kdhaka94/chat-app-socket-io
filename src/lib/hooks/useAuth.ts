"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      return;
    }

    router.push("/");
  }, [router]);
};
