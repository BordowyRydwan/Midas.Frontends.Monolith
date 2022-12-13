import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FilesApiService } from "./files.service";

@NgModule({
  imports: [ HttpClientModule ],
  providers: [ FilesApiService ]

})
export class FilesApiModule { }
