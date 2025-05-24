import * as React from 'react';
import { useState, useMemo } from 'react';
import { Box, Tabs, Tab, Typography, Container, Paper, Chip, Grid } from '@mui/material';
import Profile from './Profile';
import Discover from './Discover';
import Connections from './Connections';

const MOCK_STUDENTS = [
  {
    id: 1,
    name: 'Alice Johnson',
    year: '2nd Year',
    department: 'Computer Science',
    profilePic: '',
    skills: ['React', 'Node.js', 'Python'],
    interests: ['Web Development', 'AI'],
    projects: ['Web Apps', 'ML'],
  },
  {
    id: 2,
    name: 'Bob Smith',
    year: '3rd Year',
    department: 'Electronics',
    profilePic: '',
    skills: ['C++', 'Robotics', 'IoT'],
    interests: ['Robotics', 'Embedded'],
    projects: ['IoT', 'Robotics'],
  },
  {
    id: 3,
    name: 'Carol White',
    year: '1st Year',
    department: 'Mechanical',
    profilePic: '',
    skills: ['CAD', 'Matlab'],
    interests: ['Design', 'Simulation'],
    projects: ['CAD', 'Simulation'],
  },
  {
    id: 4,
    name: 'David Lee',
    year: '4th Year',
    department: 'Computer Science',
    profilePic: '',
    skills: ['Java', 'Spring', 'AWS'],
    interests: ['Cloud', 'Backend'],
    projects: ['Cloud', 'Web Apps'],
  },
];

const PROFILE_KEY = 'peerconnect_profile';
const REQUESTS_KEY = 'peerconnect_requests';

function TabPanel(props: { children?: React.ReactNode; index: number; value: number }) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Dashboard = () => {
  const [tab, setTab] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  // Dashboard stats
  const profile = useMemo(() => {
    const saved = localStorage.getItem(PROFILE_KEY);
    return saved ? JSON.parse(saved) : null;
  }, []);
  const connections = useMemo(() => {
    const saved = localStorage.getItem(REQUESTS_KEY);
    return saved ? JSON.parse(saved) : [];
  }, []);
  const connectedStudents = MOCK_STUDENTS.filter((student) => connections.includes(student.id));

  // Skills matched
  const mySkills = profile?.skills?.split(',').map((s: string) => s.trim().toLowerCase()).filter(Boolean) || [];
  const allConnectionSkills = connectedStudents.flatMap((s) => s.skills.map((sk) => sk.toLowerCase()));
  const skillsMatched = mySkills.filter((skill: string) => allConnectionSkills.includes(skill));
  const uniqueSkillsMatched: string[] = Array.from(new Set(skillsMatched));

  // Unique project tags
  const allProjectTags = connectedStudents.flatMap((s) => s.projects.map((p) => p.trim()));
  const uniqueProjectTags: string[] = Array.from(new Set(allProjectTags));

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, minHeight: '100vh', p: { xs: 0, sm: 2 } }}>
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2, p: { xs: 2, sm: 0 } }}>
        <Typography variant="h4" fontWeight={700} sx={{ fontSize: { xs: '1.5rem', sm: '2.2rem' } }}>
          PeerConnect
        </Typography>
      </Box>
      {/* Dashboard Stats */}
      <Paper elevation={2} sx={{ p: { xs: 1, sm: 2 }, mb: 3, background: '#f0f4ff' }}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>Connections</Typography>
            <Typography variant="h4" color="primary.main" sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }}>{connectedStudents.length}</Typography>
          </Grid>
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>Skills Matched</Typography>
            <Box>
              {uniqueSkillsMatched.length === 0 ? (
                <Typography color="text.secondary">0</Typography>
              ) : (
                uniqueSkillsMatched.map((skill: string, idx: number) => (
                  <Chip key={skill + idx} label={skill} color="primary" size="small" sx={{ m: 0.5 }} />
                ))
              )}
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} textAlign="center">
            <Typography variant="h6" sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }}>Project Tags</Typography>
            <Box>
              {uniqueProjectTags.length === 0 ? (
                <Typography color="text.secondary">0</Typography>
              ) : (
                uniqueProjectTags.map((tag: string, idx: number) => (
                  <Chip key={tag + idx} label={tag} color="secondary" size="small" sx={{ m: 0.5 }} />
                ))
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{ p: { xs: 0, sm: 0 } }}>
        <Tabs
          value={tab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="My Profile" />
          <Tab label="Browse Students" />
          <Tab label="My Connections" />
        </Tabs>
        <TabPanel value={tab} index={0}>
          <Profile />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Discover />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <Connections />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Dashboard; 