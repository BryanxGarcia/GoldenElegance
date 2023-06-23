import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/productsService/products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

constructor (private productS : ProductsService ){}


}
