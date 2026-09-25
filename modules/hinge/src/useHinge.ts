import { useEffect, useState } from 'react';

import HingeModule from './HingeModule';
import { HingeState } from './Hinge.types';

const UNAVAILABLE: HingeState = { available: false, angle: 0, radians: 0, status: 'unknown' };

export function useHinge(): HingeState {
  const [state, setState] = useState<HingeState>(() => HingeModule?.getState() ?? UNAVAILABLE);

  useEffect(() => {
    const subscription = HingeModule?.addListener('onHingeChange', setState);
    return () => subscription?.remove();
  }, []);

  return state;
}
