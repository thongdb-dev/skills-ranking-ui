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
import { ManageAccountsOutlined } from "@mui/icons-material";

import { IUser } from "@/models/user.model";
import { API } from "@/apis/users";
import WidgetWrapper from "@/components/WidgetWrapper";

interface UserWidgetProps {
  userId: string;
}

const UserWidget: React.FC<UserWidgetProps> = (props: UserWidgetProps) => {
  const { userId } = props;
  const router = useRouter();
  const theme = useTheme();

  const [user, setUser] = useState<IUser | null>(null);

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

  useEffect(() => {
    if (userId) {
      getUser();
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
          onClick={() => router.push(`/profile/${userId}`)}
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
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
