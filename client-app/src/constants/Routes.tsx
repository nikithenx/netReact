import { useRoutes } from "react-router-dom";
import LandingPage from "../features/landingPage/LandingPage";
import CreateProject from "../features/projects/CreateProject";
import ProjectList from "../features/projects/ProjectList";
import { NavigationPoints } from "./NavigationPoints";


const Routes = () => {
    const routes = useRoutes([
        { path: '/', element: <LandingPage /> },
        { path: NavigationPoints.ProjectList, element: <ProjectList /> },
        { path: NavigationPoints.ProjectCreation, element: <CreateProject />}
    ]);

    return routes;
};

export default Routes;