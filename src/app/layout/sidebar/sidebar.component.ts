import {Component, HostBinding, OnInit} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  host: {
    class: "sidebar",
  },
  animations: [
    trigger("toggleSubMenu", [
      state(
        "inactive",
        style({
          height: "0",
          opacity: "0",
        })
      ),
      state(
        "active",
        style({
          height: "*",
          opacity: "1",
        })
      ),
      transition("inactive => active", animate("200ms ease-in")),
      transition("active => inactive", animate("200ms ease-out")),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  @HostBinding("attr.class") class = "sidebar";

  mainMenu = [
    { title: "Home", icon: "home", route: "/home" },
    {
      title: 'People', icon: 'user-tie', visibility: 'inactive',
      sub: [
        {
          title: "Search", icon: "search", route: "/people/search"
        },
      ],
    },
    // {
    //   title: "Activity",
    //   icon: "briefcase",
    //   route: "/2",
    //   class: "disabled",
    //   promote: true,
    // },
    // {
    //   title: "Clients",
    //   icon: "users",
    //   route: "/3",
    //   class: "disabled",
    //   promote: true,
    // },
    {
      title: 'Jobs', icon: 'running', visibility: 'inactive',
      sub: [
        {
          title: "Vacancies", icon: "folder-open", route: "/vacancies",
        },
      ],
    },
    {
      title: 'Recruiters', icon: 'users', visibility: 'inactive',
      sub: [
        {title: "Dashboard", icon: "home", route: "/mentors/dashboard"},
        {title: "Shared Tasks", icon: "tasks", route: "/mentors/sharedtasks", class: "disabled"},
        {title: "Reports", icon: "book", route: "/mentors/reports", class: "disabled"},
      ],
    },
    // {
    //   title: "Communications",
    //   icon: "comments",
    //   route: "/communications",
    //   class: "disabled",
    //   promote: true,
    // },
    {
      title: 'Debug', icon: 'bug', visibility: 'inactive',
      sub: [
        {title: "AGMMaps", icon: "map", route: "/debug/agmmaps"},
      ],
    },
  ];

  // Toggle sub menu
  toggleSubMenu(i) {
    this.mainMenu[i].visibility =
      this.mainMenu[i].visibility === "inactive" ? "active" : "inactive";
  }

  constructor() {}


  ngOnInit(): void {
  }

}
