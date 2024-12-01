import { Component } from '@angular/core';
import { TerminalServiceagg } from './service';
import Swal from 'sweetalert2';
import { AuthService } from '../../service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregarterminal',
  templateUrl: './agregarterminal.component.html',
  styleUrls: ['./agregarterminal.component.css']
})
export class AgregarterminalComponent {
  terminalData: any = {
    nombre: '',
    num: '',
    municipio: '',
    colonia: '',
    calle: '',
    horarioApertura: '',
    horarioCierre: '',
    telefono: '',
    cp: '',
    estado: '',
    administradorid: null 
  };
  administradorid: number | null = null;
  colonias: any[] = [];
  loadingColonias = false;

  constructor(
    private terminalServiceagg: TerminalServiceagg,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const administradorid = this.authService.getAdminId();
    console.log('Admin ID:', administradorid); // Verificar el valor
    if (administradorid) {
      this.terminalData.administradorid = administradorid;
    } else {
      console.error('No se pudo obtener el ID del administrador');
    }
  }
  
  
  obtenerColoniasPorCP(): void {
    const cp = this.terminalData.cp;
  
    if (cp && cp.length === 5) {
      this.terminalServiceagg.obtenerColoniasPorCp(cp).subscribe({
        next: (response) => {
          console.log('Respuesta de colonias:', response);
  
          // Validar y asignar colonias, estado y municipio
          if (response) {
            this.colonias = response.colonias || [];
            this.terminalData.estado = response.estado || '';
            this.terminalData.municipio = response.municipio || '';
          } else {
            this.colonias = [];
            this.terminalData.estado = '';
            this.terminalData.municipio = '';
          }
        },
        error: (err) => {
          console.error('Error al obtener las colonias:', err);
  
          // En caso de error, limpiar los campos relacionados
          this.colonias = [];
          this.terminalData.estado = '';
          this.terminalData.municipio = '';
        },
      });
    } else {
      // Limpiar campos si el CP no es válido
      this.colonias = [];
      this.terminalData.estado = '';
      this.terminalData.municipio = '';
    }
  }
  

  agregarTerminal(): void {
    const { nombre, num, cp, horarioApertura, horarioCierre, telefono } = this.terminalData;
  
    if (!nombre || nombre.trim() === '') {
      Swal.fire('Error', 'El campo "Nombre" es obligatorio.', 'error');
      return;
    }
  
    if (!/^\d{1,4}$/.test(num)) {
      Swal.fire('Error', 'El número exterior debe tener entre 1 y 4 dígitos.', 'error');
      return;
    }
  
    if (!/^\d{5}$/.test(cp)) {
      Swal.fire('Error', 'El código postal debe tener exactamente 5 dígitos.', 'error');
      return;
    }
  
    if (telefono && !/^\d{10}$/.test(telefono)) {
      Swal.fire('Error', 'El teléfono debe tener exactamente 10 dígitos.', 'error');
      return;
    }
  
    if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(horarioApertura)) {
      Swal.fire('Error', 'El horario de apertura debe estar en formato 24 horas (HH:mm).', 'error');
      return;
    }
  
    if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(horarioCierre)) {
      Swal.fire('Error', 'El horario de cierre debe estar en formato 24 horas (HH:mm).', 'error');
      return;
    }
  
    if (horarioApertura >= horarioCierre) {
      Swal.fire('Error', 'El horario de apertura debe ser menor al horario de cierre.', 'error');
      return;
    }
  
    console.log('Datos a enviar:', this.terminalData);
    this.terminalServiceagg.agregarTerminal(this.terminalData).subscribe(
      (response) => {
        Swal.fire('Éxito', 'Terminal creada exitosamente', 'success');
      },
      (error) => {
        console.error('Error al crear la terminal:', error);
        Swal.fire('Error', 'Hubo un problema al crear la terminal', 'error');
      }
    );
  }

  
  validarHorario(tipo: string): void {
    const horario = tipo === 'apertura' ? this.terminalData.horarioApertura : this.terminalData.horarioCierre;
  
    if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(horario)) {
      Swal.fire('Error', `El horario de ${tipo} debe estar en formato 24 horas (HH:mm).`, 'error');
      if (tipo === 'apertura') {
        this.terminalData.horarioApertura = '';
      } else {
        this.terminalData.horarioCierre = '';
      }
    }
  
  }
}