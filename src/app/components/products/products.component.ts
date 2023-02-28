import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/api/cart.service';
import { ProductsService } from 'src/app/api/products.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public productList: any

  constructor(
    private api: ProductsService,
    private cart: CartService,
    private toast: NgToastService
    ) {}

  ngOnInit(): void {
    this.api.getProd().subscribe(res=>{
     // console.log(res)
     this.productList = res
     this.productList.forEach((a: any) => {
      Object.assign(a,{quantity:1, total:a.price})
     });
    })
  }
  // add to cart
  addCart(item: any) {
    this.toast.success({detail:'Adicionar ao carrinho', summary:'o item foi adicionado', duration:1000})
    this.cart.addCart(item)
    console.log(item)
  }
}
