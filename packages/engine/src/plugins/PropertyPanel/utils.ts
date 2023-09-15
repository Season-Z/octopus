import { SetterObjType, SetterType } from '@octopus/model';

export const getSetterList = (setters: SetterType[] = []): SetterObjType[] => {
  return setters.map((setter) => {
    if (typeof setter === 'string') {
      return {
        componentName: setter as any,
      };
    } else {
      return setter;
    }
  });
};
