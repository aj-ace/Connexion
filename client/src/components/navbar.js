import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { 
    Drawer,
    CssBaseline,
    AppBar,
    Toolbar,
    List,
    Typography,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText
   } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import CreateIcon from '@material-ui/icons/Create';
import PersonIcon from '@material-ui/icons/Person';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: 200,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 200,
  },
}));


const NavBar= (props) => {
  
  const [inbox, setInbox] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState(false);
  const [myblog, setMyblog] = useState(false);
  const [findblog, setFindblog] = useState(false);
  const [profile, setProfile] = useState(false);

  let location = useLocation();
  useEffect(() => {
    const checkPath = () => {
      switch(location.pathname){
        case "/inbox":
          setInbox(true);
          break;
        case "/sent":
          setSent(true);
          break;
        case "/message":
          setMessage(true);
          break;
        case "/myblog":
          setMyblog(true);
          break;
        case "/findblog":
          setFindblog(true);
          break;
        case "/":
        default:
          setProfile(true);
          break;
  
      }
    }
    checkPath();
  })

  let history = useHistory();
  function nextpage(event, path){
    event.preventDefault();
    history.push(path);
  }

  const classes = useStyles();
    return(
        <div>
           <CssBaseline />
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, props.open)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Connexion
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        
        <div className={classes.toolbar} ></div>
        
        <Divider />
        <List>
            <ListItem selected={inbox} button onClick={(event) => nextpage(event, "/inbox")}>
              <ListItemIcon><MailIcon /></ListItemIcon>
              <ListItemText primary='Inbox' />
            </ListItem>
            <ListItem selected={sent} button onClick={(event) => nextpage(event, "/sent")}>
              <ListItemIcon><PresentToAllIcon /></ListItemIcon>
              <ListItemText primary='Sent Items' />
            </ListItem>
            <ListItem selected={message} button onClick={(event) => nextpage(event, "/message")}>
              <ListItemIcon><CreateIcon /></ListItemIcon>
              <ListItemText primary='New Message' />
            </ListItem>
            <ListItem selected={myblog} button onClick={(event) => nextpage(event, "/myblog")}>
              <ListItemIcon><LibraryBooksIcon /></ListItemIcon>
              <ListItemText primary='My Blog' />
            </ListItem>
            <ListItem selected={findblog} button onClick={(event) => nextpage(event, "/findblog")}>
              <ListItemIcon><CollectionsBookmarkIcon /></ListItemIcon>
              <ListItemText primary='Find Blog' />
            </ListItem>
            <Divider />
            <ListItem selected={profile} button onClick={(event) => nextpage(event, "/")}>
              <ListItemIcon><PersonIcon /></ListItemIcon>
              <ListItemText primary='Profile' />
            </ListItem>
        </List>
      </Drawer>
        </div>
    );
}

export default NavBar;
