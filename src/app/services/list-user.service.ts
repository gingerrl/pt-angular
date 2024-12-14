import { Injectable } from '@angular/core';
import { Endpoints } from '../config/endpoints.enum';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/data-list.interface';
@Injectable({
  providedIn: 'root',
})
export class ListUserService {
  constructor(private http: HttpClient) {}

  getLists(): Observable<User[]> {
    return this.http.get<User[]>(`${Endpoints.URL}/users`);
  }

  delete(id: string) {
    return this.http.delete(`${Endpoints.URL}/users/${id}`);
  }

  addProduct(body: User) {
    const resp = this.http.post(`${Endpoints.URL}/users`, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return resp;
  }

  updateProduct(body: User) {
    return this.http.put(`${Endpoints.URL}/users/${body.id}`, body);
  }
}
