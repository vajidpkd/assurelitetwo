import React, { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getAllLedger, getAllSalesJournal } from 'api/apis/accountmaster';

const AddJournal = ({ onClose }) => {
  const [sales, setSales] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [entryData, setEntryData] = useState({
    EntryDate: '',
    Narration: '',
    CompanyID: 1,
    InvoiceNo: '',
    Items: [{ Account: '', Debit: '', Credit: '', Narration: '', Opposite: '' }]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntryData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...entryData.Items];
    updatedItems[index][name] = value;
    setEntryData((prevData) => ({
      ...prevData,
      Items: updatedItems
    }));
  };

  const addItem = () => {
    setEntryData((prevData) => ({
      ...prevData,
      Items: [...prevData.Items, { Account: '', Debit: '', Credit: '', Narration: '', Opposite: '' }]
    }));
  };

  const removeItem = (index) => {
    const updatedItems = entryData.Items.filter((_, i) => i !== index);
    setEntryData((prevData) => ({
      ...prevData,
      Items: updatedItems
    }));
  };

  const resetForm = () => {
    setEntryData(initialEntryData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jsonDataa = JSON.stringify(entryData);
      const data = `data=${encodeURIComponent(jsonDataa)}`;
      const response = await axios.post('https://assurelite.datacubeglobal.com/Api/index.php/Entries/add_Journal', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (response.data) {
        console.log('Journal entry added successfully');
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Journal entry added successfully!'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        console.error('Failed to add journal entry');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to add journal entry'
        });
      }
    } catch (error) {
      console.error('Error adding journal entry:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error adding journal entry'
      });
    }
  };

  const handleAccountChange = (event, newValue) => {
    setSelectedAccount(newValue);
  };
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getAllLedger();
        console.log('Fetched data:', data);
        if (Array.isArray(data)) {
          const reversed = data.reverse();
          console.log(reversed);
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

  return (
    <Paper style={{ padding: '20px', position: 'relative' }}>
      <Typography variant="h6">Journal Entry</Typography>
      <br />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Entry Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              name="EntryDate"
              value={entryData.EntryDate}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Narration" name="Narration" value={entryData.Narration} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField label="Invoice Number" name="InvoiceNo" value={entryData.InvoiceNo} onChange={handleChange} fullWidth />
          </Grid>

          {/* <Typography>Items</Typography> */}
          {entryData.Items.map((item, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={3}>
                <Autocomplete
                  options={sales.map((sale) => ({ label: sale.AccountName, id: sale.id }))}
                  getOptionLabel={(option) => option.label}
                  value={selectedAccount}
                  onChange={handleAccountChange}
                  renderInput={(params) => <TextField {...params} label="Select Account" variant="outlined" fullWidth />}
                  style={{ width: '300px', marginBottom: '16px' }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Debit"
                  name="Debit"
                  type="number"
                  value={item.Debit}
                  onChange={(e) => handleItemChange(index, e)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Credit"
                  name="Credit"
                  type="number"
                  value={item.Credit}
                  onChange={(e) => handleItemChange(index, e)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Narration"
                  name="Narration"
                  value={item.Narration}
                  onChange={(e) => handleItemChange(index, e)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Opposite Account"
                  name="Opposite"
                  value={item.Opposite}
                  onChange={(e) => handleItemChange(index, e)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <IconButton color="error" onClick={() => removeItem(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </React.Fragment>
          ))}
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={addItem}
              sx={{
                backgroundColor: 'white',
                color: 'black',
                border: '1px solid black',
                '&:hover': {
                  backgroundColor: 'lightgray'
                }
              }}
            >
              + Add Item
            </Button>
          </Grid>
          <Grid item xs={12} className="flex justify-center">
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default AddJournal;
