// src/pages/UserDashboard.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProperties } from '../actions/propertyActions';
import { Grid, Paper, Typography, Box, CircularProgress, Avatar, Button, Link } from '@mui/material';
import { styled } from '@mui/system';
import { PieChart } from 'react-minimal-pie-chart';
import { blue, amber, red, grey } from '@mui/material/colors';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

const Container = styled('div')(({ theme }) => ({
  flexGrow: 1,
  background: 'linear-gradient(to right, #e0f7fa, #ffffff)', // Gradient background
  borderRadius: 8,
  border: 0,
  color: 'white',
  minHeight: '100vh',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  animation: 'fadeIn 0.5s ease-in-out',
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(-20px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

const ContentContainer = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(4),
  width: '100%',
  maxWidth: '1200px',
}));

const Title = styled('h2')(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  color: '#333',
  fontFamily: 'Roboto, sans-serif',
  fontWeight: 700,
}));

const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
  background: '#ffffff',
  borderRadius: '15px', // Rounded corners
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', // Enhanced shadow
  height: '350px',
  width: '100%',
  maxWidth: '500px',
  margin: '0 auto',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)', // Shadow on hover
  },
}));

const Dot = styled('span')(({ color }) => ({
  display: 'inline-block',
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: color,
  marginRight: '5px',
}));

const Username = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  fontFamily: 'Roboto, sans-serif',
}));

const QuoteContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: '#ffffff',
  borderRadius: '15px', // Rounded corners
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)', // Enhanced shadow
  textAlign: 'center',
  color: theme.palette.text.primary,
  height: '350px', // Set a fixed height to match the chart container
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)', // Shadow on hover
  },
}));

const QuoteText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Georgia, serif', // Stylish font for the quote
  fontStyle: 'italic',
  color: grey[800],
  marginBottom: theme.spacing(4),
}));

const BrowseButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  textTransform: 'none',
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.grey[300],
  },
  display: 'flex',
  alignItems: 'center',
}));

const GithubLinkContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const GithubLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));

const GithubIcon = styled(ArrowForwardIosIcon)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { properties, loading } = useSelector((state) => state.property);
  const { user } = useSelector((state) => state.auth);
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProperties());
  }, [dispatch]);

  useEffect(() => {
    if (properties.length > 0) {
      const addedByUserCount = properties.reduce((acc, property) => {
        return acc + (property.user._id === user._id ? 1 : 0);
      }, 0);
      
      const viewedCount = properties.reduce((acc, property) => {
        return acc + (property.viewedByUsers && property.viewedByUsers.includes(user._id) ? 1 : 0);
      }, 0);
  
      const savedCount = properties.reduce((acc, property) => {
        return acc + (user.favoriteProperties.includes(property._id) ? 1 : 0);
      }, 0);
  
      const totalCount = properties.length;
  
      const data = [
        { title: 'Viewed', value: viewedCount, color: blue[300] },
        { title: 'Saved', value: savedCount, color: amber[400] },
        { title: 'Added by User', value: addedByUserCount, color: red[400] },
        { title: 'Total', value: totalCount, color: '#477cf5' },
      ];
  
      setChartData(data);
    }
  }, [properties, user]);
  
  if (loading) {
    return <CircularProgress />;
  }

  const handleBrowseProperties = () => {
    navigate('/'); // Navigate to home page
  };

  return (
    <Container>
      <ContentContainer>
        <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
          <Avatar alt={user.name} src={user.profilePicture} sx={{ width: 56, height: 56, mr: 2 }} />
          <Username variant="h5">{`Hi ${user.name}!`}</Username>
        </Box>
        <Title>Welcome Back!</Title>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <ChartContainer elevation={3}>
              <Typography variant="h6" gutterBottom style={{ marginBottom: '10px' }}>
                Property Statistics
              </Typography>
              <PieChart
                data={chartData}
                radius={40}
                label={({ dataEntry }) => `${Math.round(dataEntry.percentage)}% (${dataEntry.value})`}
                labelStyle={{
                  fontSize: '5px',
                  fontFamily: 'sans-serif',
                }}
                labelPosition={112}
                lineWidth={60} // Set the lineWidth to make a donut-style pie chart
                style={{ height: '280px' }} // Adjust the height for a better fit
              />
              <Box display="flex" justifyContent="center" mt={2}>
                <Dot color={blue[300]} />
                <Typography variant="body2" style={{ marginRight: '20px' }}>Viewed</Typography>
                <Dot color={amber[400]} />
                <Typography variant="body2" style={{ marginRight: '20px' }}>Saved</Typography>
                <Dot color={red[400]} />
                <Typography variant="body2" style={{ marginRight: '20px' }}>Added by User</Typography>
                <Dot color="#477cf5" />
                <Typography variant="body2">Total</Typography>
              </Box>
            </ChartContainer>
          </Grid>
          <Grid item xs={12} md={6}>
            <QuoteContainer elevation={3}>
              <QuoteText variant="h6" gutterBottom>
                "Real estate cannot be lost or stolen, nor can it be carried away. Purchased with common sense, paid for in full, and managed with reasonable care, it is about the safest investment in the world." – Franklin D. Roosevelt
              </QuoteText>
              <BrowseButton variant="contained" onClick={handleBrowseProperties}>
                Browse Properties <ArrowForwardIosIcon sx={{ ml: 1 }} />
              </BrowseButton>
            </QuoteContainer>
          </Grid>
        </Grid>
        <GithubLinkContainer>
          <GithubLink href="https://github.com/PraSW23/real-estate-listings" target="_blank" rel="noopener noreferrer">
           
          <Typography variant="body2">Project Repository</Typography>
            <GithubIcon />
          </GithubLink>
          <GithubLink href="https://github.com/PraSW23" target="_blank" rel="noopener noreferrer">
            <Typography variant="body2">Developer's GitHub</Typography>
            <GithubIcon />
          </GithubLink>
        </GithubLinkContainer>
      </ContentContainer>
    </Container>
  );
};

export default UserDashboard;
