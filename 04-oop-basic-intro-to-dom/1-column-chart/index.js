export default class ColumnChart {
  chartHeight = 50;

  constructor({
    data = [],
    label = '',
    value = '',
    link = '',
    formatHeading = data => data} = {}) { //с занятия

    this.data = data;
    this.label = label;
    this.value = formatHeading(value);
    this.link = link;

    this.render();
    this.initEventListeners();
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.getDivTemplate();
    this.element = element.firstElementChild;
    if (this.data.length) {
      this.element.classList.remove('column-chart_loading');
    }
  }

  getColumnProps(data) {
    const maxValue = Math.max(...data);
    const scale = this.chartHeight / maxValue;

    return data.map(item => {
      return {
        percent: (item / maxValue * 100).toFixed(0) + '%',
        value: String(Math.floor(item * scale))
      };
    });
  }

  getLink() {
    return this.link ?
      '<a href="' + this.link + '" class="column-chart__link">View all</a>'
      : '';
  }

  getCharts() {
    let allCharts = '';
    if (this.data.length) {
      for (const item of this.getColumnProps(this.data)) {
        allCharts += `<div style="--value: ` + item.value + `" data-tooltip="` + item.percent + `"></div>`;
      }
    }
    return allCharts;
  }

  getDivTemplate() {
    return `<div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
    <div class="column-chart__title">
    Total ${this.label}
    ${this.getLink()}
    </div>
    <div class="column-chart__container">
      <div data-element="header" class="column-chart__header">
        ${this.value}
      </div>
      <div data-element="body" class="column-chart__chart">
        ${this.getCharts()}
      </div>
    </div>
    </div>`;
  }

  initEventListeners() {
    // NOTE: в данном методе добавляем обработчики событий, если они есть
  }

  destroy() {
    this.remove();
    // NOTE: удаляем обработчики событий, если они есть
  }

  remove() {
    this.element.remove();
  }

  update(newData = []) {
    if (!newData.length) {
      this.element.classList.add('column-chart_loading');
    }
    if (newData.length) {
      this.data = newData;
      this.element.querySelector('.column-chart__chart').innerHTML = '';
      let newCharts = this.getCharts();
      this.element.querySelector('.column-chart__chart').innerHTML = newCharts;

    }
  }
}
