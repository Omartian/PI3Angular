import { Component, OnInit, Input, Output } from '@angular/core';
import { Product } from 'src/app/productos/Product';
import { ProductsService } from 'src/app/productos/products.service';
import { Router, NavigationEnd } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  url: string;

  @Input() producto: Product;
  @Input() id: number;

  @Output() addSelected = new EventEmitter<number>();

  constructor(private productoService: ProductsService, private router: Router) {
    this.url = this.router.url;

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    })
   }

  ngOnInit(): void {
  }

  removeProduct(id) {
    this.productoService.removeProduct(id);
  }

  removeMonitored(id) {
    this.productoService.removeMonitored(id);
  }

  addToMonitored(event) {
    this.addSelected.emit(event);
  }
}
