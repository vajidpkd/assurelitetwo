import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { getAllParty } from 'api/apis/accountmaster';
import MainCard from 'components/MainCard';
// import { getAllParty } from 'api/api';

const validationSchema = Yup.object({
  EntryDate: Yup.string().required('Entry Date is required'),
  EntryTime: Yup.string().required('Entry Time is required'),
  Account: Yup.string().required('Account is required'),
  Party: Yup.string().required('Party is required'),
  TransType: Yup.string().required('Transaction Type is required'),
  // ChNo: Yup.string(),
  ChNo: Yup.string().nullable(),
  Status: Yup.string(),
  // ChDate: Yup.string().required('Cheque Date is required'),
  // ClDate: Yup.string().required('Clearance Date is required'),
  ChDate: Yup.string().nullable(),
  ClDate: Yup.string().nullable(),
  VoucherNo: Yup.string().required('Voucher No is required'),
  InvoiceNo: Yup.string().required('Invoice No is required'),
  Amount: Yup.number().required('Amount is required').positive('Amount must be positive')
});

const AddPayment = () => {
  const [partyOptions, setPartyOptions] = useState([]);
  const formik = useFormik({
    initialValues: {
      EntryDate: new Date().toISOString().slice(0, 10),
      EntryTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      Account: '',
      Party: '',
      TransType: '',
      ChNo: '',
      Status: '',
      ChDate: '',
      ClDate: '',
      VoucherNo: '',
      InvoiceNo: '',
      Amount: '',
      CompanyID: 1
    },
    validationSchema,

    onSubmit: async (values) => {
      try {
        const jsonDataa = JSON.stringify(values);
        const data = `data=${jsonDataa}`;
        const response = await axios.post('https://assurelite.datacubeglobal.com/Api/index.php/Entries/add_payment', data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        console.log(response);
        Swal.fire({
          text: 'Created successfully.',
          icon: 'success',
          confirmButtonText: 'Ok',
          confirmButtonColor: '#00977B',
          timer: 1500
        }).then((result) => {
          if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
            // resetForm(); // Reset form fields after successful submission
          }
        });
      } catch (error) {
        console.error('Error adding payment:', error);
      }
    }
  });

  useEffect(() => {
    const fetchPartyOptions = async () => {
      try {
        const response = await getAllParty();
        console.log('API Response:', response);
        const reversed = response.reverse();
        setPartyOptions(reversed);
      } catch (error) {
        console.error('Error fetching party options:', error);
      }
    };
    fetchPartyOptions();
  }, []);

  return (
    <MainCard>
        <div className="container mx-auto rounded-md bg-white ">
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Payment
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="EntryDate"
              name="EntryDate"
              label="Entry Date"
              type="date"
              value={formik.values.EntryDate}
              onChange={formik.handleChange}
              error={formik.touched.EntryDate && Boolean(formik.errors.EntryDate)}
              helperText={formik.touched.EntryDate && formik.errors.EntryDate}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid> */}
          {/* <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="EntryTime"
              name="EntryTime"
              label="Entry Time"
              type="time"
              value={formik.values.EntryTime}
              onChange={formik.handleChange}
              error={formik.touched.EntryTime && Boolean(formik.errors.EntryTime)}
              helperText={formik.touched.EntryTime && formik.errors.EntryTime}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid> */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="Account"
              name="Account"
              label="Account"
              value={formik.values.Account}
              onChange={formik.handleChange}
              error={formik.touched.Account && Boolean(formik.errors.Account)}
              helperText={formik.touched.Account && formik.errors.Account}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={formik.touched.Party && Boolean(formik.errors.Party)}>
              <InputLabel id="Party-label">Party</InputLabel>
              <Select
                labelId="Party-label"
                id="Party"
                name="Party"
                value={formik.values.Party}
                onChange={formik.handleChange}
                label="Party"
              >
                {partyOptions.map((party) => (
                  <MenuItem key={party.PartyID} value={party.AccountName}>
                    {party.AccountName}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.Party && formik.errors.Party && (
                <Typography color="error" variant="caption">
                  {formik.errors.Party}
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={formik.touched.TransType && Boolean(formik.errors.TransType)}>
              <InputLabel id="TransType-label">Transaction Type</InputLabel>
              <Select
                labelId="TransType-label"
                id="TransType"
                name="TransType"
                value={formik.values.TransType}
                onChange={formik.handleChange}
                label="Transaction Type"
              >
                <MenuItem value="CASH">CASH</MenuItem>
                <MenuItem value="CHEQUE">CHEQUE</MenuItem>
                <MenuItem value="DD">DD</MenuItem>
                <MenuItem value="NEFT">NEFT</MenuItem>
                <MenuItem value="RTGS">RTGS</MenuItem>
                <MenuItem value="UPI">UPI</MenuItem>
              </Select>
              {formik.touched.TransType && formik.errors.TransType && (
                <Typography color="error" variant="caption">
                  {formik.errors.TransType}
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="Amount"
              name="Amount"
              label="Amount"
              type="number"
              value={formik.values.Amount}
              onChange={formik.handleChange}
              error={formik.touched.Amount && Boolean(formik.errors.Amount)}
              helperText={formik.touched.Amount && formik.errors.Amount}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="VoucherNo"
              name="VoucherNo"
              label="Voucher No"
              value={formik.values.VoucherNo}
              onChange={formik.handleChange}
              error={formik.touched.VoucherNo && Boolean(formik.errors.VoucherNo)}
              helperText={formik.touched.VoucherNo && formik.errors.VoucherNo}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="InvoiceNo"
              name="InvoiceNo"
              label="Invoice No"
              value={formik.values.InvoiceNo}
              onChange={formik.handleChange}
              error={formik.touched.InvoiceNo && Boolean(formik.errors.InvoiceNo)}
              helperText={formik.touched.InvoiceNo && formik.errors.InvoiceNo}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="ChNo"
              name="ChNo"
              label="Cheque No"
              value={formik.values.ChNo}
              onChange={formik.handleChange}
              error={formik.touched.ChNo && Boolean(formik.errors.ChNo)}
              helperText={formik.touched.ChNo && formik.errors.ChNo}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth error={formik.touched.Status && Boolean(formik.errors.Status)}>
              <InputLabel id="Status-label">Status</InputLabel>
              <Select
                labelId="Status-label"
                id="Status"
                name="Status"
                value={formik.values.Status}
                onChange={formik.handleChange}
                label="Status"
              >
                <MenuItem value="PENDING">PENDING</MenuItem>
                <MenuItem value="DEPOSITED">DEPOSITED</MenuItem>
                <MenuItem value="CLEARED">CLEARED</MenuItem>
                <MenuItem value="CANCELED">CANCELED</MenuItem>
                <MenuItem value="BOUNCED">BOUNCED</MenuItem>
              </Select>
              {formik.touched.Status && formik.errors.Status && (
                <Typography color="error" variant="caption">
                  {formik.errors.Status}
                </Typography>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="ChDate"
              name="ChDate"
              label="Cheque Date"
              type="date"
              value={formik.values.ChDate}
              onChange={formik.handleChange}
              error={formik.touched.ChDate && Boolean(formik.errors.ChDate)}
              helperText={formik.touched.ChDate && formik.errors.ChDate}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="ClDate"
              name="ClDate"
              label="Clearance Date"
              type="date"
              value={formik.values.ClDate}
              onChange={formik.handleChange}
              error={formik.touched.ClDate && Boolean(formik.errors.ClDate)}
              helperText={formik.touched.ClDate && formik.errors.ClDate}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>
        </Grid>
        <Button color="primary" variant="contained" type="submit" sx={{ mt: 2 }}>
          Add Payment
        </Button>
      </form>
    </Box>
    </div>
    </MainCard>
  );
};

export default AddPayment;
