import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from "../../../app-routing.module";
import { UploadFileComponent } from "./endpoints/upload-file/upload-file.component";
import { CookieModule } from "../../../services/utils/cookie/cookie.module";
import { DownloadFileComponent } from "./components/download-file/download-file.component";
import { MaterialModule } from "../../ui/material/material.module";
import { BrowserModule } from "@angular/platform-browser";
import { FilesApiModule } from "../../../services/api/files/files.module";
import { FAMILIES_API_URL } from "../../../services/api/family/family.service";
import { environment } from "../../../../environments/environment";
import { FILES_API_URL } from "../../../services/api/files/files.service";

@NgModule({
  declarations: [
    DownloadFileComponent,
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FilesApiModule,
    CookieModule,
    MaterialModule,
  ],
  providers: [ {
    provide: FILES_API_URL, useValue: environment.FILES_API_URL
  } ],
  exports: [
    UploadFileComponent
  ]
})
export class FilesAppModule { }
