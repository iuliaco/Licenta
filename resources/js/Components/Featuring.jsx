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
              count={5234}
              separator=","
              title="Projects"
              description="Of “high-performing” level are led by a certified project manager"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DefaultCounterCard
              count={3400}
              separator=","
              suffix="+"
              title="Hours"
              description="That meets quality standards required by our users"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DefaultCounterCard
              count={24}
              suffix="/7"
              title="Support"
              description="Actively engage team members that finishes on time"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
    </>
  );
}

export default Featuring;