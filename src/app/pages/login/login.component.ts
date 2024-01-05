import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../models/usuario.model';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public usuario: UsuarioModel = new UsuarioModel();
  public recordarme = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email') || '';
      this.recordarme = true;
    }
  }

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false, // no se puede cerrar el modal dando click fuera de él
      text: 'Espere por favor...',
      icon: 'info',
      didOpen: () => {
        Swal.showLoading();
      }
    });
    const { email, password } = this.usuario;
    this.authService.login(email, password).subscribe({
      next: (resp) => {
        console.log(resp);
        Swal.close();
        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigate(['/home']);
      },
      error: (err) => {
        Swal.fire({
          allowOutsideClick: true, // no se puede cerrar el modal dando click fuera de él
          text: err.error.error.message,
          icon: 'error',
          title: 'Error al autenticar'
        });
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

}
