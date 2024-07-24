import {Component, ElementRef, inject, OnInit, signal, ViewChild, WritableSignal} from '@angular/core';
import {HeaderService} from "../../core/services/header.service";
import {CartService} from "../../core/services/cart.service";
import {CommonModule} from "@angular/common";
import {ContadorCantidadComponent} from "../../core/components/contador-cantidad/contador-cantidad.component";
import {Producto} from "../../core/interfaces/productos";
import {ProductosService} from "../../core/services/productos.service";
import {Router, RouterModule} from "@angular/router";
import {PerfilService} from "../../core/services/perfil.service";
import {NUMERO_WHATSAPP} from "../../core/constantes/telefono";
import {ConfigService} from "../../core/services/config.service";

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
  configService = inject(ConfigService);
  router = inject(Router);

  productosCarrito: WritableSignal<Producto[]> = signal([]);

  subtotal = 0;
  total = 0;
  @ViewChild("dialog") dialog!: ElementRef<HTMLDialogElement>

  ngOnInit(): void {
    this.headerService.titulo.set("Carrito");
    this.buscarInformacionProducto().then(() => this.calcularInformacion());
  }

  async buscarInformacionProducto() {
    for (let i = 0; i < this.cartService.carrito.length; i++) {
      const itemCarrito = this.cartService.carrito[i];
      const res = await this.productosService.getById(itemCarrito.idProducto);
      if (res) this.productosCarrito.set([...this.productosCarrito(), res]);
    }
  }

  eliminarProducto(id: number) {
    this.cartService.eliminarProducto(id);
  }

  calcularInformacion() {
    this.subtotal = 0;
    this.total = 0;
    for (let i = 0; i < this.productosCarrito().length; i++) {
      this.subtotal += this.productosCarrito()[i].precio * this.cartService.carrito[i].cantidad;
    }
    this.total = this.subtotal + this.configService.configuracion().costoEnvio;
  }

  cambiarCantidadProducto(id: number, cantidad: number) {
    this.cartService.cambiarCantidadProducto(id, cantidad);
    this.calcularInformacion();
  }

  async enviarMensaje() {
    let pedido = "";
    for (let i = 0; i < this.cartService.carrito.length; i++) {
      const producto = await this.productosService.getById(this.cartService.carrito[i].idProducto);
      pedido += `* ${this.cartService.carrito[i].cantidad} - ${producto?.nombre}
`;
    }
    const mensaje = `
Hola! Soy ${this.perfilService.perfil()?.nombre}, y te quiero hacer el siguiente pedido:
${pedido}
Si te queres comunicar conmigo hacelo al N° del que te hablo o al ${this.perfilService.perfil()?.telefono}
La dirección de envío es ${this.perfilService.perfil()?.direccion} - ${this.perfilService.perfil()?.detalleEntrega}
Muchas gracias
`
    const link = `https://wa.me/${NUMERO_WHATSAPP}/?text=${encodeURI(mensaje)}`
    window.open(link, '_blank');
    this.dialog.nativeElement.showModal();
  }

  finalizarPedido() {
    this.cartService.vaciar();
    this.dialog.nativeElement.close();
    this.router.navigate(['/']);
  }

  editarPedido() {
    this.dialog.nativeElement.close();
  }
}
