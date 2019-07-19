import {Component, Input, Output, EventEmitter} from "@angular/core";

import {Passenger} from "../../models/passenger.interface";
import {Baggage} from "../../models/baggege.interface";

@Component ({
  selector: 'passenger-form',
  styleUrls: ['passenger-form.component.scss'],
  template: `
    <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate >
      {{detail | json}}
      <div>
        Passenger Name
        <input
          type="text"
          name="fullname"
          required
          minlength="0"
          #fullname="ngModel"
          [ngModel]="detail?.fullname">
        <div *ngIf="fullname.errors?.minlength && fullname.dirty" class="error">
          Passenger name is required
        </div>
      </div>

      <div>
        Passenger ID:
        <input
          type="number"
          name="id"
          required
          #id="ngModel"
          [ngModel]="detail?.id">
        <div *ngIf="id.errors?.required && id.touched" class="error">
          Passenger ID is required
        </div>
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
      <button type="submit" [disabled]="form.invalid">
        Update passenger
      </button>
    </form>
  `
})

export class PassengerFormComponent {
  @Output()
  update: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  @Input()
  detail: Passenger;

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

  toggleCheckIn(checkedIn: boolean) {
    if (checkedIn) {
      this.detail.checkInDate = Date.now();
    }
  }

  handleSubmit(passenger: Passenger, isValid: boolean) {
    if (isValid) {
      this.update.emit(passenger);
    }
  }
}
