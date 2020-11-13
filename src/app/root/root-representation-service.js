"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RootRepresentationService = void 0;
var core_1 = require("@angular/core");
var baseUrl = 'http://localhost:8080/api/representation';
var RootRepresentationService = /** @class */ (function () {
    function RootRepresentationService(http) {
        this.http = http;
    }
    RootRepresentationService.prototype.getAll = function () {
        return this.http.get(baseUrl + "/all");
    };
    RootRepresentationService.prototype.get = function (id) {
        return this.http.get(baseUrl + "/get/" + id);
    };
    RootRepresentationService.prototype.create = function (data) {
        return this.http.post(baseUrl + "/save", data);
    };
    RootRepresentationService.prototype.update = function (id, data) {
        return this.http.put(baseUrl + "/" + id, data);
    };
    RootRepresentationService.prototype["delete"] = function (id) {
        return this.http["delete"](baseUrl + "/delete/" + id);
    };
    RootRepresentationService.prototype.deleteAll = function () {
        return this.http["delete"](baseUrl);
    };
    RootRepresentationService.prototype.findByTitle = function (title) {
        return this.http.get(baseUrl + "?title=" + title);
    };
    RootRepresentationService.prototype.findByProvince = function (province) {
        return this.http.get(baseUrl + "/province/" + province);
    };
    RootRepresentationService.prototype.findByCommune = function (commune) {
        return this.http.get(baseUrl + "/commune/" + commune);
    };
    RootRepresentationService.prototype.findByVille = function (ville) {
        return this.http.get(baseUrl + "/ville/" + ville);
    };
    RootRepresentationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RootRepresentationService);
    return RootRepresentationService;
}());
exports.RootRepresentationService = RootRepresentationService;
