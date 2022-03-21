
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import {Link} from 'react-router-dom'

import React from 'react'

function Appbar({total}) {
  return (
    <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuOutlinedIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Timmy's Shop
            </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="home-page"
                aria-controls="mene-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <Link to="/">
                  {" "}
                  <HomeOutlinedIcon style={{color: 'white'}} />
                </Link>
              </IconButton>

              <IconButton
                size="large"
                aria-label="cart"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <Badge badgeContent={total} color="error">
                  <Link to="/cart">
                    <ShoppingCartOutlinedIcon style={{color: 'white'}}/>
                  </Link>
                </Badge>
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
  )
}

export default Appbar
