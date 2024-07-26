import { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, TextField, Autocomplete } from '@mui/material';
import DataTable from 'react-data-table-component';
import { Formik, Form } from 'formik';
import MainCard from 'components/MainCard';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 3
};

import Swal from 'sweetalert2';
import CustomSerch from '../../components/@extended/CustomSerch';
import { getAllUnit } from '../../api/apis/productmaster';

export default function UnitMaster() {
  // modal functions
  const [open, setOpen] = useState(false);
  const [Unit, setUnits] = useState([]);
  const [value, setValue] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setValue(null);
    setOpen(false);
  };

  const tableCustomStyles = {
    headCells: {
      style: {
        fontSize: '13px',
        fontWeight: 'bold',
        paddingRight: '12px',
        justifyContent: 'left'
      }
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = Unit ? Unit.filter((item) => {
    return Object.values(item).some((value) => typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase()));
  }) : [];
  
  //   get all uint
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getAllUnit();
        console.log(data);
        if (Array.isArray(data)) {
          const reversed = data.reverse();
          setUnits(reversed);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };
    fetchDetails();
  }, []);

  const handleAddOrEditUnit = async (values) => {
    console.log('Form Submitted', values);
    try {
      const jsonData = {
        UnitName: values.UnitName,
        Details: values.Details
      };
      if (value && value.UID) {
        jsonData.UID = value.UID;
      }
      const jsonDataa = JSON.stringify(jsonData);
      const data = `data=${jsonDataa}`;
      const url = value
        ? 'https://assurelite.datacubeglobal.com/Api/index.php/Master/update_unit'
        : 'https://assurelite.datacubeglobal.com/Api/index.php/Master/add_unit';

      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log(response);
      const updatedUnits = await getAllUnit();
      setUnits(updatedUnits.data);
      handleClose();
      Swal.fire('Success', response.data.message, 'success');
      window.location.reload()
    } catch (error) {
      console.error('Add/Update Unit Error:', error);
      Swal.fire('Error', 'There was an error adding/updating the unit.', 'error');
    }
  };

  const handleEditUnit = async (unitId) => {
    try {
      const response = await axios.get(`https://assurelite.datacubeglobal.com/Api/index.php/Master/get_UnitByID?uid=${unitId}`);
      setValue(response?.data[0]);
      handleOpen();
    } catch (error) {
      console.error('Get Unit Error:', error);
    }
  };

  const handleDeleteUnit = async (unitId) => {
    try {
      const response = await axios.get(`https://assurelite.datacubeglobal.com/Api/index.php/Master/delete_Unit?uid=${unitId}`);
      console.log('Delete Unit Response:', response);
      const updatedUnits = await GetAllUnits();
      setUnits(updatedUnits.data);
    } catch (error) {
      console.error('Delete Unit Error:', error);
    }
  };

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      width: '50px'
    },
    {
      name: 'UnitName',
      selector: (row) => row.UnitName,
      sortable: true
    },
    {
      name: 'Details',
      selector: (row) => row.Details,
      sortable: true
    },

    {
      name: 'Action',
      cell: (row) => (
        <div className="flex">
          <div
            className="mr-2 flex items-center rounded bg-gray-600 py-1 px-3 text-white no-underline hover:bg-gray-600 cursor-pointer "
            onClick={() => handleEditUnit(row.UID)}
          >
            <EditOutlined />
          </div>
          <div
            className="mr-2 flex items-center rounded bg-red-600 py-1 px-3 text-white no-underline cursor-pointer hover:bg-red-600"
            onClick={() => handleDeleteUnit(row.UID)}
          >
            <DeleteOutlined />
          </div>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true
    }
  ];

  return (
    <div>
      <MainCard>
        <div className="container mx-auto rounded-md bg-white">
          <div className="flex justify-between">
            <Typography className="font-semibold text-2xl">Unit</Typography>
            <Button variant="contained" onClick={handleOpen} size="small">
              + New
            </Button>
          </div>

          <div className="py-3">
            <CustomSerch value={searchQuery} onChange={handleSearch} placeholder="Search..." />
          </div>

          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            paginationPerPage={20}
            paginationRowsPerPageOptions={[10, 20, 25, 30, 35, 40, 45, 50]}
            customStyles={tableCustomStyles}
            highlightOnHover
          />
        </div>
      </MainCard>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style} className="rounded-md md:w-[350px]">
          <Typography id="modal-modal-title" className="font-bold text-xl text-black pb-3">
            {value ? 'Edit Unit' : 'Add Unit'}
          </Typography>

          <Formik
            initialValues={{
              UnitName: value ? value.UnitName : '',
              Details: value ? value.Details : ''
            }}
            onSubmit={async (values) => {
              handleAddOrEditUnit(values);
            }}
          >
            {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <div className="pb-2">
                  <label htmlFor="accountgroup">Unit Name</label>
                  <TextField
                    type="text"
                    id="UnitName"
                    placeholder="Unit Name"
                    size="small"
                    name="UnitName"
                    fullWidth
                    value={values.UnitName}
                    helperText={errors.UnitName}
                    error={touched.UnitName && !!errors.UnitName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="accountgroup">Unit Details</label>
                  <TextField
                    type="text"
                    id="UnitName"
                    placeholder="Unit Details"
                    size="small"
                    name="Details"
                    fullWidth
                    value={values.Details}
                    helperText={errors.Details}
                    error={touched.Details && !!errors.Details}
                    onChange={handleChange}
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <div>
                    <Button variant="contained" color="secondary" size="small" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="contained" size="small" className="ms-3" type="submit">
                      Save
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
