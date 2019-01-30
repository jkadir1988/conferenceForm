import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Conference } from './conference';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {

  url: string = 'http://localhost:8082/api/conference'

  constructor(private http: HttpClient) { }

  postConference(conferenceData) {
    return this.http.post<any>(this.url, conferenceData);
  }
}
