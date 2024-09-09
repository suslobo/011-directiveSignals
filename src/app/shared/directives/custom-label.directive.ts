import { Directive, ElementRef, Input, OnInit } from '@angular/core';

//las directivas deben ser declaradas en el modulo shared.module.ts
//como los componentes
//si queresmo usar estas directivas en otro módulos
//tenemos que exportarlas en el shared.module.ts, en exports: []
@Directive({
  selector: '[customLabel]' //cambiamos el nombre
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  //podemos crearno una referencia para saber cual es el color de mi directiva
  private _color:string = 'red';

  //queremos recibir el color
  @Input() set color( value:string ) {
    this._color = value;
    //cada vez que el color o el estilo cambie hago llamar el setStyle
    this.setStyle();

  }

  constructor( private el: ElementRef<HTMLElement>) {
    // console.log('constructor de la directiva')
    // console.log(el);
    this.htmlElement = el;
  }
  ngOnInit(): void {
    this.setStyle();

  }
  //basado en la referencia del color
  //podemos cambiar el color del elemento en HTML
  //nuevo método
  setStyle():void {
    if ( !this.htmlElement ) return;

    this.htmlElement!.nativeElement.style.color = this._color;

  }

}
