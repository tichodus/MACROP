import { Report } from "./report";

export class ProjectReport extends Report {
    private _reports: Array<Report>;

    constructor(name: string, ownerId: string, reports?: Array<Report>) {
        super(name, ownerId);
        this._reports = reports || null;
    }


    getType() {
        return "projectReport";
    }

    public get reports() {
        return this._reports;
    }

    public set reports(reports: Array<Report>) {
        this._reports = reports;
    }

    protected openReport() {
        return this._reports;
    }
}