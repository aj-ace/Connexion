import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  Grid,
  Button,
  TextField,
  Accordion,
  AccordionDetails,
  Divider
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
    backgroundColor: "#ba68c8"
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

const Blog = (props) => {
  const { classes } = props;

  return (
    <div>
    <Paper className={classes.paper}>
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
             {props.choice ? <SearchIcon className={classes.block} color="inherit" /> : 
             <AddIcon className={classes.block} color="inherit" />}
              
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder={props.choice ? "Search by username" : "Add new post"}
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput,
                }}
                name="name"
                onChange={props.handleChange}
                value={props.name}
              />
            </Grid>
            <Grid item>
              <Button 
                variant="contained" 
                color="primary" 
                className={classes.addUser} 
                onClick={props.handleSubmit}
                disabled={!props.name}
              >
              {props.choice ? "Search" : "Add"}
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
      {[...props.data].reverse().map((item, key) => (
            <Accordion expanded={true} key={key}>
        <AccordionDetails>
          <Typography className={classes.heading}>By: {item.name}</Typography>
        </AccordionDetails>
        <Divider />
        <AccordionDetails>
          <Typography>
            {item.content}
          </Typography>
        </AccordionDetails>
      </Accordion>
        ))}
      </div>
    </Paper>
    </div>
  );
}

Blog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Blog);