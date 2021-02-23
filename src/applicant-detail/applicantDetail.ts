import { inject } from 'aurelia-dependency-injection';
import { ApplicantModel } from "../Models/applicantModel";
import { Request } from '../Request/request';
import { ResponseModel } from '../Models/responseModel';
import { Router } from 'aurelia-router';


@inject(Request)

export class ApplicantDetail {
    applicant: ApplicantModel;
    response: ResponseModel = new ResponseModel();
    constructor(private request: Request, private router: Router) {
        
    }
    activate(id) {
        this.request.getData(id)
          .then(response => this.applicant = response.Data);
      }
} 