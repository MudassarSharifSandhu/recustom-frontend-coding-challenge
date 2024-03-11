import React from "react";
import { Box, Avatar as MuiAvatar, Typography } from "@mui/material";
import {AvatarProps as MuiAvatarProps} from "@mui/material/Avatar";

interface CoreAvatarProps extends MuiAvatarProps {
  title?: string;
  summary?: string | React.ReactNode;
  size?: number | string;
}

const CoreAvatar: React.FC<CoreAvatarProps> = ({
  title,
  summary,
  ...rest
}) => {

  const renderTitle = () => {
    return (
      <Box display="flex">
        {React.isValidElement(title) ? (
          title
        ) : (
          <Typography fontWeight={600} fontSize="14px">
            {title}
          </Typography>
        )}
      </Box>
    );
  };

  const renderSummary = () => {
    return (
      <Box mt="4px" display="flex">
        {React.isValidElement(summary) ? (
          summary
        ) : (
          <Typography
            paragraph
            component="span"
            variant="body2"
            mb="0px"
            fontSize="14px"
          >
            {summary}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <Box display="flex" alignItems="start" width="100%">
      <Box display="flex">
        <MuiAvatar
          alt={title}
          {...rest}
          sx={{ width: 32, height: 32, ...(rest.sx || {}) }}
        />
      </Box>
      {title && (
        <Box display="flex" ml="10px" width="100%" flexDirection="column">
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
          >
            <Box display="flex" flexDirection="column" width="100%">
              {title && renderTitle()}
              {summary && renderSummary()}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CoreAvatar;
