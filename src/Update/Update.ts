import { inject } from 'aurelia-dependency-injection';
import { ValidationControllerFactory, ValidationRules, validateTrigger } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../bootstrap-form-renderer/bootstrap-form-renderer';
import { DialogService } from 'aurelia-dialog';
import { Modal } from '../Modal/modal';
import { MessageModal } from '../Modal/messageModal';
import { Request } from '../Request/request';
import { ApplicantModel } from 'Models/applicantModel';
import { Router } from 'aurelia-router';
import { ResponseModel } from 'Models/responseModel';
import { MessageModalModel } from '../Models/MessageModalModel';

@inject(ValidationControllerFactory, DialogService, Request, Router)
export class UpdateApplicant {
  
  applicant: ApplicantModel = new ApplicantModel();
  response: ResponseModel = new ResponseModel();
  messageModel: MessageModalModel = new MessageModalModel();
  controller = null;
  dialogService: any;


  constructor(controllerFactory:ValidationControllerFactory, DialogService, private request: Request, private router: Router) {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.controller.validateTrigger =  validateTrigger.focusout;
    this.dialogService = DialogService;
  }
  activate(id) {
    this.request.getData(id)
      .then(response => this.applicant = response.Data);
  }
  submit() {
    debugger
    this.controller.validate();
    if (this.controller.errors.length === 0) {
      this.request.updateData(this.applicant)
        .then(response => this.response = response)
        .then(response => this.response.ReturnStatus ? this.router.navigate('applicantlist') : this.openModal(response) );
    }
  }
  reset() {
    this.messageModel.Message = "You're really sure to reset all the data?";
    this.dialogService.open({ viewModel: MessageModal, model: this.messageModel }).whenClosed(response => {
      if (response.wasCancelled) return;
        this.applicant = new ApplicantModel();
    });
  }
  openModal(response) {
    this.dialogService.open({ viewModel: Modal, model: response }).then(response => {});
}
}

ValidationRules
  .ensure((b: ApplicantModel) => b.Name).required()
  .ensure((b: ApplicantModel) => b.FamilyName).required()
  .ensure((b: ApplicantModel) => b.EmailAdress).required().email()
  .ensure((b: ApplicantModel) => b.Age).required()
  .ensure((b: ApplicantModel) => b.Address).required()
  .ensure((b: ApplicantModel) => b.CountryOfOrigin).required()
  .ensure((b: ApplicantModel) => b.Age).range(20, 60).withMessage('Age – must be between 20 and 60')
  .ensure((b: ApplicantModel) => b.Name).minLength(5).withMessage('Name – at least 5 Characters')
  .ensure((b: ApplicantModel) => b.FamilyName).minLength(5).withMessage('FamilyName – at least 5 Characters')
  .ensure((b: ApplicantModel) => b.Address).minLength(10).withMessage('Adress – at least 10 Characters')
  .on(ApplicantModel);