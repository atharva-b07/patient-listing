
import React from 'react';
import {
  Box,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Slider,
  Chip,
  IconButton,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { PatientFilters } from '../types/Patient';

interface PatientFiltersComponentProps {
  filters: PatientFilters;
  onFiltersChange: (filters: PatientFilters) => void;
}

const PatientFiltersComponent: React.FC<PatientFiltersComponentProps> = ({
  filters,
  onFiltersChange,
}) => {
  const handleFilterChange = (field: keyof PatientFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [field]: value,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      search: '',
      gender: '',
      state: '',
      insuranceProvider: '',
      bloodType: '',
      ageRange: [0, 100],
    });
  };

  const activeFiltersCount = Object.values(filters).filter((value) => {
    if (typeof value === 'string') return value !== '';
    if (Array.isArray(value)) return value[0] !== 0 || value[1] !== 100;
    return false;
  }).length;

  const states = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const insuranceProviders = [
    'Aetna', 'Anthem', 'Blue Cross Blue Shield', 'Cigna', 'Humana',
    'Kaiser Permanente', 'Medicaid', 'Medicare', 'UnitedHealth', 'Other'
  ];

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" component="h3">
          Filter Patients
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {activeFiltersCount > 0 && (
            <Chip
              label={`${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} active`}
              color="primary"
              size="small"
            />
          )}
          <IconButton onClick={clearAllFilters} size="small" title="Clear all filters">
            <ClearIcon />
          </IconButton>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label="Search"
            placeholder="Search by name, email, or phone"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            variant="outlined"
            size="small"
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Gender</InputLabel>
            <Select
              value={filters.gender}
              label="Gender"
              onChange={(e) => handleFilterChange('gender', e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>State</InputLabel>
            <Select
              value={filters.state}
              label="State"
              onChange={(e) => handleFilterChange('state', e.target.value)}
            >
              <MenuItem value="">All States</MenuItem>
              {states.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Insurance</InputLabel>
            <Select
              value={filters.insuranceProvider}
              label="Insurance"
              onChange={(e) => handleFilterChange('insuranceProvider', e.target.value)}
            >
              <MenuItem value="">All Providers</MenuItem>
              {insuranceProviders.map((provider) => (
                <MenuItem key={provider} value={provider}>
                  {provider}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Blood Type</InputLabel>
            <Select
              value={filters.bloodType}
              label="Blood Type"
              onChange={(e) => handleFilterChange('bloodType', e.target.value)}
            >
              <MenuItem value="">All Types</MenuItem>
              {bloodTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ px: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Age Range: {filters.ageRange[0]} - {filters.ageRange[1]} years
            </Typography>
            <Slider
              value={filters.ageRange}
              onChange={(_, newValue) => handleFilterChange('ageRange', newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={100}
              marks={[
                { value: 0, label: '0' },
                { value: 25, label: '25' },
                { value: 50, label: '50' },
                { value: 75, label: '75' },
                { value: 100, label: '100' },
              ]}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientFiltersComponent;
