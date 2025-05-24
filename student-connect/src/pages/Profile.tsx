import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Avatar,
  Chip,
  Divider,
  IconButton,
} from '@mui/material';

const defaultProfile = {
  name: '',
  collegeId: '',
  year: '',
  department: '',
  profilePic: '',
  skills: '',
  projects: '',
};

const PROFILE_KEY = 'peerconnect_profile';

const Profile = () => {
  const [profile, setProfile] = React.useState(() => {
    const saved = localStorage.getItem(PROFILE_KEY);
    return saved ? JSON.parse(saved) : defaultProfile;
  });
  const [editing, setEditing] = React.useState(profile.name === '');
  const [picPreview, setPicPreview] = React.useState(profile.profilePic);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'profilePic' && files && files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfile((prev: any) => ({ ...prev, profilePic: ev.target?.result }));
        setPicPreview(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setProfile((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    setEditing(false);
  };

  const handleEdit = () => setEditing(true);

  return (
    <Container maxWidth="sm" sx={{ mt: 2, mb: 2 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          {editing ? 'Create/Edit Your Profile' : 'My Profile'}
        </Typography>
        {editing ? (
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} textAlign="center">
                <Avatar
                  src={picPreview}
                  sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
                  alt="Profile picture preview"
                />
                <Button variant="outlined" component="label" size="small">
                  Upload Picture
                  <input
                    type="file"
                    name="profilePic"
                    accept="image/*"
                    hidden
                    onChange={handleChange}
                  />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="College ID"
                  name="collegeId"
                  value={profile.collegeId}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Year"
                  name="year"
                  value={profile.year}
                  onChange={handleChange}
                  placeholder="e.g. 2nd Year"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Department"
                  name="department"
                  value={profile.department}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Skills/Interests (comma separated)"
                  name="skills"
                  value={profile.skills}
                  onChange={handleChange}
                  placeholder="e.g. React, AI, Robotics"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Project Areas (comma separated)"
                  name="projects"
                  value={profile.projects}
                  onChange={handleChange}
                  placeholder="e.g. Web Apps, IoT, ML"
                />
              </Grid>
            </Grid>
            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
              Save Profile
            </Button>
          </Box>
        ) : (
          <Box>
            <Box textAlign="center" mb={2}>
              <Avatar
                src={profile.profilePic}
                sx={{ width: 80, height: 80, mx: 'auto', mb: 1 }}
                alt="Profile picture"
              />
              <Typography variant="h6">{profile.name}</Typography>
              <Typography color="text.secondary">{profile.collegeId} • {profile.year}</Typography>
              <Typography color="text.secondary">{profile.department}</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1">Skills/Interests</Typography>
            <Box mb={2}>
              {profile.skills.split(',').filter(Boolean).map((skill: string) => (
                <Chip key={skill.trim()} label={skill.trim()} sx={{ m: 0.5 }} color="primary" />
              ))}
            </Box>
            <Typography variant="subtitle1">Project Areas</Typography>
            <Box mb={2}>
              {profile.projects.split(',').filter(Boolean).map((proj: string) => (
                <Chip key={proj.trim()} label={proj.trim()} sx={{ m: 0.5 }} color="secondary" />
              ))}
            </Box>
            <Button variant="outlined" onClick={handleEdit} fullWidth>
              Edit Profile
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Profile; 