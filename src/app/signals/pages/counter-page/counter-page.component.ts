import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css'
})
export class CounterPageComponent {

  public counter = signal(10);
  //squareCounter va a estar siempre pendiente de la señal this.counter
  //o de todas dentro de este método computado
  //es una propiedad solo de lectura
  public squareCounter = computed( () => this.counter() * this.counter() );
  // creamos un metodo increase para que el botón incremente en 1 en el html
  increaseBy( value: number) {
    //el valor actual más el valor
    this.counter.update( current => current + value )
  }
}
