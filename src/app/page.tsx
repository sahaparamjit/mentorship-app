'use client';

import { useState } from 'react';
import { Box, Container } from '@mui/material';
import WeeklyPlanForm from '@/components/WeeklyPlanForm';
import WeeklyPlanList from '@/components/WeeklyPlanList';
import { WeeklyPlan, WeeklyPlansState } from '@/types/weeklyPlan';

const emptyPlan: WeeklyPlan = {
  Mentor_Name: '',
  Week_Title: '',
  Java_Topics_to_Cover: '',
  DSA_Concepts: '',
  Leetcode_Questions: '',
  Advice_for_the_Week: '',
};

export default function Home() {
  const [plans, setPlans] = useState<WeeklyPlansState>({});
  const [currentPlan, setCurrentPlan] = useState<WeeklyPlan>(emptyPlan);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePlanChange = (field: keyof WeeklyPlan, value: string) => {
    setCurrentPlan((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!currentPlan.Week_Title) {
      alert('Please enter a week title');
      return;
    }

    const newPlans = {
      ...plans,
      [currentPlan.Week_Title]: currentPlan,
    };
    setPlans(newPlans);
    
    // Here you would typically make an API call to generate the PDF
    // For now, we'll just save the plan
    try {
      // TODO: Add API call to generate PDF
      alert('Plan saved successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF');
    }
  };

  const handleSelectPlan = (weekTitle: string) => {
    setSelectedPlan(weekTitle);
    setCurrentPlan(plans[weekTitle]);
  };

  const handleClear = () => {
    setCurrentPlan(emptyPlan);
    setSelectedPlan(null);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', gap: 4, py: 4 }}>
        <WeeklyPlanList
          plans={plans}
          selectedPlan={selectedPlan}
          onSelectPlan={handleSelectPlan}
        />
        <Box sx={{ flex: 1 }}>
          <WeeklyPlanForm
            plan={currentPlan}
            onChange={handlePlanChange}
            onSubmit={handleSubmit}
            onClear={handleClear}
          />
        </Box>
      </Box>
    </Container>
  );
}
