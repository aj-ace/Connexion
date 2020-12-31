import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Divider
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
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
}));

const Items = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
        {[...props.data].reverse().map((item, key) => (
            <Accordion expanded={expanded === key} onChange={handleChange(key)} key={key}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id={key}
        >
          <Typography className={classes.heading}>{props.options ? "From: " : "To: "}{props.options ? item.from : item.to}</Typography>
          <Typography className={classes.secondaryHeading}>Subject: {item.subject}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {props.options ? "To: " : "From: "}{props.options ? item.to : item.from}
          </Typography>
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
  );
}

export default Items;