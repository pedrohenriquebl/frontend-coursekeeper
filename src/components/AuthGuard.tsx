'use client';


import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/context/authUserContext";
import { PageLoader } from "./PageLoader";

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, isLoadingUser } = useAuthUser();

  useEffect(() => {
    if (!isLoadingUser && !user) {
      router.replace("/login");
    }
  }, [isLoadingUser, user, router]);

  if (isLoadingUser || !user) {
    return <PageLoader message="" />;
  }

  return <>{children}</>;
}
