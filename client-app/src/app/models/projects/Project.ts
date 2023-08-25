import { AppUser } from "../appUsers/AppUser";
import { Sponsor } from "../sponsors/Sponsor";
import { ProjectTag } from "../tags/ProjectTag";

export interface Project {
    id: number;
    sponsorId: number;
    nr: string;
    name: string;
    startDate: Date;
    endDate: Date;
    description: string;

    sponsor: Sponsor;
    tags: ProjectTag[];
    appUsers: AppUser[];
}