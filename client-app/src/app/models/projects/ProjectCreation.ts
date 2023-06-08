import { AppUserForProjectCreation } from "../appUsers/AppUserForProjectCreation";
import { TagForProjectCreation } from "../tags/TagForProjectCreation";


export interface ProjectCreation {
    sponsorId: number;
    name: string;
    startDate: Date;
    endDate: Date;
    description: string;

    tags: TagForProjectCreation[]
    appUsers: AppUserForProjectCreation[];
}