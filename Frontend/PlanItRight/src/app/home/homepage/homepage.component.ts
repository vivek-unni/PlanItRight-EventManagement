import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { EventService } from '../../event.service';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  constructor(private router:Router){}

  login(){
    this.router.navigate(['events']);
  }
}
