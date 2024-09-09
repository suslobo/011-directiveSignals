import { Directive, ElementRef, OnInit } from '@angular/core';

//las directivas deben ser declaradas en el modulo shared.module.ts
//como los componentes
//si queresmo usar estas directivas en otro módulos
//tenemos que exportarlas en el shared.module.ts, en exports: []
@Directive({
  selector: '[customLabel]' //cambiamos el nombre
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;

  constructor( private el: ElementRef<HTMLElement>) {
    // console.log('constructor de la directiva')
    console.log(el);
    this.htmlElement = el;
  }
  ngOnInit(): void {
    console.log('Directiva - NgOnInit')

  }

}
