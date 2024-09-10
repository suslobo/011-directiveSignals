import { Component, inject, OnInit, signal } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { User } from '../../interfaces/user-request.interface';


@Component({
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css'
})
export class UserInfoPageComponent implements OnInit {

  //hacermos la inyección de nuestro servicio usersService
  private usersService = inject(UsersServiceService);
  public userId = signal(1);   //usuario inicial

  public currentUser = signal<User | undefined>(undefined);  //usuario actual
  public userWasFound = signal(true);

  ngOnInit(): void {
    this.loadUser( this.userId() ) //este es el valor de la señal
  }
  //en el OnInit vamos a llamar el método loadUser
  loadUser( id: number ){
    //si el id es menor o igual que 0, que no haga nada
    if ( id <= 0 ) return;
    //si es un valor mayor a 0
    this.userId.set(id); //sincrono
    //ahora hacemos la petición http
    this.usersService.getUserById( id )
      .subscribe( user => {
        this.currentUser.set( user )
      })



  }

}
