import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-womenizer',
  templateUrl: './womenizer.component.html',
  styleUrls: ['./womenizer.component.css']
})
export class WomenizerComponent implements OnInit {
  nb_copines: number = 0;

  constructor() { }

  ngOnInit() {
  }

  incrementerCopines() {
    this.nb_copines = this.nb_copines + 1;
  }
  decrementerCopines() {
    this.nb_copines = this.nb_copines - 1;
  }
}
