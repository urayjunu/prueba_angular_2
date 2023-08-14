import { Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Product } from 'src/app/models/product';

import { AuthService } from 'src/app/services/auth.service';
import { ProductListService } from 'src/app/services/productList.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-productlist',
    templateUrl: './productlist.component.html',
    encapsulation:ViewEncapsulation.None
})
export class ProductlistComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  title = 'Product List';
  id: number | undefined;
  contactForm : any = FormGroup;
  selected:any;
  limit;
  logStatus:any;
  opcionLimit: string  = '10'; 
  content:any[] = [];
    
  public product: Product;
  
  constructor(
              private _productService: ProductListService,
              private fb:FormBuilder,
              public authS : AuthService,
              private router: Router,
              private modal: NgbModal
    ) {
      this.product = new Product(0,'','','','','');
      this.limit = [5,10,15,20];
        
   }
   ngOnInit(){
    console.log("se ejecuto el producto");
    this.getProducList();
    this.getCategoriesList();
    this.contactForm = this.fb.group({
      category: [null]
    });
    this.authS.isLoggedIn.subscribe((status) => {
      this.logStatus = status;
    });
  }
  
  logout() { 
    this.authS.logoutUser();
    this.router.navigate(['/login']);
  }
 
  getProducList() {
    this._productService.getProducList().subscribe(data  => {
      this.products = data;  
      
    }, error=> {
      console.log('entro error:'+error);
    })
  }

  getCategoriesList() {
    this._productService.getCategories().subscribe(data  => {
      this.categories = data;
      
    }, error=> {
      console.log('Error:'+error);
    })
  }
  onOptionsSelected() {

    if(this.selected != ""){
      this._productService.seachCategory(this.selected).subscribe( data => {
        this.products = data;
      
      })
    }else{  
          if(this.selected == "0"){
            this.getProducList();
          }
    }
  }
  onLimitSelected() {
    this._productService.limitProducts(this.opcionLimit).subscribe(data =>{
      this.products = data;
    })
  }
  openMo(content:any, id :number){
    this._productService.productM(id).subscribe(data =>{
      this.product = data;
      this.modal.open(content);
    })
  }

}
