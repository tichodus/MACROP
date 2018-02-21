import { Injectable } from "@angular/core";
import { RequestService } from "./requestService.service";

@Injectable()
export class ReportService {

    constructor(private requestService: RequestService) { }

    updateReport(reportObject: any) {
        return this.requestService.createPutRequestHeader(reportObject, 'updateReport');
    }

    createReportObject(ownerId: string, projectId: string, data: string, type: string, name: string, reports: Array<any>) {
        let reqObj = {
            ownerId: ownerId,
            projectId: projectId,
            data: data,
            type: type,
            name: name,
            reports: reports
        };
        return reqObj;
    }

    createReport(reportObject: any) {
        return this.requestService.createPostRequestHeader(reportObject, 'createReport');
    }

    getReport(ownerId: string, projectId: string, name: string) {
        let reqObj = {
            ownerId: ownerId,
            projectId: projectId,
            name: name
        }
        return this.requestService.createPostRequestHeader(reqObj, 'getReport');
    }
}