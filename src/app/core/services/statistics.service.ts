import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getStatsTent() {
    return this.http.get(`${this.baseUrl}/api/TenantStatistics/statistics`);
  }
  getStatsEmp() {
    return this.http.get(
      `${this.baseUrl}/api/Statistics/tasks-status-current-month`
    );
  }

  // /api/TenantStatistics/statistics
  getTasksDaysChartTents() {
    return this.http.get(`${this.baseUrl}/api/TenantStatistics/current-month`);
  }

  // /api/Statistics/tasks-status-by-day
  getTasksDaysChart() {
    return this.http.get(`${this.baseUrl}/api/Statistics/tasks-status-by-day`);
  }

  getEmpPerformance(inputFilter?: any) {
    let params = new HttpParams();

    // Add parameters dynamically if `inputFilter` is provided
    if (inputFilter) {
      Object.keys(inputFilter).forEach((key) => {
        if (inputFilter[key] !== '' && inputFilter[key] !== null) {
          params = params.set(key, inputFilter[key]);
        }
      });
    }
    return this.http.get(
      `${this.baseUrl}/api/Statistics/employee-performance`,
      { params }
    );
  }
}
