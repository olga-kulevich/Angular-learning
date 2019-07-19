import {Component, OnInit} from "@angular/core";

import {PassengerDashboardService} from "../../passenger-dashboard.service";

import {Passenger} from "../../models/passenger.interface";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'passenger-dashboard',
  styleUrls: ['passenger-dashboard.component.scss'],
  templateUrl: './passenger-dashboard.component.html'
})

export class PassengerDashboardComponent implements OnInit {
  passengers: Passenger[];

  constructor(
    private passengerService: PassengerDashboardService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.passengerService
      .getPassengers()
      .subscribe((data: any) => {
        console.log('Data', data);
        this.passengers = data;
      });
  }

  handleRemove(event: Passenger) {
    this.passengerService
      .removePassenger(event)
      .then((data: Passenger) => {
        this.passengers = this.passengers.filter((passenger: Passenger) => {
          return passenger.id !== event.id;
        });
      })
  }

  handleEdit(event: Passenger) {
    this.passengerService
      .updatePassenger(event)
      .subscribe((data: Passenger) => {
        this.passengers = this.passengers.map((passenger: Passenger) => {
          if (passenger.id === event.id) {
            passenger = Object.assign({}, passenger, event);
          }
          return passenger;
        });
      });
  }

  handleView(event: Passenger) {
    this.router.navigate(['/passengers', event.id]);
  }
}
