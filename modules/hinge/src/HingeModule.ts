import { NativeModule, requireOptionalNativeModule } from 'expo';

import { HingeModuleEvents, HingeState } from './Hinge.types';

declare class HingeModule extends NativeModule<HingeModuleEvents> {
  isSupported(): boolean;
  getState(): HingeState;
}

export default requireOptionalNativeModule<HingeModule>('Hinge');
