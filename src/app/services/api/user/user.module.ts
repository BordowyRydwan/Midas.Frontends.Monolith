import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { UserApiService } from "./user.service";

@NgModule({
  imports: [ HttpClientModule ],
  providers: [ UserApiService ]

})
export class UserApiModule { }
