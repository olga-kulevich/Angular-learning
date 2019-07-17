import {Component, OnInit} from "@angular/core";

import {PassengerDashboardService} from "../../passenger-dashboard.service";

import {Passenger} from "../../models/passenger.interface";

@Component({
  selector: 'passenger-dashboard',
  styleUrls: ['passenger-dashboard.component.scss'],
  templateUrl: './passenger-dashboard.component.html'
})

export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[];

  constructor(private passengerService: PassengerDashboardService) {}

  ngOnInit() {
    this.passengers = this.passengerService.getPassengers();
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
