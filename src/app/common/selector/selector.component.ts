import { Component } from '@angular/core';


@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss'
})
export class SelectorComponent {
  constructor() {}

  toggle: boolean = false


  onToggle(): void {
    this.toggle = !this.toggle
  }

}
