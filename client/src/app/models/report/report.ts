
export abstract class Report {
    protected _name: string;
    protected _ownerId: string;

    constructor(name: string, ownerId: string) {
        this._name = name;
        this._ownerId = ownerId;
    }

    protected abstract getType();
    protected abstract openReport();
}