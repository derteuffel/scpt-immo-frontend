"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RootContratService = void 0;
var core_1 = require("@angular/core");
var CONTRAT_API = 'http://localhost:8080/api/contrat';
var RootContratService = /** @class */ (function () {
    function RootContratService(http) {
        this.http = http;
    }
    RootContratService.prototype.getAll = function () {
        return this.http.get(CONTRAT_API);
    };
    RootContratService.prototype.get = function (id) {
        return this.http.get(CONTRAT_API + '/' + id);
    };
    RootContratService.prototype.getAllByLocale = function (id) {
        return this.http.get(CONTRAT_API + '/locale/' + id);
    };
    RootContratService.prototype.getAllByClient = function (id) {
        return this.http.get(CONTRAT_API + '/client/' + id);
    };
    RootContratService.prototype.updateContrat = function (data, id) {
        return this.http.put(CONTRAT_API + '/' + id, data);
    };
    RootContratService.prototype.deleteContrat = function (id) {
        return this.http["delete"](CONTRAT_API + '/' + id);
    };
    RootContratService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RootContratService);
    return RootContratService;
}());
exports.RootContratService = RootContratService;
