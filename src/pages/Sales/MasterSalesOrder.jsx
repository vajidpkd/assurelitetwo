import { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import mui component
import { Box, Button, Typography, Modal, TextField, Autocomplete } from '@mui/material';
// data table
import DataTable from 'react-data-table-component';
// formik import
import { Formik, Form } from 'formik';
// custom component and data import
import MainCard from 'components/MainCard';
// import CustomSearch from '../../components/@extended/CustomSearch'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';

import CustomSerch from '../../components/@extended/CustomSerch';
import { useNavigate } from 'react-router';
import { getAllSalesOrder } from 'api/apis/accountmaster';

export default function MasterSalesOrder() {
  const [Sales, setSales] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getAllSalesOrder();
        console.log('Fetched data:', data);
        if (Array.isArray(data)) {
          const reversed = data.reverse();
          setSales(reversed);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };
    fetchDetails();
  }, []);

  const filteredData = Array.isArray(Sales)
    ? Sales.filter((item) => {
        return Object.values(item).some((value) => typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase()));
      })
    : [];

  const handleDeleteOrder = async (RefNo) => {
    try {
      const response = await axios.get(`https://assurelite.datacubeglobal.com/Api/index.php/Entries/delete_SalesOrder?RefNo=${RefNo}`);
      console.log('Delete Unit Response:', response);
      const updatedUnits = await getAllSalesOrder();
      setSales(updatedUnits.data);
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
      name: 'Account',
      selector: (row) => row.Account,
      sortable: true
    },

    {
      name: 'Customer',
      selector: (row) => row.Customer,
      sortable: true
    },
    {
      name: 'Address',
      selector: (row) => row.Address,
      sortable: true
    },
    {
      name: 'Contact',
      selector: (row) => row.Contact,
      sortable: true
    },
    {
      name: 'Qty',
      selector: (row) => row.Qty,
      sortable: true
    },

    {
      name: 'GrandTotal',
      selector: (row) => row.GrandTotal,
      sortable: true
    },

    {
      name: 'Action',
      cell: (row) => (
        <div className="flex">
          <div
            className="mr-2 flex items-center rounded bg-gray-600 py-1 px-3 text-white no-underline hover:bg-gray-600 cursor-pointer "
            onClick={() => navigate('/editsalesorder')}
          >
            <EditOutlined />
          </div>
          <div
            className="mr-2 flex items-center rounded bg-red-600 py-1 px-3 text-white no-underline cursor-pointer hover:bg-red-600"
            onClick={() => handleDeleteOrder(row.RefNo)}
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

  return (
    <div>
      <MainCard>
        <div className="container mx-auto rounded-md bg-white ">
          <div className="flex justify-between">
            <Typography className="font-semibold text-2xl">Sales Order</Typography>
            <Button variant="contained" onClick={() => navigate('/addsalesorder')} size="small">
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
