import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../theme";

// Contoh data (gantilah dengan data yang sesuai)
const sampleData = [
  { id: 1, name: "Category A" },
  { id: 2, name: "Category B" },
  { id: 3, name: "Category C" },
  // ... tambahkan data sesuai kebutuhan
];

function Category(params) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => handleAction(params.row.id)}
        >
          Edit
        </Button>
      ),
    },
  ];

  const handleAction = (id) => {
    console.log("Edit button clicked for ID:", id);
  };

  const handleAdd = () => {
    console.log("Tambah button clicked");
    // Lakukan sesuatu ketika tombol "Tambah" ditekan, misalnya, buka form tambah data
  };

  return (
    <Card>
      <CardContent>
        <Header title="CATEGORY" subtitle="Welcome to your category" />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          flexDirection="row-reverse" // Ini yang baru ditambahkan untuk memindahkan tombol ke sebelah kanan
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAdd()}
          >
            Tambah
          </Button>
        </Box>
        <Box
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            // ... (your styling code)
          }}
        >
          <DataGrid checkboxSelection rows={sampleData} columns={columns} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default Category;
