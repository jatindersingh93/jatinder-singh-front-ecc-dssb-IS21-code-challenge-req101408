import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentProduct: Product = {
    name: '',
    ownerName: '',
    masterName: '',
    methodology: '',
    location: '',
  };
  message = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      //this.getTutorial(this.route.snapshot.params["id"]);
    }
  }

  getTutorial(id: string): void {
    this.productService.get(id)
      .subscribe({
        next: (data) => {
          this.currentProduct = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  // updatePublished(status: boolean): void {
  //   const data = {
  //     name: this.currentProduct.name,
  //     ownerName: this.currentProduct.ownerName,
  //     masterName: this.currentProduct.masterName,
  //     methodology: this.currentProduct.methodology,
  //     location: this.currentProduct.location,      
  //   };

  //   this.message = '';

  //   this.productService.update(this.currentProduct.id, data)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.currentProduct.name = status;
  //         this.message = res.message ? res.message : 'The status was updated successfully!';
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

  // updateTutorial(): void {
  //   this.message = '';

  //   this.tutorialService.update(this.currentTutorial.id, this.currentTutorial)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.message = res.message ? res.message : 'This tutorial was updated successfully!';
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

  // deleteTutorial(): void {
  //   this.tutorialService.delete(this.currentTutorial.id)
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.router.navigate(['/tutorials']);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // } 
}
