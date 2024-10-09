"use client";

import { useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";
import { State } from "@/models/base.model";
import UserWidget from "@/components/UserWidget";
import AddSkillWidget from "@/components/AddSkillWidget";
import SkillsWidget from "@/components/SkillsWidget";
import { useState } from "react";

export default function Home() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useSelector((state: State) => state.auth.user);

  const [mySkillChanged, setMySkillChanged] = useState<boolean>(false);

  return (
    <Box>
      <Box
        className="w-full py-[2rem] px-[6%] gap-[2rem] justify-center"
        display={isNonMobileScreens ? "flex" : "block"}
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={user?._id ?? ""} mySkillChanged={mySkillChanged} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <Box>
            <AddSkillWidget onSkillAdded={() => {}} />
          </Box>
          <Box className="mt-[2rem]">
            <SkillsWidget onMySkillSelected={() => setMySkillChanged(prev => !prev)} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
