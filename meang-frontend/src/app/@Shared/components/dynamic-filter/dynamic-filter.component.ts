import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDefaultOption } from '@Service/interfaces/table.interface';

@Component({
  selector: 'app-dynamic-filter',
  templateUrl: './dynamic-filter.component.html',
  styleUrls: ['./dynamic-filter.component.scss'],
})
export class DynamicFilterComponent implements OnInit {
  searchField: string;
  @Input() table_filters;
  @Output() filter: EventEmitter<any>;
  searchShow: boolean;

  constructor() {
    this.filter = new EventEmitter<any>();
  }

  ngOnInit() {
    this.searchShow = true;
  }

  /**
   * This take the search string and send this to the father component to realize the search
   *
   * @param {*} searchField
   * @memberof DynamicTablesComponent
   */
  searchBy(searchField) {
    if (searchField != undefined || searchField != '') {
      this.filter.emit({ fieldToSearch: searchField });
      // this.searchField = null;
    }
  }

  /**
   * This method compare if the current selection exists in the list and remove from it,
   * if not exist this method add the selection made by user to the current list
   * @param item
   * @param selection
   */
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

  /**
   * This method compare the current selection made by the user,
   * add the selection to the list and change the status in the radio button option
   * @param item
   * @param selection
   * @param options
   */
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

  /**
   * This method returns the item selected and change the status of the list to false, which hide the list in the view
   * @param selection
   * @param item
   */
  optionSelected(selection, item) {
    item.value = selection.value;
    item.hide = false;
    console.log('selection: ', selection);
    console.log('item: ', item);
    return item;
  }

  async sendAdvancedSearch(fields) {
    const filtersUsed = [];
    fields.forEach(
      await function (filterUsed) {
        if (filterUsed.value !== undefined) {
          filtersUsed.push(filterUsed);
        }
      }
    );
    this.filter.emit({ fieldToSearch: filtersUsed });
  }

  displayFn(option?: IDefaultOption): string | undefined {
    return option ? option.value : undefined;
  }

  showSearch() {
    this.searchShow = !this.searchShow;
  }
}
