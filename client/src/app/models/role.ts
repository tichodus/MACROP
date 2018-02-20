
export class Role {
    projectID: string;
    role: string;
    userID: string;

    constructor(userId?: string, projectId?: string, role?: string) {
        this.userID = userId;
        this.projectID = projectId;
        this.role = role;
    }
}