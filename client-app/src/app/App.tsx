
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Routes from '../constants/Routes';
import Theme from './theme/Theme';
import MainLayout from './layout/MainLayout';
import Login from './Login';
import User from './models/authentication/User';
import authService from '../services/authService';

type Props = {};
type State = {
    currentUser: User | undefined
}

class App extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    
        this.state = {
          currentUser: undefined
        };
      }

    componentDidMount() {
        const user = authService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
            });
        }
    }

    render() {

        const { currentUser } = this.state;

        return (
            <ThemeProvider theme={Theme}>
                <CssBaseline />
                {currentUser ? (
                    <MainLayout>
                        <Routes />
                    </MainLayout>
                ) : (
                    <Login />
                )
                }
            </ThemeProvider>
        );
    }
}

export default App;
