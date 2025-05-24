import { Container, Typography, Grid, Card, CardContent, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to StudentConnect
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Connect with fellow students, collaborate on projects, and grow your network
        </Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={RouterLink}
          to="/register"
          sx={{ mt: 2 }}
        >
          Get Started
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Find Peers
              </Typography>
              <Typography color="text.secondary">
                Connect with students who share your interests and academic goals
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <SchoolIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Course Collaboration
              </Typography>
              <Typography color="text.secondary">
                Find study partners and collaborate on course projects
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <WorkIcon sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
              <Typography variant="h5" component="h2" gutterBottom>
                Project Teams
              </Typography>
              <Typography color="text.secondary">
                Build your portfolio by working on projects with other students
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home; 