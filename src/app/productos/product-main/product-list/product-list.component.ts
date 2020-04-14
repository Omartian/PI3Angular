import { Component, OnInit } from '@angular/core';
import { Product } from '../../Product';
import { Router } from '@angular/router';
import { ProductsService } from '../../products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productos: Product[];
  filtrados: Product[];
  prodFiltr: Product[];

  monitored: number[];
  busqueda = '';
  url: string;

  monitoredID: number;

  productoSub = new Subscription();

  constructor(private router: Router, private productoService: ProductsService) {
    this.url = this.router.url;
    this.monitoredID = null;

    this.filtrados = [];
    this.prodFiltr = [];

    this.monitored = this.productoService.getMonitored();
    this.productos = this.productoService.getProducts();
  }

  ngOnInit(): void {
    this.productoService.productosSubject.subscribe((data) => this.productos = data);

    for (let item of this.productos) {
      this.filtrados.push(item);
      if (this.monitored.includes(item.uid)) {
        this.prodFiltr.push(item);
      }
    }
  }

  search(){
    console.log(this.busqueda)
    if (this.url.includes('productos')) {
      this.filtrados = this.productos.filter((product) => {
        return product.nombre.toUpperCase().includes(this.busqueda.toUpperCase()) ||
               product.marca.toUpperCase().includes(this.busqueda.toUpperCase()) ||
               product.descripcion.toUpperCase().includes(this.busqueda.toUpperCase())
      });
    } else if (this.url.includes('monitoreo')) {
      this.prodFiltr = this.productos.filter((product) => {
        return (this.monitored.includes(product.uid)) && (
          product.nombre.toUpperCase().includes(this.busqueda.toUpperCase()) ||
          product.marca.toUpperCase().includes(this.busqueda.toUpperCase()) ||
          product.descripcion.toUpperCase().includes(this.busqueda.toUpperCase()))
      });
    }
  }

  addToMonitored($event){
    if(this.monitored.includes($event)) {
      this.monitored.splice(this.monitored.indexOf($event), 1);
    } else {
      this.monitored.push($event);
    }

    console.log(this.monitored);
  }

  addSelected() {
    for (let item of this.monitored) {
      this.productoService.addMonitored(item);
    }
  }
}
