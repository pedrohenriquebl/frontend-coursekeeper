"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/context/authUserContext";

export default function Home() {
  const { user, isLoadingUser } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoadingUser) {
      if (user) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    }
  }, [user, isLoadingUser, router]);

  return <p>Carregando...</p>;
}