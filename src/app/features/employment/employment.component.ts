import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ImproveEmpComponent } from './components/improve-emp/improve-emp.component';

@Component({
  selector: 'app-employment',
  standalone: true,
  imports: [TranslateModule, ImproveEmpComponent],
  templateUrl: './employment.component.html',
  styleUrl: './employment.component.scss',
})
export class EmploymentComponent {}
