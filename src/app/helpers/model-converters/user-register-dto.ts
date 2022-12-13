import { FormGroup } from "@angular/forms";
import { UserRegisterDto } from "../../services/api/auth/auth.service";

export class UserRegisterDtoConverter {
  public static convertFormGroup(formGroup: FormGroup): UserRegisterDto {
    return {
      email: formGroup.controls['email'].value,
      password: formGroup.controls['password'].value,
      firstName: formGroup.controls['firstName'].value,
      lastName: formGroup.controls['lastName'].value,
      birthDate: formGroup.controls['birthDate'].value,
    } as UserRegisterDto;
  }
}
