import { AppUser } from "../app/models/appUsers/AppUser";
import { AppUserForSearch } from "../app/models/appUsers/AppUserForSearch";
import { ProjectAppUser } from "../app/models/projectsAppUsers/ProjectAppUser";
import { ProjectAppUserBase } from "../app/models/projectsAppUsers/ProjectAppUserBase";
import { ProjectAppUserUpdate } from "../app/models/projectsAppUsers/ProjectAppUserUpdate";

export class Mappings {

    static toAppUser(user: AppUserForSearch) : AppUser {
        return  {
            id: user.id,
            forename: user.forename,
            surname: user.surname,
            city: user.city,
            country: user.country
        }
    }

    static toProjectAppUserUpdate(projectUser: ProjectAppUserBase, projectId: number) : ProjectAppUserUpdate {
        return {
            id: projectUser.id,
            projectId: projectId,
            appUserId: projectUser.appUser.id,
            startDate: projectUser.startDate,
            endDate: projectUser.endDate,
        }
    }
}