import React from "react";
import {
  Box,
  Typography,
Grid
} from '@mui/material';


const Dashboard: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} sx={{padding: 2}}>
    
      <Typography variant="h4">BrightQuery API (2.1.0)</Typography>
      <Typography variant="body1" sx={{marginBottom: 2, marginTop: 2}}>
      BrightQuery, Inc. ("BQ") is the leading provider of U.S. business information, including firmographics, financials, credit events, employment, and benefits information. BQ tracks all companies operating in the U.S. that file taxes and have one or more employees (including the owner). BQ sources all information from U.S. government filings, leveraging in particular regulatory filings with the IRS, DOL, and the SEC. Finally, BQ provides over 5,000 fields, including company information, as well as aggregated statistics on industries, sectors, counties, states, and the U.S. economy overall.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
      This collection of APIs enables a client to search for a company using parameters such as company name, address, and website. BQ’s proprietary search algorithms utilize fuzzy matching to search and rank the results. For a complete list of all fields that BQ can provide, including detailed financials, please click here. Please click here to download the list of IRS industries, which is the primary industry classification system used by BQ.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 2 }}>
      Please contact sales@brightquery.com for sales and support@brightquery.com for product support. You may also call 1-888-BQDATA1. Please visit https://brightquery.com/ to learn more about BQ’s full suite of products, including bulk data feeds.
      </Typography>
   </Grid>

    </Grid>
  );
};

export default Dashboard;
