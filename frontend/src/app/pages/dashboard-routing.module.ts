import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { routeGuard } from '../guards/route.guard';
import { EmployeeComponent } from './employee/employee.component';
import { Dashboard2Component } from './dashboard2/dashboard2.component';
import { SupplierComponent } from './supplier/supplier.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: "dashboard" , component : Dashboard2Component , canActivate: [routeGuard], data: { expectedRole: 'admin' } } , 
  { path: "employee" , component : EmployeeComponent  , canActivate: [routeGuard], data: { expectedRole: 'admin' } } , 
  { path: "supplier" , component : SupplierComponent  , canActivate: [routeGuard], data: { expectedRole: 'admin' } } , 
  { path: "warehouse" , component : WarehouseComponent  , canActivate: [routeGuard], data: { expectedRole: 'admin' } } , 
  { path: "product" , component : ProductComponent  , canActivate: [routeGuard], data: { expectedRole: 'admin' } } , 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
