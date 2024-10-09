"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { API } from "@/apis/auth";
import { Box, Button, Typography, useTheme } from "@mui/material";

const ActivateAccount = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const router = useRouter();
  const theme = useTheme();

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const activateAccount = async () => {
      if (!token) return;
      try {
        await API.activateAccount(token);
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    };

    activateAccount();
  }, [token]);

  return (
    <>
      <Box className="flex items-center justify-center py-6">
        <Box
          className="p-6 rounded-xl w-[93%] md:w-[70%] lg:w-[50%]"
          sx={{ backgroundColor: theme.palette.background.alt }}
        >
          <Typography fontWeight="700" variant="h4" sx={{ mb: "1.5rem" }}>
            Activate Account
          </Typography>
          {status === "loading" && (
            <Typography color={theme.palette.neutral.medium}>
              Activating your account...
            </Typography>
          )}
          {status === "error" && (
            <Typography color={theme.palette.neutral.medium}>
              There was an error activating your account. Please try again or
              contact support.
            </Typography>
          )}
          {status === "success" && (
            <>
              <Typography color={theme.palette.neutral.medium}>
                Your account has been successfully activated!
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
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ActivateAccount;
