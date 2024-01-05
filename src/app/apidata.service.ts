import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'

})
export class ApidataService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getApiData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
