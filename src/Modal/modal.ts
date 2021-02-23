import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { ResponseModel } from 'Models/responseModel';
import { Router } from 'aurelia-router';

@inject(DialogController, Router)

export class Modal {
   controller = null;
   response: ResponseModel = new ResponseModel();

   constructor(controller, private router: Router) {
      this.controller = controller;
   }
   activate(model) {
      this.response = model;
   }
   ok(isRedirect) {
      if (isRedirect) {
         this.router.navigate('create')
      };
      this.controller.cancel()
   }
}