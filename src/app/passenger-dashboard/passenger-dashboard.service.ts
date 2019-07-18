import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {Observable, throwError} from "rxjs";
import {map} from "rxjs/operators";
import {catchError } from "rxjs/operators";

import {Passenger} from './models/passenger.interface';

const PASSENGER_API: string = 'http://localhost:3000/passengers';

@Injectable()
export class PassengerDashboardService {
  constructor(private http: HttpClient) {
  }

  getPassengers(): Observable<Passenger> {
    return this.http.get(PASSENGER_API).pipe(
      map((response: any) => response)).pipe(catchError((error: any) => throwError(error.json)))
  }

  getPassenger(id: number): Observable<Passenger> {
    return this.http.get(`${PASSENGER_API}/${id}`).pipe(
      map((response: any) => response)).pipe(catchError((error: any) => throwError(error.json)))
  }

  updatePassenger(passenger: Passenger): Promise<Passenger> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {
      headers: headers
    };

    return this.http.put(`${PASSENGER_API}/${passenger.id}`, passenger, options)
     .toPromise().then((response: any) => response)
  }

  removePassenger(passenger: Passenger): Promise<Passenger> {
    return this.http.delete(`${PASSENGER_API}/${passenger.id}`)
      .toPromise().then((response: any) => response)
  }
}
