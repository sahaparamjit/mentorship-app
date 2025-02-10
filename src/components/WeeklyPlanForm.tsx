'use client';

import { TextField, Button, Box } from '@mui/material';
import { WeeklyPlan } from '@/types/weeklyPlan';

interface WeeklyPlanFormProps {
  plan: WeeklyPlan;
  onChange: (field: keyof WeeklyPlan, value: string) => void;
  onSubmit: () => void;
  onClear: () => void;
}

export default function WeeklyPlanForm({ plan, onChange, onSubmit, onClear }: WeeklyPlanFormProps) {
  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Mentor Name"
        value={plan.Mentor_Name}
        onChange={(e) => onChange('Mentor_Name', e.target.value)}
      />
      <TextField
        label="Week Title"
        value={plan.Week_Title}
        onChange={(e) => onChange('Week_Title', e.target.value)}
      />
      <TextField
        label="Java Topics to Cover"
        multiline
        rows={4}
        value={plan.Java_Topics_to_Cover}
        onChange={(e) => onChange('Java_Topics_to_Cover', e.target.value)}
      />
      <TextField
        label="DSA Concepts"
        multiline
        rows={4}
        value={plan.DSA_Concepts}
        onChange={(e) => onChange('DSA_Concepts', e.target.value)}
      />
      <TextField
        label="Leetcode Questions"
        multiline
        rows={4}
        value={plan.Leetcode_Questions}
        onChange={(e) => onChange('Leetcode_Questions', e.target.value)}
      />
      <TextField
        label="Advice for the Week"
        multiline
        rows={4}
        value={plan.Advice_for_the_Week}
        onChange={(e) => onChange('Advice_for_the_Week', e.target.value)}
      />
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={onClear}>
          Clear
        </Button>
        <Button variant="contained" onClick={onSubmit}>
          Generate PDF
        </Button>
      </Box>
    </Box>
  );
} 