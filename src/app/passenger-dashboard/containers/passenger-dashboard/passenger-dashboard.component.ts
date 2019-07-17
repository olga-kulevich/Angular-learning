import {Component, OnInit} from "@angular/core";
import {Passenger} from "../../models/passenger.interface";

@Component({
  selector: 'passenger-dashboard',
  styleUrls: ['passenger-dashboard.component.scss'],
  templateUrl: './passenger-dashboard.component.html'
})

export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[];

  constructor() {
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.passengers = [{
      id: 1,
      fullname: 'Stefan',
      checkedIn: true,
      checkedInDate: 1490742000000,
      children: null
    },
      {
        id: 2,
        fullname: 'Olalla',
        checkedIn: false,
        checkedInDate: null,
        children: [{name: 'Victor', age: 2}]
      }];
  }

  handleRemove(event: Passenger) {
    this.passengers = this.passengers.filter((passenger: Passenger) => {
      return passenger.id !== event.id;
    });
  }

  handleEdit(event) {
    this.passengers = this.passengers.map((passenger: Passenger) => {
      if (passenger.id === event.id) {
        passenger = Object.assign({}, passenger, event);
      }
      return passenger;
    });
  }
}
