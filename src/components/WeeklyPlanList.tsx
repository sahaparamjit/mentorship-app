import { List, ListItem, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';
import { WeeklyPlansState } from '@/types/weeklyPlan';

interface WeeklyPlanListProps {
  plans: WeeklyPlansState;
  selectedPlan: string | null;
  onSelectPlan: (weekTitle: string) => void;
}

export default function WeeklyPlanList({ plans, selectedPlan, onSelectPlan }: WeeklyPlanListProps) {
  return (
    <Paper sx={{ width: 300, maxHeight: '80vh', overflow: 'auto' }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Saved Weekly Plans
      </Typography>
      <List>
        {Object.keys(plans).map((weekTitle) => (
          <ListItem key={weekTitle} disablePadding>
            <ListItemButton
              selected={selectedPlan === weekTitle}
              onClick={() => onSelectPlan(weekTitle)}
            >
              <ListItemText primary={weekTitle} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
} 