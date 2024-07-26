import axios from 'axios';
import MainCard from 'components/MainCard';
import { useAuth } from 'contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Grid, TextField, Autocomplete, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const countryOptions = [
  { label: 'Afghanistan', value: 'Afghanistan' },
  { label: 'India', value: 'India' }
];

const validationSchema = Yup.object({
  CompanyName: Yup.string().required('Required'),
  Address: Yup.string().required('Required'),
  Country: Yup.string().required('Required'),
  State: Yup.string().required('Required'),
  Dist: Yup.string().required('Required'),
  Place: Yup.string().required('Required'),
  PinCode: Yup.string().required('Required'),
  Mobile: Yup.string().required('Required'),
  Email: Yup.string().email('Invalid email address').required('Required')
});

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Profile = () => {
  const { companyDetails } = useAuth();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(
          `https://assurelite.datacubeglobal.com/Api/index.php/Master/get_AllCompanyByID?companyid=${companyDetails.CompanyID}`,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        );
        setCompanyData(response.data[0]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, []);

  const updateCompany = async (values) => {
    try {
      const jsonDataa = JSON.stringify(values);
      const data = `data=${jsonDataa}`;

      const response = await axios.post('https://assurelite.datacubeglobal.com/Api/index.php/Master/update_company', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <MainCard>
      <div className="d-flex justify-between">
        <div className="bg-blue-100 rounded-md">
          <div className="h-[150px] rounded-full p-3">
            <img src={`https://assurelite.datacubeglobal.com/Api/Images/${companyData.Img}`} alt="Company" className="w-full h-full" />
          </div>
        </div>
        <div>
          <div className="bg-primary rounded-md cursor-pointer p-1" onClick={() => setEditMode(!editMode)}>
            <EditOutlined className="text-[20px] text-white" />
          </div>
        </div>
      </div>

      <Formik initialValues={companyData} validationSchema={validationSchema} onSubmit={updateCompany} enableReinitialize>
        {({ values, handleChange, handleBlur, setFieldValue, touched, errors, isSubmitting }) => (
          <Form className="pt-10">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="CompanyName"
                  name="CompanyName"
                  label="Company Name"
                  value={values.CompanyName || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.CompanyName && Boolean(errors.CompanyName)}
                  helperText={touched.CompanyName && errors.CompanyName}
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="Address"
                  name="Address"
                  label="Address"
                  value={values.Address || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.Address && Boolean(errors.Address)}
                  helperText={touched.Address && errors.Address}
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  options={countryOptions}
                  size="small"
                  getOptionLabel={(option) => option.label}
                  value={countryOptions.find((option) => option.value === values.Country) || null}
                  onChange={(event, newValue) => setFieldValue('Country', newValue ? newValue.value : '')}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Country"
                      error={touched.Country && Boolean(errors.Country)}
                      helperText={touched.Country && errors.Country}
                      disabled={!editMode}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="State"
                  name="State"
                  label="State"
                  value={values.State || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.State && Boolean(errors.State)}
                  helperText={touched.State && errors.State}
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="Dist"
                  name="Dist"
                  label="District"
                  value={values.Dist || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.Dist && Boolean(errors.Dist)}
                  helperText={touched.Dist && errors.Dist}
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="Place"
                  name="Place"
                  label="Place"
                  value={values.Place || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.Place && Boolean(errors.Place)}
                  helperText={touched.Place && errors.Place}
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="PinCode"
                  name="PinCode"
                  label="Pin Code"
                  value={values.PinCode || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.PinCode && Boolean(errors.PinCode)}
                  helperText={touched.PinCode && errors.PinCode}
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="Mobile"
                  name="Mobile"
                  label="Mobile"
                  value={values.Mobile || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.Mobile && Boolean(errors.Mobile)}
                  helperText={touched.Mobile && errors.Mobile}
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="Email"
                  name="Email"
                  label="Email"
                  value={values.Email || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.Email && Boolean(errors.Email)}
                  helperText={touched.Email && errors.Email}
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={12}>
                {editMode && (
                  <>
                    <Button type="button" variant="contained" onClick={() => setEditMode(!editMode)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" disabled={isSubmitting} className="ms-2">
                      Save Changes
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </MainCard>
  );
};

export default Profile;
