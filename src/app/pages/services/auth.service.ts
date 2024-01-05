import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usertoken!: string;


  constructor(private httpClient: HttpClient) { 
    this.leerToken();
  }

  logout() {
    localStorage.removeItem('token');
  }

  login(email: string, password: string) {
    return this.httpClient.post(`${environment.registerAndLogin}:signInWithPassword?key=${environment.apiKey}`, { email, password, returnSecureToken: true }).pipe(
      map((res: any) => {
        this.saveToken(res['idToken']);
        return res;
      })
    )
  }

  register(usuario: UsuarioModel) {
    const authData = {
      // email: usuario.email,
      // password: usuario.password,
      // nombre: usuario.nombre,
      ...usuario,
      returnSecureToken: true
    };
    
    return this.httpClient.post(`${environment.registerAndLogin}:signUp?key=${environment.apiKey}`, authData).pipe( 
      map((res: any) => {
        this.saveToken(res['idToken']);
        return res;
      })
    );
  }



  /**
   * Guarda el token de autenticación en el almacenamiento local y establece su fecha de expiración.
   * @param idToken El token de autenticación a guardar.
   */
  private saveToken(idToken: string) { 
    this.usertoken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira', hoy.getTime().toString());
  }

  private leerToken(): string {
    if (localStorage.getItem('token')) {
      this.usertoken = localStorage.getItem('token') || '';
    } else {
      this.usertoken = '';
    }
    return this.usertoken;
  }

  isAuthenticated(): boolean {
    
    // return this.usertoken.length > 2;
    if (this.usertoken.length < 2) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expiraDate > new Date()) {
      return true;
    } else {
      return false;
    }
  }

}