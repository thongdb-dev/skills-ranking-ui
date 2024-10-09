"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { IRegisterPayload } from "@/models/auth.model";
import { API } from "@/apis/auth";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required!"),
  lastName: yup.string().required("Last Name is required!"),
  email: yup
    .string()
    .required("First Name is required!")
    .email("Invalid email!"),
  password: yup.string().required("Password is required!"),
});

const initialValues: IRegisterPayload = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const RegisterPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const { palette } = theme;

  const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const register = async (
    values: IRegisterPayload,
    formikHelpers: FormikHelpers<IRegisterPayload>
  ) => {
    try {
      setIsRegistering(true);
      const res = await API.register(values);
      if (res.data) {
        formikHelpers.resetForm();
        setIsRegisterSuccess(true);
      }
    } catch (error) {
    } finally {
      setIsRegistering(false);
    }
  };

  if (isRegisterSuccess) {
    return (
      <>
        <Box className="flex items-center justify-center py-6">
          <Box
            className="p-6 rounded-xl w-[93%] md:w-[70%] lg:w-[50%]"
            sx={{ backgroundColor: theme.palette.background.alt }}
          >
            <Typography fontWeight="700" variant="h4" sx={{ mb: "1.5rem" }}>
              Register Account Successfully!
            </Typography>
            <Typography color={theme.palette.neutral.medium}>
              {
                "Welcome to Skills Ranking! We're very excited to have you on board. Please check your email to activate account!"
              }
            </Typography>
            <Box className="!mt-[1rem] w-full flex items-center justify-center">
              <Button
                variant="contained"
                className="w-full sm:w-fit"
                onClick={() => router.push("/login")}
              >
                Login Now
              </Button>
            </Box>
          </Box>
        </Box>
      </>
    );
  }

  return (
    <>
      <Box className="flex items-center justify-center py-6">
        <Box
          className="p-6 rounded-xl w-[93%] md:w-[70%] lg:w-[50%]"
          sx={{ backgroundColor: theme.palette.background.alt }}
        >
          <Typography fontWeight="700" variant="h3" sx={{ mb: "1.5rem" }}>
            Welcome to Skills Ranking!
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={schema}
            onSubmit={register}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box className="grid grid-cols-2 gap-6">
                  <TextField
                    className="col-span-2 md:col-span-1"
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    name="firstName"
                    error={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                    }
                    helperText={touched.firstName && errors.firstName}
                  />
                  <TextField
                    className="col-span-2 md:col-span-1"
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    name="lastName"
                    error={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                    }
                    helperText={touched.lastName && errors.lastName}
                  />
                  <TextField
                    className="col-span-2"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    className="col-span-2"
                    label="Password"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={
                      Boolean(touched.password) && Boolean(errors.password)
                    }
                    helperText={touched.password && errors.password}
                  />
                </Box>
                <Box>
                  <Button
                    fullWidth
                    type="submit"
                    className="!font-bold !my-[2rem] !mx-0 !p-[1rem] flex items-center justify-center gap-[0.5rem]"
                    sx={{
                      backgroundColor: palette.primary.main,
                      color: palette.background.alt,
                      "&:hover": { color: palette.primary.main },
                    }}
                    disabled={isRegistering}
                  >
                    {isRegistering && (
                      <CircularProgress
                        sx={{ color: theme.palette.primary.dark }}
                      />
                    )}
                    REGISTER
                  </Button>
                  <Box className="flex items-center justify-start gap-1">
                    <Typography>Already have an account?</Typography>
                    <Typography
                      className="cursor-pointer underline"
                      sx={{
                        color: palette.primary.main,
                        "&:hover": {
                          color: palette.primary.light,
                        },
                      }}
                      onClick={() => {
                        router.push("/login");
                      }}
                    >
                      Login here.
                    </Typography>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </>
  );
};

export default RegisterPage;
