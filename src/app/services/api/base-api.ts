import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';

export default class BaseApiService {
  protected transformOptions(options: any): Promise<any> {
    const session_token = document.cookie
      .split(';')
      .map((x) => x.trim().split('='))
      .find(x => x[0] == 'USER_SESSION');

    if(session_token !== null && session_token !== undefined) {
      options.headers = options.headers.append('Authorization', session_token[1]);
    }

    return Promise.resolve(options);
  }
}
