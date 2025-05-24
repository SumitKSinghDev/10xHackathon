import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Avatar, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { Chip } from '@mui/material';

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

const REQUESTS_KEY = 'peerconnect_requests';

const Connections = () => {
  const [connections, setConnections] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(REQUESTS_KEY);
    setConnections(saved ? JSON.parse(saved) : []);
  }, []);

  const handleRemove = (studentId: number) => {
    const updated = connections.filter((id) => id !== studentId);
    setConnections(updated);
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(updated));
  };

  const connectedStudents = MOCK_STUDENTS.filter((student) => connections.includes(student.id));

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        My Connections
      </Typography>
      {connectedStudents.length === 0 ? (
        <Typography color="text.secondary">You have no connections yet. Connect with students from the Browse tab!</Typography>
      ) : (
        <Grid container spacing={3}>
          {connectedStudents.map((student) => (
            <Grid item xs={12} sm={6} md={4} key={student.id}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar sx={{ mr: 2 }} src={student.profilePic} alt={student.name}>
                      {student.name[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">{student.name}</Typography>
                      <Typography color="text.secondary">
                        {student.year} • {student.department}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Skills
                  </Typography>
                  <Box mb={1}>
                    {student.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{ m: 0.5 }}
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Interests
                  </Typography>
                  <Box mb={1}>
                    {student.interests.map((interest) => (
                      <Chip
                        key={interest}
                        label={interest}
                        size="small"
                        sx={{ m: 0.5 }}
                        color="secondary"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Project Areas
                  </Typography>
                  <Box>
                    {student.projects.map((proj) => (
                      <Chip
                        key={proj}
                        label={proj}
                        size="small"
                        sx={{ m: 0.5 }}
                        color="default"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </CardContent>
                <CardActions>
                  <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    onClick={() => handleRemove(student.id)}
                  >
                    Remove Connection
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Connections; 