import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import AnimateButton from 'components/@extended/AnimateButton'; // Ensure this component exists
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import { useAuth } from '../../../contexts/AuthContext';

// Regular expression for validating phone numbers
const phoneRegex = /^[0-9]{10,15}$/;

export default function AuthLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          loginIdentifier: '', // This will handle both email and phone number
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          loginIdentifier: Yup.string().required('Login identifier is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const { loginIdentifier, password } = values;

          try {
            const response = await axios.get(
              `https://assurelite.datacubeglobal.com/Api/index.php/Master/login?username=${loginIdentifier}&password=${password}`
            );
            const responseData = response.data[0];

            if (responseData.status) {
              login(responseData);
              setError(null);
              navigate('/');
            } else {
              setError('Incorrect login identifier or password.');
            }
          } catch (error) {
            console.error('Login failed:', error.message);
            setError('Login failed. Please try again.');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} className="mt-0">
            <Grid container spacing={3}>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="login-identifier">Email or Phone</InputLabel>
                  <OutlinedInput
                    id="login-identifier"
                    type="text"
                    value={values.loginIdentifier}
                    name="loginIdentifier"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email or phone number"
                    fullWidth
                    error={Boolean(touched.loginIdentifier && errors.loginIdentifier)}
                  />
                </Stack>
                {touched.loginIdentifier && errors.loginIdentifier && (
                  <FormHelperText error id="standard-weight-helper-text-login-identifier">
                    {errors.loginIdentifier}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>

              {error && (
                <Grid item xs={12}>
                  <FormHelperText error>{error}</FormHelperText>
                </Grid>
              )}

              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}

AuthLogin.propTypes = { isDemo: PropTypes.bool };
