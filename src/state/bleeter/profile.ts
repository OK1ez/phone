import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
// import { Character } from '../typings';
import { isEnvBrowser } from "@/lib/utils"

const DEBUG_PROFILE = {
  stateId: '1993201',
  firstName: 'Svetozar',
  lastName: 'Miletić',
  title: 'LSPD Officer',
  grade: 5,
  callSign: '103',
  group: 'police',
};

const profileAtom = atom(
  isEnvBrowser()
    ? DEBUG_PROFILE
    : {
        stateId: '',
        firstName: '',
        lastName: '',
        title: '',
        grade: 0,
        group: '',
        callSign: '',
      }
);

export const useCharacter = () => useAtomValue(profileAtom);
export const useSetCharacter = () => useSetAtom(profileAtom);
export const useCharacterState = () => useAtom(profileAtom);