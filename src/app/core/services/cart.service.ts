import {Injectable} from '@angular/core';
import {Cart} from "../interfaces/carrito";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private config: ConfigService) {
    const carrito = localStorage.getItem('carrito')
    if (carrito) {
      const carritoGuardado = JSON.parse(carrito);
      if (carritoGuardado) {
        const fechaGuardado = new Date(carritoGuardado.fecha);
        const fecha = new Date();
        if (fecha.getTime() - fechaGuardado.getTime() > 1000 * 60 * 60 * 24 * this.config.configuracion().diasVencimientoCarrito) {
          localStorage.removeItem('carrito')
        } else {
          this.carrito = carritoGuardado.productos
        }
      }
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
    if (this.carrito.length === 0) {
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
    const fecha = new Date();
    const elementoAGuardar = {
      fecha,
      productos: this.carrito
    }
    localStorage.setItem('carrito', JSON.stringify(elementoAGuardar))
  }

  vaciar() {
    this.carrito = []
    localStorage.removeItem('carrito')
  }
}
