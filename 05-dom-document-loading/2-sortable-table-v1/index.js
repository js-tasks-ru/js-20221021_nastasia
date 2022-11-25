export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.render();
    this.initEventListeners();
  }

  getTableHeader() {
    return `
    <div data-element="header" class="sortable-table__header sortable-table__row">
      ${this.headerConfig.map(item => this.getHeaderRow(item)).join('')}
    </div>
  `;
  }

  getHeaderRow({id, title, sortable}) {
    const arrow = (sortable) => {
      if (sortable) {
        return `<span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>`;
      }
      return '';
    };

    return `
    <div class="sortable-table__cell" data-id=${id} data-sortable=${sortable}>
      <span>${title}</span>
      ${arrow(sortable)}
    </div>
  `;
  }

  getTableBody(data = []) {
    return `
    <div data-element="body" class="sortable-table__body">
      ${this.getTableRows(data)}
    </div>
    `;
  }

  getTableRows(data = []) {
    return data.map(item => {
      return `
      <a href="/products/${item.id}" class="sortable-table__row">
        ${this.getTableRow(item)}
      </a>`;
    }).join('');
  }

  getTableRow(item) {
    const cells = this.headerConfig.map(({id, template}) => {
      return {
        id,
        template
      };
    });

    return cells.map(({id, template}) => {
      if (template) {
        return template(item[id]);
      }
      return `<div class="sortable-table__cell">${item[id]}</div>`;
    }).join('');
  }

  getTable(data = []) {
    return `
    <div class="sortable-table">
    ${this.getTableHeader()}
    ${this.getTableBody(data)}
    </div>`;
  }

  getSubElements(element) {
    const result = {};
    const elements = element.querySelectorAll("[data-element]");

    for (const subElement of elements) {
      const name = subElement.dataset.element;

      result[name] = subElement;

    }

    return result;

  }

  sort(field, order) {
    const sortedDate = this.sortDate(field, order);
    const allColumns = this.element.querySelectorAll(".sortable-table__cell[data-id]");
    const currentColumn = this.element.querySelector(`.sortable-table__cell[data-id = ${field}]`);

    allColumns.forEach(column => {
      column.dataset.order = '';
    });

    currentColumn.dataset.order = order;
    this.element.querySelector('.sortable-table__body').innerHTML = '';
    this.element.querySelector('.sortable-table__body').innerHTML = this.getTableRows(sortedDate);

  }

  sortDate(field, order) {
    let orderVal = 0;
    if (order === "asc") {orderVal = -1;}
    if (order === "desc") {orderVal = 1;}

    return this.data.sort((a, b) => {
      if (!isNaN(a[field])) {
        return (b[field] - a[field]) * orderVal;
      }
      else {
        return ((String(b[field])).localeCompare(
          (String(a[field])), "ru", "en")) * orderVal;
      }
    });
  }

  render() {
    const element = document.createElement("div");
    element.innerHTML = this.getTable(this.data);
    this.element = element.firstElementChild;
    this.subElements = this.getSubElements(element);
  }

  initEventListeners() {
  }

  remove() {
    if (this.element) {
      this.element.remove();
    }
  }

  destroy() {
    this.remove();
  }
}
