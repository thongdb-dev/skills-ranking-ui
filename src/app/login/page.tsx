"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { ILoginPayload } from "@/models/auth.model";
import { API } from "@/apis/auth";
import { setLogin } from "@/redux/auth";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("First Name is required!")
    .email("Invalid email!"),
  password: yup.string().required("Password is required!"),
});

const initialValues: ILoginPayload = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { palette } = theme;

  const login = async (
    values: ILoginPayload,
    formikHelpers: FormikHelpers<ILoginPayload>
  ) => {
    try {
      const res = await API.login(values);
      if (res.data) {
        formikHelpers.resetForm();
        const { user, token } = res.data;
        dispatch(setLogin({
          user: user,
          token: token,
        }));
        router.push("/");
      }
    } catch (error) {}
  };

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
            onSubmit={login}
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
                    className="!font-bold !my-[2rem] !mx-0 !p-[1rem]"
                    sx={{
                      backgroundColor: palette.primary.main,
                      color: palette.background.alt,
                      "&:hover": { color: palette.primary.main },
                    }}
                  >
                    LOGIN
                  </Button>
                  <Box className="flex items-center justify-start gap-1">
                    <Typography>Don&#39;t have an account?</Typography>
                    <Typography
                      className="cursor-pointer underline"
                      sx={{
                        color: palette.primary.main,
                        "&:hover": {
                          color: palette.primary.light,
                        },
                      }}
                      onClick={() => {
                        router.push("/register");
                      }}
                    >
                      Register here.
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

export default LoginPage;
