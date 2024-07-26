import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { Button, Grid, TextField, Select, MenuItem } from '@mui/material';
import MainCard from 'components/MainCard';

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [taxs, setTaxs] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [fileName, setFileName] = useState('No selected file');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://assurelite.datacubeglobal.com/Api/index.php/Master/get_AllCategory?CompanyID=1');
        setCategories(response.data);
      } catch (error) {                                               
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await axios.get('https://assurelite.datacubeglobal.com/Api/index.php/Master/get_AllUnits');
        setUnits(response.data);
      } catch (error) {
        console.error('Error fetching units:', error);
      }
    };

    fetchUnits();
  }, []);

  useEffect(() => {
    const fetchTax = async () => {
      try {
        const response = await axios.get('https://assurelite.datacubeglobal.com/Api/index.php/Master/get_AllTaxSchedule');
        setTaxs(response.data);
      } catch (error) {
        console.error('Error fetching tax schedules:', error);
      }
    };

    fetchTax();
  }, []);

  const fileChangeHandler = (e, setFieldValue) => {
    const file = e.currentTarget.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            const readerWebp = new FileReader();
            readerWebp.onload = () => {
              setImagePreviewUrl(readerWebp.result);
              setFieldValue('Img', readerWebp.result);
              setFileName(file.name);
            };
            canvas.toBlob(
              (webpBlob) => {
                readerWebp.readAsDataURL(webpBlob);
              },
              'image/webp',
              1.0
            );
          },
          'image/webp',
          1.0
        );
      };
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const data = `data=${encodeURIComponent(JSON.stringify(values))}`;
      const response = await axios.post('https://assurelite.datacubeglobal.com/Api/index.php/Master/add_Product', data, {
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
        text: 'An error occurred while creating the product.',
        icon: 'error',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#FF0000'
      });
    }
  };

  const validationSchema = Yup.object().shape({
    ItemName: Yup.string().required('Item Name is required'),
    HSN: Yup.string().required('HSN is required'),
    Unit: Yup.string().required('Unit is required'),
    Category: Yup.string().required('Category is required'),
    ItemCode: Yup.string().required('Item Code is required'),
    Barcode: Yup.string().required('Barcode is required'),
    MRP: Yup.string().required('MRP is required'),
    SRate: Yup.string().required('Selling Rate is required'),
    Disc: Yup.string().required('Discount is required'),
    PRate: Yup.string().required('Purchase Rate is required'),
    TaxSchedule: Yup.string().required('Tax Schedule is required')
  });

  const initialValues = {
    ItemName: '',
    HSN: '',
    Unit: '',
    Category: '',
    ItemCode: '',
    Barcode: '',
    MRP: '',
    SRate: '',
    Disc: '',
    PRate: '',
    TaxSchedule: '',
    OnlineRate: '',
    OnlineDescription: '',
    Description: '',
    CompanyID: 1,
    Active: false
  };

  return (
    <MainCard>
      <div className="container mx-auto rounded-md bg-white">
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ setFieldValue, setFieldTouched, values, errors, touched, isSubmitting }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="ItemName"
                    name="ItemName"
                    label="Item Name"
                    value={values.ItemName}
                    onChange={(e) => setFieldValue('ItemName', e.target.value)}
                    onBlur={() => setFieldTouched('ItemName', true)}
                    error={Boolean(errors.ItemName) && touched.ItemName}
                    helperText={touched.ItemName && errors.ItemName}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="HSN"
                    name="HSN"
                    label="HSN"
                    value={values.HSN}
                    onChange={(e) => setFieldValue('HSN', e.target.value)}
                    onBlur={() => setFieldTouched('HSN', true)}
                    error={Boolean(errors.HSN) && touched.HSN}
                    helperText={touched.HSN && errors.HSN}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="ItemCode"
                    name="ItemCode"
                    label="Item Code"
                    value={values.ItemCode}
                    onChange={(e) => setFieldValue('ItemCode', e.target.value)}
                    onBlur={() => setFieldTouched('ItemCode', true)}
                    error={Boolean(errors.ItemCode) && touched.ItemCode}
                    helperText={touched.ItemCode && errors.ItemCode}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="Barcode"
                    name="Barcode"
                    label="Barcode"
                    value={values.Barcode}
                    onChange={(e) => setFieldValue('Barcode', e.target.value)}
                    onBlur={() => setFieldTouched('Barcode', true)}
                    error={Boolean(errors.Barcode) && touched.Barcode}
                    helperText={touched.Barcode && errors.Barcode}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="Description"
                    name="Description"
                    label="Description"
                    value={values.Description}
                    onChange={(e) => setFieldValue('Description', e.target.value)}
                    onBlur={() => setFieldTouched('Description', true)}
                    error={Boolean(errors.Description) && touched.Description}
                    helperText={touched.Description && errors.Description}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="OnlineRate"
                    name="OnlineRate"
                    label="OnlineRate"
                    value={values.OnlineRate}
                    onChange={(e) => setFieldValue('OnlineRate', e.target.value)}
                    onBlur={() => setFieldTouched('OnlineRate', true)}
                    error={Boolean(errors.OnlineRate) && touched.OnlineRate}
                    helperText={touched.OnlineRate && errors.OnlineRate}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="OnlineDescription"
                    name="OnlineDescription"
                    label="OnlineDescription"
                    value={values.OnlineDescription}
                    onChange={(e) => setFieldValue('OnlineDescription', e.target.value)}
                    onBlur={() => setFieldTouched('OnlineDescription', true)}
                    error={Boolean(errors.OnlineDescription) && touched.OnlineDescription}
                    helperText={touched.OnlineDescription && errors.OnlineDescription}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="MRP"
                    name="MRP"
                    label="MRP"
                    value={values.MRP}
                    onChange={(e) => setFieldValue('MRP', e.target.value)}
                    onBlur={() => setFieldTouched('MRP', true)}
                    error={Boolean(errors.MRP) && touched.MRP}
                    helperText={touched.MRP && errors.MRP}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="SRate"
                    name="SRate"
                    label="Selling Rate"
                    value={values.SRate}
                    onChange={(e) => setFieldValue('SRate', e.target.value)}
                    onBlur={() => setFieldTouched('SRate', true)}
                    error={Boolean(errors.SRate) && touched.SRate}
                    helperText={touched.SRate && errors.SRate}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="Disc"
                    name="Disc"
                    label="Discount"
                    value={values.Disc}
                    onChange={(e) => setFieldValue('Disc', e.target.value)}
                    onBlur={() => setFieldTouched('Disc', true)}
                    error={Boolean(errors.Disc) && touched.Disc}
                    helperText={touched.Disc && errors.Disc}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="PRate"
                    name="PRate"
                    label="Purchase Rate"
                    value={values.PRate}
                    onChange={(e) => setFieldValue('PRate', e.target.value)}
                    onBlur={() => setFieldTouched('PRate', true)}
                    error={Boolean(errors.PRate) && touched.PRate}
                    helperText={touched.PRate && errors.PRate}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Select
                    fullWidth
                    name="Unit"
                    value={values.Unit}
                    onChange={(e) => setFieldValue('Unit', e.target.value)}
                    onBlur={() => setFieldTouched('Unit', true)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Unit' }}
                  >
                    <MenuItem value="" disabled>
                      Select Unit
                    </MenuItem>
                    {units.map((unit) => (
                      <MenuItem key={unit.UnitName} value={unit.UnitName}>
                        {unit.UnitName}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.Unit && touched.Unit && <div className="text-red-500">{errors.Unit}</div>}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Select
                    fullWidth
                    name="Category"
                    value={values.Category}
                    onChange={(e) => setFieldValue('Category', e.target.value)}
                    onBlur={() => setFieldTouched('Category', true)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Category' }}
                  >
                    <MenuItem value="" disabled>
                      Select Category
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.Category} value={category.Category}>
                        {category.Category}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.Category && touched.Category && <div className="text-red-500">{errors.Category}</div>}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Select
                    fullWidth
                    name="TaxSchedule"
                    value={values.TaxSchedule}
                    onChange={(e) => setFieldValue('TaxSchedule', e.target.value)}
                    onBlur={() => setFieldTouched('TaxSchedule', true)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Tax Schedule' }}
                  >
                    <MenuItem value="" disabled>
                      Select Tax Schedule
                    </MenuItem>
                    {taxs.map((tax) => (
                      <MenuItem key={tax.ScheduleName} value={tax.ScheduleName}>
                        {tax.ScheduleName}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.TaxSchedule && touched.TaxSchedule && <div className="text-red-500">{errors.TaxSchedule}</div>}
                </Grid>

                <Grid item xs={12} sm={6}>
                  <input
                    type="file"
                    onChange={(e) => fileChangeHandler(e, setFieldValue)}
                    accept=".png,.jpg,.jpeg"
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <p className="text-gray-500 text-sm mt-1">{fileName}</p>
                  {imagePreviewUrl && (
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      style={{ width: '150px', height: 'auto' }}
                      className="rounded-md border border-gray-300"
                    />
                  )}
                </Grid>
                <Grid xs={12} item>
                  <div className="flex items-center w-full justify-end ">
                    <Button color="primary" variant="contained" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Adding Product...' : 'Add Product'}
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

export default AddProduct;
