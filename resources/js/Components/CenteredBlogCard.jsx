import { Link } from "@inertiajs/inertia";

// prop-types is a library for typechecking of props

// @mui material components
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";
import { Box, Button, Typography } from "@mui/material";

function CenteredBlogCard({ image, title, description, action }) {
  return (
    <Card>
      <Box position="relative" borderRadius="lg" mx={2} mt={-3}>
        <Box
          component="img"
          src={image}
          alt={title}
          borderRadius="lg"
          width="100%"
          position="relative"
          zIndex={1}
        />
        <Box
          borderRadius="lg"
          shadow="md"
          width="100%"
          height="100%"
          position="absolute"
          left={0}
          top={0}
          sx={{
            backgroundImage: `url(${image})`,
            transform: "scale(0.94)",
            filter: "blur(12px)",
            backgroundSize: "cover",
          }}
        />
      </Box>
      <Box p={3} mt={-1} textAlign="center">
        <Typography display="inline" variant="h5" textTransform="capitalize" fontWeight="regular">
          {title}
        </Typography>
        <Box mt={1} mb={3}>
          <Typography variant="body2" component="p" color="text">
            {description}
          </Typography>
        </Box>
        {action.type === "external" ? (
          <Button
            component={MuiLink}
            href={action.route}
            target="_blank"
            rel="noreferrer"
            variant="gradient"
            size="small"
            color={action.color ? action.color : "dark"}
          >
            {action.label}
          </Button>
        ) : (
          <Button
            component={Link}
            href={action.route}
            variant="gradient"
            size="small"
            color={action.color ? action.color : "dark"}
          >
            {action.label}
          </Button>
        )}
      </Box>
    </Card>
  );
}

export default CenteredBlogCard;