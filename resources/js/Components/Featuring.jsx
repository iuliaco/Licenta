import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Box, Paper } from "@mui/material";

import DefaultCounterCard from "./DefaultCounterCard";

function Featuring() {
  return (
    <>
    <Paper/>

    <Box component="section" pt={3} pb={8} sx={{ background:'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))', color:'white'}}>
      <Container>
        <Grid container justifyContent="center" sx={{ textAlign: "center" }}>
          <Grid item xs={12} md={3}>
            <DefaultCounterCard
              count={64}
              suffix="%"
              separator=","
              title="People"
              description="Are excited about traveling again. We are too!"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DefaultCounterCard
              count={76}
              separator=","
              suffix="%"
              title="Solo Travelers"
              description="Our platform accomodates solo travelers"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DefaultCounterCard
              count={60}
              suffix="%"
              title="Digital planners"
              description="Our platform is designed for digital planners"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
    </>
  );
}

export default Featuring;