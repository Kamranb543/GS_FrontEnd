import React from 'react'
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";

import { Grid } from "@mui/material";
import ProductPerfomance from "../../src/components/dashboard/ProductPerfomance";
import OrderList from "../../src/components/dashboard/OrdersList"
const Orders = () => {
  return (
    <ThemeProvider theme={theme}>
    <FullLayout>
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <OrderList />
      </Grid>
    </Grid>  
     </FullLayout>
    </ThemeProvider>
  )
}

export default Orders
