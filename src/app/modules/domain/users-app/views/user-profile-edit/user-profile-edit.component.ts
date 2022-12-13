import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserDtoConverter } from "../../../../../helpers/model-converters/user-model-converter";
import { UserApiService, UserDto } from "../../../../../services/api/user/user.service";
import ComponentState from "../../../../../helpers/enums/component-state";

@Component({
  selector: 'user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {
  state = ComponentState.LOADING
  states = ComponentState;

  userSnapshot?: UserDto;

  email?: string;
  registerDate?: Date | null;

  userProfileForm = new FormGroup({
    firstName: new FormControl<string | null>(null, [ Validators.required ]),
    lastName: new FormControl<string | null>(null, [ Validators.required ]),
    description: new FormControl<string | null>(null,
      [ Validators.required, Validators.minLength(20), Validators.maxLength(400) ]
    ),
    birthDate: new FormControl<Date | null>(null, [ Validators.required ]),
  });

  constructor(
    private usersApi: UserApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this.usersApi.getActiveUser()
      .subscribe({
        next: response => {
          UserDtoConverter.convertToFormGroup(this.userProfileForm, response.result);
          this.userSnapshot = response.result;
          this.state = ComponentState.LOADED;
        },
        error: error => {
          console.error(error);
          this.state = ComponentState.ERROR;
        },
      })
  }

  onSubmit(): void {
    const model = UserDtoConverter.convertToUpdateModel(this.userProfileForm, this.userSnapshot!);

    this.usersApi.updateUserData(model)
      .subscribe({
        next: async () => {
          await this.router.navigate(['users', 'profile'])
        },
        error: error => {
          console.error(error);
        },
      })
  }
}
