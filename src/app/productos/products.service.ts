import { Injectable } from '@angular/core';
import { Product, Especificacion } from './Product';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productos: Product[];
  monitored: number[];

  productosSubject = new Subject<Product[]>();
  monitoredSubject = new Subject<number[]>();

  constructor() {
    this.productos = [
      new Product(1, 'Macbook Air', 'Apple', 'Laptop ultraligera', 18999, 14,
        [new Especificacion('Procesador', '4.00', 'Ghz')]),
      new Product(2, 'OnePlus 7t', 'OnePlus', 'Smartphone de gama alta', 12999, 49,
        [new Especificacion('Frecuencia Pantalla', '90', 'Hz')]),
      new Product(3, 'Moto 360', 'Motorola', 'Smartwatch moderno', 5999, 21,
        [new Especificacion('Batería', '800', 'mAh')]),
      new Product(4, 'Kindle Paperwhite', 'Amazon', 'E-book con luz', 2200, 70,
        [new Especificacion('Almacenamiento', '4', 'GB')]),
      new Product(5, 'Google Home', 'Google', 'Asistente inteligente', 999, 121,
        [new Especificacion('Wi-Fi', '2.4/5.0', 'Ghz')])
    ];

    this.monitored = [];

    this.productosSubject.next(this.getProducts());
    this.monitoredSubject.next(this.getMonitored());
  }

  getProducts(): Product[] {
    return this.productos.slice();
    
  }

  getProduct(id): Product {
    return this.productos.find(i => i.uid === id);
  }

  newProduct(producto) {
    console.dir(producto);
    console.log(this.productos);
    this.productos.push(producto);
    window.alert('Producto Creado!');

  }

  removeProduct(id){
    this.removeMonitored(id);
    this.productos.splice(this.productos.findIndex(i => i.uid === id), 1);
    this.productosSubject.next(this.productos);
    window.alert('Producto borrado!');
  }

  removeMonitored(id){
    this.monitored.splice(this.monitored.indexOf(id), 1);
    window.alert('Producto borrado de monitoreados!');
  }

  updateProduct(producto){
    this.productos[this.productos.indexOf(producto)] = producto;
    window.alert('Producto actualizado!');
  }

  getMonitored(): number[]{
    return this.monitored.slice();
  }

  addMonitored(id) {
    if (!this.monitored.includes(id)) {
      this.monitored.push(id);
      window.alert('Producto(s) agregados a monitoreo!');
    }
  }
}
