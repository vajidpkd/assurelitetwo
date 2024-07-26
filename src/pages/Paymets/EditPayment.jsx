// import React, { useState, useEffect } from 'react';
// import { Box, Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
// import { Formik, Form } from 'formik';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { useParams } from 'react-router';

// const EditPayment = () => {
//   const { RefNo } = useParams();
//   const [initialValues, setInitialValues] = useState({
//     EntryDate: '',
//     EntryTime: '',
//     Account: '',
//     Party: '',
//     TransType: '',
//     ChNo: '',
//     Status: '',
//     ChDate: '',
//     ClDate: '',
//     VoucherNo: '',
//     InvoiceNo: '',
//     Amount: '',
//     CompanyID: 1
//   });

//   useEffect(() => {
//     const fetchPaymentDetails = async () => {
//       try {
//         const response = await axios.get(`https://assurelite.datacubeglobal.com/Api/index.php/Entries/get_paymentByRefNo?RefNo=${RefNo}`);
//         const data = response.data[0];
//         setInitialValues({
//           EntryDate: data.EntryDate || '',
//           EntryTime: data.EntryTime || '',
//           Account: data.AccountName || '',
//           Party: data.PartyName || '',
//           TransType: data.TransType || '',
//           ChNo: data.ChNo || '',
//           Status: data.Status || '',
//           ChDate: data.ChDate || '',
//           ClDate: data.ClDate || '',
//           VoucherNo: data.VoucherNo || '',
//           InvoiceNo: data.InvoiceNo || '',
//           Amount: data.Amount || '',
//           RefNo: data.RefNo || '',
//           CompanyID: 1
//         });
//       } catch (error) {
//         console.error('Error fetching payment details:', error);
//       }
//     };

