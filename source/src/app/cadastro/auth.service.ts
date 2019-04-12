import { Injectable, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Usuario } from './usuario';


@Injectable()
export class AuthService {
    public usuarioAutenticado: boolean = false;

    mostrarMenuEmitter = new EventEmitter<boolean>();

    constructor(private router: Router) { }

    fazerCadastro(usuario: Usuario) {
        this.usuarioAutenticado = true;

        this.mostrarMenuEmitter.emit(true);

        this.router.navigate(['/home']);

        // if (usuario.nome == 'usuario@email.com' && usuario.senha == '123456') {
            
        //     // SETAR LOCAL STORAGE ID
        // } else {
        //     this.usuarioAutenticado = false;
        //     this.mostrarMenuEmitter.emit(false);
		// }
	}
	


    verificaAdmin() {
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                // if(val.url.indexOf('admin') > -1 || !this.usuarioAutenticado) {
                if(val.url.indexOf('admin') > -1) {
                    this.usuarioAutenticado = false;
                    this.mostrarMenuEmitter.emit(false);
                }else {
                    this.usuarioAutenticado = true;
                    this.mostrarMenuEmitter.emit(true);
                }
            }  
        });
    }

    usuarioEstaAutenticado() {
        return this.usuarioAutenticado;
    }

}
