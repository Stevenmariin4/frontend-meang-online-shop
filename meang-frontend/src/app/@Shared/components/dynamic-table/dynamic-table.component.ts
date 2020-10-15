import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit {
  @Input() tableStructure;
  @Input() pageIndex;
  @Output() tableAction: EventEmitter<any>;
  @Output() tableChangePage: EventEmitter<any>;
  @Output() filter: EventEmitter<any>;
  @Output() sort: EventEmitter<any>;
  @ViewChild('paginator', { static: false }) paginator: MatPaginator;
  pages: Array<number>;
  searchField: string;
  currentPage: number;
  countPages: number;
  pageEvent: PageEvent;

  constructor(private sanitizer: DomSanitizer) {
    this.tableAction = new EventEmitter<any>();
    this.tableChangePage = new EventEmitter<any>();
    this.filter = new EventEmitter<any>();
    this.sort = new EventEmitter<any>();
    this.pages = [];
    this.currentPage = 1;
  }

  ngOnInit() {
    this.countPages = Math.ceil(
      this.tableStructure.totalData / this.tableStructure.pageSize
    );
    if (this.tableStructure.changed) {
      this.paginator.firstPage();
    }
    this.getNumOfPages(this.countPages);
  }

  sortBy(field: any) {
    if (field.sort == 'asc') {
      field.sort = 'desc';
      this.sort.emit(field);
    } else if (field.sort == 'desc') {
      field.sort = 'asc';
      this.sort.emit(field);
    }
  }

  getNumOfPages(totalPages) {
    this.pages = [];
    for (let i = 1; i <= totalPages; i++) {
      this.pages.push(i);
    }
  }

  searchBy(searchField) {
    if (searchField != undefined || searchField != '') {
      this.filter.emit(searchField);
      this.searchField = null;
    }
  }

  previousPage(page) {
    console.log(page);
    page = page < 1 ? 1 : page - 1;
    if (page >= 1) {
      this.currentPage = this.currentPage - 1;
      const pageAction = {
        action: 'prevPage',
        page,
      };
      this.tableChangePage.emit(pageAction);
    } else {
      console.log('menos de 1');
    }
  }

  nextPage(page) {
    console.log(page);
    console.log(this.countPages);
    page = page > this.countPages ? this.countPages : page + 1;
    if (page <= this.countPages) {
      this.currentPage = this.currentPage + 1;
      const pageAction = {
        action: 'nextPage',
        page,
      };
      this.tableChangePage.emit(pageAction);
    } else {
      console.log('más de ' + this.currentPage);
    }
  }

  goToPage(page) {
    const pageAction = {
      action: 'goToPage',
      page: page.pageIndex,
      pageSize: page.pageSize,
    };
    this.tableChangePage.emit(pageAction);
  }
  action(actionToLaunch, id, input = {}) {
    if (actionToLaunch !== 'editInLine' && actionToLaunch !== 'discardInLine') {
      const action = {
        idItem: id,
        action: actionToLaunch,
        allData: input,
      };
      this.tableAction.emit(action);
    } else {
      this.switchEditable(input);
    }
  }
  validate(data) {
    return typeof data;
  }
  validateImage(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  switchEditable(field) {
    if (field.inputEditable) {
      console.log(field.name, field.inputEditable);
      field.inputEditable = false;
    } else {
      console.log(field.name, field.inputEditable);
      field.inputEditable = true;
    }
    return field;
  }

  optionSelected(selection, item) {
    item.value = selection.value;
    item.hide = false;
    console.log('selection: ', selection);
    console.log('item: ', item);
    return item;
  }

  selectRadio(item, selection, options) {
    options.find((option) => {
      if (option.value === selection) {
        option.selected = true;
      } else {
        option.selected = false;
      }
    });
    item.value = selection;
  }
  selectCheckbox(item, selection) {
    if (item.value != undefined) {
      if (item.value.length > 0) {
        const found = item.value.indexOf(selection);
        if (found != -1) {
          item.value.splice(found, 1);
        } else {
          item.value.push(selection);
        }
      } else {
        item.value.push(selection);
      }
    } else {
      item.value = [];
      item.value.push(selection);
    }
  }
}
