import { HttpClient, json } from 'aurelia-fetch-client';
import { ApplicantModel } from '../Models/applicantModel';
import { ResponseModel } from '../Models/responseModel';
import { ResponseListModel } from '../Models/responseListModel';


export class Request {

   httpClient = new HttpClient();
   constructor() {

   }
   public getAllData(): Promise<ResponseListModel> {
      return this.httpClient.fetch('http://localhost:51891/Applicant/GetAll')
         .then(response => response.json())
         .then(data => new ResponseListModel(JSON.parse(data)));
   }

   public getData(id): Promise<ResponseModel> {
      return this.httpClient.fetch('http://localhost:51891/Applicant/GetById?id=' + parseInt(id.id), {
         method: "GET"
      })
         .then(response => response.json())
         .then(data => new ResponseModel(JSON.parse(data)));
   }

   public postData(postData: ApplicantModel): Promise<ResponseModel> {
      return this.httpClient.fetch('http://localhost:51891/Applicant/Insert', {
         method: "POST",
         body: JSON.stringify(postData)
      })
         .then(response => response.json())
         .then(data => new ResponseModel(JSON.parse(data)));
   }

   public updateData(updateData: ApplicantModel): Promise<ResponseModel> {

      return this.httpClient.fetch('http://localhost:51891/Applicant/Update', {
         method: "PUT",
         body: JSON.stringify(updateData) 
      })
         .then(response => response.json())
         .then(data => new ResponseModel(JSON.parse(data)));
   }

   public deleteData(id): Promise<ResponseModel> {
      return this.httpClient.fetch('http://localhost:51891/Applicant/Delete?id=' + id, {
         method: "DELETE"
      })
         .then(response => response.json())
         .then(data => new ResponseModel(JSON.parse(data)));
   }
}