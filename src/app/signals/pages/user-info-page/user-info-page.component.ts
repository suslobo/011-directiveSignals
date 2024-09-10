import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';
import { User } from '../../interfaces/user-request.interface';


@Component({
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.css'
})
export class UserInfoPageComponent implements OnInit {
  //creamos las propiedades
  //hacermos la inyección de nuestro servicio usersService
  private usersService = inject(UsersServiceService);
  public userId = signal(1);   //usuario inicial

  public currentUser = signal<User | undefined>(undefined);  //usuario actual
  public userWasFound = signal(true);

  public fullName = computed<string>( () => { //nombre
    //si no tenemos ese usuario
    if ( !this.currentUser() ) return 'Usuario no encontrado';
    //si tenemos un usuario y no es un valor undefined
    return `${ this.currentUser()?.first_name } ${ this.currentUser()?.last_name }`;

  });

  ngOnInit(): void {
    this.loadUser( this.userId() ) //este es el valor de la señal
  }
  //en el OnInit vamos a llamar el método loadUser
  loadUser( id: number ){
    //si el id es menor o igual que 0, que no haga nada
    if ( id <= 0 ) return;
    //si es un valor mayor a 0
    this.userId.set(id); //sincrono
    this.currentUser.set(undefined);
    //ahora hacemos la petición http
    this.usersService.getUserById( id )
      .subscribe({ //cuando todo sale bien
        next: (user) => {
          this.currentUser.set( user );
          this.userWasFound.set(true);
        },
        error: () => {  //si sucede un error
          this.userWasFound.set(false);
          this.currentUser.set(undefined);
        },
    });



  }

}
