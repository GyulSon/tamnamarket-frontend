'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { testApi } from '@/entities/buyer/api/auth.api';

type UseMutationCallback = {
  onSuccess?: () => void;
  onError?: () => void;
  onMutate?: () => void;
  onSettled?: () => void;
};

export const authKeys = {
  all: ['auth'],
  logout: () => [...authKeys.all, 'logout'],
};

export const useLogout = (callbacks?: UseMutationCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: testApi.logout,
    onSuccess: () => {
      queryClient.clear();
      localStorage.clear();
      sessionStorage.clear();
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
  });
};
