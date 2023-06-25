import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { MAT_DATE_FORMATS } from '@angular/material/core';
// import { FeatureModuleBService } from '../feature-module-b.service';
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'MMM DD, YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]  
})
export class AppComponent implements OnInit {
  title = 'product-front-end';

  
  ngOnInit(): void {
  }

}