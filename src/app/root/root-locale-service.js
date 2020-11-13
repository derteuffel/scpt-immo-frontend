"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RootLocaleService = void 0;
var core_1 = require("@angular/core");
var LOCALE_API = 'http://localhost:8080/api/locale';
var RootLocaleService = /** @class */ (function () {
    function RootLocaleService(http) {
        this.http = http;
    }
    RootLocaleService.prototype.getAll = function () {
        return this.http.get(LOCALE_API);
    };
    RootLocaleService.prototype.get = function (id) {
        return this.http.get(LOCALE_API + id);
    };
    RootLocaleService.prototype.getAllByRepresentation = function (id) {
        return this.http.get(LOCALE_API + '/representation/' + id);
    };
    RootLocaleService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RootLocaleService);
    return RootLocaleService;
}());
exports.RootLocaleService = RootLocaleService;
