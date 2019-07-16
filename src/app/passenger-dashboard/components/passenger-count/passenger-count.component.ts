import {Component, Input} from "@angular/core";

import {Passenger} from "../../models/passenger.interface";

@Component({
  selector: 'passenger-count',
  template: `
    <h3>
      Total checked in: {{checkedInCount()}}/{{items.length}}
    </h3>
  `
})

export class PassengerCountComponent {
  @Input()
  items: Passenger[];
  checkedInCount(): number {
    if (!this.items) return;
    return this.items.filter((passenger: Passenger) => passenger.checkedIn).length;
  }
}
