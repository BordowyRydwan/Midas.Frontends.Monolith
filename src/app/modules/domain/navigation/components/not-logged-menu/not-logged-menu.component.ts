import { Component } from '@angular/core';
import ComponentState from "../../../../../helpers/enums/component-state";

@Component({
  selector: 'not-logged-menu',
  templateUrl: './not-logged-menu.component.html',
  styleUrls: ['./not-logged-menu.component.css']
})
export class NotLoggedMenuComponent {
  state = ComponentState.LOADING
  states = ComponentState;

  logoUrl = 'assets/logo-dark.png';
}
