import { Component,
  OnInit, AfterViewChecked, AfterViewInit, OnChanges, AfterContentChecked, AfterContentInit, OnDestroy
} from '@angular/core';

import { Sort } from '@angular/material';

@Component({
  selector: 'chart-bar-component',
  templateUrl: './chart-bar.component.html',
  styleUrls: ['./chart-bar.component.scss']
})
export class ChartBarComponent implements OnInit, AfterViewChecked, AfterViewInit, OnChanges, AfterContentChecked, AfterContentInit, OnDestroy {

  public sortedData;
  public chartLegend = true;
  public chartType = {
    type: ['bar', 'line'],
    active: 'bar'
  };
  public chartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public chartLabels = {
    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    quartal: ['Quartal 1', 'Quartal 2', 'Quartal 3', 'Quartal 4'],
    year: ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019']
  };
  public data: Array<any> = [
    {
      Id: '01',
      Created: '2017-12-01 11:00:00',
      Created2: '2017-12',
      State: 'closed',
      Service: 'BIT'
    }, {
      Id: '02',
      Created: '2017-12-02 10:00:00',
      Created2: '2017-12',
      State: 'open',
      Service: 'Monero'
    }, {
      Id: '03',
      Created: '2017-12-03 9:00:00',
      Created2: '2017-12',
      State: 'open',
      Service: 'Ethereum'
    }
  ];

  public chartData: Array<any> = [
    { data: [1.00087526, .50087526, 0, 3.1], label: 'BIT' },
    { data: [0.06517984, 1.09849871, 2.09849871, 8.65193912], label: 'NEO' },
    { data: [9.13248007, 14.02981984, 16.00004710, 6.00004710], label: 'Monero' },
    { data: [3.78551200, 0.48519577, 0, 4.29412090], label: 'Ethereum' }
  ];

  public filterArg = 'open';

  constructor() {
    this.sortedData = this.data.slice();
  }

  public chartClicked(e: any): void {

  }

  public chartHover(e: any): void {
    console.log(e);
  }

  idOfData(): any {

    const testID = /[0-9]/;

    console.log(this.data.filter(stateFilterData));

    function stateFilterData(data, index): any {

      if (testID.test(data.Id)) {
        return data;
      }
    }
  }

  serviceOfData(data, index): any {

    if (data.Service === 'open') {
      return data;
    }
  }

  createdOfData(data, index): any {

    if (data.Created === 'open') {
      return data;
    }
  }

  created2OfData(data, index): any {

    if (data.Created2 === 'open') {
      return data;
    }
  }

  stateOfData(deFilter): any {

    // suche irgendwo blablabla
    const testStateW = /closed/;
    const testStateO = /open/;

    console.log(this.data.filter(stateFilterData));

    function stateFilterData(data, index): any {

      if (data.State == deFilter) {
        return data;
      }
      if (testStateO.test(data.State)) {
        console.log(data);
      }
      // if (testStateW.test(data.State)) {
      //   console.log(data);
      // }
    }
  }

  /* Sort Table */
  sortData(sort: Sort) {

    const datas = this.data.slice();

    if (!sort.active || sort.direction == '') {
      this.sortedData = datas;
      return;
    }

    this.sortedData = datas.sort((a, b) => {

      let isAsc = sort.direction == 'asc';

      switch (sort.active) {
        case 'Id': return this.compare(+a.Id, +b.Id, isAsc);
        case 'Created': return this.compare(a.Created, b.Created, isAsc);
        case 'Created2': return this.compare(a.Created2, b.Created2, isAsc);
        case 'State': return this.compare(a.State, b.State, isAsc);
        case 'Service': return this.compare(a.Service, b.Service, isAsc);
        default: return 0;
      }
    });
  }

  compare(a, b, isAsc) {

    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  
  /* ########################### */
  /* ####  Livecycle Hooks  #### */
  /* ########################### */

  ngOnInit() {              console.log('ChartsViewer Init'); }
  ngAfterViewChecked() {    console.log('ChartsViewer ViewChecked'); }
  ngAfterContentChecked() { console.log('ChartsViewer ContentChecked'); }
  ngAfterContentInit() {    console.log('ChartsViewer ContentInit'); }
  ngAfterViewInit() {       console.log('ChartsViewer ViewInit'); }
  ngOnChanges() {           console.log('ChartsViewer Changes'); }
  ngOnDestroy() {           console.log('ChartsViewer Destroy'); }

}
