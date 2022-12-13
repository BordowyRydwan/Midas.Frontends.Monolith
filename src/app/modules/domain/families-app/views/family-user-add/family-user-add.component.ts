import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AddUserToFamilyDto, FamilyApiService } from "../../../../../services/api/family/family.service";

@Component({
  selector: 'family-user-add',
  templateUrl: './family-user-add.component.html',
  styleUrls: ['./family-user-add.component.css']
})
export class FamilyUserAddComponent implements OnInit {

  requestLoading = false;
  addErrorVisible = false;
  familyId: number = 0;

  userAddForm = new FormGroup({
    email: new FormControl<string | null>(null, [
      Validators.required, Validators.email
    ]),
  });

  constructor(
    private familyApi: FamilyApiService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {
    const snapshot = route.snapshot;
    const num = snapshot.paramMap.get('id')!

    if (Number.isNaN(num)) {
      router.navigate(['families', 'list']);
    }

    this.familyId = Number.parseInt(num);
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    const model = {
      email: this.userAddForm.controls.email.value!,
      familyId: this.familyId!
    } as AddUserToFamilyDto;

    this.requestLoading = true;

    this.familyApi.addUserToFamily(model)
      .subscribe({
        next: () => {
          this.router.navigate(['families', this.familyId])
        },
        error: (error: any) => {
          console.error(error);
          this.addErrorVisible = true;
        },
      })
      .add(() => {
        this.requestLoading = false;
        this.changeDetector.detectChanges();
      });
  }

  turnOffError(): void {
    this.addErrorVisible = false;
  }
}
