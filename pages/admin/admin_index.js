import { Grid } from "@mui/material";
import BlogCard from "../../src/components/dashboard/BlogCard";
import SalesOverview from "../../src/components/dashboard/SalesOverview";
import DailyActivity from "../../src/components/dashboard/DailyActivity";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme/theme";
import FullLayout from "../../src/layouts/FullLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import { cookies } from "next/dist/client/components/headers";
export default function Admin_Index() {
  let router = useRouter();
  const [role, setRole] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    let token = Cookies.get('token')
    setToken(token)
    if (Cookies.get('token')) {

      let get = Cookies.get('userData')
      let data = JSON.parse(get)
      setRole(data.role)
      if (data.role !== 'admin' && data.role !== 'seller') {
        router.back();
      }
    } else {
      router.back()
    }
  }, [])

  return (
    <>
      {(token && (role == 'admin' || role == 'seller')) &&
        <ThemeProvider theme={theme}>
          <FullLayout>
            <Grid container spacing={0}>
              <Grid item xs={12} lg={12}>
                <SalesOverview />
              </Grid>
            </Grid>
          </FullLayout>
        </ThemeProvider>}
      {(!token ||role != 'admin' && role != 'seller') &&
        <div className="h-[60vh] flex items-center justify-center">
          <h1 className="text-9xl font-bold text-gray-500">404</h1>
        </div>}
    </>
  );
}
