import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FamilyApiService } from "./family.service";

@NgModule({
  imports: [ HttpClientModule ],
  providers: [ FamilyApiService ]

})
export class FamilyApiModule { }
