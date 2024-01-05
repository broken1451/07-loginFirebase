import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent implements OnInit {

  public usuario: UsuarioModel = new UsuarioModel();
  public recordarme = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // this.usuario.email = 'adrianbravo145@gmail.com';
  }


  onSubmit(form: NgForm) {
    // pristine - el formulario es válido y no ha sido modificado o tocado
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

    this.authService.register(this.usuario).subscribe({
      next: (resp) => {
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
          title: 'Error al registrar'
        });
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

}
