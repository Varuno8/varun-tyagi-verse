
import { Code, Star, Award as AwardIcon } from 'lucide-react';
import { Achievement } from './types';

export const achievements: Achievement[] = [
  {
    id: 1,
    title: "GFG Problems",
    value: "320+",
    icon: <Code />,
    color: "neon-cyan",
    numericValue: 320,
    tech: "GeeksforGeeks",
    url: "https://www.geeksforgeeks.org/user/varun28y2a4/"
  },
  {
    id: 2,
    title: "LeetCode",
    value: "250+",
    icon: <Star />,
    color: "neon-purple",
    numericValue: 250,
    tech: "LeetCode",
    url: "https://leetcode.com/u/Varun_2/"
  },
  {
    id: 3,
    title: "CodeChef Rating",
    value: "1500",
    icon: <Award />,
    color: "neon-teal",
    numericValue: 1500,
    tech: "CodeChef",
    url: "https://www.codechef.com/users/varun28082001"
  },
  {
    id: 4,
    title: "JEE Mains",
    value: "98.2 percentile",
    icon: <AwardIcon />,
    color: "neon-purple",
    numericValue: 98
  }
];
