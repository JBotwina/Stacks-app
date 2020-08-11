import React, { Component } from 'react';
import { Signin } from './Signin';
import { Header } from './Header';
import { ThemeProvider, theme, CSSReset, ToastProvider } from '@blockstack/ui';
import { UserSession } from 'blockstack';
import { appConfig } from '../assets/constants';
import { Connect } from '@blockstack/connect';
import { TodoList } from './TodoList';
import Test from './Test';
import GaiaTest from './GaiaTest';

const userSession = new UserSession({ appConfig });

export default class App extends Component {
  state = {
    userData: null,
    session: null,
  };

  handleSignOut(e) {
    e.preventDefault();
    this.setState({ userData: null, session: null });
    userSession.signUserOut(window.location.origin);
  }

  render() {
    const { userData } = this.state;
    const authOptions = {
      appDetails: {
        name: "To-do's",
        icon: window.location.origin + '/logo.svg',
      },
      userSession,
      finished: ({ userSession }) => {
        //console.log(userSession);
        this.setState({ userData: userSession.loadUserData(), session: userSession });
        //console.log(`User's data is ${}`);
      },
    };
    return (
      <Connect authOptions={authOptions}>
        <ThemeProvider theme={theme}>
          <ToastProvider>
            <div className="site-wrapper">
              <div className="site-wrapper-inner">
                <Header />
                {!userData && !document.location.pathname.includes('todos/') ? (
                  <Signin />
                ) : (
                  <div>
                    <Test test={this.state} />
                    <GaiaTest test={this.state} />
                    {/*<TodoList />*/}
                  </div>
                )}
              </div>
            </div>
          </ToastProvider>
          <CSSReset />
        </ThemeProvider>
      </Connect>
    );
  }

  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(userData => {
        window.history.replaceState({}, document.title, '/');
        this.setState({ userData: userData });
      });
    } else if (userSession.isUserSignedIn()) {
      this.setState({ userData: userSession.loadUserData(), session: userSession });
    }
  }
}
