import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FileResponse, FilesApiService } from "../../../../../services/api/files/files.service";

@Component({
  selector: 'download-file',
  template: '<p>&nbsp;</p>',
})
export class DownloadFileComponent implements OnInit {

  constructor(private fileApi: FilesApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const guid = this.route.snapshot.paramMap.get('guid')!

    if (!this.checkIfGuidIsValid(guid)) {
      console.error("Użyty identyfikator nie jest poprawnym identyfikatorem GUID")
      return;
    }

    this.sendDownloadRequest(guid);
  }

  private sendDownloadRequest(guid: string): void {
    this.fileApi.downloadFile(guid).subscribe({
      next: response => this.downloadFile(response.result),
      error: error => console.error(error)
    }).add(() => {
      window.close();
    });
  }

  private downloadFile(file: FileResponse) {
    const dummyLink = document.createElement('a');
    document.body.appendChild(dummyLink);

    const blob = new Blob([file.data], {type: file.headers!['content-type']});
    const url = window.URL.createObjectURL(blob);

    dummyLink.href = url;
    dummyLink.download = file.fileName!;
    dummyLink.click();

    window.URL.revokeObjectURL(url);
  }

  private checkIfGuidIsValid(guid: string) {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return regex.test(guid);
  }
}
