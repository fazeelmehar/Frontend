import { ApplicantModel } from "./applicantModel";

export class ResponseModel {
    constructor(data?) {
        if (data == null) return;
        Object.assign(this, data);
    }
    ReturnStatus: boolean;
    ReturnMessage: []
    Errors:[];
    Data : ApplicantModel;
}