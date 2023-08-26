import { AppUserForProjectCreation } from "../appUsers/AppUserForProjectCreation";
import { TagForProjectCreation } from "../tags/TagForProjectCreation";


export class ProjectCreation {

    constructor()
    {
        this.sponsorId = 0;
        this.name = "";
        this.startDate = new Date;
        this.endDate = new Date;
        this.description = "";

        this.tags = [];
        this.appUsers = []
    }

    sponsorId: number;
    name: string;
    startDate: Date;
    endDate: Date;
    description: string;

    tags: TagForProjectCreation[]
    appUsers: AppUserForProjectCreation[];
}