import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';
import NoteIcon from '@mui/icons-material/Note';
import DefaultInfoCard from "./DefaultInfoCard";
import CenteredBlogCard from "./CenteredBlogCard";
import CardTravelIcon from '@mui/icons-material/CardTravel';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import BackpackIcon from '@mui/icons-material/Backpack';

function Information() {
  return (
    <Box component="section" py={12}>
      <Container>
        <Grid container spacing={3} alignItems="center" ml="auto">
          <Grid item xs={12} lg={6}>
            <Grid container justifyContent="flex-start">
              <Grid item xs={12} md={6}>
                <Box mb={5}>
                  <DefaultInfoCard
                    icon={<SafetyCheckIcon />}
                    title="Safety first"
                    description="One of the biggest concerns for solo travelers is safety. With our platform, you can rest assured that every city you visit has been thoroughly vetted for safety, providing you with valuable peace of mind as you explore."
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box mb={5}>
                  <DefaultInfoCard
                    icon={<TravelExploreIcon />}
                    title="Plan and journal your trips"
                    description="With the ability to add and track your itinerary, as well as journal your experiences along the way, you can keep all your travel plans and memories in one place."
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box mb={{ xs: 5, md: 0 }}>
                  <DefaultInfoCard
                    icon={<CardTravelIcon />}
                    title="Discover hidden gems "
                    description="Our platform provides a wealth of information on points of interest in each city, giving you insider access to unique and unforgettable experiences."
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box mb={{ xs: 5, md: 0 }}>
                  <DefaultInfoCard
                    icon={<BackpackIcon />}
                    title="Simplify your travel planning"
                    description="Our platform streamlines the planning process, providing you with all the information you need to make informed decisions about where to stay, what to do, and how to get around."
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid mr="auto" item xs={12} lg={4} sx={{ ml: "auto", mt: { xs: 3, lg: 0 } }}>
            <CenteredBlogCard
              image="https://images.unsplash.com/photo-1544717302-de2939b7ef71?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              title="Simplify your travel planning"
              description="Planning a solo trip can be overwhelming, especially if you're visiting a new destination for the first time."
              action={{
                type: "internal",
                route: "/login",
                color: "info",
                label: "Find out more",
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Information;