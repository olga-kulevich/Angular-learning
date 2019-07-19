import {Component, OnChanges, OnInit, Input, Output, EventEmitter} from "@angular/core";

import {Passenger} from "../../models/passenger.interface";

@Component({
  selector: 'passenger-detail',
  styleUrls: ['passenger-detail.component.scss'],
  template: `
    <div>
      <span class="status" [class.checked-in]="detail.checkedIn"></span>
      <div *ngIf="editing">
        <input 
          type="text"
          [value]="detail.fullname"
          (input)="onNameChange(name.value)"
          #name>
      </div>
      
      <div *ngIf="!editing">
        {{detail.fullname}}
        
      </div>
      
      <button (click)="toggleEdit()">
        {{editing ? 'Done' : 'Edit'}}
      </button>
        
      <button (click)="onRemove()">
        Remove
      </button>

      <button (click)="goToPassenger()">
        View
      </button>
    </div>
  `
})

export class PassengerDetailComponent implements OnChanges, OnInit{

  editing: boolean = false;

  @Input()
  detail: Passenger;

  @Output()
  edit: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  @Output()
  remove: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  @Output()
  view: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  ngOnChanges(changes) {
    if(changes.detail) {
      this.detail = Object.assign({}, changes.detail.currentValue);
    }
    console.log('ngOnChanges');
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  constructor() {}

  onNameChange(value: string) {
    this.detail.fullname = value;
  }
  toggleEdit() {
    if(this.editing) {
      this.edit.emit(this.detail);
    }
    this.editing = !this.editing;
  }

  onRemove() {
    this.remove.emit(this.detail);
  }

  goToPassenger() {
    this.view.emit(this.detail);
  }
}
