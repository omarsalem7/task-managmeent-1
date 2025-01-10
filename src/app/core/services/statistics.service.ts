import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getStats() {
    return this.http.get(`${this.baseUrl}/api/TenantStatistics/statistics`);
  }
}
