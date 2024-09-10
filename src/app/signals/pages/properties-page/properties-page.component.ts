import { Component, computed, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent implements OnDestroy, OnInit {


  //Creamos otra señal - mutaciones
  public counter = signal(10);

  //mutaciones
  //nos creamos una nueva señal
  public user = signal<User>({
    id: 2,
    email: 'janet.weaver@reqres.in',
    first_name: 'Janet',
    last_name: 'Weaver',
    avatar: 'https://reqres.in/img/faces/2-image.jpg'
  });

  public fullName = computed( () => `${ this.user().first_name } ${ this.user().last_name }` )

  //creamos un efecto
  public userChangedEffect = effect( () => {
    console.log(`${this.user().first_name} - ${this.counter()}`);

  });

  //demostramos la limpieza autómatica del efecto
  ngOnInit(): void {
    //creamos un setInterval
    setInterval(() => {
      this.counter.update( current => current + 1);
    },1000) //cada segundo se incrementa en uno
  }

  //queremos elimiar este efecto de manera manual
  ngOnDestroy(): void {
    // this.userChangedEffect.destroy();

  }

  //creamos método del html
  increseBy( value: number ) {
    this.counter.update( current => current + value );

  }




  //implementamos el método del html
  onFielUpdated( field: keyof User, value: string) {

    // this.user.set({
    //   ...this.user(),
    //   [field]: value,
    // });

    // this.user.update( current => ({
    //   ...current,
    //   [field]: value,
    // }))

    //cambiamos el email
    this.user.update( current => {

      switch( field ) {

        case 'email':
          current.email = value;
          break;

        case 'avatar':
          current.avatar = value;
          break;

        case 'first_name':
          current.first_name = value;
          break;

        case 'last_name':
          current.last_name = value;
          break;

        case 'id':
          current.id = Number(value);
          break;
      }

      return current;



    })

  }

}
