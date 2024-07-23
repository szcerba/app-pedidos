import {Component, inject, OnInit} from '@angular/core';
import {HeaderService} from "../../core/services/header.service";
import {CartService} from "../../core/services/cart.service";
import {CommonModule} from "@angular/common";
import {ContadorCantidadComponent} from "../../core/components/contador-cantidad/contador-cantidad.component";
import {Producto} from "../../core/interfaces/productos";
import {ProductosService} from "../../core/services/productos.service";
import {RouterModule} from "@angular/router";
import {PerfilService} from "../../core/services/perfil.service";

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [
    CommonModule,
    ContadorCantidadComponent,
    RouterModule
  ],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.scss'
})
export class CarritoComponent implements OnInit {

  headerService = inject(HeaderService);
  cartService = inject(CartService);
  productosService = inject(ProductosService);
  perfilService = inject(PerfilService);

  productosCarrito: Producto[] = [];

  subtotal = 0;
  delivery = 100;
  total = 0;

  ngOnInit(): void {
    this.headerService.titulo.set("Carrito");
    this.cartService.carrito.forEach(async itemCarrito => {
      const res = await this.productosService.getById(itemCarrito.idProducto);
      if (res) this.productosCarrito.push(res);
      this.calcularInformacion();
    })
  }

  eliminarProducto(id: number) {
    this.cartService.eliminarProducto(id);
  }

  calcularInformacion() {
    this.subtotal = 0;
    this.total = 0;
    for (let i = 0; i < this.productosCarrito.length; i++) {
      this.subtotal += this.productosCarrito[i].precio * this.cartService.carrito[i].cantidad;
    }
    this.total = this.subtotal + this.delivery;
  }

  cambiarCantidadProducto(id: number, cantidad: number) {
    this.cartService.cambiarCantidadProducto(id, cantidad);
    this.calcularInformacion();
  }
}
