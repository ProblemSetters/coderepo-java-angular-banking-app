import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/app/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  public token;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem("auth-token");
  }

  public get(url: string, options: any = {}): Observable<any> {
    return this.http.get(url, this.getHeaders(options));
  }

  public post(url: string, data: any, options: any = {}): Observable<any> {
    return this.http.post(url, data, this.getHeaders(options));
  }

  public put(url: string, data: any, options: any = {}): Observable<any> {
    return this.http.put(url, data, this.getHeaders(options));
  }

  public delete(url: string, options: any = {}): Observable<any> {
    return this.http.delete(url, this.getHeaders(options));
  }

  private getHeaders(options: any): { headers: HttpHeaders } {
	if(this.token) {
		options.withCredentials = true;
		const headers = new HttpHeaders({
			// Authorization: `Bearer ${this.token}`,
			'Cookie': `corebanking=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsaXZlbWlAZXhhbXBsZS5jb20iLCJpYXQiOjE2OTMwMjcyNDYsImV4cCI6MTY5MzExMzY0Nn0.SGVojVs4vUslDZbTd2MwogUG2WXuY8QS1VYB3hWhXVI`,
			accountId: 1
		  });
	  
		  return { headers, ...options };
	}
    return options
  }
}
