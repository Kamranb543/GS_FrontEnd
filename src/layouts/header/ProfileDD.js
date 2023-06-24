import React, { useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";
import {
  Box,
  Menu,
  Typography,
  Link,
  Button,
} from "@mui/material";
import Cookies from "js-cookie";
const ProfileDD = () => {
  const [anchorEl4, setAnchorEl4] = React.useState(null);
  const [admin,setAdmin] = useState('admin')
  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };
  
  const handleClose4 = () => {
    setAnchorEl4(null);
  };
  useEffect(()=>{
    const data = Cookies.get('userData')
    const name = JSON.parse(data)
    setAdmin(name.name)
  })
  return (
    <>
      <Button
        aria-label="menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick4}
      >
        <Box display="flex" alignItems="center">
        
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              alignItems: "center",
            }}
          >
            <Typography
              color="textSecondary"
              variant="h5"
              fontWeight="400"
              sx={{ ml: 1 }}
            >
              Hi,
            </Typography>
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                ml: 1,
              }}
            >
              {admin}
            </Typography>
            <FeatherIcon icon="chevron-down" width="20" height="20" />
          </Box>
        </Box>
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl4}
        keepMounted
        open={Boolean(anchorEl4)}
        onClose={handleClose4}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        
            <Link href="/">
              <Button fullWidth color="danger">
                Home Page
              </Button>
            </Link>
      </Menu>
    </>
  );
};

export default ProfileDD;
