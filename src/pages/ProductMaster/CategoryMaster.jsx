import { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, TextField, Autocomplete } from '@mui/material';
import DataTable from 'react-data-table-component';
import { Formik, Form } from 'formik';
import MainCard from 'components/MainCard';
import { getAllCategory } from '../../api/apis/productmaster';
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
import { Input } from '@mui/material';

export default function CategoryMaster() {
  // modal functions
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [imagePreview, setImagePreview] = useState('');
  const [Wall, setWall] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [fileName, setFileName] = useState('No selected file');
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

  const fileChangeHandler = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              const readerWebp = new FileReader();
              readerWebp.onload = () => {
                setFieldValue('Img', readerWebp.result);
                setImagePreview(readerWebp.result);
                setFileName(file.name);
              };
              canvas.toBlob(
                (webpBlob) => {
                  readerWebp.readAsDataURL(webpBlob);
                },
                'image/webp',
                1.0
              );
            },
            'image/webp',
            1.0
          );
        };
      };
      reader.readAsDataURL(file);
    }
  };
  

  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      width: '50px'
    },
    {
      name: 'Category',
      selector: (row) => row.Category,
      sortable: true
    },
    {
      name: 'Details',
      selector: (row) => row.Details,
      sortable: true
    },
    {
      name: 'ImageURL',
      selector: (row) => row.ImageURL,
      sortable: true,
      //   cell: (row) => <img src={row.ImageURL} alt="Image" style={{ width: '50px', height: '50px' }} />
      cell: (row) => <img src={row.ImageURL} alt="Image" className="w-[45px] h-[45px] object-cover rounded-full" />
    },

    {
      name: 'Action',
      cell: (row) => (
        <div className="flex">
          <div className="mr-2 flex items-center rounded bg-gray-600 py-1 px-3 text-white no-underline hover:bg-gray-600 cursor-pointer ">
            <EditOutlined />
          </div>
          <div
            className="mr-2 flex items-center rounded bg-red-600 py-1 px-3 text-white no-underline cursor-pointer hover:bg-red-600"
            onClick={() => handleDeleteClick(row.uid)}
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
        const data = await getAllCategory();
        console.log(data);
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

  const handleDeleteAccoutnGroup = async (uid) => {
    try {
      const response = await axios.get(`https://assurelite.datacubeglobal.com/Api/index.php/Master/delete_Category?uid=${uid}`);
      console.log('Delete Unit Response:', response);
      const updatedGroup = await getAllCategory();
      if (Array.isArray(updatedGroup)) {
        setWall(updatedGroup.reverse());
      } else {
        console.error('Updated data is not an array:', updatedGroup);
      }
    } catch (error) {
      console.error('Delete Unit Error:', error);
    }
  };

  const handleDeleteClick = (uid) => {
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
        handleDeleteAccoutnGroup(uid);
        Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
      }
    });
  };

  return (
    <div>
      <MainCard>
        <div className="container mx-auto rounded-md bg-white ">
          <div className="flex justify-between">
            <Typography className="font-semibold text-2xl">Category</Typography>
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
            Add Group
          </Typography>

          <Formik
            initialValues={{
              Category: '',
              Details: '',
              Img: ''
            }}
            onSubmit={async (values) => {
              console.log(values);
              // handleAddOrUpdateAccountGroup(values);
            }}
          >
            {({ handleChange, handleSubmit, setFieldValue, values, errors, touched }) => (
              <Form onSubmit={handleSubmit}>
                <div className="pb-2">
                  <label htmlFor="accountgroup">Category</label>
                  <TextField
                    type="text"
                    id="Category"
                    placeholder="Category"
                    size="small"
                    name="Category"
                    fullWidth
                    value={values.Category}
                    helperText={errors.Category}
                    error={touched.Category && !!errors.Category}
                    onChange={handleChange}
                  />
                </div>
                <div className="pb-2">
                  <label htmlFor="accountgroup">Details</label>
                  <TextField
                    type="text"
                    id="Details"
                    placeholder="Details"
                    size="small"
                    name="Details"
                    fullWidth
                    value={values.Details}
                    helperText={errors.Details}
                    error={touched.Details && !!errors.Details}
                    onChange={handleChange}
                  />
                </div>
                <div className="pb-2">
                  <label htmlFor="Img">Image</label>
                  <Input type="file" id="Img" name="Img" accept="image/*" onChange={(e) => fileChangeHandler(e, setFieldValue)} fullWidth />

                  {imagePreview && <img src={imagePreview} alt="Preview" className="w-[100px] h-[100px] object-cover mt-2" />}
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
