import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Pagination,
  Typography,
  useTheme,
} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { ISkill } from "@/models/skill.model";
import { API } from "@/apis/skills";
import WidgetWrapper from "@/components/WidgetWrapper";

const SkillsWidget = () => {
  const theme = useTheme();
  const [data, setData] = useState<ISkill[]>([]);
  const [searchKey, setSearchKey] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPages] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const searchSkills = async () => {
    try {
      const res = await API.searchSkills({
        page: page,
        pageSize: 10,
        search: searchKey,
      });

      setData(res.data?.skills ?? []);
      setTotalPages(res.data?.totalPages ?? 0);
      setTotalCount(res.data?.totalCount ?? 0);
    } catch (error) {}
  };

  useEffect(() => {
    searchSkills();
  }, [page]);

  const handleChangePage = (e: any, page: number) => {
    setPage(page);
  };

  return (
    <WidgetWrapper>
      <Box>
        <Box className="flex items-center justify-between pb-[0.5rem] px-[0]">
          <Typography
            className="!text-[1rem] !font-semibold mb-[1rem]"
            color={theme.palette.neutral.main}
          >
            Skills Assessment
          </Typography>
          <Box className="flex items-center justify-between gap-[0.5rem]">
            <InputBase
              placeholder="Enter name to search..."
              onChange={(e: any) => setSearchKey(e.target.value)}
              onKeyDown={(e: any) => {
                if (e.target.key === "Enter") {
                  searchSkills();
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
                <IconButton onClick={() => searchSkills()}>
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
                <Box className="py-[0.8rem]">
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
                    <Box></Box>
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
                  </Box>
                </Box>
                <Divider />
              </Box>
            );
          })}
        </Box>
        <Box className="flex items-center justify-end pt-[0.5rem]">
          <Pagination page={page} onChange={handleChangePage} count={totalPage} color="primary" />
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default SkillsWidget;
