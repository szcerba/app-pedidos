import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  titulo = signal( "Título");
  extendido = signal(false);

}
