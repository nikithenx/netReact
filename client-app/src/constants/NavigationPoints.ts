
export class NavigationPoints {

    static readonly LandingPage: string = '/';

    static readonly ProjectList: string = '/projects';
    static readonly ProjectCreation: string = '/creation-project';
    static readonly ProjectUpdate: string = '/update-project';

    static readonly SponsorList: string = '/sponsors';

    static readonly DictNavPoints = [
        { displayName: "List of Projects", link: this.ProjectList },
        { displayName: "Create a new Project", link: this.ProjectCreation}
    ]
}