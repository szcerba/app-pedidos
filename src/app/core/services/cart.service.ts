import {Injectable} from '@angular/core';
import {Cart} from "../interfaces/carrito";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {
    const carrito = localStorage.getItem('carrito')
    if (carrito) {
      this.carrito = JSON.parse(carrito)
    }
  }

  carrito: Cart[] = []

  agregarProducto(idProducto: number, cantidad: number, notas: string) {
    const i = this.carrito.find(producto => producto.idProducto === idProducto)
    if (i) {
      i.cantidad += cantidad
    } else {
      this.carrito.push({idProducto, cantidad, notas})
    }
    this.actualizarAlmacenamiento()
  }

  eliminarProducto(id: number) {
    this.carrito = this.carrito.filter(producto => producto.idProducto !== id);
    if(this.carrito.length === 0) {
      return localStorage.removeItem('carrito')
    }
    this.actualizarAlmacenamiento()
  }

  cambiarCantidadProducto(id: number, cantidad: number) {
    this.carrito = this.carrito.map(producto => {
      if (producto.idProducto === id) {
        producto.cantidad = cantidad
      }
      return producto
    })
    this.actualizarAlmacenamiento()
  }

  actualizarAlmacenamiento() {
    localStorage.setItem('carrito', JSON.stringify(this.carrito))
  }

  vaciar() {
    this.carrito = []
    localStorage.removeItem('carrito')
  }
}
