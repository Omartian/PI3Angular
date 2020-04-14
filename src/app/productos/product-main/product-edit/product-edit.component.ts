import { Component, OnInit } from '@angular/core';
import { Product, Especificacion } from '../../Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../products.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  producto: Product;
  productos: Product[];
  specsProto: Especificacion;

  marcas: string[];
  url: string;


  constructor(private route: ActivatedRoute, private productoService: ProductsService, private router: Router) {
    this.url = router.url;
    this.specsProto = {atributo: '', valor: '', unidad: ''};
    this.productos =  this.productoService.getProducts();
    this.marcas = this.productos.map((item) => item['marca']);

    console.log(this.productos);
   }

  ngOnInit(): void {
    if (this.url.includes('edit')) {
      this.producto = this.productoService.getProduct(Number(this.route.snapshot.params.id));
    }
    if (this.url.includes('new')) {
      this.producto = new Product(null, '', '', '', null, null, []);
    }
  }

  submit(form: NgForm) {
    if (form.valid && this.url.includes('edit')) {
      this.productoService.updateProduct(this.producto);
    } else if (form.valid && this.url.includes('new')) {
      this.productoService.newProduct(this.producto);
      console.log('New Product submit');
    }
  }

  newSpecs() {
    this.producto.especificacion.push(this.specsProto);
  }

  removeSpec(pos) {
    this.producto.especificacion.splice(pos, 1);
  }
}
