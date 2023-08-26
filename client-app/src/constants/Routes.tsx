import { useRoutes } from "react-router-dom";
import LandingPage from "../features/landingPage/LandingPage";
import CreateProject from "../features/projects/create/CreateProject";
import ProjectList from "../features/projects/ProjectList";
import { NavigationPoints } from "./NavigationPoints";
import UpdateProject from "../features/projects/update/UpdateProject";


const Routes = () => {
    const routes = useRoutes([
        { path: NavigationPoints.LandingPage, element: <LandingPage /> },
        { path: NavigationPoints.ProjectList, element: <ProjectList /> },
        { path: NavigationPoints.ProjectCreation, element: <CreateProject />},
        { path: `${NavigationPoints.ProjectUpdate}/:id`, element: <UpdateProject />}
    ]);

    return routes;
};

export default Routes;