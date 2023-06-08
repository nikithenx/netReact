import { createMap } from "@automapper/core";
import { PojosMetadataMap } from "@automapper/pojos";
import { AppUser } from "../app/models/appUsers/AppUser";
import { AppUserForSearch } from "../app/models/appUsers/AppUserForSearch";
import { mapper } from "./mapper";

function createUserMetadata() {
    PojosMetadataMap.create<AppUser>('AppUser', {
        id: Number,
        forename: String,
        surname: String,
        country: String,
        city: String,
    });

    PojosMetadataMap.create<AppUserForSearch>('AppUserSearch', {
        id: Number,
        forename: String,
        surname: String,
        country: String,
        city: String,
    });
}

function createMaps() {

    createMap<AppUserForSearch, AppUser>(
        mapper,
        'AppUserSearch',
        'AppUser'
    );
}

export default function Initialize() {
    createUserMetadata();
    createMaps();
}
