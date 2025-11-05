export enum PeselError {
  NONE = 0,
  LENGTH = 1,
  CHECK_DIGIT = 2,
  DATE = 3
};

export type User = {
  id: number;
  name: string;
  email: string;
  gender: 'male' | 'female';
  status: 'active' | 'inactive';
};
