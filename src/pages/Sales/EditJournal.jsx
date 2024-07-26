// EditJournal.js
import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Typography, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router';

const EditJournal = () => {
  const { RefNo } = useParams();
  const [entryData, setEntryData] = useState({
    EntryDate: '',
    Narration: '',
    CompanyID: 1,
    InvoiceNo: '',
    RefNo: '',
    Items: [{ Account: '', Debit: '', Credit: '', Narration: '', Opposite: '' }]
  });

  useEffect(() => {
    const fetchJournalData = async () => {
      try {
        const response = await axios.get(`https://assurelite.datacubeglobal.com/Api/index.php/Entries/get_JournalByRefNo?RefNo=${RefNo}`);
        if (response.data) {
          const data = response.data[0];
          console.log(data, '?????');
          setEntryData({
            RefNo: data.RefNo || '',
            EntryDate: data.EntryDate || '',
            Narration: data.Narration || '',
            CompanyID: data.CompanyID || 1,
            InvoiceNo: data.InvoiceNo || '',
            Items: data.Items || [{ Account: '', Debit: '', Credit: '', Narration: '', Opposite: '' }]
          });
        } else {
          console.error('Failed to fetch journal entry');
        }
      } catch (error) {
        console.error('Error fetching journal entry:', error);
      }
    };

    if (RefNo) {
      fetchJournalData();
    }
  }, [RefNo]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jsonDataa = JSON.stringify(entryData);
      const data = `data=${encodeURIComponent(jsonDataa)}`;
      const response = await axios.post('https://assurelite.datacubeglobal.com/Api/index.php/Entries/update_Journal', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      if (response.data) {
        console.log('Journal entry updated successfully');
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Journal entry updated successfully!'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else {
        console.error('Failed to update journal entry');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update journal entry'
        });
      }
    } catch (error) {
      console.error('Error updating journal entry:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error updating journal entry'
      });
    }
  };

  return (
    <Paper style={{ padding: '20px', position: 'relative' }}>
      <Typography variant="h6">Edit Journal Entry</Typography>
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

          {entryData.Items.map((item, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={3}>
                <TextField label="Account" name="Account" value={item.Account} onChange={(e) => handleItemChange(index, e)} fullWidth />
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
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default EditJournal;
