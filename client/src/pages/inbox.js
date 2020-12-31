import React, { Component} from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Web3 from 'web3';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS} from '../config';

import NavBar from '../components/navbar';
import Items from '../components/items'

 
const styles = (theme) => ({
    root: {
      display: 'flex',
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -200,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  });

class Inbox extends Component {
  constructor(props){
      super(props);
      this.state = {
          open: true,
          account: '',
          username: '',
          data: []
      }
  }

  componentWillMount(){
    this.loadBlockchainData();
  }

  async loadBlockchainData(){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    this.setState({
      account: accounts[0]
    })
    const Instance = new web3.eth.Contract(TODO_LIST_ABI, TODO_LIST_ADDRESS);
    this.setState({
      Instance
    })
    const username = await Instance.methods.user(this.state.account).call();
    if(!username){
      this.props.history.push("/");
    }
    this.setState({ username });
    const num = await Instance.methods.num().call();
    for(var i = 1; i <= num; i++){
      const mail = await Instance.methods.mails(i).call();
      if(mail.to !== this.state.username) continue;
      this.setState({
        data: [...this.state.data, mail]
      })
    }
    
  }

  handleDrawerOpen = () => {
    this.setState({
        open: !this.state.open
    })
  };

  render(){
    const {classes} = this.props;
      return (
    <div className={classes.root}>
      <NavBar
        open={this.state.open}
        handleDrawerOpen={this.handleDrawerOpen}
        />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: this.state.open,
        })}
      >
        <div className={classes.drawerHeader} ></div>
      
        <Items
          options={true}
          data={this.state.data}
        />
      </main>
    </div>
  );
  }  
}

export default withStyles(styles)(Inbox);