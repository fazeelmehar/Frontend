import { inject } from 'aurelia-dependency-injection';
import { ValidationControllerFactory, ValidationRules, validateTrigger } from 'aurelia-validation';
import { BootstrapFormRenderer } from '../bootstrap-form-renderer/bootstrap-form-renderer';
import { DialogService } from 'aurelia-dialog';
import { Request } from '../Request/request';
import { ApplicantModel } from 'Models/applicantModel';
import { Router } from 'aurelia-router';
import { MessageModal } from 'Modal/messageModal';
import { MessageModalModel } from 'Models/MessageModalModel';

@inject(ValidationControllerFactory, DialogService, Request, Router)

export class CreateApplicant {

  applicant: ApplicantModel = new ApplicantModel();
  controller = null;
  dialogService: any;
  messageModel: MessageModalModel = new MessageModalModel();

  constructor(controllerFactory, DialogService, private request: Request, private router: Router) {
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
    this.controller.validateTrigger = validateTrigger.focusout;
    this.dialogService = DialogService;
  }

  submit() {
    this.controller.validate();
    if (this.controller.errors.length === 0) {
      localStorage.setItem("createconfrim", JSON.stringify(this.applicant))
      this.router.navigate('createconfrim')
    }
  }
  reset() {
    this.messageModel.Message = "You're really sure to reset all the data?";
    this.dialogService.open({ viewModel: MessageModal, model: this.messageModel }).whenClosed(response => {
      if (response.wasCancelled) return;
        this.applicant = new ApplicantModel();
    });
  }
}
ValidationRules
  .ensure((a: ApplicantModel) => a.Name).required()
  .ensure((a: ApplicantModel) => a.FamilyName).required()
  .ensure((a: ApplicantModel) => a.EmailAdress).required().email()
  .ensure((a: ApplicantModel) => a.Age).required()
  .ensure((a: ApplicantModel) => a.Address).required()
  .ensure((a: ApplicantModel) => a.CountryOfOrigin).required()
  .ensure((a: ApplicantModel) => a.Age).range(20, 60).withMessage('Age – must be between 20 and 60')
  .ensure((a: ApplicantModel) => a.Name).minLength(5).withMessage('Name – at least 5 Characters')
  .ensure((a: ApplicantModel) => a.FamilyName).minLength(5).withMessage('FamilyName – at least 5 Characters')
  .ensure((a: ApplicantModel) => a.Address).minLength(10).withMessage('Adress – at least 10 Characters')
  .on(ApplicantModel);