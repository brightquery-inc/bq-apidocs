import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import {
  AttachMoney,
  Api,
  Timeline,
  CheckCircle,
} from '@mui/icons-material';
import StatCard from '../components/dashboard/StatCard';
import { useApiSales } from '../context/ApiSalesContext';

const Dashboard: React.FC = () => {
  const { sales, stats, loading, error } = useApiSales();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Mobile card view for sales data
  const SaleCard = ({ sale }: { sale: typeof sales[0] }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">{sale.apiName}</Typography>
            <Chip
              label={sale.status}
              color={sale.status === 'active' ? 'success' : 'default'}
              size="small"
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="textSecondary">Revenue</Typography>
            <Typography variant="body1">{formatCurrency(sale.revenue)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="textSecondary">Calls</Typography>
            <Typography variant="body1">{formatNumber(sale.calls)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="textSecondary">Last Updated</Typography>
            <Typography variant="body1">{new Date(sale.date).toLocaleDateString()}</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3 },
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4,
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
        }}
      >
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            icon={<AttachMoney />}
            trend={{ value: 12.5, isPositive: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total API Calls"
            value={formatNumber(stats.totalCalls)}
            icon={<Timeline />}
            trend={{ value: 8.2, isPositive: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active APIs"
            value={stats.activeApis}
            icon={<Api />}
            trend={{ value: 0, isPositive: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Success Rate"
            value="99.9%"
            icon={<CheckCircle />}
            trend={{ value: 0.1, isPositive: true }}
          />
        </Grid>
      </Grid>

      {/* API Sales Data */}
      {isMobile ? (
        // Mobile view: Cards
        <Box sx={{ mt: 2 }}>
          {sales.map((sale) => (
            <SaleCard key={sale.id} sale={sale} />
          ))}
        </Box>
      ) : (
        // Desktop view: Table
        <Paper sx={{ 
          width: '100%', 
          overflow: 'hidden',
          boxShadow: theme.shadows[2]
        }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>API Name</TableCell>
                  <TableCell align="right">Revenue</TableCell>
                  <TableCell align="right">Calls</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Last Updated</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sales.map((sale) => (
                  <TableRow key={sale.id} hover>
                    <TableCell>{sale.apiName}</TableCell>
                    <TableCell align="right">{formatCurrency(sale.revenue)}</TableCell>
                    <TableCell align="right">{formatNumber(sale.calls)}</TableCell>
                    <TableCell>
                      <Chip
                        label={sale.status}
                        color={sale.status === 'active' ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
};

export default Dashboard; 