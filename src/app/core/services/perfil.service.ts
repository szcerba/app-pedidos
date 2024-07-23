import {Injectable, signal, WritableSignal} from '@angular/core';
import {Perfil} from "../interfaces/perfil";

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor() {

    const perfil = localStorage.getItem('perfil');
    if (perfil) {
      this.perfil.set(JSON.parse(perfil));
    }
  }

  perfil:WritableSignal<Perfil | undefined> = signal(undefined);

  guardarDatos(perfil: Perfil) {
    localStorage.setItem('perfil', JSON.stringify(perfil));
    this.perfil.set(perfil);
  }
}
