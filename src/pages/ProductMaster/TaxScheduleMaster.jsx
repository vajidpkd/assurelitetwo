import { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, TextField, Autocomplete } from '@mui/material';
import DataTable from 'react-data-table-component';
import { Formik, Form } from 'formik';
import MainCard from 'components/MainCard';

// import icons from ant design
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
import { GetAllTaxSchedule, getAllUnit } from '../../api/apis/productmaster';

export default function TaxScheduleMaster() {
  // modal functions
  const [open, setOpen] = useState(false);
  const [TaxSchedule, setTaxSchedule] = useState([]);
  const [taxVal, setTaxVal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      width: '50px'
    },
    {
      name: 'Schedule Name',
      selector: (row) => row.ScheduleName,
      sortable: true
    },
    {
      name: 'Tax',
      selector: (row) => row.Tax,
      sortable: true
    },

    {
      name: 'CGST',
      selector: (row) => row.CGST,
      sortable: true
    },

    {
      name: 'SGST',
      selector: (row) => row.SGST,
      sortable: true
    },

    {
      name: 'IGST',
      selector: (row) => row.SGST,
      sortable: true
    },

    {
      name: 'Action',
      cell: (row) => (
        <div className="flex">
          <div
            className="mr-2 flex items-center rounded bg-gray-600 py-1 px-3 text-white no-underline hover:bg-gray-600 cursor-pointer "
            onClick={() => handleEditTax(row.UID)}
          >
            <EditOutlined />
          </div>
          <div
            className="mr-2 flex items-center rounded bg-red-600 py-1 px-3 text-white no-underline cursor-pointer hover:bg-red-600"
            onClick={() => handleDeleteTax(row.UID)}
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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = TaxSchedule.filter((item) => {
    return Object.values(item).some((value) => typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  //   get all uint
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await GetAllTaxSchedule();
        console.log(data);
        if (Array.isArray(data)) {
          const reversed = data.reverse();

          setTaxSchedule(reversed);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };
    fetchDetails();
  }, []);

  const handleAddOrUpdateTax = async (values) => {
    try {
      const jsonData = {
        ScheduleName: values.ScheduleName,
        Tax: values.Tax,
        CGST: values.CGST,
        SGST: values.SGST,
        IGST: values.IGST
      };

      // If taxVal and taxVal.UID are present, add UID to jsonData
      if (taxVal && taxVal.UID) {
        jsonData.UID = taxVal.UID;
      }

      const jsonDataa = JSON.stringify(jsonData);
      const data = `data=${jsonDataa}`;
      const url =
        taxVal && taxVal.UID
          ? 'https://assurelite.datacubeglobal.com/Api/index.php/Master/update_TaxSchedule'
          : 'https://assurelite.datacubeglobal.com/Api/index.php/Master/add_TaxSchedule';

      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log('Tax Schedule Response:', response);

      // Fetch the updated list of tax schedules
      const updatedTax = await GetAllTaxSchedule();
      setTaxSchedule(updatedTax.data);
      handleClose();
    } catch (error) {
      console.error('TaxSchedule Error:', error);
    }
  };

  const handleEditTax = async (taxid) => {
    try {
      const response = await axios.get(`https://assurelite.datacubeglobal.com/Api/index.php/Master/get_TaxScheduleByID?uid=${taxid}`);
      setTaxVal(response?.data[0]);
      handleOpen();
    } catch (error) {
      console.error('Get Unit Error:', error);
    }
  };

  const handleDeleteTax = async (unitId) => {
    try {
      const response = await axios.get(`https://assurelite.datacubeglobal.com/Api/index.php/Master/delete_TaxSchedule?uid=${unitId}`);
      console.log('Delete Unit Response:', response);
      const updatedUnits = await GetAllTaxSchedule();
      setTaxSchedule(updatedUnits.data);
    } catch (error) {
      console.error('Delete Unit Error:', error);
    }
  };

  return (
    <div>
      <MainCard>
        <div className="container mx-auto rounded-md bg-white">
          <div className="flex justify-between">
            <Typography className="font-semibold text-2xl">Tax Schedule</Typography>
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
        <Box sx={style} className="rounded-md">
          <Typography id="modal-modal-title" className="font-bold text-xl text-black pb-3">
            Tax Schedule
          </Typography>

          <Formik
            initialValues={{
              ScheduleName: taxVal ? taxVal.ScheduleName : '',
              Tax: taxVal ? taxVal.Tax : '',
              CGST: taxVal ? taxVal.CGST : '',
              SGST: taxVal ? taxVal.SGST : '',
              IGST: taxVal ? taxVal.IGST : ''
            }}
            onSubmit={async (values) => {
              handleAddOrUpdateTax(values);
            }}
          >
            {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <div className="pb-2">
                  <label htmlFor="accountgroup">Schedule</label>
                  <TextField
                    type="text"
                    id="Schedule"
                    placeholder="Schedule"
                    size="small"
                    name="ScheduleName"
                    fullWidth
                    value={values.ScheduleName}
                    helperText={errors.ScheduleName}
                    error={touched.ScheduleName && !!errors.ScheduleName}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex max-md:flex-col gap-2">
                  <div className="pb-2 md:w-[50%]">
                    <label htmlFor="Tax">Tax</label>
                    <TextField
                      type="text"
                      id="Tax"
                      placeholder="Tax"
                      size="small"
                      name="Tax"
                      fullWidth
                      value={values.Tax}
                      helperText={errors.Tax}
                      error={touched.Tax && !!errors.Tax}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="pb-2 md:w-[50%]">
                    <label htmlFor="accountgroup">CGST</label>
                    <TextField
                      type="text"
                      id="accountgroup"
                      placeholder="Account Group"
                      size="small"
                      name="CGST"
                      fullWidth
                      value={values.CGST}
                      helperText={errors.Tax}
                      error={touched.Tax && !!errors.Tax}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex max-md:flex-col gap-2">
                  <div className="pb-2 md:w-[50%]">
                    <label htmlFor="accountgroup">SGST</label>
                    <TextField
                      type="text"
                      id="accountgroup"
                      placeholder="Account Group"
                      size="small"
                      name="SGST"
                      fullWidth
                      value={values.SGST}
                      helperText={errors.accountgroup}
                      error={touched.accountgroup && !!errors.accountgroup}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="pb-2 md:w-[50%]">
                    <label htmlFor="accountgroup">IGST</label>
                    <TextField
                      type="text"
                      id="accountgroup"
                      placeholder="Account Group"
                      size="small"
                      name="IGST"
                      fullWidth
                      value={values.IGST}
                      helperText={errors.accountgroup}
                      error={touched.accountgroup && !!errors.accountgroup}
                      onChange={handleChange}
                    />
                  </div>
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
