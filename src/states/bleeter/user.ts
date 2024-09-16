import { isEnvBrowser } from '@/utils/misc';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

const DEFAULT_USER = {
  handle: '',
  name: '',
  avatar: '',
  banner: '',
  description: '',
  verified: false,
  followers: 0,
  following: 0
};

const DEBUG_USER = {
  handle: 'okiez',
  name: 'OKiez',
  avatar: 'https://github.com/ok1ez.png',
  banner: 'https://sumeetdas.me/Bleeter/img/banners/bleeter_banner.jpg',
  description: 'Test bio',
  verified: false,
  followers: 420,
  following: 69
};

const userAtom = atom(isEnvBrowser() ? DEBUG_USER : DEFAULT_USER);

export const useBleeterUser = () => useAtomValue(userAtom);
export const useSetBleeterUser = () => useSetAtom(userAtom);
export const useBleeterUserState = () => useAtom(userAtom);
