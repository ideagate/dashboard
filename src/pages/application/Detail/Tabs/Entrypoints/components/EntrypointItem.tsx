import { Endpoint } from "@bayu-aditya/ideagate-model-js/core/endpoint/endpoint";
import { Box, Chip, Typography, useTheme } from "@mui/material";
import { FC } from "react";
import { Link, useParams } from "react-router-dom";

const EntrypointItem: FC<{ entrypoint: Endpoint }> = ({ entrypoint }) => {
  const { project_id, app_id } = useParams();

  const theme = useTheme();

  const setting = entrypoint.settings;
  const settingRest =
    (setting.oneofKind === "settingRest" && setting.settingRest) || null;

  return (
    <Link
      key={entrypoint.id}
      to={`/${project_id}/application/${app_id}/entrypoint/${entrypoint.id}`}
    >
      <Box
        sx={{
          my: 1,
          border: "solid 1px",
          borderColor: "divider",
          borderRadius: theme.opts.borderRadius,
          px: 2,
          py: 1,
          display: "grid",
          gap: 0.5,
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Chip size="small" color="primary" label={settingRest?.method} />
          <Typography>{settingRest?.path}</Typography>
        </Box>
        <Typography variant="subtitle2">{entrypoint.name}</Typography>
      </Box>
    </Link>
  );
};

export default EntrypointItem;
