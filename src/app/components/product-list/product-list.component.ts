import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild  } from '@angular/core';
import { Product, ProductColumns } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog'
import { jsonIgnore } from "json-ignore";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'], 
  
})
  export class ProductListComponent implements OnInit {
  products?: Product[];
  currentProduct: Product = {};
  currentIndex = -1;
  name = '';
  displayedColumns: string[] = ProductColumns.map((col) => col.key)
  columnsSchema: any = ProductColumns
  columns = ["Name","Owner Name","Master Name", "Methodology", "Location"];
  

  dataSource = new MatTableDataSource<Product>();
  valid: any = {}
  constructor(
    public dialog: MatDialog,
    private productService: ProductService
    ) { }

  ngOnInit(): void {
    this.retrieveProduct();
    this.productService.getAll().subscribe((res: any) => {
      this.dataSource.data = res
    })    
  }
  @Input('value')
  set value(value: string | null) {
    debugger
  }
  addRow() {
    const newRow: Product = {
      id: 0,
      name: '',
      ownerName: '',
      masterName: '',
      startDate: '',
      methodology: '',
      location: '',
      developers: '',
      isEdit: true,
      // isSelected: false,      
    }
    
    this.dataSource.data = [newRow, ...this.dataSource.data]
  }
  // editRow(row: Product) {
  //   this.productService.update(row).subscribe(() => row.isEdit = false);
  // }
  editRow(row: Product) {
    debugger
    if (row.id === 0) {
      this.productService.create(row).subscribe((newProduct: Product) => {
        row.id = newProduct.id
        row.isEdit = false
      })
    } else {
      this.productService.update(row).subscribe(() => row.isEdit = false);
    }
  }
  inputHandler(e: any, id: number, key: string) {
    if (!this.valid[id]) {
      this.valid[id] = {}
    }
    this.valid[id][key] = e.target.validity.valid
  }
  parseJson(str: string): any { 
    return JSON.parse(str).map((o:any)=>o.name).join(', ');
  }
  removeRow(id: number) {
    // this.productService.deleteUser(id).subscribe(() => {
    //   this.dataSource.data = this.dataSource.data.filter(
    //     (u: Product) => u.id !== id,
    //   )
    // })
  }
  disableSubmit(id: number) {
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false)
    }
    return false
  }
  retrieveProduct(): void {
    this.productService.getAll()
      .subscribe({
        next: (data) => {
          this.products = data;
          this.dataSource.data = data;
             console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refreshList(): void {
    this.retrieveProduct();
    this.currentProduct = {};
    this.currentIndex = -1;
  }

  setActiveProduct(product: Product, index: number): void {
    this.currentProduct = product;
    this.currentIndex = index;
  }

  removeAllProduct(): void {
    this.productService.deleteAll()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refreshList();
        },
        error: (e) => console.error(e)
      });
  }
  // isAllSelected() {
  //   return this.dataSource.data.every((item) => item.isSelected)
  // }

  // isAnySelected() {
  //   return this.dataSource.data.some((item) => item.isSelected)
  // }

  // selectAll(event: any) {
  //   this.dataSource.data = this.dataSource.data.map((item) => ({
  //     ...item,
  //     isSelected: event.checked,
  //   }))
  // }
  // searchName(): void {
  //   this.currentProduct = {};
  //   this.currentIndex = -1;

  //   this.productService.findByTitle(this.name)
  //     .subscribe({
  //       next: (data) => {
  //         this.products = data;
  //         console.log(data);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }
}