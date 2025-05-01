import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';

export type UserInfoType = {
  ip: string | null;
  country_code: string;
  country: string | null;
  city: string | null;
};

type UserInfoStore = {
  userInfo: UserInfoType;
  hasFetchedUserInfo: boolean;
  setUserInfo: (userInfo: UserInfoType) => void;
  fetchUserInfo: () => Promise<void>;
};

export const useUserInfoStore = create(
  persist<UserInfoStore>(
    (set, get) => ({
      userInfo: {
        ip: null,
        country_code: 'UA',
        country: null,
        city: null,
      },
      hasFetchedUserInfo: false,
      setUserInfo: (userInfo: UserInfoType) => set({ userInfo }),
      fetchUserInfo: async () => {
        if (get().hasFetchedUserInfo) return;

        try {
          const response = await axios.get('https://ip.nf/me.json');
          const { ip, country_code = 'UA', country, city } = response.data.ip;

          set({
            userInfo: { ip, country_code, country, city },
            hasFetchedUserInfo: true,
          });
        } catch (error) {
          console.error('Failed to fetch user info:', error);
          set({
            userInfo: {
              ip: null,
              country_code: 'UA',
              country: null,
              city: null,
            },
            hasFetchedUserInfo: true,
          });
        }
      },
    }),
    {
      name: 'use-info-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
