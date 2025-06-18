import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridPaginationModel,
  GridRowParams,
} from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Patient } from "../types/Patient";

interface PatientTableProps {
  patients: Patient[];
}

const PatientTable: React.FC<PatientTableProps> = ({ patients }) => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    patient: Patient | null;
  }>({
    open: false,
    patient: null,
  });

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleDeleteClick = (patient: Patient) => {
    setDeleteDialog({ open: true, patient });
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog.patient) {
      setDeleteDialog({ open: false, patient: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, patient: null });
  };

  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "Full Name",
      width: 200,
      valueGetter: (value, row) => `${row.firstName} ${row.lastName}`,
    },
    {
      field: "age",
      headerName: "Age",
      width: 80,
      valueGetter: (value, row) => calculateAge(row.dateOfBirth),
      type: "number",
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color={
            params.value === "Male"
              ? "primary"
              : params.value === "Female"
              ? "secondary"
              : "default"
          }
        />
      ),
    },
    {
      field: "phoneNumber",
      headerName: "Phone",
      width: 150,
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "city",
      headerName: "City",
      width: 120,
    },
    {
      field: "state",
      headerName: "State",
      width: 80,
    },
    {
      field: "insuranceProvider",
      headerName: "Insurance",
      width: 150,
    },
    {
      field: "bloodType",
      headerName: "Blood Type",
      width: 100,
      renderCell: (params) => (
        <Chip label={params.value} size="small" variant="outlined" />
      ),
    },
    {
      field: "primaryPhysician",
      headerName: "Primary Physician",
      width: 180,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          key="edit"
          icon={<EditIcon />}
          label="Edit"
          color="primary"
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
        />,
      ],
    },
  ];

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          color="primary"
          fontWeight="bold"
        >
          Patient Records
        </Typography>
        <Chip
          label={`${patients.length} total patients`}
          color="primary"
          variant="outlined"
        />
      </Box>

      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={patients}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 25, 50]}
          disableRowSelectionOnClick
          sx={{
            "& .MuiDataGrid-cell:hover": {
              color: "primary.main",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "action.hover",
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default PatientTable;
