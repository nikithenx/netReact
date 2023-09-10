
export class Endpoints {

    static BaseUrl: string = "http://localhost:5000";

    static Auth: string = this.BaseUrl + "/api/Auth";
    static AppUsers: string = this.BaseUrl + "/api/appuser"
    static ProjectAppUsers: string = this.BaseUrl + "/api/projectappuser"
    static Projects: string = this.BaseUrl + "/api/project";
    static Sponsors: string = this.BaseUrl + "/api/sponsor";
    static Tags: string = this.BaseUrl + "/api/tag"
}