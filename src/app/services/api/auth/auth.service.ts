//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.18.1.0 (NJsonSchema v10.8.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import { mergeMap as _observableMergeMap, catchError as _observableCatch } from 'rxjs/operators';
import { Observable, from as _observableFrom, throwError as _observableThrow, of as _observableOf } from 'rxjs';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpResponseBase } from '@angular/common/http';
export const AUTH_API_URL = new InjectionToken<string>('AUTH_API_URL');

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

export interface IAuthApiService {
    /**
     * Login a user
     * @param body (optional) 
     * @return Success
     */
    authorizeUser(body: UserLoginDto | undefined): Observable<SwaggerResponse<string>>;
    /**
     * Register new user
     * @param body (optional) 
     * @return Success
     */
    registerNewUser(body: UserRegisterDto | undefined): Observable<SwaggerResponse<UserRegisterReturnDto>>;
    /**
     * Update email address of existing user
     * @param body (optional) 
     * @return Success
     */
    updateUserEmail(body: UserUpdateEmailDto | undefined): Observable<SwaggerResponse<string>>;
}

@Injectable({
    providedIn: 'root'
})
export class AuthApiService extends BaseApiService implements IAuthApiService {
    private http: HttpClient;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(@Inject(HttpClient) http: HttpClient, @Optional() @Inject(AUTH_API_URL) baseUrl?: string) {
        super();
        this.http = http;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
    }

    /**
     * Login a user
     * @param body (optional) 
     * @return Success
     */
    authorizeUser(body: UserLoginDto | undefined): Observable<SwaggerResponse<string>> {
        let url_ = this.baseUrl + "/api/Authorization/Login";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "text/plain"
            })
        };

        return _observableFrom(this.transformOptions(options_)).pipe(_observableMergeMap(transformedOptions_ => {
            return this.http.request("post", url_, transformedOptions_);
        })).pipe(_observableMergeMap((response_: any) => {
            return this.processAuthorizeUser(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processAuthorizeUser(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<SwaggerResponse<string>>;
                }
            } else
                return _observableThrow(response_) as any as Observable<SwaggerResponse<string>>;
        }));
    }

    protected processAuthorizeUser(response: HttpResponseBase): Observable<SwaggerResponse<string>> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return _observableOf(new SwaggerResponse(status, _headers, result200));
            }));
        } else if (status === 400) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result400: any = null;
            let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result400 = resultData400 !== undefined ? resultData400 : <any>null;
    
            return throwException("Bad Request", status, _responseText, _headers, result400);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SwaggerResponse<string>>(new SwaggerResponse(status, _headers, null as any));
    }

    /**
     * Register new user
     * @param body (optional) 
     * @return Success
     */
    registerNewUser(body: UserRegisterDto | undefined): Observable<SwaggerResponse<UserRegisterReturnDto>> {
        let url_ = this.baseUrl + "/api/Authorization/Register";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "text/plain"
            })
        };

        return _observableFrom(this.transformOptions(options_)).pipe(_observableMergeMap(transformedOptions_ => {
            return this.http.request("post", url_, transformedOptions_);
        })).pipe(_observableMergeMap((response_: any) => {
            return this.processRegisterNewUser(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processRegisterNewUser(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<SwaggerResponse<UserRegisterReturnDto>>;
                }
            } else
                return _observableThrow(response_) as any as Observable<SwaggerResponse<UserRegisterReturnDto>>;
        }));
    }

    protected processRegisterNewUser(response: HttpResponseBase): Observable<SwaggerResponse<UserRegisterReturnDto>> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
            result200 = UserRegisterReturnDto.fromJS(resultData200);
            return _observableOf(new SwaggerResponse(status, _headers, result200));
            }));
        } else if (status === 400) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result400: any = null;
            let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result400 = resultData400 !== undefined ? resultData400 : <any>null;
    
            return throwException("Bad Request", status, _responseText, _headers, result400);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SwaggerResponse<UserRegisterReturnDto>>(new SwaggerResponse(status, _headers, null as any));
    }

    /**
     * Update email address of existing user
     * @param body (optional) 
     * @return Success
     */
    updateUserEmail(body: UserUpdateEmailDto | undefined): Observable<SwaggerResponse<string>> {
        let url_ = this.baseUrl + "/api/Authorization/Update/Email";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(body);

        let options_ : any = {
            body: content_,
            observe: "response",
            responseType: "blob",
            headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": "text/plain"
            })
        };

        return _observableFrom(this.transformOptions(options_)).pipe(_observableMergeMap(transformedOptions_ => {
            return this.http.request("patch", url_, transformedOptions_);
        })).pipe(_observableMergeMap((response_: any) => {
            return this.processUpdateUserEmail(response_);
        })).pipe(_observableCatch((response_: any) => {
            if (response_ instanceof HttpResponseBase) {
                try {
                    return this.processUpdateUserEmail(response_ as any);
                } catch (e) {
                    return _observableThrow(e) as any as Observable<SwaggerResponse<string>>;
                }
            } else
                return _observableThrow(response_) as any as Observable<SwaggerResponse<string>>;
        }));
    }

    protected processUpdateUserEmail(response: HttpResponseBase): Observable<SwaggerResponse<string>> {
        const status = response.status;
        const responseBlob =
            response instanceof HttpResponse ? response.body :
            (response as any).error instanceof Blob ? (response as any).error : undefined;

        let _headers: any = {}; if (response.headers) { for (let key of response.headers.keys()) { _headers[key] = response.headers.get(key); }}
        if (status === 200) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result200: any = null;
            let resultData200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result200 = resultData200 !== undefined ? resultData200 : <any>null;
    
            return _observableOf(new SwaggerResponse(status, _headers, result200));
            }));
        } else if (status === 400) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            let result400: any = null;
            let resultData400 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver);
                result400 = resultData400 !== undefined ? resultData400 : <any>null;
    
            return throwException("Bad Request", status, _responseText, _headers, result400);
            }));
        } else if (status !== 200 && status !== 204) {
            return blobToText(responseBlob).pipe(_observableMergeMap((_responseText: string) => {
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            }));
        }
        return _observableOf<SwaggerResponse<string>>(new SwaggerResponse(status, _headers, null as any));
    }
}

