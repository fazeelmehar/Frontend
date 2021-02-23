import { ApplicantModel } from "./applicantModel";

export class ResponseListModel {
    constructor(data?) {
        if (data == null) return;
        Object.assign(this, data);
    }
    ReturnStatus: boolean;
    ReturnMessage: []
    Errors:[];
    Data : ApplicantModel[];
}