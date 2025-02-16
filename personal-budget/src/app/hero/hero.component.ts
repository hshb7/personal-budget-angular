import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from 'express';
@Component({
  selector: 'pb-hero',
  standalone: true,
  imports: [RouterModule], // Add RouterModule to the imports array
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

}
