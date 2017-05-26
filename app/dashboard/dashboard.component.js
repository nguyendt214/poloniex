"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var DashboardComponent = (function () {
    function DashboardComponent(http) {
        this.http = http;
        this.sheetID = '1nBzLmYCU0nLo77HpVFxISkzkjKxGCTwHnOMf-cPu1wQ';
        this.data = null;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.getSheetData().then(function (data) {
            console.log(data);
        });
    };
    DashboardComponent.prototype.getSheetData = function () {
        var _this = this;
        if (this.data) {
            // already loaded data
            return Promise.resolve(this.data);
        }
        var url = 'https://spreadsheets.google.com/feeds/list/' + this.sheetID + '/od6/public/values?alt=json';
        // don't have the data yet
        return new Promise(function (resolve) {
            // We're using Angular Http provider to request the data,
            // then on the response it'll map the JSON data to a parsed JS object.
            // Next we process the data and resolve the promise with the new data.
            _this.http.get(url)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                console.log('Raw Data', data);
                _this.data = data.feed.entry;
                var returnArray = [];
                if (_this.data && _this.data.length > 0) {
                    _this.data.forEach(function (entry, index) {
                        var obj = {};
                        for (var x in entry) {
                            if (x.includes('gsx$') && entry[x].$t) {
                                obj[x.split('$')[1]] = entry[x]['$t'];
                            }
                        }
                        returnArray.push(obj);
                    });
                }
                resolve(returnArray);
            });
        });
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard-cmp',
            moduleId: module.id,
            templateUrl: 'dashboard.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map