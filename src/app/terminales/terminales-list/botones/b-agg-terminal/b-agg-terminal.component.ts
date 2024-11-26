import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-b-agg-terminal',
  templateUrl: './b-agg-terminal.component.html',
  styleUrl: './b-agg-terminal.component.css'
})
export class BAggTerminalComponent {
  @Input() showbutton: boolean = false;
}
