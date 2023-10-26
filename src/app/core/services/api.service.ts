import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fruit } from 'src/app/models/fruit.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllFruitData(): Observable<Array<Fruit>> {
    return this.http.get<Array<Fruit>>('/api/fruit/all');
  }

  getFruitDetails(id: number): Observable<Fruit> {
    return this.http.get<Fruit>(`/api/fruit/${id}`);
  }
}
