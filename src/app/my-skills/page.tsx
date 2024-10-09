"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WidgetWrapper from "@/components/WidgetWrapper";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SearchOutlined, DeleteOutlined } from "@mui/icons-material";

import { SKILL_LEVEL_OPTIONS } from "@/constants/common";
import { IMySkill, SkillLevelEnum } from "@/models/skill.model";
import { API } from "@/apis/skills";

const MySkillsPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const theme = useTheme();
  const router = useRouter();

  const [data, setData] = useState<IMySkill[]>([]);
  const [searchKey, setSearchKey] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const searchSkills = async () => {
    try {
      const res = await API.searchMySkills({
        page: page,
        pageSize: 99999,
        search: searchKey,
      });

      setData(res.data?.mySkills ?? []);
    } catch (error) {}
  };

  useEffect(() => {
    searchSkills();
  }, [page]);

  const handleSearch = () => {
    if (page === 1) {
      searchSkills();
    } else {
      setPage(1);
    }
  };

  const handleUpdateSkillLevel = async (
    skill: IMySkill,
    level: SkillLevelEnum
  ) => {
    try {
      await API.updateMySkillLevel(skill._id, { level: level });
      setData((prev) =>
        prev.map((item) => {
          if (item._id === skill._id) {
            item.level = level;
          }
          return item;
        })
      );
    } catch (error) {}
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      await API.deleteMySkill(id);
      searchSkills();
    } catch (error) {}
  };

  return (
    <Box>
      <Box
        className="w-full py-[1rem] px-[6%] gap-[2rem] justify-center"
        display={isNonMobileScreens ? "flex" : "block"}
      >
        <Box flexBasis={isNonMobileScreens ? "70%" : undefined}>
          <Box className="flex items-center justify-end !mb-[1rem]">
            <Button
              className="w-full sm:w-fit"
              variant="contained"
              onClick={() => router.push("/")}
            >
              Add New Skill
            </Button>
          </Box>
          <WidgetWrapper>
            <Box className="mb-[2rem]">
              <Box className="flex flex-col md:flex-row items-center justify-between pb-[0.5rem] px-[0]">
                <Typography
                  className="!text-[1.2rem] !font-semibold !my-[1rem]"
                  color={theme.palette.primary.main}
                >
                  My Skills
                </Typography>
                <Box className="flex items-center justify-between gap-[0.5rem] w-full md:w-[20rem] max-w-[100%]">
                  <InputBase
                    placeholder="Enter name to search..."
                    onChange={(e: any) => setSearchKey(e.target.value)}
                    onKeyDown={(e: any) => {
                      console.log("e: ", e);
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    value={searchKey}
                    sx={{
                      width: "100%",
                      backgroundColor: theme.palette.neutral.light,
                      borderRadius: "2rem",
                      padding: "0.2rem 0.2rem 0.2rem 1rem",
                    }}
                    endAdornment={
                      <IconButton onClick={() => handleSearch()}>
                        <SearchOutlined />
                      </IconButton>
                    }
                  />
                </Box>
              </Box>
              {data.length > 0 ? (
                <Box className="flex flex-col">
                  {data.map((item: IMySkill) => {
                    return (
                      <Box key={item._id} className="pr-[1rem]">
                        <Box className="pt-[0.8rem] pb-[0.5rem]">
                          <Box className="flex justify-between">
                            <Box>
                              <Typography
                                color={theme.palette.neutral.main}
                                fontWeight="500"
                                fontSize="1.2rem"
                              >
                                {item.skill.name}
                              </Typography>
                              <Typography color={theme.palette.neutral.medium}>
                                {item.skill.description}
                              </Typography>
                            </Box>
                            <Box>
                              <IconButton
                                onClick={() => handleDeleteSkill(item._id)}
                              >
                                <DeleteOutlined color="error" />
                              </IconButton>
                            </Box>
                          </Box>
                          <Typography className="!mt-4">Level:</Typography>
                          <Box className="flex flex-col md:flex-row items-center justify-between gap-[0.5rem] mt-2">
                            {SKILL_LEVEL_OPTIONS.map((option: any) => {
                              return (
                                <Box
                                  key={option.value}
                                  className="w-full md:w-fit pl-[6px] pr-4 py-1 rounded-full flex gap-1 justify-center cursor-pointer"
                                  sx={{
                                    backgroundColor:
                                      option.value === item.level
                                        ? theme.palette.primary.main
                                        : theme.palette.neutral.light,
                                    color:
                                      option.value === item.level
                                        ? "#FFFFFF"
                                        : theme.palette.neutral.dark,
                                  }}
                                  onClick={() =>
                                    handleUpdateSkillLevel(item, option.value)
                                  }
                                >
                                  <Box
                                    className="border rounded-full w-5 h-5 text-xs flex items-center justify-center"
                                    sx={{
                                      borderColor:
                                        option.value === item.level
                                          ? "#FFFFFF"
                                          : theme.palette.neutral.dark,
                                    }}
                                  >
                                    {option.value}
                                  </Box>
                                  {option.name}
                                </Box>
                              );
                            })}
                          </Box>
                        </Box>
                        <Divider sx={{ mt: "1rem" }} />
                      </Box>
                    );
                  })}
                </Box>
              ) : (
                <>
                  <Typography color={theme.palette.neutral.medium}>
                    No Skills Added
                  </Typography>
                </>
              )}
            </Box>
          </WidgetWrapper>
        </Box>
      </Box>
    </Box>
  );
};

export default MySkillsPage;
