export type HingeStatus = 'unknown' | 'closed' | 'partiallyOpen' | 'fullyOpen';

export type HingeState = {
  available: boolean;
  angle: number;
  radians: number;
  status: HingeStatus;
};

export type HingeModuleEvents = {
  onHingeChange: (state: HingeState) => void;
};
