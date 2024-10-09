import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Pagination,
  Typography,
  useTheme,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";

import { ISkill, SkillLevelEnum } from "@/models/skill.model";
import { API } from "@/apis/skills";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/models/base.model";
import { setSuccess } from "@/redux/ui";

const SkillsWidget = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.auth.user);

  const [data, setData] = useState<ISkill[]>([]);
  const [searchKey, setSearchKey] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPages] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [addingSkillId, setAddingSkillId] = useState<string>("");
  const [isSortAsc, setIsSortAsc] = useState<boolean>(true);

  const searchSkills = async () => {
    try {
      const res = await API.searchSkills({
        page: page,
        pageSize: 10,
        search: searchKey,
        sort: isSortAsc ? "name" : "-name",
      });

      setData(res.data?.skills ?? []);
      setTotalPages(res.data?.totalPages ?? 0);
      setTotalCount(res.data?.totalCount ?? 0);
    } catch (error) {}
  };

  useEffect(() => {
    searchSkills();
  }, [page, isSortAsc]);

  const handleChangePage = (e: any, page: number) => {
    setPage(page);
  };

  const handleSearch = () => {
    if (page === 1) {
      searchSkills();
    } else {
      setPage(1);
    }
  };

  const handleSelectSkill = async (skill: ISkill) => {
    try {
      setAddingSkillId(skill._id);
      const { data } = await API.addMySkill({
        skill: skill._id,
        level: SkillLevelEnum.NotApplicable,
      });

      setData((prev: ISkill[]) =>
        prev.map((i: ISkill) => {
          if (i._id === skill._id) {
            i.achieved = true;
          }
          return i;
        })
      );
      dispatch(setSuccess("Added to MySkill Successfully!"));
    } catch (error) {
    } finally {
      setAddingSkillId("");
    }
  };

  return (
    <WidgetWrapper>
      <Box>
        <Box className="flex items-center justify-between pb-[0.5rem] px-[0]">
          <Typography
            className="!text-[1rem] !font-semibold mb-[1rem] flex items-center"
            color={theme.palette.neutral.main}
          >
            Skills Assessment
            <IconButton onClick={() => setIsSortAsc((prev) => !prev)}>
              {isSortAsc ? (
                <ArrowUpwardOutlinedIcon />
              ) : (
                <ArrowDownwardOutlinedIcon />
              )}
            </IconButton>
          </Typography>
          <Box className="flex items-center justify-between gap-[0.5rem]">
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
                  <SearchOutlinedIcon />
                </IconButton>
              }
            />
          </Box>
        </Box>
        <Box className="h-[500px] overflow-auto flex flex-col">
          {data.map((item: ISkill) => {
            return (
              <Box key={item._id} className="pr-[1rem]">
                <Box className="pt-[0.8rem] pb-[0.5rem]">
                  <Box className="flex justify-between">
                    <Box>
                      <Typography
                        color={theme.palette.neutral.main}
                        fontWeight="500"
                      >
                        {item.name}
                      </Typography>
                      <Typography color={theme.palette.neutral.medium}>
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="flex items-center justify-between mt-2">
                    <Box className="flex items-center px-[0.2rem] gap-1">
                      <Typography
                        color={theme.palette.neutral.medium}
                        fontSize={11}
                      >
                        created by:
                      </Typography>
                      <Typography
                        color={theme.palette.neutral.main}
                        fontSize={11}
                        fontWeight="500"
                      >
                        {`${item.creator.firstName} ${item.creator.lastName}`}
                      </Typography>
                    </Box>
                    <Box>
                      {item.achieved ? (
                        <Box
                          className="flex items-center justify-between px-[9px] py-[3px] font-semibold rounded-full text-[11px]"
                          sx={{
                            color: theme.palette.primary.main,
                          }}
                        >
                          Achieved
                        </Box>
                      ) : (
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            textTransform: "none",
                            borderRadius: "3rem",
                          }}
                          onClick={() => handleSelectSkill(item)}
                        >
                          Select
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Box>
                <Divider />
              </Box>
            );
          })}
        </Box>
        <Box className="flex items-center justify-end pt-[0.5rem]">
          <Pagination
            page={page}
            onChange={handleChangePage}
            count={totalPage}
            color="primary"
          />
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default SkillsWidget;
