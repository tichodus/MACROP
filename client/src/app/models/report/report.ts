
export abstract class Report {
    protected _name: string;
    public _ownerId: string;

    constructor(name: string, ownerId: string) {
        this._name = name;
        this._ownerId = ownerId;
    }

    protected abstract getType();
    protected abstract openReport();
    public get ownerId() {
        return this._ownerId;
    }

    public get name() {
        return this._name;
    }
}