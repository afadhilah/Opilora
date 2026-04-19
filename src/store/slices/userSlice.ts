import { create } from 'zustand';

interface UserState {
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export const useUserStore = create<UserState>(() => ({
  name: 'Admin',
  email: 'admin@opilora.id',
  role: 'administrator',
}));
