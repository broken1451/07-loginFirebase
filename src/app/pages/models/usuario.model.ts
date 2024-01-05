
/**
 * Clase que representa un modelo de usuario.
 */
export class UsuarioModel {
    
    public nombre?: string;
    public email: string;
    public password: string;

    constructor() {
        this.nombre = '';
        this.email = '';
        this.password = '';
    }
}

