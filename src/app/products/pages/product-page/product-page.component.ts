import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {

  //antes lo hacíamos así y se puede hacer
  // constructor( private fb: FormBuilder) {}

  private fb = inject ( FormBuilder );
  //creamos una propiedad llamada color
  public color:string= 'green';
  //creamos nuestro formulario
  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(6), Validators.email] ] //el campo name tiene tres validaciones
  });

  //creamos nuevo método
  changeColor() {
    this.color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));

  }

}
