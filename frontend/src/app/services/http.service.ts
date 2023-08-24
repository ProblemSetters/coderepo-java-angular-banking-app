import { Injectable } from "@angular/core";
import { environment } from "src/app/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class HttpService {
	public token;

	constructor(private http: HttpClient) {
		this.token = localStorage.getItem("auth-token");
	}

	public get(url: string, options: any = {}): any {
		return this.checkAndRefreshToken().pipe(
			mergeMap((e) => {
				return this.http.get(url, options);
			}),
		);
	}

	public post(url: string, data: any, options: any = {}): any {
		return this.checkAndRefreshToken().pipe(
			mergeMap(() => {
				return this.http.post(url, data, options);
			}),
		);
	}

	public put(url: string, data: any, options: any = {}): any {
		return this.checkAndRefreshToken().pipe(
			mergeMap(() => {
				return this.http.put(url, data, options);
			}),
		);
	}

	public delete(url: string, options: any = {}): any {
		return this.checkAndRefreshToken().pipe(
			mergeMap(() => {
				return this.http.delete(url, options);
			}),
		);
	}

	public checkAndRefreshToken() {
		if (this.token) {
			if (this.tokenExpired()) {
				return this.refreshToken();
			}
			return of(true);
		}
		return of(false);
	}

	private refreshToken(): Observable<boolean> {
		return this.http
			.get(environment.API_URL + "/auth/refresh-token")
			.pipe(map(() => true))
			.pipe(
				catchError(() => {
					this.token = null;
					localStorage.clear();
					window.location.href = "/login";
					return of(false);
				}),
			);
	}

	private tokenExpired() {
		return false;
	}
}
