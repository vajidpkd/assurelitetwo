import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import Swal from 'sweetalert2';
import { Box, Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';

const EditParty = () => {
  //   const { companyDetails } = useAuth();
  const { AccountID } = useParams();
  //   console.log(AccountID, 'llllllll');

  const [vendorData, setVendorData] = useState({
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
    AccountID: '',
    CompanyID: 1
  });

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await axios.get(`https://assurelite.datacubeglobal.com/Api/index.php/Master/get_PartyByID?AccountID=${AccountID}`);
        const vendor = response.data[0];
        setVendorData({
          AccountName: vendor.AccountName || '',
          GroupName: vendor.GroupName || '',
          Mobile: vendor.Mobile || '',
          email: vendor.email || '',
          GSTType: vendor.GSTType || '',
          RegnNo: vendor.RegnNo || '',
          PAN: vendor.PAN || '',
          State: vendor.State || '',
          StateCode: vendor.StateCode || '',
          Address: vendor.Address || '',
          ShippingAddress: vendor.ShippingAddress || '',
          CrDays: vendor.CrDays || '',
          CrAmount: vendor.CrAmount || '',
          AccountID: vendor.AccountID || ''
        });
      } catch (error) {
        console.error('Error fetching vendor data:', error);
      }
    };
    if (AccountID) {
      fetchVendor();
    }
  }, [AccountID]);

  const handleUpdateVendor = async (e) => {
    e.preventDefault();
    try {
      const jsonData = {
        ...vendorData,
        CompanyID: 1
      };
      const jsonDataa = JSON.stringify(jsonData);
      const data = `data=${jsonDataa}`;
      const response = await axios.post('https://assurelite.datacubeglobal.com/Api/index.php/Master/update_Party', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log(response);

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
        text: 'An error occurred while updating the product.',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#FF0000'
      }).then(() => {});
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVendorData({
      ...vendorData,
      [name]: value
    });
  };

  const taxtypes = [
    { label: 'Unregistered', value: 'Unregistered' },
    { label: 'Regular', value: 'Regular' },
    { label: 'Composition', value: 'Composition' }
  ];

  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Edit Vendor
        </Typography>
        <form onSubmit={handleUpdateVendor}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                name="AccountName"
                label="Account Name"
                fullWidth
                margin="normal"
                value={vendorData.AccountName}
                onChange={handleInputChange}
              />
              <TextField
                name="GroupName"
                label="Group Name"
                fullWidth
                margin="normal"
                value={vendorData.GroupName}
                onChange={handleInputChange}
              />
              <TextField name="Mobile" label="Mobile" fullWidth margin="normal" value={vendorData.Mobile} onChange={handleInputChange} />
              <TextField name="email" label="Email" fullWidth margin="normal" value={vendorData.email} onChange={handleInputChange} />
              <FormControl fullWidth margin="normal">
                <InputLabel id="GSTType-label">GST Type</InputLabel>
                <Select labelId="GSTType-label" name="GSTType" value={vendorData.GSTType} onChange={handleInputChange} label="GST Type">
                  {taxtypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                name="RegnNo"
                label="Registration No"
                fullWidth
                margin="normal"
                value={vendorData.RegnNo}
                onChange={handleInputChange}
              />
              <TextField name="PAN" label="PAN" fullWidth margin="normal" value={vendorData.PAN} onChange={handleInputChange} />
              <TextField name="State" label="State" fullWidth margin="normal" value={vendorData.State} onChange={handleInputChange} />
              <TextField
                name="StateCode"
                label="State Code"
                fullWidth
                margin="normal"
                value={vendorData.StateCode}
                onChange={handleInputChange}
              />
              <TextField name="Address" label="Address" fullWidth margin="normal" value={vendorData.Address} onChange={handleInputChange} />
              <TextField
                name="ShippingAddress"
                label="Shipping Address"
                fullWidth
                margin="normal"
                value={vendorData.ShippingAddress}
                onChange={handleInputChange}
              />
              <TextField
                name="CrDays"
                label="Credit Days"
                fullWidth
                margin="normal"
                value={vendorData.CrDays}
                onChange={handleInputChange}
              />
              <TextField
                name="CrAmount"
                label="Credit Amount"
                fullWidth
                margin="normal"
                value={vendorData.CrAmount}
                onChange={handleInputChange}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                Update Vendor
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </div>
  );
};

export default EditParty;
