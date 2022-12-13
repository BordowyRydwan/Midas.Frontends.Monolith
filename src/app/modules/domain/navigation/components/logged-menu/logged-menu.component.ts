import { Component } from '@angular/core';
import ComponentState from "../../../../../helpers/enums/component-state";

@Component({
  selector: 'logged-menu',
  templateUrl: './logged-menu.component.html',
  styleUrls: ['./logged-menu.component.css']
})
export class LoggedMenuComponent {
  state = ComponentState.LOADING
  states = ComponentState;

  logoUrl = 'assets/logo-dark.png';
}
