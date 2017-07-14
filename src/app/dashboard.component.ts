import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from './customer';
import { CustomerService } from './customer.service'

@Component({
    selector:'my-dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    title = "Dashboard Page";
     customerList: Customer[] = [];

    constructor(
        private customerService : CustomerService,
        private router : Router
        ){}

    ngOnInit(): void {
        this.customerService.getCustomerList()
        .then(custResponse => this.customerList = custResponse); 
    }

    onUpdate(customer: Customer): void {
        this.router.navigate([ '/customer', customer.firstName ]);            
    }

    onDelete(customer: Customer): void {
        this.customerService.deleteCustomer(customer.firstName)
        .then(() => {
            this.customerList = this.customerList.filter( c=> c !== customer);
        });
    }
}