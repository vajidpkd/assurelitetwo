import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import axios from 'axios';

const SalesItemsReport = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reportType, setReportType] = useState('SUMMARY'); 


  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const day = date.getDate().toString().padStart(2, '0'); 
    return `${year}-${month}-${day}`;
  };

  // Handle date changes
  const handleDateChange = (date, isStartDate) => {
    if (isStartDate) {
      setStartDate(date);
      if (endDate && date > endDate) {
        setEndDate(date);
      }
    } else {
      setEndDate(date);
      if (startDate && date < startDate) {
        setStartDate(date);
      }
    }
  };

  // Fetch data from API
  const fetchData = async () => {
    if (!startDate || !endDate) return;
    setLoading(true);
    setError(null);
    try {
      const formattedStartDate = formatDate(startDate);
      const formattedEndDate = formatDate(endDate);
      const response = await axios.get('https://assurelite.datacubeglobal.com/Api/index.php/Entries/get_SalesReportItemWise?', {
        params: {
          ReportType: reportType,
          SDate: formattedStartDate,
          EDate: formattedEndDate,
          CompanyID: 1
        }
      });
      console.log('Response:', response);
      setReportData(response.data);
     
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire('Error', 'Failed to fetch data', 'error');
      setReportData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate, reportType]);
  

  
  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: false,
      width: '50px'
    },
    {
        name: 'Entry Date',
        selector: (row) => row.EntryDate,
        sortable: true,
        width: '150px', // Adjust width as needed
      },
      {
        name: 'Account',
        selector: (row) => row.Account,
        sortable: true,
        width: '150px',
      },
      {
        name: 'Customer',
        selector: (row) => row.Customer,
        sortable: true,
        width: '150px',
      },
      {
        name: 'Address',
        selector: (row) => row.Address || 'N/A', // Default to 'N/A' if Address is not present
        sortable: true,
        width: '200px',
      },
      {
        name: 'BType',
        selector: (row) => row.BType,
        sortable: true,
        width: '150px',
      },
      {
        name: 'Barcode',
        selector: (row) => row.Barcode,
        sortable: true,
        width: '150px',
      },
      {
        name: 'Category',
        selector: (row) => row.Category,
        sortable: true,
        width: '150px',
      },
      {
        name: 'CGST',
        selector: (row) => row.CGST,
        sortable: true,
        width: '150px',
      },
      {
        name: 'Cess',
        selector: (row) => row.Cess,
        sortable: true,
        width: '150px',
      },
      {
        name: 'Contact',
        selector: (row) => row.Contact,
        sortable: true,
        width: '150px',
      },
      {
        name: 'Disc',
        selector: (row) => row.Disc,
        sortable: true,
        width: '150px',
      },
      {
        name: 'Disc Per',
        selector: (row) => row.DiscPer,
        sortable: true,
        width: '150px',
      },
      
      {
        name: 'Entry Time',
        selector: (row) => row.EntryTime || 'N/A', 
        sortable: true,
        width: '150px',
      },
      
      {
        name: 'IGST',
        selector: (row) => row.IGST,
        sortable: true,
        width: '150px',
      },
      {
        name: 'Item Name',
        selector: (row) => row.ItemName,
        sortable: true,
        width: '150px',
      },
      {
        name: 'MRP',
        selector: (row) => row.MRP,
        sortable: true,
        width: '150px',
      },
      {
        name: 'Net',
        selector: (row) => row.Net,
        sortable: true,
        width: '150px',
      },
      {
        name: 'Qty',
        selector: (row) => row.Qty,
        sortable: true,
        width: '150px',
      },
      
      {
        name: 'SGST',
        selector: (row) => row.SGST,
        sortable: true,
        width: '150px',
      },
      {
        name: 'SRate',
        selector: (row) => row.SRate,
        sortable: true,
        width: '150px',
      },
      {
        name: 'Tax',
        selector: (row) => row.Tax,
        sortable: true,
        width: '150px',
      },
      {
        name: 'Total',
        selector: (row) => row.Total,
        sortable: true,
        width: '150px',
      },
      {
        name: 'Unit',
        selector: (row) => row.Unit || 'N/A', 
        sortable: true,
        width: '150px',
      }
    
  ];

  return (
    <div className="container mt-5">
      <div className="card shadow-sm mb-4 p-4">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => handleDateChange(date, true)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select start date"
              className="form-control mt-1 w-full"
              id="startDate"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => handleDateChange(date, false)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select end date"
              className="form-control mt-1 w-full"
              id="endDate"
              
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="reportType" className="block text-sm font-medium text-gray-700">
              Select Report Type
            </label>
            <select id="reportType" className="form-control mt-1 w-full" value={reportType} onChange={(e) => setReportType(e.target.value)}>
              <option value="SUMMARY">SUMMARY</option>
              <option value="CUSTOMER-ITEM-SUMMARY
">CUSTOMER-ITEM-SUMMARY
              </option>
              <option value="ITEM-SUMMARY">ITEM-SUMMARY</option>
          
            </select>
          </div>
        </div>
        <div className="col-12 text-center mb-4">
          <button type="button" className={`btn btn-primary ${loading ? 'disabled' : ''}`} onClick={fetchData} disabled={loading}>
            {loading ? 'Loading...' : 'VIEW'}
          </button>
        </div>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <DataTable
          columns={columns}
          data={reportData}
          pagination
          paginationPerPage={50}
          paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
          highlightOnHover
          noDataComponent="No data available"
          subHeader
          subHeaderComponent={
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                className="form-control w-64 py-2 px-4 text-base" 
                onChange={(e) =>
                  setReportData(
                    reportData.filter((item) => {
                      return Object.values(item).some((value) => value.toLowerCase().includes(e.target.value.toLowerCase()));
                    })
                  )
                }
              />
            </div>
          }
        />
      </div>
    </div>
  );
};

export default SalesItemsReport;
