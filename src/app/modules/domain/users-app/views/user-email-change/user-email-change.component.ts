import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserApiService, UserDto } from "../../../../../services/api/user/user.service";
import {
  UserUpdateEmailModelConverter
} from "../../../../../helpers/model-converters/user-update-email-model-converter";
import ComponentState from "../../../../../helpers/enums/component-state";

@Component({
  selector: 'user-email-change',
  templateUrl: './user-email-change.component.html',
  styleUrls: ['./user-email-change.component.css'],
})
export class UserEmailChangeComponent implements OnInit {
  requestLoading = false;
  state = ComponentState.LOADING;
  states = ComponentState;
  user?: UserDto;

  form = new FormGroup({
    email: new FormControl<string | null>(null, [
      Validators.required, Validators.email
    ]),
    newEmail: new FormControl<string | null>(null, [
      Validators.required, Validators.email
    ])
  });

  constructor(
    private userApi: UserApiService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  get emailsMatching(): boolean {
    return this.form.controls.email.value === this.form.controls.newEmail.value
  }

  get oldEmailMatchesUser(): boolean {
    return this.form.controls.email.value === this.user?.email;
  }

  ngOnInit(): void {
    this.getUser();
  }

  onSubmit(): void {
    const model = UserUpdateEmailModelConverter.convertToUpdateModel(this.form);

    this.requestLoading = true;
    this.userApi.updateUserEmail(model)
      .subscribe({
        next: async () => {
          await this.router.navigate(['auth', 'logout'])
        },
        error: error => {
          console.error(error);
        },
      })
  }

  private getUser(): void {
    this.userApi.getActiveUser()
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
      .add(() => {
        this.requestLoading = false;
        this.changeDetector.detectChanges();
      });
  }
}
