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
  totalProducts = 0;
  

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
      this.totalProducts = res.length   
    })    
  }
  @Input('value')
  set value(value: string | null) {    
  }
  // Trigger with Add Product 
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
    }
    
    this.dataSource.data = [newRow, ...this.dataSource.data]
    this.totalProducts = this.dataSource.filteredData.length
  }
  // Handle Product edit and create
  editRow(row: Product) {
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
  // Parse array object on fly
  parseJson(str: string): any { 
    if (str==''){
      return ''
    }
    return JSON.parse(str).map((o:any)=>o.name).join(', ');
  }

  //button disable function
  disableSubmit(id: number) {
    
    if (this.valid[id]) {
      return Object.values(this.valid[id]).some((item) => item === false)
    }
    return false
  }

  // Main call to pull data
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
}