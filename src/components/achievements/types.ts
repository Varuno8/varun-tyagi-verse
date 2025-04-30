
import { ReactElement } from 'react';

export interface Achievement {
  id: number;
  title: string;
  value: string;
  icon: ReactElement;
  color: string;
  numericValue: number;
  tech?: string; // For TechIcon
  url?: string; // URL to link to profile
}
