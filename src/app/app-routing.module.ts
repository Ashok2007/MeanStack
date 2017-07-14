import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { CustomerComponent } from './customer.component';
import { CustomerDetailComponent } from './customer-detail.component';

const routes: Routes = [
    {path: '', redirectTo:'/dashboard', pathMatch:'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'customer', component: CustomerComponent },
    {path: 'customer/:firstName', component: CustomerDetailComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes)],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}