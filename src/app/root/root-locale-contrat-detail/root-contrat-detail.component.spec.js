"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var root_contrat_detail_component_1 = require("./root-contrat-detail.component");
describe('RootLocaleContratDetailComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [root_contrat_detail_component_1.RootLocaleContratDetailComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(root_contrat_detail_component_1.RootLocaleContratDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
