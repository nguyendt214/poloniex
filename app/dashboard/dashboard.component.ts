import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent {
  public sheetID: string = '1nBzLmYCU0nLo77HpVFxISkzkjKxGCTwHnOMf-cPu1wQ';
  public data: any = null;
  constructor(private http: Http) { }

  public ngOnInit() {
    this.getSheetData().then(data => {
      console.log(data);
    });
  }

  public getSheetData() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    var url = 'https://spreadsheets.google.com/feeds/list/' + this.sheetID + '/od6/public/values?alt=json';
    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          console.log('Raw Data', data.feed);
          this.data = data.feed.entry;

          let returnArray: Array<any> = [];
          if (this.data && this.data.length > 0) {
            this.data.forEach((entry, index) => {
              let obj = {};
              for (let x in entry) {
                if (x.includes('gsx$') && entry[x].$t) {
                  obj[x.split('$')[1]] = entry[x]['$t'];
                  // console.log( x.split('$')[1] + ': ' + entry[x]['$t'] );
                }
              }
              returnArray.push(obj);
            });
          }
          resolve(returnArray);
        });
    });
  }
}
