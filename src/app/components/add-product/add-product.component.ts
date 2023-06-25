import { Component } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
    product: Product = {
      name: '',
      ownerName: '',
      masterName: '',
      methodology: '',
      location: ''
    };
    submitted = false;

    constructor(private productService: ProductService) { }

    ngOnInit(): void {
    }

    saveProduct(): void {
      const data = {
        name: this.product.name,
        ownerName: this.product.ownerName,
        masterName: this.product.masterName,
        methodology: this.product.methodology,
        location: this.product.location,
      };

      this.productService.create(data)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.submitted = true;
          },
          error: (e) => console.error(e)
        });
    }

    newProduct(): void {
      this.submitted = false;
      this.product = {
        name: '',
        ownerName: '',
        masterName: '',
        methodology: '',
        location: ''
      };
    }
}
