import { AppUser } from "../appUsers/AppUser"

export interface ProjectAppUserBase {
    id: number
    startDate: Date
    endDate: Date

    appUser: AppUser
}