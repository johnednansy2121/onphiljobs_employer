import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../utilities/spinner/spinner.service';

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private API_VERSION = 'api/v1/'
  public clientsItem: Array<any> = [];
  public clients: any;
  public jobItems = []
  public searchResultTotal = 0;
  public isInitialized = false
  private successMessage = '';
  searchQuery = {
    filter: '',
    pageNum: 1,
    pageSize: 10,
    orderBy: 'metadata.dateCreated desc'
  }
  constructor(private httpClient: HttpClient,
    private toastSrv: ToastrService,
    private spinnerSrv: SpinnerService) {}

  public initialize() {
      if(this.isInitialized) {
          return Promise.resolve(this.jobItems)
      } else {
          return this.getJobs(this.searchQuery)
              .then((result : any) => {
                  let { Items, TotalItems } = result
                  this.jobItems = Items
                  this.searchResultTotal = TotalItems;
                  console.log(result);
                  this.isInitialized = true
                  return this.jobItems
              })
              .catch(err => { return err }).finally(() => {
                if (this.successMessage !== '') {
                  this.toastSrv.success(this.successMessage)
                }
                this.successMessage = '';
                this.spinnerSrv.hide()
              })
      }
  }

  public addJob(data) {
    return new Promise((resolve, reject) => {
        this.httpClient.post(environment.api_path + this.API_VERSION + 'job', data)
        .toPromise()
        .then((result: any) => {
            const res =result
            this.successMessage = res.Message;
            this.isInitialized = false;
            resolve()
        })
        .catch(err =>{
            this.toastSrv.error(err.error.Message)
            reject()})
    })
}

  public getAllClients() {
    return this.httpClient.get(environment.api_path + this.API_VERSION + 'client').toPromise().then((result: any) => {
      this.clients = result.Items
      this.clientsItem = [];
      for (let i = 0; i < this.clients.length; i++) {
        const element = this.clients[i];
        this.clientsItem.push(element.name);
      }
    }).catch(err => {
      console.log(err.error.Message)
    })
  }

  public getJobs(searchQuery) {
    const params = new HttpParams()
    .set('$filter', searchQuery.filter)
    .set('$pageNum', searchQuery.pageNum)
    .set('$pageSize', searchQuery.pageSize)
    .set('$orderBy', searchQuery.orderBy);
    console.log(params)
    return this.httpClient.get(environment.api_path + this.API_VERSION + 'job',{params}).toPromise()
  }

  public getJobById(id) {
    return this.httpClient.get(environment.api_path + this.API_VERSION + 'job/' + id).toPromise()
  }


  public updateJob(data) {
    return new Promise((resolve, reject) => {
        this.httpClient.put(environment.api_path + this.API_VERSION + 'job', data)
        .toPromise()
        .then((result: any) => {
            const res =result
            this.successMessage = res.Message;
            this.isInitialized = false;
            resolve()
        })
        .catch(err =>{
            this.toastSrv.error(err.error.Message)
            reject()})
    })
  }

  public publishJob(_id: any) {
    return new Promise((resolve, reject) => {
        this.httpClient.put(environment.api_path + this.API_VERSION + 'job/' + _id.id + '/publish', _id)
        .toPromise()
        .then((result: any) => {
            const res =result
            this.successMessage = res.Message;
            this.isInitialized = false;
            resolve()
        })
        .catch(err =>{
            this.toastSrv.error(err.error.Message)
            reject()})
    })
  }
  public draftJob(_id: any) {
    return new Promise((resolve, reject) => {
      this.httpClient.put(environment.api_path + this.API_VERSION + 'job/' + _id.id + '/draft', _id)
        .toPromise()
        .then((result: any) => {
            const res =result
            this.successMessage = res.Message;
            this.isInitialized = false;
            resolve()
        })
        .catch(err =>{
            this.toastSrv.error(err.error.Message)
            reject()})
    })
  }

  public unlistJob(_id: any) {
    return new Promise((resolve, reject) => {
      this.httpClient.put(environment.api_path + this.API_VERSION + 'job/' + _id.id + '/unlist', _id)
        .toPromise()
        .then((result: any) => {
            const res =result
            this.successMessage = res.Message;
            this.isInitialized = false;
            resolve()
        })
        .catch(err =>{
            this.toastSrv.error(err.error.Message)
            reject()})
    })
  }

  public getAppliedApplicants(id: any) {
    const params = new HttpParams()
    .set('id', id)
    console.log(params)
    return this.httpClient.get(environment.api_path + this.API_VERSION + 'job/' + id + '/applicant/applied', {params}).toPromise()
  }

  public getAllApplicants(id: any) {
    const params = new HttpParams()
    .set('id', id)
    console.log(params)
    return this.httpClient.get(environment.api_path + this.API_VERSION + 'job/' + id + '/applicant/all', {params}).toPromise()
  }

  public getWithdrawnApplicants(id: any) {
    const params = new HttpParams()
    .set('id', id)
    console.log(params)
    return this.httpClient.get(environment.api_path + this.API_VERSION + 'job/' + id + '/applicant/withdrawn', {params}).toPromise()
  }

  public getConsideringApplicants(id: any) {
    const params = new HttpParams()
    .set('id', id)
    console.log(params)
    return this.httpClient.get(environment.api_path + this.API_VERSION + 'job/' + id + '/applicant/considering', {params}).toPromise()
  }

  public getShortlistApplicants(id: any) {
    const params = new HttpParams()
      .set('id', id)
    console.log(params)
    return this.httpClient.get(environment.api_path + this.API_VERSION + 'job/' + id + '/applicant/shortlist', {params}).toPromise()
  }

  public getDeclinedApplicants(id: any) {
    const params = new HttpParams()
      .set('id', id)
    console.log(params)
    return this.httpClient.get(environment.api_path + this.API_VERSION + 'job/' + id + '/applicant/declined', {params}).toPromise()
  }



  public considerApplicant(_id: any) {
    return new Promise((resolve, reject) => {
      this.httpClient.put(environment.api_path + this.API_VERSION + 'application/' + _id + '/considering', _id)
        .toPromise()
        .then((result: any) => {
            const res =result
            this.successMessage = res.Message;
            this.isInitialized = false;
            resolve()
        })
        .catch(err =>{
            this.toastSrv.error(err.error.Message)
            reject()})
    })
  }

  public shortlistApplicant(_id: any) {
    return new Promise((resolve, reject) => {
      this.httpClient.put(environment.api_path + this.API_VERSION + 'application/' + _id + '/shortlist', _id)
        .toPromise()
        .then((result: any) => {
            const res =result
            this.successMessage = res.Message;
            this.isInitialized = false;
            resolve()
        })
        .catch(err =>{
            this.toastSrv.error(err.error.Message)
            reject()})
    })
  }

  public declineApplicant(_id: any) {
    return new Promise((resolve, reject) => {
      this.httpClient.put(environment.api_path + this.API_VERSION + 'application/' + _id + '/declined', _id)
        .toPromise()
        .then((result: any) => {
            const res =result
            this.successMessage = res.Message;
            this.isInitialized = false;
            resolve()
        })
        .catch(err =>{
            this.toastSrv.error(err.error.Message)
            reject()})
    })
  }
}
