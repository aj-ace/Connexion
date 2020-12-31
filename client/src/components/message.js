import React from 'react';
import {
  Button,
  TextField,
  Paper
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: "10px",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(1, 2, 0, 0),
  },
}));

const Message = (props) => {
  const classes = useStyles();

  return (
      <Paper className={classes.paper}>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            type="text"
            label="From"
            name="username"
            autoComplete="username"
            autoFocus
            value={props.username}
            disabled
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="to"
            label="To"
            type="text"
            id="To"
            autoComplete="To"
            onChange={props.handleChange}
            value={props.to}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="subject"
            label="Subject"
            type="text"
            id="Subject"
            autoComplete="Subject"
            onChange={props.handleChange}
            value={props.subject}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            multiline
            rows={10}
            name="content"
            label="Content"
            type="text"
            id="Content"
            autoComplete="Content"
            onChange={props.handleChange}
            value={props.content}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!props.to || !props.subject || !props.content}
            onClick={props.handleSubmit}
          >
            
            Send
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={props.handleCancel}
          >
            
            Discard
          </Button>
        </form>
      </Paper>
  );
}

export default Message;