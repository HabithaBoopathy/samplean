import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { Sample } from '../models/sample';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  URL='http://localhost:8090/';
  constructor(private http:HttpClient) { }
  createCustomer(customer:Customer): Observable<boolean> {
    return this.http.post<boolean>(`${this.URL}customer`, customer);
  }
  getCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.URL}customer`);
  }
  getSample(): Observable<Sample[]> {
    return this.http.get<Sample[]>(`${this.URL}sample`);
  }
  incrementSampleNoReference(): Observable<Boolean> {
    return this.http.get<Boolean>(
      `${this.URL}sample/increment/sampleNo`
    );
  }
  updateCustomer(customer:Customer): Observable<boolean> {
    return this.http.put<boolean>(`${this.URL}customers`, customer);
  }
}
