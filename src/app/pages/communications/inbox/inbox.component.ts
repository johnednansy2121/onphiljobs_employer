import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class CommunicationsInboxComponent implements OnInit {

  pageTitle: string = 'Messages';

  messagesSearch: boolean = false;
  messageContent: any = {
    user: 'Malinda Hollaway',
    recipient: {
      name: 'Sarah Belgood',
      img: '1.jpg'
    },
    conversation: [
      {
        type: 'recieved',
        messages: [
          {type: 'text', text: "So i applied for those 3 jobs we talked about but unfortunately i was unsuccessful for all of them, i was really excited for this one it seemed so promising after that first interview"},
          {type: 'job', title: "Snr Software Developer", body: "We're looking for a highly skilled software engineer to join a dynamic team of..."}
        ],
        date: '20/04/2020',
        time: '09:00'
      },
      {
        type: 'sent',
        messages: [
          {type: 'text', text: "That's alright, not every interview will be successful but lets make sure we keep focused and push forward to find a job thats right for you."},
          {type: 'text', text: "Let's set some goals for our next interview"},
          {type: 'goal', title: "Read 3 articles on interview tips", body: "I've shared you 3 articles to prepare for your interview next week, please read them before your interview.", due: new Date(2020, 8, 20)}
        ],
        date: '20/04/2020',
        time: '09:10'
      },
      {
        type: 'recieved',
        messages: [
          {type: 'text', text: "No Problem!"},
          {type: 'text', text: "I'll be sure to get that done."},
          {type: 'text', text: "In the mean time, are there any jobs i should have on my radar?"},
        ],
        date: '20/04/2020',
        time: '09:22'
      },
      {
        type: 'sent',
        messages: [
          {type: 'text', text: "Well, i would recomend before proceeding with any work you read through those articles as they will have plenty of information to help you in your interviews but here i've attached a few more jobs that would suit your skills."},
          {type: 'job', title: "Software Lead", body: "We build amazing things here at sofwaries, join us now we're looking for..."},
          {type: 'job', title: "React Developer", body: "Do you have what it takes to build amazing applications for a wide audience..."}
        ],
        date: '20/04/2020',
        time: '09:10'
      },
    ]
  };
  messageBuddies: any[] = [
    {
      name: 'Davil Parnell',
      img: '4.jpg',
      message: 'Fierent fastidii recteque ad pro'
    },
    {
      name: 'Ann Watkinson',
      img: '8.jpg',
      message: 'Cum sociis natoque penatibus'
    },
    {
      name: 'Marse Walter',
      img: '3.jpg',
      message: 'Suspendisse sapien ligula'
    },
    {
      name: 'Jeremy Robbins',
      img: '2.jpg',
      message: 'Phasellus porttitor tellus nec'
    },
    {
      name: 'Reginald Horace',
      img: '4.jpg',
      message: 'Quisque consequat arcu eget'
    },
    {
      name: 'Shark Henry',
      img: '5.jpg',
      message: 'Nam lobortis odio et leo maximu'
    },
    {
      name: 'Paul Van Dack',
      img: '2.jpg',
      message: 'Nam posuere purus sed velit auctor sodales'
    },
    {
      name: 'James Anderson',
      img: '1.jpg',
      message: 'Vivamus imperdiet sagittis quam'
    },
    {
      name: 'Kane Williams',
      img: '3.jpg',
      message: 'Suspendisse justo nulla luctus nec'
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
