import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  mobileSidebarActive = false;

  isloggedin = false;
  currentTheme = '';

  public countries = [
    {id: 0, name: "Working From Home"},
    {id: 1, name: "Australia"}
 ]

 public states = [
   {id: 0, country: 1, name: "Queensland"},
   {id: 1, country: 1, name: "Western Australia"},
   {id: 2, country: 1, name: "New South Wales"},
   {id: 3, country: 1, name: "Victoria"},
   {id: 4, country: 1, name: "Tasmania"},
   {id: 5, country: 1, name: "South Australia"},
   {id: 6, country: 1, name: "Australian Capital Territory"},
 ]

 public cities = [
   {id: 0, state: 0, name: "Brisbane"},
   {id: 1, state: 1, name: "Perth"},
   {id: 2, state: 2, name: "Sydney"},
   {id: 3, state: 3, name: "Melbourne"},
   {id: 4, state: 4, name: "Hobart"},
   {id: 5, state: 5, name: "Adelaide"},
   {id: 6, state: 6, name: "Canberra"},
 ]
  constructor() { }

}
