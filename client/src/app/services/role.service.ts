import { Roles } from "../models/enums/roles";

export class RoleService {

    static roleEnumToArray() {
        let keys = Object.keys(Roles);
        let values = [];
        keys.forEach(key => values[key] = Roles[key]);
        return values;
    }

    static getRoleKeys() {
        return Object.keys(Roles);
    }

}