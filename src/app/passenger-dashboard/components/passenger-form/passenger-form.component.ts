import {Component, ElementRef, Input, ViewChild} from "@angular/core";

import {Passenger} from "../../models/passenger.interface";
import {Baggage} from "../../models/baggege.interface";

@Component ({
  selector: 'passenger-form',
  styleUrls: ['passenger-form.component.scss'],
  template: `
    <form #form="ngForm" novalidate >
      {{detail | json}}
      <div>
        Passenger Name
        <input
          type="text"
          name="fullname"
          [ngModel]="detail?.fullname">
      </div>

      <div>
        Passenger ID:
        <input
          type="number"
          name="id"
          [ngModel]="detail?.id">
      </div>
      
      <div>
        <label>
          <input
            type="checkbox"
            name="checkedIn"
            [ngModel]="detail?.checkedIn"
            (ngModelChange)="toggleCheckIn($event)">
        </label>
      </div>
      
        <div *ngIf="form.value.checkedIn">
          Check In Date:
          <input
            type="number"
            name="checkInDate"
            [ngModel]="detail?.checkInDate">
        </div>
      
      <div>
        Luggage
        <select
        name="baggage"
        [ngModel]="detail?.baggage">
          <option
          *ngFor="let item of baggage"
          [value]="item.key"
          [selected]="item.key === detail?.baggage"
          >
            {{item.value}}
          </option>
        </select>
      </div>

      <div>
        Luggage
        <select
          name="baggage"
          [ngModel]="detail?.baggage">
          <option
            *ngFor="let item of baggage"
            [ngValue]="item.key"
          >
            {{item.value}}
          </option>
        </select>
      </div>

      {{form.value | json}}
    </form>
  `
})

export class PassengerFormComponent {
  baggage: Baggage[] = [{
    key: 'none',
    value: 'no baggage'
  },{
    key: 'hold-only',
    value: 'hold baggage'
  },{
    key: 'hand-only',
    value: 'hand baggage'
  }, {
    key: 'hand-hold',
    value: 'hand and hold baggage'
  }];

  @Input()
  detail: Passenger;

  toggleCheckIn(checkedIn: boolean) {
    if (checkedIn) {
      this.detail.checkInDate = Date.now();
    }
  }
}
