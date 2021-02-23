import { inject } from 'aurelia-dependency-injection';
import { ApplicantModel } from "Models/applicantModel";
import { Request } from '../Request/request';
import { ResponseModel } from 'Models/responseModel';
import { DialogService } from 'aurelia-dialog';
import { Modal } from '../Modal/modal';
import { Router } from 'aurelia-router';


@inject(DialogService, Request)

export class CreateConfrim {
    
    applicant: ApplicantModel;
    response: ResponseModel = new ResponseModel();

    constructor(private dialogService: DialogService, private request: Request, private router: Router) {
        if (localStorage.getItem("createconfrim").length > 0)
            this.applicant = JSON.parse(localStorage.getItem("createconfrim"))
    }
    send() {
        this.request.postData(this.applicant)
            .then(response => this.response = response)
            .then(response => this.openModal(this.response));

    }
    openModal(response) {
        this.dialogService.open({ viewModel: Modal, model: response }).then(response => {});
    }

} 