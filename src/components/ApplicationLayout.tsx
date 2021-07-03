import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { LinearProgress } from "@material-ui/core";
import { useIsFetching } from "react-query";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    // flexShrink: 0,
    flexGrow: 1,
  },
  rightDrawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function ApplicationLayout({
  children,
  leftDrawer,
  rightDrawer,
}: {
  children: React.ReactNode;
  leftDrawer: React.ReactNode;
  rightDrawer: React.ReactNode;
}): JSX.Element {
  const classes = useStyles();
  const isFetching = useIsFetching();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            CryptoGraph
          </Typography>
        </Toolbar>
        {isFetching ? <LinearProgress color="secondary" /> : null}
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>{leftDrawer}</div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
      <Drawer
        className={classes.rightDrawer}
        anchor="right"
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>{rightDrawer}</div>
      </Drawer>
    </div>
  );
}
