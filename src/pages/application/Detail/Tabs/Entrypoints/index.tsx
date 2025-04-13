import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, TextField, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router-dom";

import { getEntrypoints } from "#/api/grpc/endpoint";

import EntrypointItem from "./components/EntrypointItem";

const EntrypointPage: FC = () => {
  const { project_id, app_id } = useParams();

  const theme = useTheme();

  const rqEntrypoints = useQuery({
    queryKey: ["entrypoints", project_id, app_id],
    queryFn: () =>
      getEntrypoints({ projectId: project_id, applicationId: app_id }),
  });
  const entrypoints = rqEntrypoints.data?.endpoints || [];

  return (
    <div>
      <Box display="flex" alignItems="center" mb={3} gap={2}>
        <TextField fullWidth size="small" placeholder="Search entrypoints" />
        <IconButton
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: "white",
            ":hover": { color: theme.palette.primary.main },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {entrypoints.map((entrypoint) => (
        <EntrypointItem key={entrypoint.id} entrypoint={entrypoint} />
      ))}
    </div>
  );
};

export default EntrypointPage;
