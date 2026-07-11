import { create } from "zustand";

interface HeroStore {
  introFinished: boolean;
  setIntroFinished: (value: boolean) => void;
  resetIntro: () => void;
}

export const useHeroStore = create<HeroStore>((set) => ({
  introFinished: false,
  setIntroFinished: (introFinished) => set({ introFinished }),
  resetIntro: () => set({ introFinished: false }),
}));
