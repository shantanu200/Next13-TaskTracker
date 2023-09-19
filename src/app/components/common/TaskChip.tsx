import { Chip, Stack } from "@mui/material";

interface PropsChip {
  tasks: number;
  completed: number;
  due: number;
}

const TaskChip: React.FC<PropsChip> = ({ completed, tasks, due }) => {
  return (
    <Stack direction={{ lg: "row", md: "column" }} spacing={4}>
      <Chip label={`Total Tasks ${tasks}`} className="bg-white" />
      <Chip label={`Completed Tasks ${completed}`} className="bg-white" />
      <Chip label={`Due Tasks ${due}`} className="bg-white" />
    </Stack>
  );
};

export default TaskChip;
