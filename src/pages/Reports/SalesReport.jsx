import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DataTable from 'react-data-table-component';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import axios from 'axios';

const SalesReport = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reportType, setReportType] = useState('SUMMARY'); 

  // Format date to 'yy-MM-dd'
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

      const response = await axios.get('https://assurelite.datacubeglobal.com/Api/index.php/Entries/get_SalesReportSummary?', {
        params: {
          ReportType: reportType,
          SDate: formattedStartDate,
          EDate: formattedEndDate,
          CompanyID: 1
        }
      });
      console.log(response,'???????????????????');
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
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate, reportType]);

  
  const columns = [
    {
      name: 'No',
      selector: (row, index) => index + 1,
      sortable: false,
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
      name: 'BType',
      selector: (row) => row.BType,
      sortable: true
    },
    {
      name: 'CGST',
      selector: (row) => row.CGST,
      sortable: true
    },
    {
      name: 'Cess',
      selector: (row) => row.Cess,
      sortable: true
    },
    {
      name: 'Contact',
      selector: (row) => row.Contact,
      sortable: true
    },
    {
      name: 'Disc',
      selector: (row) => row.Disc,
      sortable: true
    },
    {
      name: 'DiscPercent',
      selector: (row) => row.DiscPercent,
      sortable: true
    },
    {
      name: 'Discount',
      selector: (row) => row.Discount,
      sortable: true
    },
    {
      name: 'EntryNo',
      selector: (row) => row.EntryNo,
      sortable: true
    },
    {
      name: 'GrandTotal',
      selector: (row) => row.GrandTotal,
      sortable: true
    },
    {
      name: 'Gross',
      selector: (row) => row.Gross,
      sortable: true
    },
    {
      name: 'IGST',
      selector: (row) => row.IGST,
      sortable: true
    },
    {
      name: 'InvoiceNo',
      selector: (row) => row.InvoiceNo,
      sortable: true
    },
    {
      name: 'Net',
      selector: (row) => row.Net,
      sortable: true
    },
    {
      name: 'OtherCharge',
      selector: (row) => row.OtherCharge,
      sortable: true
    },
    {
      name: 'Qty',
      selector: (row) => row.Qty,
      sortable: true
    },
    {
      name: 'Received',
      selector: (row) => row.Received,
      sortable: true
    },
    {
      name: 'RefNo',
      selector: (row) => row.RefNo,
      sortable: true
    },
    {
      name: 'RoundOff',
      selector: (row) => row.RoundOff,
      sortable: true
    },
    {
      name: 'SGST',
      selector: (row) => row.SGST,
      sortable: true
    },
    {
      name: 'Total',
      selector: (row) => row.Total,
      sortable: true
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
              <option value="CUSTOMER-SUMMARY">CUSTOMER-SUMMARY</option>
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

export default SalesReport;
