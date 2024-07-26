import { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, TextField, Autocomplete } from '@mui/material';
import DataTable from 'react-data-table-component';
import { Formik, Form } from 'formik';
import MainCard from 'components/MainCard';
import CustomSerch from 'components/@extended/CustomSerch';
import { useNavigate } from 'react-router';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { getAllPayment } from 'api/apis/accountmaster';

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



export default function GetAllPayment() {
  // modal functions

  const [Wall, setWall] = useState([]);
  const navigate = useNavigate('');
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

  const handleDelete = async (RefNo) => {
    try {
      await axios.put(`https://assurelite.datacubeglobal.com/Api/index.php/Entries/delete_Payment?RefNo=${RefNo}`);
      setWall((prevDetails) => prevDetails.filter((lead) => lead.RefNo !== RefNo));
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  
  const filteredData = Wall.filter((item) => {
    return Object.values(item).some((value) => typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase()));
  });

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
      name: 'Amount',
      selector: (row) => row.Amount,
      sortable: true,
    //   cell: (row) => <img src={row.ImageURL} alt="Image" style={{ width: '50px', height: '50px' }} />
    },
    {
      name: 'ChDate',
      selector: (row) => row.TransType !== 'CASH' ? row.ChDate : null,
      sortable: true,
      omit: filteredData.every((row) => row.TransType === 'CASH')
    },
    {
      name: 'ChNo',
      selector: (row) => row.TransType !== 'CASH' ? row.ChNo : null,
      sortable: true,
      omit: filteredData.every((row) => row.TransType === 'CASH')
    },
    {
      name: 'ClDate',
      selector: (row) => row.TransType !== 'CASH' ? row.ClDate : null,
      sortable: true,
      omit: filteredData.every((row) => row.TransType === 'CASH')
    },
    {
      name: 'EntryDate',
      selector: (row) => row.EntryDate,
      sortable: true
    },
    {
      name: 'EntryTime',
      selector: (row) => row.EntryTime,
      sortable: true
    },
    {
      name: 'InvoiceNo',
      selector: (row) => row.InvoiceNo,
      sortable: true
    },
    {
      name: 'Party',
      selector: (row) => row.Party,
      sortable: true
    },
    {
      name: 'PartyName',
      selector: (row) => row.PartyName,
      sortable: true
    },
    {
      name: 'TransType',
      selector: (row) => row.TransType,
      sortable: true
    },
    {
      name: 'Voucher',
      selector: (row) => row.Voucher,
      sortable: true
    },
    {
      name: 'VoucherNo',
      selector: (row) => row.VoucherNo,
      sortable: true
    },
    {
      name: 'Account',
      selector: (row) => row.Account,
      sortable: true
    },
    {
      name: 'Status',
      selector: (row) => row.Status,
      sortable: true
    },
   
    {
      name: 'Action',
      cell: (row) => (
        <div className="flex">
          <div
            className="mr-2 flex items-center rounded bg-gray-600 py-1 px-3 text-white no-underline hover:bg-gray-600 cursor-pointer"
            onClick={() => handleEdit(row.RefNo)}
          >
            <EditOutlined />
          </div>
          <div
            className="mr-2 flex items-center rounded bg-red-600 py-1 px-3 text-white no-underline cursor-pointer hover:bg-red-600"
            // onClick={() => handleDelete(row.RefNo)}
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

  const handleEdit = (RefNo) => {
    navigate(`/editpayment/${RefNo}`);
  };


  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getAllPayment();
        console.log(data,'NNNNNNNNNNNNN');
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


  const handlenavigate =()=>{
    navigate('/Addpayment')
  }

  return (
    <div>
      <MainCard>
        <div className="container mx-auto rounded-md bg-white p-10">
          <div className="flex justify-between">
            <Typography className="font-semibold text-2xl">Payment</Typography>
            <Button variant="contained" onClick={handlenavigate} size="small">
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

      
    </div>
  );
}
