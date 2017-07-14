import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { Customer } from './customer';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CustomerService{
    private headers = new Headers({ 'Content-Type': 'application/json'});
    private apiUrl = 'http://localhost:8085/api/customer';
    
    constructor(private http: Http){}

    getCustomerList(): Promise<Customer[]>{
        return this.http.get(this.apiUrl)
            .toPromise()
            .then(response => response.json() as Customer[])
            .catch(this.errorHandler);
    };

    getCustomer(firstName: String): Promise<Customer>{
        const url = `${this.apiUrl}/${firstName}`;
        return this.http.get(url)
         .toPromise()
         .then(response => response.json() as Customer)
         .catch(this.errorHandler);
    };

    createCustomer(customer: Customer): Promise<Customer>{
        return this.http.post(this.apiUrl, JSON.stringify(customer), {headers: this.headers})
            .toPromise()
            .then(() => customer)
            .catch(this.errorHandler);
    }

    updateCustomer(customer : Customer): Promise<Customer>{
        const url = `${this.apiUrl}/${customer.firstName}`;
        return this.http.put(url, JSON.stringify(customer), {headers: this.headers})
            .toPromise()
            .then(() => customer)
            .catch();
    };

    deleteCustomer(firstName: String): Promise<void>{
        const url = `${this.apiUrl}/${firstName}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise()
        .then(() => null)
        .catch(this.errorHandler);
    };

    private errorHandler(error: any) : Promise<any>{
        console.log('An error occurred : ' + error );
        return Promise.reject(error.message || error);
    };
}