import PropTypes from "prop-types";
import CountUp from "react-countup";
import { Box, Typography } from "@mui/material";

function DefaultCounterCard({ color, count, title, description, ...rest }) {
  return (
    <Box p={2} textAlign="center" lineHeight={1}>
      <Typography variant="h1" color={color} textGradient>
        <CountUp end={count} duration={1} {...rest} />
      </Typography>
      {title && (
        <Typography variant="h5" mt={2} mb={1}>
          {title}
        </Typography>
      )}
      {description && (
        <Typography variant="body2" color="text">
          {description}
        </Typography>
      )}
    </Box>
  );
}

// Setting default props for the DefaultCounterCard
DefaultCounterCard.defaultProps = {
  color: "info",
  description: "",
  title: "",
};

export default DefaultCounterCard;