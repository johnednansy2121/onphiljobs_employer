import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private API_VERSION = 'api/v1/'

  constructor(private httpClient: HttpClient) {}

  public search(searchData) {

    return this.httpClient.post(environment.api_path + this.API_VERSION + 'people/search', searchData).toPromise()

  }

}
