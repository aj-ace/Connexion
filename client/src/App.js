import React, { Component} from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';

import Profile from './pages/profile';
import Inbox from './pages/inbox';
import Sent from './pages/sent';
import Newmessage from './pages/newmessage';
import Myblog from './pages/myblog';
import Findblog from './pages/findblog';

class App extends Component {
  render(){
    
      return (
        <BrowserRouter>
            <Switch>
               <Route exact path="/" component={Profile} />
              <Route exact path="/inbox" component={Inbox}/>
              <Route exact path="/sent" component={Sent}/>
              <Route exact path="/message" component={Newmessage}/>
              <Route exact path="/myblog" component={Myblog}/>
              <Route exact path="/findblog" component={Findblog}/>
              <Redirect  from="*" to="/inbox" /> 
            </Switch>
          </BrowserRouter>
      );
  }  
}

export default App;