import { FormGroup } from "@angular/forms";
import { UserDto, UserUpdateDto } from "../../services/api/user/user.service";

export class UserDtoConverter {
  public static convertToFormGroup(formGroup: FormGroup, user: UserDto): void {
    formGroup.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      description: user.description,
      birthDate: user.birthDate
    });
  }

  public static convertToUpdateModel(formGroup: FormGroup, userSnapshot: UserDto): UserUpdateDto {
    return {
      description: formGroup.controls['description'].value,
      firstName: formGroup.controls['firstName'].value,
      lastName: formGroup.controls['lastName'].value,
      birthDate: formGroup.controls['birthDate'].value,
      email: userSnapshot.email,
      profileImage: userSnapshot.profileImage,
    } as UserUpdateDto;
  }
}
