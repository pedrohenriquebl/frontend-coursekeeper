'use client';

import { Auth } from '@/components/Auth';
import { PageLoader } from '@/components/ui/PageLoader';
import { useAuthUser } from '@/context/authUserContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { user, isLoadingUser } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoadingUser && user) {
      router.replace('/');
    }
  }, [user, isLoadingUser, router]);
  
  if (isLoadingUser) {
    return <PageLoader message="Carregando..." />;
  }
  if (user) {
    return null;
  }
  return <Auth />;
}
