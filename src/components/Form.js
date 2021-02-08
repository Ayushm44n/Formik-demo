import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  makeStyles,
  createMuiTheme,
  ThemeProvider,
  FormControlLabel,
  Checkbox,
  Link
} from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#90caf9'
    },
    secondary: {
      light: '#f48fb1',
      main: '#f06292'
    }
  }
});

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: '#000',
    width: '380px',
    margin: `${theme.spacing(5)}px auto`,
    padding: `${theme.spacing(3)}px ${theme.spacing(4)}px`,
    [theme.breakpoints.down(600)]: {
      width: 'auto',
      padding: `${theme.spacing(3)}px ${theme.spacing(2)}px`
    }
  },
  title: {
    paddingBottom: theme.spacing(3)
  },
  icon: {
    marginTop: theme.spacing(3),
    border: `1px solid ${theme.palette.secondary.light}`,
    borderRadius: '50%',
    backgroundColor: `${theme.palette.secondary.light}`,
    color: 'black',
    padding: theme.spacing(1)
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(1)
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  }
}));

const validationSchema = yup.object({
  firstName: yup
    .string('Enter your first name')
    .matches(/^[a-zA-Z]+$/, 'Invalid first name')
    .required('First name is required'),
  lastName: yup
    .string('Enter your last name')
    .matches(/^[a-zA-Z]+$/, 'Invalid last name')
    .required('Last name is required'),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password must be minimum 8 characters')
    .required('Password is required')
});

const Form = () => {
  const [ check, setCheck ] = useState(false);
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const acceptTermsHandler = () => {
    setCheck(!check);
  };

  const keyPressed = (e) => {
    if(e.key === 'Enter') {
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      try {
        if(form.elements[index + 2] !== undefined)
          form.elements[index + 2].focus();
      } catch (error) {
        console.log(error)
      }
      //e.preventDefault();
    }
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Paper className={classes.paper}>
          <Typography variant="h5" align="center" gutterBottom className={classes.title}>Sign up</Typography>
          <form onSubmit={formik.handleSubmit} onKeyPress={keyPressed}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField 
                  label="First Name"
                  id="firstName"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                  helperText={formik.touched.firstName && formik.errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField 
                  label="Last Name"
                  id="lastName"
                  name="lastName"
                  variant="outlined"
                  required
                  fullWidth
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label="Email Address"
                  id="email"
                  name="email"
                  variant="outlined"
                  required
                  fullWidth
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField 
                  label="Password"
                  id="password"
                  name="password"
                  variant="outlined"
                  type="password"
                  required
                  fullWidth
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="checkedB"
                      color="primary"
                      onChange={acceptTermsHandler}
                    />
                  }
                  label="I accept the terms & conditions."
                />
              </Grid>
              <Button 
                className={classes.button} 
                color="primary" 
                variant="contained" 
                fullWidth
                type="submit"
                disabled={!check}
              >
                Sign Up
              </Button>
              <Grid item xs={12}>
                <Typography variant="body2" align="right">
                  <Link href="#" color="primary">
                    Already have an account? Sign in
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </ThemeProvider>
    </div>
  )
}

export default Form;