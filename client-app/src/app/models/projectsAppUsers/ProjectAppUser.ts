import { AppUser } from "../appUsers/AppUser";

export interface ProjectAppUser {
    id: number;
    appUserId: number;
    projectId: number;
    startDate: Date;
    endDate: Date;

    appUser: AppUser
}