import { ApplicantModel } from '../Models/applicantModel';
import { ResponseModel } from '../Models/responseModel';
import { Request } from '../Request/request';
import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { ResponseListModel } from '../Models/responseListModel';
import { MessageModal } from '../Modal/messageModal';
import { MessageModalModel } from '../Models/MessageModalModel';
import { DialogService } from 'aurelia-dialog';

@inject(DialogService, Request, Router)
export class ApplicantList {

  applicant: ApplicantModel;
  response: ResponseModel;
  responseList: ResponseListModel;
  messageModel: MessageModalModel = new MessageModalModel();

  constructor(private dialogService :DialogService, private request: Request, private router: Router) {

  }
  activate() {
    this.getList();
  }
  getList() {
    this.request.getAllData()
      .then(response => this.responseList = response);
  }
  update(Id) {
    this.router.navigate("update/" + Id);

  }
  delete(Id) {
    this.messageModel.Message = "You're really sure to Delete data?";
    this.dialogService.open({ viewModel: MessageModal, model: this.messageModel }).whenClosed(response => {
      if (response.wasCancelled) return;

      this.request.deleteData(Id)
        .then(response => this.response = response)
        .then(response => this.response ? this.getList() : null);
    });
  }
  detail(Id) {
    this.router.navigate("detail/" + Id);
  }
}
