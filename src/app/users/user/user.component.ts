import { Component } from '@angular/core';
import { UserService } from '../service';
import { User } from '../userModel';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  showModal: boolean = false;
  selectUser: User | null = null;


  constructor(
    private userService: UserService,
  ){}

  abrirModal(): void{
    this.showModal = true;
  }
  
  cerrarModal(): void {
    this.showModal = false;
    this.selectUser = null;
  }
  

  verDetallesUsuario(id: number):void{
    this.userService.obtenerUsuarioPoId(id).subscribe((data: User)=>{
      this.selectUser = data;
      this.showModal = true;
    });


  }

}


