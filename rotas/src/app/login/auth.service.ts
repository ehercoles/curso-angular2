import { EventEmitter, Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;
  mostraMenu = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  fazerLogin(usuario: Usuario) {
    if (usuario.nome === 'usuario@email.com'
      && usuario.senha === '123456') {

      this.usuarioAutenticado = true;
      this.mostraMenu.emit(true);
      this.router.navigate(['/']);
    }
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }
}
