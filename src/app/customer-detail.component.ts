import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { Customer } from './customer';
import { CustomerService } from './customer.service';

import 'rxjs/add/operator/switchMap';

@Component({
    selector:'my-customer-detail',
    templateUrl: './customer-detail.component.html'
})

export class CustomerDetailComponent implements OnInit {
    customer: Customer;

    constructor(
        private customerService : CustomerService,
        private route : ActivatedRoute,
        private location : Location
    ){}

    ngOnInit() : void {
        this.route.paramMap
        .switchMap((params: ParamMap) => this.customerService.getCustomer(params.get('firstName')))
        .subscribe(cust => this.customer = cust);
    }

    save() : void {
        this.customerService.updateCustomer(this.customer)
        .then(() => { this.goBack(); });
    }

    goBack(): void{
        this.location.back();
    }

}