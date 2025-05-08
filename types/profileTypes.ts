// src/types/profileTypes.ts

export interface ProfileData {
    name: string;
    email: string;
    age?: number;
  }
  
  export interface ProfileState {
    data: ProfileData | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  