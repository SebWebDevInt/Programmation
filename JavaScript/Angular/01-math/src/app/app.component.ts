import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nombre1: number;
  nombre2: number;
  somme: number;
  multiplication: number;
  soustraction: number;

  compute() {
    this.somme = this.nombre1 + this.nombre2;
    this.multiplication = this.nombre1 * this.nombre2;
    this.soustraction = this.nombre1 - this.nombre2;
  }
}
