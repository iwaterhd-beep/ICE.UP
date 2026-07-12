import { create } from "zustand";

interface HeroStore {
  videoEnded: boolean;
  hasEntered: boolean;
  setVideoEnded: (value: boolean) => void;
  enterSite: () => void;
  resetIntro: () => void;
}

export const useHeroStore = create<HeroStore>((set) => ({
  videoEnded: false,
  hasEntered: false,
  setVideoEnded: (videoEnded) => set({ videoEnded }),
  enterSite: () => set({ hasEntered: true }),
  resetIntro: () => set({ videoEnded: false, hasEntered: false }),
}));
