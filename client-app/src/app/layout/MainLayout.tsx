import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Autocomplete, TextField, Typography } from '@mui/material';
import { Logout, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Constants } from '../../constants/Constants';
import NavMenuItems from './NavMenuItems';
import { NavigationPoints } from '../../constants/NavigationPoints';
import authService from '../../services/authService';


const MainLayout = (props: { children: React.ReactElement }) => {

    interface AppBarProps extends MuiAppBarProps {
        open?: boolean;
    }
    
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({ theme, open }) => ({
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: Constants.DrawerWidth,
            width: `calc(100% - ${Constants.DrawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));
    
    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            '& .MuiDrawer-paper': {
                position: 'relative',
                whiteSpace: 'nowrap',
                width: Constants.DrawerWidth,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                boxSizing: 'border-box',
                ...(!open && {
                    overflowX: 'hidden',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    width: theme.spacing(7),
                    [theme.breakpoints.up('sm')]: {
                        width: theme.spacing(9),
                    },
                }),
            },
        }),
    );

    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const navigate = useNavigate();
    const onNavigateTo = (link: string) => navigate(link);

    const logout = () => {
        onNavigateTo('/');
        authService.logout();
    }
    
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px',
                    }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}>
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '40%', marginLeft: '20px' }}>
                        <Autocomplete
                            id="search"
                            sx={{ width: '80%' }}
                            onChange={(e, newValue) => {
                                if (newValue !== undefined && newValue !== null) {
                                    onNavigateTo(newValue.link)
                                }
                            }}
                            isOptionEqualToValue={(option, value) => option.displayName === value.displayName}
                            getOptionLabel={(option) => option.displayName}
                            options={NavigationPoints.DictNavPoints}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder='Navigation...'
                                    variant='outlined'
                                    size='small'
                                />
                            )}
                        />
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Person sx={{ mx: 1 }} color='primary' fontSize='large' />
                    <IconButton aria-label='logout' onClick={logout}>
                        <Logout color='primary' fontSize='large' />
                    </IconButton>                    
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}>
                    {open &&
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            My App
                        </Typography>
                    }
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav">
                    <NavMenuItems />
                    <Divider sx={{ my: 1 }} />
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}>
                <Toolbar />
                <Container
                    className="mainContainer"
                    maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <div>
                        {props.children}
                    </div>
                </Container>
            </Box>
        </Box>
    )
}

export default MainLayout;