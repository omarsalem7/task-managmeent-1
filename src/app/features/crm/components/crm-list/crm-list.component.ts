import { Component, inject } from '@angular/core';
import { formatDate } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ToastModule } from 'primeng/toast';
import { MenuModule } from 'primeng/menu';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterListComponent } from '../../../../shared/ui/filter-list/filter-list.component';
import { ListHeaderComponent } from '../../../../shared/ui/list-header/list-header.component';
import { debounceTime, distinctUntilChanged, switchMap, Subject } from 'rxjs';
import { CrmFormComponent } from '../crm-form/crm-form.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CrmService } from '../../../../core/services/crm.service';
import { HasRoleDirective } from '../../../../core/directives/has-role.directive';
import { ExportExcel } from '../../../../shared/utils/exportExcel';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CrmDetailsComponent } from '../crm-details/crm-details.component';

@Component({
  selector: 'app-crm-list',
  standalone: true,
  providers: [provideNativeDateAdapter(), ConfirmationService, MessageService],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MenuModule,
    ToastModule,
    ListHeaderComponent,
    FilterListComponent,
    HasRoleDirective,
  ],
  templateUrl: './crm-list.component.html',
  styleUrl: './crm-list.component.scss',
})
export class CrmListComponent {
  filters = {
    SearchTerm: '',
    PageNumber: 1,
    PageSize: 1, // Show one record at a time
    StartDate: '',
    EndDate: '',
  };

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private crmService: CrmService,
    private router: Router
  ) {
    this.searchSubject
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        switchMap(() => this.crmService.getList(this.filters))
      )
      .subscribe((results: any) => {
        this.dataSource = results.data;
        this.totalCount = results.totalCount;
      });
  }

  dataSource: any[] = [];
  private searchSubject = new Subject<string>();

  updateSearch(value: string) {
    this.searchSubject.next(value);
    this.filters.SearchTerm = value;
  }

  navigateToForm() {
    this.router.navigate(['/crm/new']);
  }

  show(emp: any) {
    this.record = { ...emp };
    this.openDialog();
  }

  editRecord(id: any) {
    // TODO: Implement edit functionality
    console.log('Edit record');
    this.router.navigate([`/crm/edit/${id}`]);
  }

  exportExcel() {
    this.crmService.exportExcel().subscribe((file: any) => {
      ExportExcel(file, 'customers');
    });
  }

  // dialog
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(CrmDetailsComponent, {
      width: '60vw',
      data: {
        ...this.record,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'refresh') {
        this.getList();
      }
    });
  }

  onPageChange(event: any) {
    this.filters.PageSize = event.pageSize;
    this.filters.PageNumber = event.pageIndex + 1;
    this.getList();
  }

  record: any;
  editCustomer(record: any) {
    this.record = record;
  }

  filterHandler(isRemoved?: boolean) {
    this.filters.StartDate = formatDate(
      this.filters.StartDate,
      'yyyy-MM-dd',
      'en-US'
    );
    this.filters.EndDate = formatDate(
      this.filters.EndDate,
      'yyyy-MM-dd',
      'en-US'
    );
    if (isRemoved) {
      this.filters.StartDate = '';
      this.filters.EndDate = '';
    }
    this.getList();
  }

  totalCount: number = 0;
  loading = true;
  getList() {
    this.crmService.getList(this.filters).subscribe((res: any) => {
      this.loading = false;
      this.dataSource = res.data;
      this.totalCount = res.totalCount;
    });
  }

  currentRole = localStorage.getItem('role');
  ngOnInit(): void {
    this.getList();
  }
}
