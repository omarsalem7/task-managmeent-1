import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getList() {
    return this.http.get(`${this.baseUrl}/api/Attendance`);
  }

  getCurrentAttendance() {
    return this.http.get(`${this.baseUrl}/api/Attendance/currentAttendance`);
  }

  checkIn() {
    return this.http.post(`${this.baseUrl}/api/Attendance/check-in`, null);
  }
  checkOut(attendanceId: number) {
    return this.http.post(`${this.baseUrl}/api/Attendance/check-out`, {
      attendanceId,
    });
  }
}
