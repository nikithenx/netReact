import { AppUser } from "../appUsers/AppUser";
import { ProjectTag } from "../tags/ProjectTag";

export interface Project {
    id: number;
    sponsorId: number;
    nr: string;
    name: string;
    startDate: Date;
    endDate: Date;
    description: string;

    tags: ProjectTag[]
    appUsers: AppUser[];
}