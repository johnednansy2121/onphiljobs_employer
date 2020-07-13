import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';
import { SpinnerService } from 'src/app/utilities/spinner/spinner.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {

  pageTitle: string = 'Vacancies';
  pageSubTitle: string = 'See and manage your organisations vacancies.';
  
  jobsSearch: boolean = false;
  statuses = ['Draft', 'Live', 'Archived']
  activeTab = '';
  searchItem = '';
  filteredJobs = [];
  searchResultTotalPerItem = 0;
  sortOptions = [
    {value: "metadata.dateCreated asc", name: "Newest First"},
    {value: "metadata.dateCreated desc", name: "Oldest First"}
  ]
  searchQuery: any;
  //the searchObject that represents the users query
  searchResults = [];
  //total number of search results
  searchResultTotal = 0;

  constructor(
    private spinnerService:SpinnerService,
    public jobSrv: JobsService,
    private toastSrv: ToastrService,
  ) { }

  ngOnInit(): void {
    this.jobSrv.getAllClients();
    this.initialize();
    this.searchResults = this.jobSrv.jobItems;
    this.searchResultTotal = this.jobSrv.searchResultTotal;
    this.tabSearch('PUBLISHED');
  }
  
  searchButton(order: any){
    this.searchQuery.pageNum = 1;
    this.searchQuery.orderBy = order;
    this.executeSearch()
  }

  executeSearch() {

    this.spinnerService.show("Searching Jobs")
    console.log(this.searchQuery)

    this.jobSrv.getJobs(this.searchQuery)
      .then((result: any) => {
        this.searchResults = result.Items
        this.searchResultTotal = result.TotalItems
        this.tabSearch(this.activeTab);
        this.toastSrv.success(result.Message)
      })
      .catch(err => {
        console.log(err)
        this.toastSrv.error(err.error.Message)
      })
      .finally(() => {
        this.spinnerService.hide()
        this.searchQuery.filter = '';
        this.jobsSearch = false;
      })

  }

  //Deals with the material paginator
  changePage(event){
    this.searchQuery.pageNum = (event.pageIndex + 1)
    this.searchQuery.pageSize = event.pageSize
    this.executeSearch()
  }

  getNumberList(tab: string) {
    let count = 0;
    for (let index = 0; index < this.searchResults.length; index++) {
      const element = this.searchResults[index];
      if (element['status'] === tab) {
        count++
      }
    }
    return count;
  }

  tabSearch(tab: string) {
    this.searchResultTotalPerItem = 0;
    this.filteredJobs = [];
    for (let index = 0; index < this.searchResults.length; index++) {
      const element = this.searchResults[index];
      if (element['status'] === tab) {
        this.filteredJobs.push(element);
        this.searchResultTotalPerItem++;
      }
    }

    this.activeTab = tab;
    console.log(this.filteredJobs)
  }

  initialize() {
    this.searchQuery = {
      filter: '',
      pageSize: 10,
      pageNum: 1,
      orderBy: "metadata.dateCreated desc" //desc asc
    }
  }

  resetSearch() {
    this.initialize();
    this.searchResults = [];
    this.searchResultTotal = 0;
  }

  searchJobTitle(titleQuery: any) {
    this.searchQuery.filter= `contains(title, '${titleQuery}')`;
    this.executeSearch()
  }
}
