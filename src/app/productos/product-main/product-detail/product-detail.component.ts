import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../products.service';
import { Product } from '../../Product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  producto: Product;

  constructor(private route: ActivatedRoute, private productoService: ProductsService) {}

  ngOnInit(): void {
    this.producto = this.productoService.getProduct(Number(this.route.snapshot.params.id));
  }
}
