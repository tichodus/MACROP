import { Report } from "./report";
import { UserReport } from "./user-report";

export class TeamReport extends Report {
    private _reports: Array<UserReport>;

    constructor(name: string, ownerId: string, reports?: Array<UserReport>) {
        super(name, ownerId);
        this._reports = reports || null;
    }

    public get reports() {
        return this.reports;
    }

    public set reports(reports: Array<UserReport>) {
        this._reports = reports;
    }

    protected getType() {
        return "teamReport";
    }

    protected openReport() {
        return this._reports;
    }
}