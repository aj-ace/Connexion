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
  Card,
  CardContent,
  FormHelperText
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';


const styles = (theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  root: {
    maxWidth: 400,
    margin: 'auto',
    marginTop: theme.spacing(8),
  },
  media: {
    height: 140,
  },
});

const Opening = (props) => {
  const { classes } = props;

  return (
    <div>
    {props.set ? <Card className={classes.root}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            username: {props.username}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Public Address: {props.account}
          </Typography>
        </CardContent>
    </Card> : <Paper className={classes.paper}>
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <PersonIcon className={classes.block} color="inherit" />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Choose a username"
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput,
                }}
                onChange={props.handleChange}
                name="name"
                value={props.name}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" className={classes.addUser} onClick={props.handleSubmit}>
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        <FormHelperText>username needs to have a minimum of 3 characters and a maximum of 8 characters. Only alphabetic and numeric characters are allowed</FormHelperText>
      
      </div>
    </Paper>}
  </div>
  );
}

Opening.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Opening);