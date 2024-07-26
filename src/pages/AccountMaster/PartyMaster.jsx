import { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, TextField, Autocomplete } from '@mui/material';
// data table
import DataTable from 'react-data-table-component';
// formik import
import { Formik, Form } from 'formik';
import MainCard from 'components/MainCard';
import { getAllAccountGroups, getAllParty } from '../../api/apis/accountmaster';

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
import { useNavigate } from 'react-router';

export default function PartyMaster() {
  // modal functions
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate=useNavigate()
  const [Wall, setWall] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');




  const  handleEditClick=(AccountID)=>{
    navigate(`/editparty/${AccountID}`)
  }

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
      name: 'AccountName',
      selector: (row) => row.AccountName,
      sortable: true
    },
    {
      name: 'Address',
      selector: (row) => row.Address,
      sortable: true
    },
    {
      name: 'GroupName',
      selector: (row) => row.GroupName,
      sortable: true
    },
    {
      name: 'email',
      selector: (row) => row.email,
      sortable: true,
      width: '180px'
    },
    {
      name: 'State',
      selector: (row) => row.State,
      sortable: true
    },

    {
      name: 'StateCode',
      selector: (row) => row.StateCode,
      sortable: true
    },

    {
      name: 'RegnNo',
      selector: (row) => row.RegnNo,
      sortable: true
    },
    {
      name: 'PAN',
      selector: (row) => row.PAN,
      sortable: true
    },
    {
      name: 'Mobile',
      selector: (row) => row.Mobile,
      sortable: true
    },
    {
      name: 'GSTType',
      selector: (row) => row.GSTType,
      sortable: true
    },
    {
      name: 'CrDays',
      selector: (row) => row.CrDays,
      sortable: true
    },
    {
      name: 'CrAmount',
      selector: (row) => row.CrAmount,
      sortable: true
    },

    {
      name: 'Action',
      cell: (row) => (
        <div className="flex">
          <div className="mr-2 flex items-center rounded bg-gray-600 py-1 px-3 text-white no-underline hover:bg-gray-600 cursor-pointer "
             onClick={() => handleEditClick(row.AccountID)}>
            
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

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = Wall.filter((item) => {
    return Object.values(item).some((value) => typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getAllParty();
        console.log(data, '???????');
        if (Array.isArray(data)) {
          const reversed = data.reverse();
          setWall(reversed);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };
    fetchDetails();
  }, []);

  const handleDeleteAccoutnGroup = async (AccountID) => {
    try {
      const response = await axios.get(`https://assurelite.datacubeglobal.com/Api/index.php/Master/delete_Party?AccountID=${AccountID}`);
      console.log('Delete Unit Response:', response);
      const updatedGroup = await getAllParty();
      if (Array.isArray(updatedGroup)) {
        setWall(updatedGroup.reverse());
      } else {
        console.error('Updated data is not an array:', updatedGroup);
      }
    } catch (error) {
      console.error('Delete Unit Error:', error);
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
        handleDeleteAccoutnGroup(AccountID);
        Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
      }
    });
  };


  const handleClick =()=>{
    navigate('/addparty')
  }




  return (
    <div>
      <MainCard>
        <div className="container mx-auto rounded-md bg-white">
          <div className="flex justify-between">
            <Typography className="font-semibold text-2xl">Party</Typography>
            <Button variant="contained" onClick={handleClick} size="small">
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
            Add Group
          </Typography>

          <Formik
            initialValues={{
              accountgroup: '',
              under: ''
            }}
            onSubmit={async (values) => {
              console.log(values);
              // handleAddOrUpdateAccountGroup(values);
            }}
          >
            {/* {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => ( */}
            {/* <Form onSubmit={handleSubmit}> */}
            {/* <div className="pb-2">
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
                </div> */}

            <div>
              <label htmlFor="accountgroup">Under</label>
              <Autocomplete
                fullWidth
                disablePortal
                id="basic-autocomplete"
                options={Wall}
                size="small"
                renderInput={(params) => <TextField {...params} placeholder="Placeholder" />}
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
            {/* </Form> */}
            {/* )} */}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
