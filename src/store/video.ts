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
