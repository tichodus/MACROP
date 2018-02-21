
export class Team {
    projectId: string;
    name: string;
    leaderId: string;
    members: Array<string>;
    tasks: Array<string>;

    constructor(projectId?: string, name?: string, leaderId?: string, members?: Array<string>, tasks?: Array<string>) {
        this.projectId = projectId;
        this.name = name;
        this.leaderId = leaderId;
        this.members = members || new Array();
        this.tasks = tasks || new Array();
    }
}