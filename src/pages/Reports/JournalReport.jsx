import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, CircularProgress } from '@mui/material';
import DataTable from 'react-data-table-component';
import 'react-data-table-component-extensions/dist/index.css';

// Define columns for the DataTable
const columns = [
  { name: 'Date', selector: row => row.Date, sortable: true },
  { name: 'Account', selector: row => row.Account, sortable: true },
  { name: 'Entry No', selector: row => row.EntryNo, sortable: true },
  { name: 'Description', selector: row => row.Description, sortable: true },
  { name: 'Amount', selector: row => row.Amount, sortable: true },
  // Add more columns as needed
];

const JournalReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accounts, setAccounts] = useState([]);

  // Fetch account options (optional)
  const fetchAccounts = async () => {
    try {
      // Replace with your endpoint to get account list
      const response = await axios.get('https://assurelite.datacubeglobal.com/Api/index.php/Entries/get_AccountList?CompanyID=1');
      setAccounts(response.data);
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
  };

  // Fetch report data
  const fetchData = async () => {
    if (!startDate || !endDate) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://assurelite.datacubeglobal.com/Api/index.php/Entries/get_JournalReport', {
        params: {
          SDate: startDate,
          EDate: endDate,
          CompanyID: 1,
          Account: selectedAccount || undefined, // Include Account if selected
        }
      });
      setReportData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts(); // Fetch account options on component mount
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row mb-4">
            <div className="col-md-3 mb-3">
              <TextField
                type="date"
                label="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <div className="col-md-3 mb-3">
              <TextField
                type="date"
                label="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <div className="col-md-3 mb-3">
              <TextField
                select
                label="Account"
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                fullWidth
                helperText="Select an account (optional)"
              >
                {accounts.map((account) => (
                  <MenuItem key={account.id} value={account.id}>
                    {account.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="col-md-3 mb-3 d-flex align-items-end">
              <Button
                variant="contained"
                color="primary"
                onClick={fetchData}
                fullWidth
              >
                Fetch Report
              </Button>
            </div>
          </div>
          {loading ? (
            <div className="text-center">
              <CircularProgress />
            </div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
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
                <TextField
                  placeholder="Search..."
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={(e) =>
                    setReportData(
                      reportData.filter((item) =>
                        Object.values(item).some((value) =>
                          value.toLowerCase().includes(e.target.value.toLowerCase())
                        )
                      )
                    )
                  }
                />
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalReport;
