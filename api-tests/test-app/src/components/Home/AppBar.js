import React from "react";
import PropTypes from "prop-types";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  withStyles
} from "@material-ui/core/";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

function ButtonAppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.grow}
            onClick={() => {
              props.history.push("/home");
            }}
          >
            HOME
          </Typography>
          <Button color="inherit">
            <Link to={"/profile"}>
              <Typography>PROFILE</Typography>
            </Link>
          </Button>
          <Button color="inherit">
            <Link to={"/tvguide"}>
              <Typography>TVGUIDE</Typography>
            </Link>
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              props.history.push("/");
            }}
          >
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
