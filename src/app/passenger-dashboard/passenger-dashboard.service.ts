import {Passenger} from './models/passenger.interface';

export class PassengerDashboardService {
  constructor() {}

  getPassengers(): Passenger[] {
    return [{
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
}
