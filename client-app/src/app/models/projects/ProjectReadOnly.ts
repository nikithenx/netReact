
export interface ProjectReadOnly {
    id: number;
    sponsorId: number;
    nr: string;
    name: string;
    startDate: Date;
    endDate: Date;
    description: string;

    // From Sponsor
    sponsorName: string;
}
