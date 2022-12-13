import { Component, OnInit } from '@angular/core';
import { UserApiService, UserDto } from "../../../../../services/api/user/user.service";
import ComponentState from "../../../../../helpers/enums/component-state";

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  state = ComponentState.LOADING
  states = ComponentState;

  user?: UserDto;

  constructor(private usersApi: UserApiService) {}

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this.usersApi.getActiveUser()
      .subscribe({
        next: response => {
          this.user = response.result;
          this.state = ComponentState.LOADED;
        },
        error: error => {
          console.error(error);
          this.state = ComponentState.ERROR;
        },
      })
  }
}
