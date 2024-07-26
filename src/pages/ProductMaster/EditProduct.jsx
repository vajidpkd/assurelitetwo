import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Box, Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Grid, Switch } from '@mui/material';

const EditProduct = () => {
  const { ItemID } = useParams();
  console.log(ItemID);
  //   const { companyDetails } = useAuth();

  const [productData, setProductData] = useState({
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
    ItemID: '',
    Active: false
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [fileName, setFileName] = useState('No selected file');
  const [categories, setCategories] = useState([]);
  const [units, setUnits] = useState([]);
  const [taxs, setTaxs] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`https://assurelite.datacubeglobal.com/Api/index.php/Master/get_ProductsByID?ItemID=${ItemID}`);
        const product = response.data[0];
        console.log(product, 'XXX');
        setProductData({
          ItemName: product.ItemName || '',
          HSN: product.HSN || '',
          Unit: product.UnitName || '',
          Category: product.Category || '',
          ItemCode: product.ItemCode || '',
          Barcode: product.Barcode || '',
          MRP: product.MRP || '',
          SRate: product.SRate || '',
          Disc: product.Disc || '',
          PRate: product.PRate || '',
          TaxSchedule: product.ScheduleName || '',
          OnlineRate: product.OnlineRate || '',
          OnlineDescription: product.OnlineDescription || '',
          Description: product.Description || '',
          ItemID: product.ItemID || '',
          ImageURL: product.ImageURL || '',
          Active: product.Active || false
        });
        setImagePreviewUrl(product.ImageURL);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    if (ItemID) {
      fetchProductData();
    }
  }, [ItemID]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://assurelite.datacubeglobal.com/Api/index.php/Master/get_AllCategory?CompanyID=1');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    // if (companyDetails?.CompanyID) {
    fetchCategories();
    // }
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
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

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const jsonData = {
        ...productData,
        CompanyID: 1,
        Img: imagePreviewUrl
      };

      const jsonDataa = JSON.stringify(jsonData);
      const data = `data=${jsonDataa}`;
      const response = await axios.post('https://assurelite.datacubeglobal.com/Api/index.php/Master/update_Product', data, {
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
          // Optional: Add any logic to be executed after the Swal confirmation
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

  const defaultCategory = categories.find((category) => category.Category === productData.Category);

  const defaultUnit = units.find((unit) => unit.UnitName === productData.Unit);

  return (
    <div>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Edit Product
        </Typography>
        <form onSubmit={handleUpdateProduct}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                name="ItemName"
                label="Product Name"
                fullWidth
                margin="normal"
                value={productData.ItemName}
                onChange={handleInputChange}
              />
              <TextField name="HSN" label="HSN" fullWidth margin="normal" value={productData.HSN} onChange={handleInputChange} />
              <FormControl fullWidth margin="normal">
                <InputLabel id="Unit-label">Unit</InputLabel>
                <Select labelId="Unit-label" name="Unit" value={productData.Unit} onChange={handleInputChange} label="Unit">
                  {units.map((unit) => (
                    <MenuItem key={unit.UnitID} value={unit.UnitName}>
                      {unit.UnitName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="Category-label">Category</InputLabel>
                <Select labelId="Category-label" name="Category" value={productData.Category} onChange={handleInputChange} label="Category">
                  {categories.map((category) => (
                    <MenuItem key={category.CategoryID} value={category.Category}>
                      {category.Category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                name="ItemCode"
                label="Item Code"
                fullWidth
                margin="normal"
                value={productData.ItemCode}
                onChange={handleInputChange}
              />
              <TextField
                name="Barcode"
                label="Barcode"
                fullWidth
                margin="normal"
                value={productData.Barcode}
                onChange={handleInputChange}
              />
              <TextField name="MRP" label="MRP" fullWidth margin="normal" value={productData.MRP} onChange={handleInputChange} />
              <TextField name="SRate" label="Sales Rate" fullWidth margin="normal" value={productData.SRate} onChange={handleInputChange} />
              <TextField name="Disc" label="Discount" fullWidth margin="normal" value={productData.Disc} onChange={handleInputChange} />
              <TextField
                name="PRate"
                label="Purchase Rate"
                fullWidth
                margin="normal"
                value={productData.PRate}
                onChange={handleInputChange}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="TaxSchedule-label">Tax Schedule</InputLabel>
                <Select
                  labelId="TaxSchedule-label"
                  name="TaxSchedule"
                  value={productData.TaxSchedule}
                  onChange={handleInputChange}
                  label="Tax Schedule"
                >
                  {taxs.map((tax) => (
                    <MenuItem key={tax.ScheduleID} value={tax.ScheduleName}>
                      {tax.ScheduleName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                name="OnlineRate"
                label="Online Rate"
                fullWidth
                margin="normal"
                value={productData.OnlineRate}
                onChange={handleInputChange}
              />
              <TextField
                name="OnlineDescription"
                label="Online Description"
                fullWidth
                margin="normal"
                value={productData.OnlineDescription}
                onChange={handleInputChange}
              />
              <TextField
                name="Description"
                label="Description"
                fullWidth
                margin="normal"
                value={productData.Description}
                onChange={handleInputChange}
              />
              <FormControl margin="normal">
                <Typography>Active</Typography>
                <Switch checked={productData.Active} onChange={(e) => setProductData({ ...productData, Active: e.target.checked })} />
              </FormControl>
              <div className="form-group">
                <Typography variant="subtitle1">Product Image</Typography>
                <input type="file" className="form-control-file" id="productImage" onChange={handleFileChange} accept="image/*" />
                <div className="file-preview">{imagePreviewUrl && <img src={imagePreviewUrl} alt="Product Preview" />}</div>
              </div>
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            Update Product
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default EditProduct;
