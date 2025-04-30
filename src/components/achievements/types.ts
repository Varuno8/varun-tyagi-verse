
import { LucideIcon } from 'lucide-react';

export interface Achievement {
  id: number;
  title: string;
  value: string;
  iconName: string;
  color: string;
  numericValue: number;
  tech?: string; // For TechIcon
  url?: string; // URL to link to profile
}
