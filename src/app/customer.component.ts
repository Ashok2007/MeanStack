import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Customer } from './customer';
import { CustomerService } from './customer.service'

@Component({
    selector:'my-customer',
    templateUrl:'./customer.component.html'
})

export class CustomerComponent  {
    title = 'Custmer Page';
    customer: Customer = new Customer();

    constructor(
        private customerService : CustomerService,
        private router : Router,
        private location : Location
        ){}


    save(): void {
        this.customerService.createCustomer(this.customer)
        .then(() => { this.router.navigate([ '/dashboard']);  });                  
    }

    goBack() {
        this.location.back();
    }    
}