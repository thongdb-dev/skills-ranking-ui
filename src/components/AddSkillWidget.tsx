import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  InputBase,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import WidgetWrapper from "@/components/WidgetWrapper";
import { API } from "@/apis/skills";
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/models/base.model";
import { setSuccess } from "@/redux/ui";

interface AddSkillWidgetProps {
  onSkillAdded: Function;
}

const AddSkillWidget = (props: AddSkillWidgetProps) => {
  const { onSkillAdded } = props;

  const theme = useTheme();
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.auth.user);

  const [skillName, setSkillName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isShowDescription, setIsShowDescription] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleToggleShowDescription = () => {
    setDescription("");
    setIsShowDescription((prev) => !prev);
  };

  const handleAddSkill = async () => {
    try {
      setIsCreating(true);
      const { data } = await API.createSkill({
        name: skillName,
        description: description,
        creator: user?._id ?? "",
      });
      setSkillName("");
      setDescription("");
      dispatch(setSuccess("Skill Created Successfully!"));
      onSkillAdded(data.skill);
    } catch (error) {
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <WidgetWrapper>
      <Box>
        <Box className="pb-[0.5rem] px-[0]">
          <Typography
            className="!text-[1rem] !font-semibold mb-[1rem]"
            color={theme.palette.neutral.main}
          >
            Add New Skill
          </Typography>
        </Box>
        <Box className="flex items-center justify-between gap-[0.5rem]">
          <InputBase
            placeholder="Enter skill name..."
            onChange={(e: any) => setSkillName(e.target.value)}
            value={skillName}
            sx={{
              width: "100%",
              backgroundColor: theme.palette.neutral.light,
              borderRadius: "2rem",
              padding: "0.5rem 2rem",
            }}
          />
        </Box>
        {isShowDescription && (
          <Box className="pt-[1rem]">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
        )}
        <Divider sx={{ margin: "1rem 0" }} />
        <Box className="flex items-center justify-between">
          <Box className="flex items-center">
            <Box
              className="flex items-center gap-[0.25rem]"
              onClick={() => handleToggleShowDescription()}
            >
              <DescriptionOutlinedIcon
                sx={{ color: theme.palette.neutral.mediumMain }}
              />
              <Typography
                color={theme.palette.neutral.mediumMain}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    color: theme.palette.neutral.medium,
                  },
                }}
              >
                Description
              </Typography>
            </Box>
          </Box>
          <Button
            disabled={!skillName || isCreating}
            onClick={handleAddSkill}
            sx={{
              color: theme.palette.background.alt,
              backgroundColor: theme.palette.primary.main,
              borderRadius: "3rem",
              p: "0.2rem 1rem",
            }}
          >
            ADD
          </Button>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default AddSkillWidget;
