import { Report } from "./report";

export class UserReport extends Report {
    private _data: string;

    constructor(name: string, ownerId: string, data?: string) {
        super(name, ownerId);
        this._data = data;
    }

    public get data() {
        return this._data;
    }

    public set data(data: string) {
        this._data = data;
    }

    protected getType() {
        return "userReport";
    }
    protected openReport() {
        return this._data;
    }
}