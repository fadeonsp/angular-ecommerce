import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public productList = new BehaviorSubject<any>([])
  public cartItem: any = []

  constructor(private http: HttpClient) { }

  getProd() {
    return this.productList.asObservable()
  }
  addCart(product: any) {
    this.cartItem.push(product)
    this.productList.next(this.cartItem)
    this.getTotalPrice()
  }
  // total price
  getTotalPrice(): number {
    let grandTotal = 0
    this.cartItem.map((a:any)=>{
      grandTotal += a.total
     // console.log(grandTotal)
    })
    return grandTotal
  }
  // empty or delete all
  removeAllCart() {
    this.cartItem = []
    this.productList.next(this.cartItem)
  }
  removeCartItem(product:any) {
    this.cartItem.map((a:any, index: any)=> {
      if(product.id === a.id)
      this.cartItem.splice(index, 1)
    })
    this.productList.next(this.cartItem)
  }
}
