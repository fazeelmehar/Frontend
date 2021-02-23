import { inject } from 'aurelia-framework';
import { DialogController } from 'aurelia-dialog';
import { Router } from 'aurelia-router';
import { MessageModalModel } from '../Models/MessageModalModel';


@inject(DialogController, Router)

export class MessageModal {
   response: MessageModalModel;
   constructor(public controller: DialogController, private router: Router) {
   }
   activate(model) {
      this.response = model;
   }
   // ok(model) {
   //    debugger
   //    if (this.response.IsRedirect) {
   //       this.router.navigate(this.response.callback)
   //    };
   //     this.controller.ok(model);
   // }
}