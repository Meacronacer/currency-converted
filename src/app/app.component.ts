import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from './common/input/input.component';
import { SelectorComponent } from "./common/selector/selector.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputComponent, SelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'project';
}
