"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ArrowForwardOutlined,
  ManageAccountsOutlined,
} from "@mui/icons-material";

import { API } from "@/apis/users";
import { API as SKILL_API } from "@/apis/skills";
import { IUser } from "@/models/user.model";
import { IMySkill, ISkill } from "@/models/skill.model";
import WidgetWrapper from "@/components/WidgetWrapper";
import { getLevelName } from "@/constants/common";

interface UserWidgetProps {
  userId: string;
}

const UserWidget: React.FC<UserWidgetProps> = (props: UserWidgetProps) => {
  const { userId } = props;
  const router = useRouter();
  const theme = useTheme();

  const [user, setUser] = useState<IUser | null>(null);
  const [topSkills, setTopSkills] = useState<IMySkill[]>([]);

  const getUser = async () => {
    try {
      const { data } = await API.getUser(userId);
      if (data) {
        setUser(data);
      }
    } catch (error) {
      setUser(null);
    }
  };

  const getUserTopSkills = async () => {
    try {
      const { data } = await SKILL_API.searchMySkills({
        page: 1,
        pageSize: 5,
        sort: "-level",
      });
      setTopSkills(data?.mySkills ?? []);
    } catch (error) {}
  };

  useEffect(() => {
    if (userId) {
      getUser();
      getUserTopSkills();
    }
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <WidgetWrapper>
      <Box className="flex items-center justify-between gap-[0.5rem] pb-[1.1rem]">
        <Box className="flex items-center gap-[0.5rem]">
          <Avatar />
          <Box>
            <Typography
              variant="h4"
              color={theme.palette.neutral.dark}
              fontWeight="500"
            >
              {user.firstName} {user.lastName}
            </Typography>
          </Box>
        </Box>
        <IconButton
          sx={{ backgroundColor: theme.palette.primary.light }}
          onClick={() => router.push(`/profile`)}
        >
          <ManageAccountsOutlined sx={{ color: theme.palette.primary.dark }} />
        </IconButton>
      </Box>

      <Divider />

      <Box className="py-[1rem] px-[0]">
        <Typography
          className="!text-[1rem] !font-semibold mb-[1rem]"
          color={theme.palette.neutral.main}
        >
          Your Top Skills
        </Typography>
        <Box className="my-[0.5rem]">
          {topSkills.map((item: IMySkill) => {
            return (
              <Box key={item._id}>
                <Box className="flex items-center justify-between py-[0.5rem]">
                  <Typography
                    color={theme.palette.neutral.main}
                    fontWeight="500"
                  >
                    {item.skill.name}
                  </Typography>
                  <Typography color={theme.palette.neutral.medium}>
                    {getLevelName(item.level)}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box>
          <Box className="flex items-center justify-start">
            <Typography
              className="flex item-center cursor-pointer"
              color={theme.palette.primary.main}
              fontWeight="500"
              onClick={() => {
                router.push(`/my-skills`)
              }}
            >
              See More
              <ArrowForwardOutlined
                sx={{ color: theme.palette.primary.main }}
              />
            </Typography>
          </Box>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
