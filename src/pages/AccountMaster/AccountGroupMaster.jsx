import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import mui component
import { Box, Button, Typography, Modal, TextField, Autocomplete } from '@mui/material';
// data table
import DataTable from 'react-data-table-component';
// formik import
import { Formik, Form } from 'formik';
// custom component and data import
import MainCard from 'components/MainCard';
import CustomSearch from '../../components/@extended/CustomSerch';
import { getAllAccountGroups } from 'api/apis/accountmaster';

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
import withReactContent from 'sweetalert2-react-content';

export default function AccountGroupMaster() {
  // modal functions
  const [open, setOpen] = useState(false);
  const [AccountGroup, setAccountGroup] = useState([]);
  const [value, setValue] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const MySwal = withReactContent(Swal);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setValue(null);
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

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      width: '50px'
    },
    {
      name: 'GroupName',
      selector: (row) => row.GroupName,
      sortable: true
    },
    {
      name: 'Under',
      selector: (row) => row.Under,
      sortable: true
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="flex">
          <div
            className="mr-2 flex items-center rounded bg-gray-600 py-1 px-3 text-white no-underline  hover:bg-gray-600 cursor-pointer "
            onClick={() => handleEditGroup(row.GroupID)}
          >
            <EditOutlined />
          </div>
          <div
            className="mr-2 flex items-center rounded bg-red-600 py-1 px-3 text-white no-underline cursor-pointer hover:bg-red-600"
            onClick={() => handleDeleteClick(row.GroupID)}
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

  const handleAddOrUpdateAccountGroup = async (values) => {
    try {
      const jsonData = {
        GroupName: values.accountgroup,
        Under: values.under
      };

      if (value && value.GroupID) {
        jsonData.GroupID = value.GroupID;
      }

      const jsonDataa = JSON.stringify(jsonData);
      const data = `data=${jsonDataa}`;
      const url =
        value && value.GroupID
          ? 'https://assurelite.datacubeglobal.com/Api/index.php/Master/update_AccountGroup'
          : 'https://assurelite.datacubeglobal.com/Api/index.php/Master/add_AccountGroup';

      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log('Tax Schedule Response:', response);

      const accountGroup = await getAllAccountGroups();
      setAccountGroup(accountGroup.data);
      handleClose();
    } catch (error) {
      console.error('TaxSchedule Error:', error);
    }
  };

  const handleEditGroup = async (groupId) => {
    try {
      const response = await axios.get(
        `https://assurelite.datacubeglobal.com/Api/index.php/Master/get_AccountGroupByID?GroupID=${groupId}`
      );
      setValue(response?.data[0]);
      handleOpen();
    } catch (error) {
      console.error('Get Group Error:', error);
    }
  };

  const handleDeleteAccoutnGroup = async (groupId) => {
    try {
      const response = await axios.get(`https://assurelite.datacubeglobal.com/Api/index.php/Master/delete_AccountGroup?GroupID=${groupId}`);
      console.log('Delete Unit Response:', response);
      const updatedGroup = await getAllAccountGroups();
      if (Array.isArray(updatedGroup)) {
        setAccountGroup(updatedGroup.reverse());
      } else {
        console.error('Updated data is not an array:', updatedGroup);
      }
    } catch (error) {
      console.error('Delete Unit Error:', error);
    }
  };

  const handleDeleteClick = (groupId) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        popup: 'my-swal-popup',
        backdrop: 'my-swal-overlay'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteAccoutnGroup(groupId);
        MySwal.fire('Deleted!', 'Your record has been deleted.', 'success');
      }
    });
  };

  const filteredData =
    AccountGroup && AccountGroup.length > 0
      ? AccountGroup.filter((item) => {
          return Object.values(item).some((value) => typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase()));
        })
      : [];

  return (
    <div>
      <MainCard>
        <div className="container mx-auto rounded-md bg-white">
          <div className="flex justify-between">
            <Typography className="font-semibold text-2xl">Account Group</Typography>
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
        <Box sx={style} className="rounded-md md:w-[350px] outline-none">
          <Typography id="modal-modal-title" className="font-bold text-xl text-black pb-3">
            Add Group
          </Typography>

          <Formik
            initialValues={{
              accountgroup: value ? value.GroupName : '',
              under: value ? value.Under : ''
            }}
            onSubmit={async (values) => {
              handleAddOrUpdateAccountGroup(values);
            }}
          >
            {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <div className="pb-2">
                  <label htmlFor="accountgroup">Account Group</label>
                  <TextField
                    type="text"
                    id="accountgroup"
                    placeholder="Account Group"
                    size="small"
                    name="accountgroup"
                    fullWidth
                    value={values.accountgroup}
                    helperText={errors.accountgroup}
                    error={touched.accountgroup && !!errors.accountgroup}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="accountgroup">Under</label>
                  {/* <Autocomplete
                    disablePortal
                    size="small"
                    fullWidth
                    // options={AccountGroup}
                    options={AccountGroup || []}
                    getOptionLabel={(option) => option?.GroupName}
                    value={AccountGroup.GroupName}
                    onChange={(event, newValue) => {
                      setFieldValue('under', newValue ? newValue.GroupName : '');
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="under"
                        placeholder="Select Under"
                        error={touched.under && !!errors.under}
                        helperText={touched.under && errors.under}
                      />
                    )}
                  /> */}

                  <Autocomplete
                    disablePortal
                    size="small"
                    fullWidth
                    options={AccountGroup || []}
                    getOptionLabel={(option) => option?.GroupName}
                    value={AccountGroup.find((item) => item.GroupName === values.under) || null}
                    onChange={(event, newValue) => {
                      setFieldValue('under', newValue ? newValue.GroupName : '');
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name="under"
                        placeholder="Select Under"
                        error={touched.under && !!errors.under}
                        helperText={touched.under && errors.under}
                      />
                    )}
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
