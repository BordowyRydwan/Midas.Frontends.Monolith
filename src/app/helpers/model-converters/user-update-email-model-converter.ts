import { FormGroup } from "@angular/forms";
import { UserUpdateEmailDto } from "../../services/api/user/user.service";

export class UserUpdateEmailModelConverter {
  public static convertToUpdateModel(formGroup: FormGroup): UserUpdateEmailDto {
    return {
      oldEmail: formGroup.controls['email'].value,
      newEmail: formGroup.controls['newEmail'].value,
    } as UserUpdateEmailDto;
  }
}