export class UserLoginDto implements IUserLoginDto {
    email?: string | undefined;
    password?: string | undefined;

    constructor(data?: IUserLoginDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.email = _data["email"];
            this.password = _data["password"];
        }
    }

    static fromJS(data: any): UserLoginDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserLoginDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["email"] = this.email;
        data["password"] = this.password;
        return data;
    }

    clone(): UserLoginDto {
        const json = this.toJSON();
        let result = new UserLoginDto();
        result.init(json);
        return result;
    }
}

export interface IUserLoginDto {
    email?: string | undefined;
    password?: string | undefined;
}

export class UserRegisterDto implements IUserRegisterDto {
    email?: string | undefined;
    password?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    birthDate?: Date;

    constructor(data?: IUserRegisterDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.email = _data["email"];
            this.password = _data["password"];
            this.firstName = _data["firstName"];
            this.lastName = _data["lastName"];
            this.birthDate = _data["birthDate"] ? new Date(_data["birthDate"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): UserRegisterDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserRegisterDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["email"] = this.email;
        data["password"] = this.password;
        data["firstName"] = this.firstName;
        data["lastName"] = this.lastName;
        data["birthDate"] = this.birthDate ? this.birthDate.toISOString() : <any>undefined;
        return data;
    }

    clone(): UserRegisterDto {
        const json = this.toJSON();
        let result = new UserRegisterDto();
        result.init(json);
        return result;
    }
}

export interface IUserRegisterDto {
    email?: string | undefined;
    password?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    birthDate?: Date;
}

export class UserRegisterReturnDto implements IUserRegisterReturnDto {
    id?: number;
    email?: string | undefined;

    constructor(data?: IUserRegisterReturnDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.email = _data["email"];
        }
    }

    static fromJS(data: any): UserRegisterReturnDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserRegisterReturnDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["email"] = this.email;
        return data;
    }

    clone(): UserRegisterReturnDto {
        const json = this.toJSON();
        let result = new UserRegisterReturnDto();
        result.init(json);
        return result;
    }
}

export interface IUserRegisterReturnDto {
    id?: number;
    email?: string | undefined;
}

export class UserUpdateEmailDto implements IUserUpdateEmailDto {
    oldEmail?: string | undefined;
    newEmail?: string | undefined;

    constructor(data?: IUserUpdateEmailDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.oldEmail = _data["oldEmail"];
            this.newEmail = _data["newEmail"];
        }
    }

    static fromJS(data: any): UserUpdateEmailDto {
        data = typeof data === 'object' ? data : {};
        let result = new UserUpdateEmailDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["oldEmail"] = this.oldEmail;
        data["newEmail"] = this.newEmail;
        return data;
    }

    clone(): UserUpdateEmailDto {
        const json = this.toJSON();
        let result = new UserUpdateEmailDto();
        result.init(json);
        return result;
    }
}

export interface IUserUpdateEmailDto {
    oldEmail?: string | undefined;
    newEmail?: string | undefined;
}

export class SwaggerResponse<TResult> {
    status: number;
    headers: { [key: string]: any; };
    result: TResult;

    constructor(status: number, headers: { [key: string]: any; }, result: TResult)
    {
        this.status = status;
        this.headers = headers;
        this.result = result;
    }
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    if (result !== null && result !== undefined)
        return _observableThrow(result);
    else
        return _observableThrow(new ApiException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        if (!blob) {
            observer.next("");
            observer.complete();
        } else {
            let reader = new FileReader();
            reader.onload = event => {
                observer.next((event.target as any).result);
                observer.complete();
            };
            reader.readAsText(blob);
        }
    });
}