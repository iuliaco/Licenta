import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Layout } from '@/Layouts/Layout';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { SettingsPassword } from '@/Components/SettingsPassword';
import { SettingsUser } from '@/Components/SettingsUser';
import { AccountProfileDetails } from '@/Components/AccountProfileDetails';
import { AccountProfile } from '@/Components/AccountProfile';

export default function Settings(props) {
    return (
        <Layout
            auth = {props.auth}
        >
                  <>
        <Head>
          <title>
            Settings
          </title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
           <Container maxWidth="lg">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Account
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <AccountProfile user={props.user}/>
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <AccountProfileDetails countries={props.countries} user={props.user}/>
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>

          <Container maxWidth="lg">
            <Stack spacing={3}>
              <Typography variant="h4">
                Settings
              </Typography>
              {/* <SettingsNotifications /> */}
              {/* <SettingsUser countries={props.countries} user={props.user}/> */}
              <SettingsPassword />
            </Stack>
          </Container>
        </Box>
      </>
        </Layout>
    );


}