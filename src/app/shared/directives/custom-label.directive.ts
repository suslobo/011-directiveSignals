import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

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
  //creamos otra popiedad
  private _errors?: ValidationErrors | null;

  //queremos recibir el color
  @Input() set color( value:string ) {
    this._color = value;
    //cada vez que el color o el estilo cambie hago llamar el setStyle
    this.setStyle();
  }

  //hacemos el @Input para poder recibir ValidationErrors y lo conectamos en el html line21
  @Input() set errors( value: ValidationErrors | null | undefined ) {
    this._errors = value;
    this.setErrorMessage();

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

  //nuevo método
  //lo llamamos en su input @Input() set errors
  setErrorMessage():void {
    if (! this.htmlElement ) return; //si no tenemos el elemento html no hacemos nada
    if ( !this._errors) {
      this.htmlElement.nativeElement.innerText = '';
      return;
    }  //si esto es null, limpia los errores

    //posibles errores
    //nos creamos una array de los errores
    const errors = Object.keys(this._errors);

    //si el array de errores incluye el required
    if ( errors.includes('required') ) {
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido.';
      return; //para que no siga haciendo nada más
    }

    if ( errors.includes('minLength')) {
      const min = this._errors!['minlength'] ['requiredLength'];
      const current = this._errors!['minlength'] ['actualLength'];
      this.htmlElement.nativeElement.innerHTML = `Mínimo ${current}/${min} caracteres.`;
      return;
    }

    if ( errors.includes('email')) {
      this.htmlElement.nativeElement.innerText = 'No tiene formato de correo.';
      return;
    }





  }

}
