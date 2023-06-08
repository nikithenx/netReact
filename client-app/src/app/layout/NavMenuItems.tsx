
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
    Assignment,
    ExpandLess,
    ExpandMore,
    Home,
    PlaylistAdd,
    ShoppingCart,
    ViewList
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { NavigationPoints } from '../../constants/NavigationPoints';


export default function NavMenuItems() {

    const [openSublistProject, setOpenSublistProject] = React.useState(false);

    const handleProjectClick = () => {
        setOpenSublistProject(!openSublistProject);
    };

    const sublistProjects = [
        { icon: <ViewList />, label: 'Complete List', href: NavigationPoints.ProjectList },
        { icon: <PlaylistAdd />, label: 'Create', href: NavigationPoints.ProjectCreation },
    ];

    const navigate = useNavigate();
    const onNavigateTo = (link: string) => navigate(link);

    return (
        <React.Fragment>
            <ListItemButton onClick={() => onNavigateTo('/')}>
                <ListItemIcon>
                    <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton onClick={handleProjectClick}>
                <ListItemIcon>
                    <Assignment />
                </ListItemIcon>
                <ListItemText primary="Projects" />
                {openSublistProject ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            {openSublistProject &&
                sublistProjects.map((item) => (
                    <ListItemButton sx={{ pl: 4 }} onClick={() => onNavigateTo(item.href)}>
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItemButton>
                ))}           
            <ListItemButton onClick={() => onNavigateTo(NavigationPoints.SponsorList)}>
                <ListItemIcon>
                    <ShoppingCart />
                </ListItemIcon>
                <ListItemText primary="Clients" />
            </ListItemButton>
        </React.Fragment>
    );
}


