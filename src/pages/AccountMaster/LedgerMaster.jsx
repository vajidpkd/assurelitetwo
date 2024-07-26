import { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, TextField, Autocomplete } from '@mui/material';
import DataTable from 'react-data-table-component';
import { Formik, Form } from 'formik';
import MainCard from 'components/MainCard';
import { getAllAccountGroups, getAllLedger } from '../../api/apis/accountmaster';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import Swal from 'sweetalert2';
import CustomSearch from '../../components/@extended/CustomSerch';

export default function LedgerMaster() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
    document.querySelector('#main-content').setAttribute('inert', 'true');
  };
  const handleClose = () => {
    setValue(null);
    setOpen(false);
    document.querySelector('#main-content').removeAttribute('inert');
  };

  const [value, setValue] = useState(null);
  const [AccountGroup, setAccountGroup] = useState([]);
  const [wall, setWall] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getAllAccountGroups();
        if (Array.isArray(data)) {
          const reversed = data.reverse();
          setAccountGroup(reversed);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };
    fetchDetails();
  }, []);

  const handleAddOrEditLedger = async (values) => {
    try {
      const jsonData = {
        AccountName: values.AccountName,
        GroupName: values.GroupName,
        CompanyID: 1
      };
      if (value && value.UID) {
        jsonData.UID = value.UID;
      }
      const jsonDataString = JSON.stringify(jsonData);
      const data = `data=${jsonDataString}`;
      const url = value
        ? 'https://assurelite.datacubeglobal.com/Api/index.php/Master/update_Ledger'
        : 'https://assurelite.datacubeglobal.com/Api/index.php/Master/add_Ledger';

      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      console.log('Response:', response);
      console.log('Response Data:', response.data);
      const responseData = response.data[0];

      if (responseData.status) {
        Swal.fire('Success', responseData.result, 'success');
        fetchLedgerDetails();
        handleClose();
      } else {
        Swal.fire('Error', responseData.result, 'error');
      }
    } catch (error) {
      console.error('Add/Update Ledger Error:', error);
      Swal.fire('Error', 'There was an error adding/updating the ledger.', 'error');
    }
  };

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      width: '50px'
    },
    {
      name: 'AccountName',
      selector: (row) => row.AccountName,
      sortable: true
    },
    {
      name: 'GroupName',
      selector: (row) => row.GroupName,
      sortable: true
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="flex">
          <div
            className="mr-2 flex items-center rounded bg-gray-600 py-1 px-3 text-white no-underline hover:bg-gray-600 cursor-pointer "
            onClick={() => handleEditClick(row)}
          >
            <EditOutlined />
          </div>
          <div
            className="mr-2 flex items-center rounded bg-red-600 py-1 px-3 text-white no-underline cursor-pointer hover:bg-red-600"
            onClick={() => handleDeleteClick(row.AccountID)}
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

  const handleEditClick = (row) => {
    setValue(row);
    handleOpen();
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = wall.filter((item) => {
    return Object.values(item).some((value) => typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  const fetchLedgerDetails = async () => {
    try {
      const data = await getAllLedger();
      if (Array.isArray(data)) {
        const reversed = data.reverse();
        console.log(reversed);
        setWall(reversed);
      } else {
        console.error('Data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching ledger details:', error);
    }
  };

  useEffect(() => {
    fetchLedgerDetails();
  }, []);

  const handleDeleteLedger = async (AccountID) => {
    try {
      const response = await axios.get(`https://assurelite.datacubeglobal.com/Api/index.php/Master/delete_Ledger?AccountID=${AccountID}`);
      console.log('Response:', response);
      console.log('Response Data:', response.data);

      const responseData = response.data[0]; // Access the first element of the array

      if (responseData.status) {
        Swal.fire('Deleted!', responseData.result, 'success');
        fetchLedgerDetails();
      } else {
        Swal.fire('Error', responseData.result, 'error');
      }
    } catch (error) {
      console.error('Delete Ledger Error:', error);
      Swal.fire('Error', 'There was an error deleting the ledger.', 'error');
    }
  };

  const handleDeleteClick = (AccountID) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteLedger(AccountID);
      }
    });
  };

  return (
    <div>
      <MainCard id="main-content">
        <div className="container mx-auto rounded-md bg-white ">
          <div className="flex justify-between">
            <Typography className="font-semibold text-2xl">Ledger</Typography>
            <Button variant="contained" onClick={handleOpen} size="small">
              + New
            </Button>
          </div>

          <div className="py-3">
            <CustomSearch value={searchQuery} onChange={handleSearch} placeholder="Search..." />
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
            {value ? 'Edit Ledger' : 'Add Ledger'}
          </Typography>

          <Formik
            initialValues={{
              AccountName: value ? value.AccountName : '',
              GroupName: value ? value.GroupName : ''
            }}
            onSubmit={handleAddOrEditLedger}
          >
            {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <div className="pb-2">
                  <label htmlFor="AccountName">Account Name</label>
                  <TextField
                    type="text"
                    id="AccountName"
                    placeholder="Account Name"
                    size="small"
                    name="AccountName"
                    fullWidth
                    value={values.AccountName}
                    onChange={handleChange}
                  />
                </div>

                <div className="pb-2">
                  <label htmlFor="GroupName">Group Name</label>
                  <Autocomplete
                    disablePortal
                    size="small"
                    fullWidth
                    options={AccountGroup || []}
                    getOptionLabel={(option) => option?.GroupName || ''}
                    value={AccountGroup.find((item) => item.GroupName === values.GroupName) || null}
                    onChange={(event, newValue) => {
                      setFieldValue('GroupName', newValue ? newValue.GroupName : '');
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="GroupName"
                        placeholder="Select Group"
                        error={touched.GroupName && !!errors.GroupName}
                        helperText={touched.GroupName && errors.GroupName}
                      />
                    )}
                  />
                </div>

                <div className="pt-5 flex justify-end">
                  <Button onClick={handleClose} size="small" variant="outlined" className="mr-2">
                    Cancel
                  </Button>
                  <Button type="submit" size="small" variant="contained">
                    {value ? 'Update' : 'Submit'}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
