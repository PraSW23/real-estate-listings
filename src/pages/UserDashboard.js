import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProperties } from '../actions/propertyActions';
import { Grid, Paper, Typography, Box, CircularProgress, Avatar, Button } from '@mui/material';
import { styled } from '@mui/system';
import { PieChart } from 'react-minimal-pie-chart';
import { blue, amber, red, grey } from '@mui/material/colors';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from 'react-router-dom';

const Container = styled('div')(({ theme }) => ({
  flexGrow: 1,
  background: '#e0f7fa',
  borderRadius: 8,
  border: 0,
  color: 'white',
  minHeight: '100vh',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  animation: 'fadeIn 0.5s ease-in-out', // Add fade-in animation
  '@keyframes fadeIn': { // Define the fadeIn animation
    from: {
      opacity: 0,
      transform: 'translateY(-20px)'
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
}));

const ContentContainer = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(4),
  width: '100%',
  maxWidth: '1200px', // Increase maxWidth to provide more space
}));

const Title = styled('h2')(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  color: '#333',
}));

const ChartContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  color: theme.palette.text.secondary,
  margin: '20px 0',
  background: '#ffffff',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  height: '300px',
  width: '100%',
  maxWidth: '500px', // Adjust maxWidth to make the chart container smaller
  margin: '0 auto',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
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
}));

const QuoteContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: '20px 0',
  background: '#ffffff',
  borderRadius: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  color: theme.palette.text.primary,
  height: '300px', // Set a fixed height to match the chart container
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  transition: 'transform 0.3s', // Add transition animation
  '&:hover': {
    transform: 'scale(1.05)',
  },
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
        { title: 'Other', value: totalCount - (viewedCount + savedCount + addedByUserCount), color: grey[400] },
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
              />
              <Box display="flex" justifyContent="center">
                <Dot color={blue[300]} />
                <Typography variant="body2" style={{ marginRight: '20px' }}>Viewed</Typography>
                <Dot color={amber[400]} />
                <Typography variant="body2" style={{ marginRight: '20px' }}>Saved</Typography>
                <Dot color={red[400]} />
                <Typography variant="body2" style={{ marginRight: '20px' }}>Added by User</Typography>
                <Dot color={grey[400]} />
                <Typography variant="body2">Other</Typography>
              </Box>
            </ChartContainer>
          </Grid>
          <Grid item xs={12} md={6}>
            <QuoteContainer elevation={3}>
              <Typography variant="h6" gutterBottom>
                "Real estate cannot be lost or stolen, nor can it be carried away. Purchased with common sense, paid for in full, and managed with reasonable care, it is about the safest investment in the world." – Franklin D. Roosevelt
              </Typography>
              <BrowseButton variant="contained" onClick={handleBrowseProperties}>
                Browse Properties <ArrowForwardIosIcon sx={{ ml: 1 }} />
              </BrowseButton>
            </QuoteContainer>
          </Grid>
        </Grid>
      </ContentContainer>
    </Container>
  );
};

export default UserDashboard;
