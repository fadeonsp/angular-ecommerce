import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/api/cart.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products!: any[]
  public grandTotal: number = 0

  constructor(
    private cart: CartService,
    private toast: NgToastService
    ) {}

  ngOnInit(): void {
      this.cart.getProd().subscribe(res=> {
      this.products = res
      this.grandTotal = this.cart.getTotalPrice()
      })
  }
  emptyCart() {
    this.toast.warning({detail:'excluir todos os itens', summary:'todos os itens foram excluídos', duration:1000})
    this.cart.removeAllCart()
  }
  deleteCart(item:any) {
    this.toast.warning({detail:'excluir do carrinho', summary:'o item foi excluído', duration:1000})
    this.cart.removeCartItem(item)
  }
}
