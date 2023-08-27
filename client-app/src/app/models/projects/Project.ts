import { ProjectAppUser } from "../projectsAppUsers/ProjectAppUser";
import { ProjectTagBase } from "../projectsTags/ProjectTagBase";
import { Sponsor } from "../sponsors/Sponsor";

export interface Project {
    id: number;
    sponsorId: number;
    nr: string;
    name: string;
    startDate: Date;
    endDate: Date;
    description: string;

    sponsor: Sponsor;
    tags: ProjectTagBase[];
    appUsers: ProjectAppUser[];
}