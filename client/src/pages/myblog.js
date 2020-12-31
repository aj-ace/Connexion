import React, { Component} from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Web3 from 'web3';
import { TODO_LIST_ABI, TODO_LIST_ADDRESS} from '../config';

import NavBar from '../components/navbar';
import Blog from '../components/blog'


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

class Myblog extends Component {
  constructor(props){
      super(props);
      this.state = {
          open: true,
          account: '',
          username: '',
          name: '',
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
        const numOptions = await Instance.methods.numOptions().call();
        for(var i = 1; i <= numOptions; i++){
          const blog = await Instance.methods.blogs(i).call();
          if(blog.name !== this.state.username) continue;
          this.setState({
            data: [...this.state.data, blog]
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
    this.state.Instance.methods.newBlog(this.state.name).send({ from: this.state.account })
    .once('receipt', () => {
      const data = [...this.state.data];
      data.push({
        name: this.state.username,
        content: this.state.name
      })
      this.setState({
        data,
        name: ''
      })
    }).catch(() => alert("transaction rejected"))
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
      
        <Blog
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          choice={false}
          name={this.state.name}
          data={this.state.data}
        />
      </main>
    </div>
  );
  }  
}

export default withStyles(styles)(Myblog);