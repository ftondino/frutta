import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private key = '8h41OgY5F74AiY5t2oyQCSv0gGKouRXq8bJv2Rr7Q0qc7IiJp3xusqxq';
  private url = 'https://api.pexels.com/v1/search?query=';
  constructor(private http: HttpClient) {}
  getFruitImage(fruitName: string): Observable<any> {
    return this.http.get(this.url + fruitName, {
      headers: {
        Authorization: this.key,
      },
    });
  }
}
