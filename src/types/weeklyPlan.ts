export interface WeeklyPlan {
  Mentor_Name: string;
  Week_Title: string;
  Java_Topics_to_Cover: string;
  DSA_Concepts: string;
  Leetcode_Questions: string;
  Advice_for_the_Week: string;
}

export interface WeeklyPlansState {
  [key: string]: WeeklyPlan;
} 