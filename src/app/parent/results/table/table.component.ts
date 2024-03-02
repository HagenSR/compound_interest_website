import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CompoundInterestService } from 'src/shared/services/compound-interest/compound-interest.service';
import { Table, TableModule } from 'primeng/table';
import { NullsafeArray } from "../../../../shared/pipes/nullsafeArray.pipe";
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Column } from 'src/shared/models/column.model';
import { ExportColumn } from 'src/shared/models/export-column.model';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [TableModule, AsyncPipe, CommonModule, NullsafeArray, ButtonModule, InputTextModule]
})
export class TableComponent implements OnInit {

  @ViewChild(Table) table!: Table;

  data$ = this.compoundService.tableData$

  cols: Column[] = [
    { field: 'simulation', header: 'Simulation' },
    { field: 'year', header: 'Year' },
    { field: 'balance', header: 'Balance', pipeName: 'currency'},
    { field: 'currentPrincipal', header: 'Current Principal', pipeName: 'currency'},
    { field: 'annualAddition', header: 'Annual Addition', pipeName: 'currency'},
    { field: 'interestRate', header: 'Interest Rate', pipeName: 'percent'},
  ];
  exportColumns!: ExportColumn[]
  isMobile = false

  constructor(private compoundService: CompoundInterestService) {
  }
  ngOnInit(): void {
    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    if (window.screen.width < 1200) {
      this.isMobile = true;
    }
  }

  applyFilter(event: Event) {
    this.table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
  }
}
