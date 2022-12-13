import { Component, OnInit } from '@angular/core';
import { CookieService } from "../../../../../services/utils/cookie/cookies.service";
import {
  AddNewFamilyDto,
  FamilyApiService,
  UserFamilyRoleDto
} from "../../../../../services/api/family/family.service";
import { ActivatedRoute, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { firstValueFrom } from "rxjs";
import ComponentState from "../../../../../helpers/enums/component-state";

@Component({
  selector: 'family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.css']
})
export class FamilyListComponent implements OnInit {
  state = ComponentState.LOADING;
  states = ComponentState;

  families: UserFamilyRoleDto[] = [];
  displayedColumns: string[] = ['familyName', 'familyRole', 'icons'];
  newFamilyName: string = '';
  userId: number = 0;

  constructor(
    private familyApi: FamilyApiService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private jwtService: JwtHelperService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userId = await this.getUserId();
    this.families = [];
    this.getFamilies();
  }

  private getFamilies(): void {
    this.familyApi.getFamilyMembershipsForUser()
      .subscribe({
        next: response => {
          this.families = response.result.items ?? [];
          this.state = ComponentState.LOADED;
        },
        error: error => {
          console.error(error);
          this.state = ComponentState.ERROR;
        },
      });
  }

  deleteFamily(id: number): void {
    this.familyApi.deleteFamily(id)
      .subscribe({
        next: () => {
          this.families = this.families.filter(x => x.family?.id !== id);
        },
        error: error => {
          console.error(error);
          this.state = ComponentState.ERROR;
        },
      });
  }

  addNewFamily(): void {
    const dto = {
      name: this.newFamilyName,
      founderId: this.userId
    } as AddNewFamilyDto

    this.familyApi.addNewFamily(dto)
      .subscribe({
        next: () => {
          this.getFamilies();
          this.newFamilyName = '';
        },
        error: error => {
          console.error(error);
          this.state = ComponentState.ERROR;
        },
      });
  }

  private async getUserId(): Promise<number> {
    const token = await firstValueFrom(this.cookieService.getCookie('USER_SESSION'));

    if (token === null || token === undefined) {
      await this.router.navigate(['families', 'list']);
    }

    const decodedToken = this.jwtService.decodeToken(token!);
    const property = Object.keys(decodedToken).find(x => x.split('/').at(-1) === 'nameidentifier');

    if (!property) {
      return 0;
    }

    return Number.parseInt(decodedToken[property]);
  }
}
