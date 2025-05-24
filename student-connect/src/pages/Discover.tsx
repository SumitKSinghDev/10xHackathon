import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Avatar, TextField, Box } from '@mui/material';
import { useState, useEffect } from 'react';
import {
  Chip,
  InputAdornment,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

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
  // Add more mock students as needed
];

const REQUESTS_KEY = 'peerconnect_requests';

const getUniqueDepartments = (students: any[]) => [
  ...new Set(students.map((s) => s.department)),
];

const Discover = () => {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('');
  const [requests, setRequests] = useState<number[]>(() => {
    const saved = localStorage.getItem(REQUESTS_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({ open: false, message: '' });
  const [loading, setLoading] = useState(true);

  const departments = getUniqueDepartments(MOCK_STUDENTS);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 900); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  const handleConnect = (studentId: number) => {
    if (!requests.includes(studentId)) {
      const updated = [...requests, studentId];
      setRequests(updated);
      localStorage.setItem(REQUESTS_KEY, JSON.stringify(updated));
      setSnackbar({ open: true, message: 'Connection request sent.' });
    } else {
      setSnackbar({ open: true, message: 'Request already sent.' });
    }
  };

  const handleSnackbarClose = () => setSnackbar({ open: false, message: '' });

  // Filter students by search and department
  const filteredStudents = MOCK_STUDENTS.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.skills.join(',').toLowerCase().includes(search.toLowerCase()) ||
      student.interests.join(',').toLowerCase().includes(search.toLowerCase());
    const matchesDept = department ? student.department === department : true;
    return matchesSearch && matchesDept;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
          <CircularProgress color="primary" size={48} thickness={4} />
        </Box>
      ) : (
        <>
          <Box mb={3} display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by name, skill, or interest"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel>Department</InputLabel>
              <Select
                value={department}
                label="Department"
                onChange={(e) => setDepartment(e.target.value)}
              >
                <MenuItem value="">All Departments</MenuItem>
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Grid container spacing={3}>
            {filteredStudents.map((student) => (
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
                      fullWidth
                      variant="contained"
                      startIcon={<PersonAddIcon />}
                      onClick={() => handleConnect(student.id)}
                      disabled={requests.includes(student.id)}
                    >
                      {requests.includes(student.id) ? 'Requested' : 'Connect'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Snackbar
            open={snackbar.open}
            autoHideDuration={2000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
              {snackbar.message}
            </Alert>
          </Snackbar>
        </>
      )}
    </Container>
  );
};

export default Discover; 