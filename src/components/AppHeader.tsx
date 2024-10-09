"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputBase,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

import { setLogout, toggleMode } from "@/redux/auth";
import { State, ThemeModeEnum } from "@/models/base.model";
import { usePathname, useRouter } from "next/navigation";

const AppHeader = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const router = useRouter();
  const pathName = usePathname();
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.auth.user);

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const alt = theme.palette.background.alt;

  const fullName = `${user?.firstName} ${user?.lastName}`;

  const logout = () => {
    dispatch(setLogout());
  };

  const navigateToLogin = () => {
    router.push("/login");
  };

  const navigateToRegister = () => {
    router.push("/register");
  };

  return (
    <Box
      id="app-header"
      className="fixed top-0 px-[6%] items-center justify-center w-full border-b z-30 h-[60px]"
      display={isNonMobileScreens ? "flex" : "block"}
      sx={{ backgroundColor: alt }}
    >
      <Box
        className="flex items-center justify-center h-full"
        flexBasis={isNonMobileScreens ? "70%" : undefined}
      >
        <Box
          className="container hidden sm:flex items-center justify-between cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
          >
            Skills Ranking
          </Typography>
        </Box>
        <Box className="flex items-center justify-end">
          <IconButton className="!mr-2" onClick={() => dispatch(toggleMode())}>
            {theme.palette.mode === ThemeModeEnum.Dark ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          {user ? (
            <>
              <FormControl variant="standard">
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => logout()}>Log Out</MenuItem>
                </Select>
              </FormControl>
            </>
          ) : (
            <>
              <Button
                type="submit"
                className="!font-bold !rounded-lg"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.background.alt,
                  "&:hover": { color: theme.palette.primary.main },
                }}
                onClick={() =>
                  pathName === "/login"
                    ? navigateToRegister()
                    : navigateToLogin()
                }
              >
                {pathName === "/login" ? "Register" : "Login"}
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AppHeader;
