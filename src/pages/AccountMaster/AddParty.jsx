import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Select from 'react-select';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import MainCard from 'components/MainCard';
import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, TextField } from '@mui/material';

const AddParty = () => {
  const initialValues = {
    active: false,
    AccountName: '',
    GroupName: '',
    Mobile: '',
    email: '',
    GSTType: '',
    RegnNo: '',
    PAN: '',
    State: '',
    StateCode: '',
    Address: '',
    ShippingAddress: '',
    CrDays: '',
    CrAmount: '',
    CompanyID: 1
  };

  const taxtypes = [
    { label: 'Unregistered', value: 'Unregistered' },
    { label: 'Regular', value: 'Regular' },
    { label: 'Composition', value: 'Composition' }
  ];
  const validationSchema = Yup.object().shape({
    AccountName: Yup.string().required('Account Name is required'),
    Mobile: Yup.string().required('Mobile number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    GSTType: Yup.string().required('GST Type is required')
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const jsonDataa = JSON.stringify(values);
      const data = `data=${jsonDataa}`;
      const response = await axios.post('https://assurelite.datacubeglobal.com/Api/index.php/Master/add_Party', data, {
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
          resetForm(); // Reset form fields after successful submission
        }
      });
    } catch (error) {
      console.error('Error:', error);

      Swal.fire({
        text: 'An error occurred while creating the party.',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#FF0000'
      });
    }
  };

  return (
    <MainCard>
      <div className="container mx-auto rounded-md bg-white">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ values, errors, touched, setFieldValue, setFieldTouched }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* <Grid item xs={12} sm={6}> */}
                {/* <label className="block mb-2 font-medium">Active:</label> */}
                {/* <Field type="checkbox" name="active" className="form-checkbox" /> */}
                {/* </Grid> */}

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="AccountName"
                    name="AccountName"
                    label="Account Name"
                    value={values.AccountName}
                    onChange={(e) => setFieldValue('AccountName', e.target.value)}
                    onBlur={() => setFieldTouched('AccountName', true)}
                    error={Boolean(errors.AccountName) && touched.AccountName}
                    helperText={touched.AccountName && errors.AccountName}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="GroupName"
                    name="GroupName"
                    label="Group Name"
                    select
                    value={values.GroupName}
                    onChange={(e) => setFieldValue('GroupName', e.target.value)}
                    onBlur={() => setFieldTouched('GroupName', true)}
                    error={Boolean(errors.GroupName) && touched.GroupName}
                    helperText={touched.GroupName && errors.GroupName}
                  >
                    <MenuItem value="CUSTOMER">Customer</MenuItem>
                    <MenuItem value="VENDOR">Vendor</MenuItem>
                  </TextField>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="Mobile"
                    name="Mobile"
                    label="Mobile"
                    value={values.Mobile}
                    onChange={(e) => setFieldValue('Mobile', e.target.value)}
                    onBlur={() => setFieldTouched('Mobile', true)}
                    error={Boolean(errors.Mobile) && touched.Mobile}
                    helperText={touched.Mobile && errors.Mobile}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    value={values.email}
                    onChange={(e) => setFieldValue('email', e.target.value)}
                    onBlur={() => setFieldTouched('email', true)}
                    error={Boolean(errors.email) && touched.email}
                    helperText={touched.email && errors.email}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Select
                    options={taxtypes}
                    value={taxtypes.find((option) => option.value === values.GSTType)}
                    onChange={(selectedOption) => setFieldValue('GSTType', selectedOption ? selectedOption.value : '')}
                    onBlur={() => setFieldTouched('GSTType', true)}
                    placeholder="Select GST Type"
                    styles={{
                      container: (provided) => ({
                        ...provided,
                        marginTop: '8px',
                        marginBottom: '8px'
                      }),
                      menu: (provided) => ({
                        ...provided,
                        zIndex: 9999
                      })
                    }}
                  />
                  <ErrorMessage name="GSTType">{(msg) => <div className="text-red-500">{msg}</div>}</ErrorMessage>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="RegnNo"
                    name="RegnNo"
                    label="Regn No"
                    value={values.RegnNo}
                    onChange={(e) => setFieldValue('RegnNo', e.target.value)}
                    onBlur={() => setFieldTouched('RegnNo', true)}
                    error={Boolean(errors.RegnNo) && touched.RegnNo}
                    helperText={touched.RegnNo && errors.RegnNo}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="PAN"
                    name="PAN"
                    label="PAN"
                    value={values.PAN}
                    onChange={(e) => setFieldValue('PAN', e.target.value)}
                    onBlur={() => setFieldTouched('PAN', true)}
                    error={Boolean(errors.PAN) && touched.PAN}
                    helperText={touched.PAN && errors.PAN}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="State"
                    name="State"
                    label="State"
                    value={values.State}
                    onChange={(e) => setFieldValue('State', e.target.value)}
                    onBlur={() => setFieldTouched('State', true)}
                    error={Boolean(errors.State) && touched.State}
                    helperText={touched.State && errors.State}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="StateCode"
                    name="StateCode"
                    label="State Code"
                    value={values.StateCode}
                    onChange={(e) => setFieldValue('StateCode', e.target.value)}
                    onBlur={() => setFieldTouched('StateCode', true)}
                    error={Boolean(errors.StateCode) && touched.StateCode}
                    helperText={touched.StateCode && errors.StateCode}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="Address"
                    name="Address"
                    label="Address"
                    multiline
                    rows={4}
                    value={values.Address}
                    onChange={(e) => setFieldValue('Address', e.target.value)}
                    onBlur={() => setFieldTouched('Address', true)}
                    error={Boolean(errors.Address) && touched.Address}
                    helperText={touched.Address && errors.Address}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="ShippingAddress"
                    name="ShippingAddress"
                    label="Shipping Address"
                    multiline
                    rows={4}
                    value={values.ShippingAddress}
                    onChange={(e) => setFieldValue('ShippingAddress', e.target.value)}
                    onBlur={() => setFieldTouched('ShippingAddress', true)}
                    error={Boolean(errors.ShippingAddress) && touched.ShippingAddress}
                    helperText={touched.ShippingAddress && errors.ShippingAddress}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="CrDays"
                    name="CrDays"
                    label="Credit Days"
                    value={values.CrDays}
                    onChange={(e) => setFieldValue('CrDays', e.target.value)}
                    onBlur={() => setFieldTouched('CrDays', true)}
                    error={Boolean(errors.CrDays) && touched.CrDays}
                    helperText={touched.CrDays && errors.CrDays}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="CrAmount"
                    name="CrAmount"
                    label="Credit Amount"
                    value={values.CrAmount}
                    onChange={(e) => setFieldValue('CrAmount', e.target.value)}
                    onBlur={() => setFieldTouched('CrAmount', true)}
                    error={Boolean(errors.CrAmount) && touched.CrAmount}
                    helperText={touched.CrAmount && errors.CrAmount}
                  />
                </Grid>

                {/* <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="CompanyID"
                name="CompanyID"
                label="Company ID"
                value={values.CompanyID}
                readOnly
                className="bg-gray-200"
              />
            </Grid> */}
                <Grid xs={12} item>
                  <div className="flex items-center w-full justify-end ">
                    <Button type="submit" color="primary" variant="contained">
                    Submit
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </MainCard>
  );
};

export default AddParty;
