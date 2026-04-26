import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}


@Injectable({
  providedIn: 'root',
})
export class Api {
   private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http
      .get<ApiResponse<any[]>>(`${this.baseUrl}/users`)
      .pipe(map(res => res.data));
  }

  getTeams() {
    return this.http
      .get<ApiResponse<any[]>>(`${this.baseUrl}/teams`)
      .pipe(map(res => res.data));
  }

  getPermissions(userId: string, teamId: string) {
    return this.http
      .get<ApiResponse<string[]>>(
        `${this.baseUrl}/permissions/user/${userId}/team/${teamId}`
      )
      .pipe(map(res => res.data));
  }
}
