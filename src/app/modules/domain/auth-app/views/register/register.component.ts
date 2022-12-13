import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthApiService } from "../../../../../services/api/auth/auth.service";
import { UserRegisterDtoConverter } from "../../../../../helpers/model-converters/user-register-dto";
import { Router } from "@angular/router";
import RegisterMessages from "../../../../../helpers/messages/register";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  requestLoading = false;
  authError = '';

  registerForm = new FormGroup({
    email: new FormControl<string | null>(null, [ Validators.required, Validators.email ]),
    password: new FormControl<string | null>(null, [ Validators.required, Validators.minLength(8) ]),
    firstName: new FormControl<string | null>(null, [ Validators.required ]),
    lastName: new FormControl<string | null>(null, [ Validators.required ]),
    birthDate: new FormControl<Date | null>(null, [ Validators.required ]),
  });

  constructor(
    private authApi: AuthApiService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const model = UserRegisterDtoConverter.convertFormGroup(this.registerForm);

    this.cleanAuthError();
    this.requestLoading = true;

    this.authApi.registerNewUser(model)
      .subscribe({
        next: async response => {
          await this.router.navigate(['auth', 'login'])
        },
        error: error => {
          console.error(error);
          this.authError =  error.status === 400 ? RegisterMessages.USER_ALREADY_EXISTS : RegisterMessages.SERVER_ERROR;
        },
      })
      .add(() => {
        this.requestLoading = false;
        this.changeDetector.detectChanges();
      })
  }

  cleanAuthError(): void {
    this.authError = '';
  }
}
