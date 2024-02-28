import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { CompoundInterestService } from 'src/shared/services/compound-interest/compound-interest.service';
import { Table, TableModule } from 'primeng/table';
import { NullsafeArray } from "../../../../shared/pipes/nullsafeArray.pipe";
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [TableModule, AsyncPipe, CommonModule, NullsafeArray, ButtonModule, InputTextModule]
})
export class TableComponent {

  @ViewChild(Table) table!: Table;

  data$ = this.compoundService.tableData$

  constructor(private compoundService: CompoundInterestService) {
  }

  applyFilter(event: Event) {
    this.table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
  }
}
