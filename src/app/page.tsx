'use client';

import { useState } from 'react';
import { Box, Container, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import WeeklyPlanForm from '@/components/WeeklyPlanForm';
import WeeklyPlanList from '@/components/WeeklyPlanList';
import { WeeklyPlan, WeeklyPlansState } from '@/types/weeklyPlan';

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    }
  }
});

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

    try {
      console.log('Sending plan data:', currentPlan);
      
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentPlan),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error:', errorData);
        throw new Error(errorData.details || 'Failed to generate PDF');
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/pdf')) {
        console.error('Unexpected content type:', contentType);
        throw new Error('Server did not return a PDF');
      }

      const pdfBlob = await response.blob();
      console.log('Received PDF blob:', pdfBlob);

      if (pdfBlob.size === 0) {
        throw new Error('Generated PDF is empty');
      }

      // Create download link
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${currentPlan.Week_Title}.pdf`);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);

      // Save to state
      const newPlans = {
        ...plans,
        [currentPlan.Week_Title]: currentPlan,
      };
      setPlans(newPlans);

      alert('Plan saved and PDF generated successfully!');
    } catch (error) {
      console.error('PDF generation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Error generating PDF: ${errorMessage}`);
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
    </ThemeProvider>
  );
}
