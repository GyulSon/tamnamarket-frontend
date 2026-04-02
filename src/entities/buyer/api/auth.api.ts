export const testApi = {
  logout: async (): Promise<void> => {
    await fetch('/api/auth/logout', { method: 'POST' });
  },
};
