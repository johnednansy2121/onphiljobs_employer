import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import {PeopleService} from "../../../services/people.service";
import {IResult, ISearchResult} from "../../../models/IResult";
import {SpinnerService} from "../../../utilities/spinner/spinner.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  selectedTest = ""

  pageTitle: string = 'People Search';
  pageSubTitle: string = 'You may search others in here.';

  activeTab = '';
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredTags: Observable<string[]>;
  allTagSuggestions: string[] = ['Steam', 'Locomotive', 'Tracks', 'Engines', 'Skills'];
  filteredUsers = [];

  sortOptions = [
    {value: "metadata.dateCreated asc", name: "Newest First"},
    {value: "metadata.dateCreated desc", name: "Oldest First"}
  ]
  searchViewState: any;
  searchQuery: any;
  //the searchObject that represents the users query
  searchResults = [];
  //total number of search results
  searchResultTotal = 0;

  constructor(
    private spinnerService:SpinnerService,
    private peopleService:PeopleService
  ) { }

  ngOnInit(): void {
    this.initialize();
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
    map((tag: string | null) => tag ? this._filter(tag) : this.allTagSuggestions.slice()));
    this.tabSearch('allUsers');
  }

  searchButton(){
    this.searchQuery.pageNum = 1;
    this.executeSearch()
  }

  executeSearch() {

    this.spinnerService.show("Searching Users")
    console.log(this.searchQuery)

    this.peopleService.search(this.searchQuery)
      .then((result: ISearchResult<any>) => {
        console.log(result)
        this.searchResults = result.Items
        this.searchResultTotal = result.TotalItems
        this.tabSearch('allUsers');
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        this.spinnerService.hide()
      })

  }

  //when a search category is turned set as hidden... empty the keywords
  toggleSearchCategory(field, event){
    if(!event){
      this.searchQuery.tags[field] = [];
    }
  }

  //deals with adding and removing chips to the keyword arrays
  addChip(event: MatChipInputEvent, searchQuery): void {
    const input = event.input;
    const value = event.value;
    if (value === '') {
      this.searchButton();
    }
    // Add our tag
    if ((value || '').trim()) {
      searchQuery.value.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagCtrl.setValue(null);
  }
  remove(tag: string, searchQuery): void {
    const index = searchQuery.value.indexOf(tag);

    if (index >= 0) {
      searchQuery.value.splice(index, 1);
    }
  }

  //Deals with the material paginator
  changePage(event){
    this.searchQuery.pageNum = (event.pageIndex + 1)
    this.searchQuery.pageSize = event.pageSize
    this.executeSearch()
  }

  //Other Functions
  selected(event: MatAutocompleteSelectedEvent, searchQuery): void {
    searchQuery.value.push(event.option.viewValue);
    this.tagCtrl.setValue(null);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTagSuggestions.filter(tag => tag.toLowerCase().indexOf(filterValue) === 0);
  }
  getNumberList(type: string) {
    let count = 0;
    for (let index = 0; index < this.searchResults.length; index++) {
      const element = this.searchResults[index];
      if (element.premium[type]) {
        count++
      }
    }
    return count;
  }
  tabSearch(tab: string) {
    this.filteredUsers = [];
    if (tab === 'allUsers') {
      this.filteredUsers = this.searchResults;
      this.activeTab = 'allUsers';
    } else {
      for (let index = 0; index < this.searchResults.length; index++) {
        const element = this.searchResults[index];
        if (element.premium[tab]) {
          this.filteredUsers.push(element);
        }
      }
      this.activeTab = tab;
    }
  }
  initialize() {
    this.searchViewState = {
      skill: { visible: true, label: "Skills" },
      experience: { visible: false, label: "Experience" },
      education: { visible: false, label: "Education" },
      achievement: { visible: false, label: "Achievement" },
      aboutMe: { visible: false, label: "About Me" }
    };
    this.searchQuery = {
      "tags": {
        "skill": [],
        "experience": [],
        "education": [],
        "aboutMe": [],
        "achievement": []
      },
      "pageSize": 10,
      "pageNum": 1,
      "orderBy": "metadata.dateCreated desc" //desc asc
    }
  }
  resetSearch() {
    this.initialize();
    this.searchResults = [];
    this.searchResultTotal = 0;
  }
}
