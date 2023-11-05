import { atom } from "recoil";

interface VideoAton {
  file: File | null;
  url: string;
}

export const videoAtom = atom<VideoAton>({
  key: "videoAtom",
  default: {
    file: null,
    url: "",
  },
});

export const startAtom = atom({
  key: "startAtom",
  default: 0,
});

export const endAtom = atom({
  key: "endAtom",
  default: 0,
});
