import React, { Component} from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Web3 from 'web3';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS} from '../config';

import NavBar from '../components/navbar';
import Opening from '../components/opening'


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

class Profile extends Component {
  constructor(props){
      super(props);
      this.state = {
          open: true,
          account: '',
          username: '',
          name: '',
          set: true,
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
    const set = await Instance.methods.set(this.state.account).call();
    if(set){
      this.setState({
        username
      })
    }else {
      this.setState({
        set: false
      })
    }
  }

  handleDrawerOpen = () => {
    this.setState({
        open: !this.state.open
    })
  };

  handleChange = (event) =>{
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    var regexp = /^[a-zA-Z0-9]{3,8}$/;
      if(regexp.test(this.state.name)){
        this.state.Instance.methods.setusername(this.state.name).send({ from: this.state.account })
        .once('receipt',() => {
          this.setState({
            username: this.state.name,
            set: true
          })
        }).catch(() => alert("transaction rejected or username already exist"))
      }
      else{
          alert("Username entered in wrong format");
      }
  }

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
      
        <Opening
          set={this.state.set}
          username={this.state.username}
          account={this.state.account}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          name={this.state.name}
        />
      </main>
    </div>
  );
  }  
}

export default withStyles(styles)(Profile);