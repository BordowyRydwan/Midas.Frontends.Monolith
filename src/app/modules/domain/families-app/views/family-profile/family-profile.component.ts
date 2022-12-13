import { Component, OnInit } from '@angular/core';
import { CookieService } from "../../../../../services/utils/cookie/cookies.service";
import {
  DeleteUserFromFamilyDto,
  FamilyApiService, SetUserFamilyRoleDto,
  UserFamilyRoleDto
} from "../../../../../services/api/family/family.service";
import { ActivatedRoute, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { firstValueFrom } from "rxjs";
import ComponentState from "../../../../../helpers/enums/component-state";


@Component({
  selector: 'family-profile',
  templateUrl: './family-profile.component.html',
  styleUrls: ['./family-profile.component.css']
})
export class FamilyProfileComponent implements OnInit {
  state = ComponentState.LOADING
  states = ComponentState;

  familyMembers: UserFamilyRoleDto[] = [];
  familyId: number;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'icons'];
  familyName: string = '';
  userEmail: string = ''

  constructor(
    private familyApi: FamilyApiService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private jwtService: JwtHelperService
  ) {
    const snapshot = route.snapshot;
    const num = snapshot.paramMap.get('id')!

    if (Number.isNaN(num)) {
      router.navigate(['families', 'list']);
    }

    this.familyId = Number.parseInt(num);
  }

  async ngOnInit(): Promise<void> {
    this.familyMembers = [];
    this.userEmail = await this.getUserEmail();

    this.getFamily();
  }

  isLoggedUser(email: string): boolean {
    return email === this.userEmail;
  }

  get isUserFamilyAdmin(): boolean {
    const MAIN_ADMIN_ROLE_ID = 1;
    return this.familyMembers?.some(x => x.user?.email === this.userEmail && x.familyRole?.id === MAIN_ADMIN_ROLE_ID) ?? false;
  }

  get isUserFamilyParent(): boolean {
    const PARENT_ROLE_ID = 2;
    return this.familyMembers?.some(x => x.user?.email === this.userEmail && x.familyRole?.id === PARENT_ROLE_ID) ?? false;
  }


  private getFamily(): void {
    this.familyApi.getFamilyMembers(this.familyId)
      .subscribe({
        next: response => {
          this.familyMembers = response.result.items!;
          this.familyName = this.familyMembers[0].family!.name!;
          this.state = ComponentState.LOADED;
        },
        error: error => {
          console.error(error);
          this.state = ComponentState.ERROR;
        },
      })
  }

  private async getUserEmail(): Promise<string> {
    const token = await firstValueFrom(this.cookieService.getCookie('USER_SESSION'));

    if (token === null || token === undefined) {
      await this.router.navigate(['families', 'list']);
    }

    const decodedToken = this.jwtService.decodeToken(token!);
    const property = Object.keys(decodedToken).find(x => x.split('/').at(-1) === 'emailaddress');

    if (!property) {
      return '';
    }

    return decodedToken[property];
  }

  deleteUserFromFamily(email: string): void {
    const dto = {
      email: email,
      familyId: this.familyId
    } as DeleteUserFromFamilyDto;

    this.familyApi.deleteUserFromFamily(dto)
      .subscribe({
        next: () => {
          this.familyMembers = this.familyMembers.filter(x => x.user?.email !== email);
        },
        error: error => {
          console.error(error);
          this.state = ComponentState.ERROR;
        },
      })
  }

  goToTransactions(id: number): void {
    this.router.navigate(['transactions', 'list', id]);
  }

  setUserFamilyRole(roleId: number, email: string): void {
    const dto = {
      email: email,
      familyId: this.familyId,
      familyRoleId: roleId
    } as SetUserFamilyRoleDto;

    this.familyApi.setUserFamilyRole(dto)
      .subscribe({
        next: () => {
          const index = this.familyMembers.findIndex(x => x.user?.email === email);
          this.familyMembers[index].familyRole!.id = dto.familyRoleId;
        },
        error: error => {
          console.error(error);
          this.state = ComponentState.ERROR;
        },
      })
  }
}
