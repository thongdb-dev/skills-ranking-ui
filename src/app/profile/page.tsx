"use client";

import { State } from "@/models/base.model";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state: State) => state.auth.user);

  return (
    <Box>
      <Box
        className="w-full py-[2rem] px-[6%] gap-[2rem] justify-center"
        display={isNonMobileScreens ? "flex" : "block"}
      >
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        ></Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;