//     fetchPaymentDetails();
//   }, [RefNo]);

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const jsonData = {
//         ...values,
//         CompanyID: 1
//       };
//       const jsonDataa = JSON.stringify(jsonData);
//       const data = `data=${jsonDataa}`;
//       const response = await axios.post('https://assurelite.datacubeglobal.com/Api/index.php/Entries/update_payment', data, {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded'
//         }
//       });
//       console.log(response);

//       Swal.fire({
//         text: 'Updated successfully.',
//         icon: 'success',
//         confirmButtonText: 'Ok',
//         confirmButtonColor: '#00977B',
//         timer: 1500
//       }).then((result) => {
//         if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
//           //  Window.location.reload()
//         }
//       });
//     } catch (error) {
//       console.error('Error:', error);

//       Swal.fire({
//         text: 'An error occurred while updating the payment.',
//         icon: 'error',
//         confirmButtonText: 'Ok',
//         confirmButtonColor: '#FF0000'
//       }).then(() => {});
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleInputChange = (event, setFieldValue) => {
//     const { name, value } = event.target;
//     setFieldValue(name, value);
//   };

//   return (
//     <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Edit Payment
//       </Typography>
//       <Formik
//         initialValues={initialValues}
//         enableReinitialize
//         onSubmit={handleSubmit}
//       >
//         {({ values, touched, errors, isSubmitting, setFieldValue }) => (
//           <Form>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   id="EntryDate"
//                   name="EntryDate"
//                   label="Entry Date"
//                   type="date"
//                   value={values.EntryDate}
//                   onChange={(e) => handleInputChange(e, setFieldValue)}
//                   error={touched.EntryDate && Boolean(errors.EntryDate)}
//                   helperText={touched.EntryDate && errors.EntryDate}
//                   InputLabelProps={{
//                     shrink: true
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   id="EntryTime"
//                   name="EntryTime"
//                   label="Entry Time"
//                   type="time"
//                   value={values.EntryTime}
//                   onChange={(e) => handleInputChange(e, setFieldValue)}
//                   error={touched.EntryTime && Boolean(errors.EntryTime)}
//                   helperText={touched.EntryTime && errors.EntryTime}
//                   InputLabelProps={{
//                     shrink: true
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   id="Account"
//                   name="Account"
//                   label="Account"
//                   value={values.Account}
//                   onChange={(e) => handleInputChange(e, setFieldValue)}
//                   error={touched.Account && Boolean(errors.Account)}
//                   helperText={touched.Account && errors.Account}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   id="Party"
//                   name="Party"
//                   label="Party"
//                   value={values.Party}
//                   onChange={(e) => handleInputChange(e, setFieldValue)}
//                   error={touched.Party && Boolean(errors.Party)}
//                   helperText={touched.Party && errors.Party}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth error={touched.TransType && Boolean(errors.TransType)}>
//                   <InputLabel id="TransType-label">Transaction Type</InputLabel>
//                   <Select
//                     labelId="TransType-label"
//                     id="TransType"
//                     name="TransType"
//                     value={values.TransType}
//                     onChange={(e) => handleInputChange(e, setFieldValue)}
//                     label="Transaction Type"
//                   >
//                     <MenuItem value="CASH">CASH</MenuItem>
//                     <MenuItem value="BANK">BANK</MenuItem>
//                   </Select>
//                   {touched.TransType && errors.TransType && (
//                     <Typography color="error" variant="caption">
//                       {errors.TransType}
//                     </Typography>
//                   )}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   id="Amount"
//                   name="Amount"
//                   label="Amount"
//                   type="number"
//                   value={values.Amount}
//                   onChange={(e) => handleInputChange(e, setFieldValue)}
//                   error={touched.Amount && Boolean(errors.Amount)}
//                   helperText={touched.Amount && errors.Amount}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   id="VoucherNo"
//                   name="VoucherNo"
//                   label="Voucher No"
//                   value={values.VoucherNo}
//                   onChange={(e) => handleInputChange(e, setFieldValue)}
//                   error={touched.VoucherNo && Boolean(errors.VoucherNo)}
//                   helperText={touched.VoucherNo && errors.VoucherNo}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   id="InvoiceNo"
//                   name="InvoiceNo"
//                   label="Invoice No"
//                   value={values.InvoiceNo}
//                   onChange={(e) => handleInputChange(e, setFieldValue)}
//                   error={touched.InvoiceNo && Boolean(errors.InvoiceNo)}
//                   helperText={touched.InvoiceNo && errors.InvoiceNo}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   id="ChNo"
//                   name="ChNo"
//                   label="Cheque No"
//                   value={values.ChNo}
//                   onChange={(e) => handleInputChange(e, setFieldValue)}
//                   error={touched.ChNo && Boolean(errors.ChNo)}
//                   helperText={touched.ChNo && errors.ChNo}
//                 />
//               </Grid>
//               {/* <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   id="Status"
//                   name="Status"
//                   label="Status"
//                   value={values.Status}
//                   onChange={(e) => handleInputChange(e, setFieldValue)}
//                   error={touched.Status && Boolean(errors.Status)}
//                   helperText={touched.Status && errors.Status}
//                 />
//               </Grid> */}
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   id="ChDate"
//                   name="ChDate"
//                   label="Cheque Date"
//                   type="date"
//                   value={values.ChDate}
//                   onChange={(e) => handleInputChange(e, setFieldValue)}
//                   error={touched.ChDate && Boolean(errors.ChDate)}
//                   helperText={touched.ChDate && errors.ChDate}
//                   InputLabelProps={{
//                     shrink: true
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   id="ClDate"
//                   name="ClDate"
//                   label="Clear Date"
//                   type="date"
//                   value={values.ClDate}
//                   onChange={(e) => handleInputChange(e, setFieldValue)}
//                   error={touched.ClDate && Boolean(errors.ClDate)}
//                   helperText={touched.ClDate && errors.ClDate}
//                   InputLabelProps={{
//                     shrink: true
//                   }}
//                 />
//               </Grid>
//             </Grid>
//             <Box sx={{ mt: 2 }}>
//               <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
//                 Update
//               </Button>
//             </Box>
//           </Form>
//         )}
//       </Formik>
//     </Box>
//   );
// };

// export default EditPayment;

import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import { Formik, Form } from 'formik';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router';
import { getAllParty } from 'api/apis/accountmaster';


const EditPayment = () => {
  const { RefNo } = useParams();

  const [initialValues, setInitialValues] = useState({
    EntryDate: '',
    EntryTime: '',
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
  });

  const [partyOptions, setPartyOptions] = useState([]);
  const [selectedParty, setSelectedParty] = useState('');

  useEffect(() => {
    const fetchPartyOptions = async () => {
      try {
        const response = await getAllParty();
        setPartyOptions(response);

        // Assuming you want to set a default value based on initialValues.Party
        if (initialValues.Party) {
          setSelectedParty(initialValues.Party);
        } else if (response.length > 0) {
          setSelectedParty(response[0].AccountName); // Set default to the first item in the response
        }
      } catch (error) {
        console.error('Error fetching party options:', error);
      }
    };

    fetchPartyOptions();
  }, [initialValues.Party]); // Dependency on initialValues.Party ensures fetch runs when initialValues change

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get(`https://assurelite.datacubeglobal.com/Api/index.php/Entries/get_paymentByRefNo?RefNo=${RefNo}`);
        const data = response.data[0];
        setInitialValues({
          EntryDate: data.EntryDate || '',
          EntryTime: data.EntryTime || '',
          Account: data.AccountName || '',
          Party: data.PartyName || '',
          TransType: data.TransType || '',
          ChNo: data.ChNo || '',
          Status: data.Status || '',
          ChDate: data.ChDate || '',
          ClDate: data.ClDate || '',
          VoucherNo: data.VoucherNo || '',
          InvoiceNo: data.InvoiceNo || '',
          Amount: data.Amount || '',
          RefNo: data.RefNo || '',
          CompanyID: 1
        });

        // Set selectedParty when initialValues.Party is defined
        if (data.PartyName) {
          setSelectedParty(data.PartyName);
        }
      } catch (error) {
        console.error('Error fetching payment details:', error);
      }
    };

    fetchPaymentDetails();
  }, [RefNo]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const jsonData = {
        ...values,
        CompanyID: 1
      };
      const jsonDataa = JSON.stringify(jsonData);
      const data = `data=${jsonDataa}`;
      const response = await axios.post('https://assurelite.datacubeglobal.com/Api/index.php/Entries/update_payment', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      Swal.fire({
        text: 'Updated successfully.',
        icon: 'success',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#00977B',
        timer: 1500
      }).then((result) => {
        if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
          //  Window.location.reload()
        }
      });
    } catch (error) {
      console.error('Error:', error);

      Swal.fire({
        text: 'An error occurred while updating the payment.',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#FF0000'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (event, setFieldValue) => {
    const { name, value } = event.target;
    setFieldValue(name, value);
  };

  const statusOptions = [
    { value: 'PENDING', label: 'PENDING' },
    { value: 'DEPOSITED', label: 'DEPOSITED' },
    { value: 'CLEARED', label: 'CLEARED' },
    { value: 'CANCELD', label: 'CANCELD' },
    { value: 'BOUNCED', label: 'BOUNCED' }
  ];

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Payment
      </Typography>
      <Formik
        initialValues={initialValues}
        enableReinitialize // Enable reinitialization when initialValues change
        onSubmit={handleSubmit}
      >
        {({ values, touched, errors, isSubmitting, setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="EntryDate"
                  name="EntryDate"
                  label="Entry Date"
                  type="date"
                  value={values.EntryDate}
                  onChange={(e) => handleInputChange(e, setFieldValue)}
                  error={touched.EntryDate && Boolean(errors.EntryDate)}
                  helperText={touched.EntryDate && errors.EntryDate}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="EntryTime"
                  name="EntryTime"
                  label="Entry Time"
                  type="time"
                  value={values.EntryTime}
                  onChange={(e) => handleInputChange(e, setFieldValue)}
                  error={touched.EntryTime && Boolean(errors.EntryTime)}
                  helperText={touched.EntryTime && errors.EntryTime}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="Account"
                  name="Account"
                  label="Account"
                  value={values.Account}
                  onChange={(e) => handleInputChange(e, setFieldValue)}
                  error={touched.Account && Boolean(errors.Account)}
                  helperText={touched.Account && errors.Account}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={touched.Party && Boolean(errors.Party)}>
                  <InputLabel id="Party-label">Party</InputLabel>
                  <Select
                    labelId="Party-label"
                    id="Party"
                    name="Party"
                    value={selectedParty} // Use selectedParty state for value
                    onChange={(e) => {
                      handleInputChange(e, setFieldValue);
                      setSelectedParty(e.target.value); // Update selectedParty state
                    }}
                    label="Party"
                  >
                    {partyOptions.map((party) => (
                      <MenuItem key={party.AccountID} value={party.AccountName}>
                        {party.AccountName}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.Party && errors.Party && (
                    <Typography color="error" variant="caption">
                      {errors.Party}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth error={touched.TransType && Boolean(errors.TransType)}>
                  <InputLabel id="TransType-label">Transaction Type</InputLabel>
                  <Select
                    labelId="TransType-label"
                    id="TransType"
                    name="TransType"
                    value={values.TransType}
                    onChange={(e) => handleInputChange(e, setFieldValue)}
                    label="Transaction Type"
                  >
                    <MenuItem value="CASH">CASH</MenuItem>
                    <MenuItem value="CHEQUE">CHEQUE</MenuItem>
                    <MenuItem value="DD">DD</MenuItem>
                    <MenuItem value="NEFT">NEFT</MenuItem>
                    <MenuItem value="RTGS">RTGS</MenuItem>
                    <MenuItem value="UPI">UPI</MenuItem>
                  </Select>
                  {touched.TransType && errors.TransType && (
                    <Typography color="error" variant="caption">
                      {errors.TransType}
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
                  value={values.Amount}
                  onChange={(e) => handleInputChange(e, setFieldValue)}
                  error={touched.Amount && Boolean(errors.Amount)}
                  helperText={touched.Amount && errors.Amount}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="VoucherNo"
                  name="VoucherNo"
                  label="Voucher No"
                  value={values.VoucherNo}
                  onChange={(e) => handleInputChange(e, setFieldValue)}
                  error={touched.VoucherNo && Boolean(errors.VoucherNo)}
                  helperText={touched.VoucherNo && errors.VoucherNo}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="InvoiceNo"
                  name="InvoiceNo"
                  label="Invoice No"
                  value={values.InvoiceNo}
                  onChange={(e) => handleInputChange(e, setFieldValue)}
                  error={touched.InvoiceNo && Boolean(errors.InvoiceNo)}
                  helperText={touched.InvoiceNo && errors.InvoiceNo}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="ChNo"
                  name="ChNo"
                  label="Cheque No"
                  value={values.ChNo}
                  onChange={(e) => handleInputChange(e, setFieldValue)}
                  error={touched.ChNo && Boolean(errors.ChNo)}
                  helperText={touched.ChNo && errors.ChNo}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="ChDate"
                  name="ChDate"
                  label="Cheque Date"
                  type="date"
                  value={values.ChDate}
                  onChange={(e) => handleInputChange(e, setFieldValue)}
                  error={touched.ChDate && Boolean(errors.ChDate)}
                  helperText={touched.ChDate && errors.ChDate}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="Status"
                  name="Status"
                  label="Status"
                  value={values.Status}
                  onChange={(e) => handleInputChange(e, setFieldValue)}
                  error={touched.Status && Boolean(errors.Status)}
                  helperText={touched.Status && errors.Status}
                />
              </Grid> */}
              <Grid item xs={12}>
                <FormControl fullWidth error={touched.Status && Boolean(errors.Status)}>
                  <InputLabel id="Status-label">Status</InputLabel>
                  <Select
                    labelId="Status-label"
                    id="Status"
                    name="Status"
                    value={values.Status}
                    onChange={(e) => handleInputChange(e, setFieldValue)}
                    label="Status"
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.Status && errors.Status && (
                    <Typography color="error" variant="caption">
                      {errors.Status}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="ClDate"
                  name="ClDate"
                  label="Clearing Date"
                  type="date"
                  value={values.ClDate}
                  onChange={(e) => handleInputChange(e, setFieldValue)}
                  error={touched.ClDate && Boolean(errors.ClDate)}
                  helperText={touched.ClDate && errors.ClDate}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                  Update
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default EditPayment;
