import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const IndexBox = ({ title, subtitle, icon, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="160px" height="95px" m="0 30px" border="1px solid #333333" margin={0} borderRadius={4}>
      <Box p={2} display="flex" justifyContent="space-between">
        <Box>
          <Typography
            fontSize="20px"
            
            sx={{ color: colors.grey[100] }}
          >
            {title}
          </Typography>
          <Typography
            fontSize="20px"
            
            sx={{ color: colors.grey[100] }}
          >
            {subtitle}
          </Typography>
        </Box>
      </Box>
      {/* <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography>
      </Box> */}
    </Box>
  );
};

export default IndexBox;