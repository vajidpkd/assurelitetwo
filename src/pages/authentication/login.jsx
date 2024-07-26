// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project import
import AuthWrapper from './AuthWrapper';
import AuthLogin from './auth-forms/AuthLogin';

export default function Login() {
  return (
    <AuthWrapper>
      <Grid container>
        <Grid item xs={12}>
          <Stack direction="column" justifyContent="space-between" alignItems="baseline" className="flex items-center justify-center">
            <Typography variant="h3">Welcome back!</Typography>
            <Typography>Please enter your credentials to sign in!</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthLogin />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
