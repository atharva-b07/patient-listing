import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
  Snackbar,
  Button,
  Stack,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Patient, PatientFilters } from "../types/Patient";
import PatientTable from "./PatientTable";
import PatientForm from "./PatientForm";
import PatientFiltersComponent from "./PatientFilters";
import { generateMockPatients } from "../utils/mockData";

const PatientManagement: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [filters, setFilters] = useState<PatientFilters>({
    search: "",
    gender: "",
    state: "",
    insuranceProvider: "",
    bloodType: "",
    ageRange: [0, 100],
  });
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  // Load patients from localStorage on mount
  useEffect(() => {
    const storedPatients = localStorage.getItem("patients");
    if (storedPatients) {
      const parsedPatients = JSON.parse(storedPatients);
      setPatients(parsedPatients);
    } else {
      // Generate mock data if no patients exist
      const mockPatients = generateMockPatients(20);
      setPatients(mockPatients);
      localStorage.setItem("patients", JSON.stringify(mockPatients));
    }
  }, []);

  // Apply filters to patients
  const applyFilters = useMemo(() => {
    let filtered = patients;

    // Search filter
    if (filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (patient) =>
          patient.firstName.toLowerCase().includes(searchTerm) ||
          patient.lastName.toLowerCase().includes(searchTerm) ||
          patient.email.toLowerCase().includes(searchTerm) ||
          patient.phoneNumber.includes(searchTerm)
      );
    }

    // Gender filter
    if (filters.gender) {
      filtered = filtered.filter(
        (patient) => patient.gender === filters.gender
      );
    }

    // State filter
    if (filters.state) {
      filtered = filtered.filter((patient) => patient.state === filters.state);
    }

    // Insurance provider filter
    if (filters.insuranceProvider) {
      filtered = filtered.filter(
        (patient) => patient.insuranceProvider === filters.insuranceProvider
      );
    }

    // Blood type filter
    if (filters.bloodType) {
      filtered = filtered.filter(
        (patient) => patient.bloodType === filters.bloodType
      );
    }

    // Age range filter
    const currentYear = new Date().getFullYear();
    filtered = filtered.filter((patient) => {
      const birthYear = new Date(patient.dateOfBirth).getFullYear();
      const age = currentYear - birthYear;
      return age >= filters.ageRange[0] && age <= filters.ageRange[1];
    });

    return filtered;
  }, [patients, filters]);

  useEffect(() => {
    setFilteredPatients(applyFilters);
  }, [applyFilters]);

  const handleCreatePatient = (
    patientData: Omit<Patient, "id" | "createdAt" | "updatedAt">
  ) => {
    const newPatient: Patient = {
      ...patientData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedPatients = [...patients, newPatient];
    setPatients(updatedPatients);
    localStorage.setItem("patients", JSON.stringify(updatedPatients));
    setOpenDialog(false);

    setSnackbar({
      open: true,
      message: "Patient created successfully!",
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              fontWeight="bold"
            >
              Patient Management System
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Manage patient records with advanced filtering and search
              capabilities
            </Typography>
          </Box>
          <Button
            variant="contained"
            size="large"
            startIcon={<PersonAddIcon />}
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.3)",
              },
            }}
          >
            Add New Patient
          </Button>
        </Stack>
      </Paper>

      {/* Filters Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <PatientFiltersComponent
          filters={filters}
          onFiltersChange={setFilters}
        />
      </Paper>

      {/* Table Section */}
      <PatientTable patients={filteredPatients} />

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add patient"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 64,
          height: 64,
        }}
      >
        <AddIcon sx={{ fontSize: 32 }} />
      </Fab>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PatientManagement;
