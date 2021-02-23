
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import { RouterConfiguration, Router } from 'aurelia-router';
import { PLATFORM } from "aurelia-framework";

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router): void {
    this.router = router;
    config.title = 'Applicant';
    config.map([
      { route: ['', 'create'], name: 'create', moduleId: PLATFORM.moduleName('Create/create'), nav: true, title: 'Create Appicant' },
      { route: 'update/:id', name: 'update', moduleId: PLATFORM.moduleName('Update/Update'), title: 'Update Appicant' },
      { route: 'createconfrim', name: 'createconfrim', moduleId: PLATFORM.moduleName('CreateConfrim/CreateConfrim'), title: 'Create Appicant Confirmation' },
      { route: 'applicantlist', name: 'applicantlist', moduleId: PLATFORM.moduleName('applicant-list/applicantList'), nav: true, title: 'Appicant List' },
      { route: 'detail/:id', name: 'detail', moduleId: PLATFORM.moduleName('applicant-detail/applicantDetail'), title: 'Appicant Detail' }
    ]);
  }
}