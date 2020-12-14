import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PersonneService {

  constructor( private httpClient: HttpClient) { }
  getAllUsers(id) {
    return this.httpClient.get(`https://swapi.co/api/people/${id}`);
  }
}
