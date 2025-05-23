import React from 'react';
import { Box, Card, CardContent, Typography, SxProps, Theme, useTheme, useMediaQuery } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  sx?: SxProps<Theme>;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, sx }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card 
      sx={{ 
        height: '100%',
        ...sx,
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ 
          display: 'flex', 
          mb: { xs: 1.5, sm: 2 },
          flexDirection: isMobile ? 'row' : 'column',
          alignItems: isMobile ? 'center' : 'flex-start',
        }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: { xs: 0.75, sm: 1 },
              borderRadius: 1,
              bgcolor: 'primary.dark',
              color: 'primary.main',
              mb: isMobile ? 0 : 1,
              mr: isMobile ? 1 : 0,
            }}
          >
            {icon}
          </Box>
          <Typography
            variant={isMobile ? "body2" : "subtitle2"}
            color="textSecondary"
            sx={{ 
              textTransform: 'uppercase',
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}
          >
            {title}
          </Typography>
        </Box>
        <Typography 
          variant="h4" 
          component="div" 
          sx={{ 
            mb: 1,
            fontSize: { 
              xs: '1.5rem', 
              sm: '2rem', 
              md: '2.125rem' 
            },
            fontWeight: 600,
            lineHeight: 1.2
          }}
        >
          {value}
        </Typography>
        {trend && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="body2"
              color={trend.isPositive ? 'success.main' : 'error.main'}
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </Typography>
            <Typography 
              variant="body2" 
              color="textSecondary" 
              sx={{ 
                ml: 1,
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}
            >
              vs last month
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard; 