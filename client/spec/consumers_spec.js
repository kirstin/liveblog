var login = require('../app/scripts/bower_components/superdesk/client/spec/helpers/utils').login,
    consumersManagement = require('./helpers/pages').consumersManagement;

function assertToastMsg(type, msg) {
    var cssSelector = '.notification-holder .alert-' + type,
        toast = $(cssSelector);

    browser.sleep(500);
    browser.ignoreSynchronization = true;
    expect(toast.getText()).toContain(msg);
    browser.sleep(500);
    browser.ignoreSynchronization = false;
}

const consumer = {
    name: 'Massey Fergusson'
};

describe('Consumers', function() {
    'use strict';

    beforeEach(function(done) {login().then(done);});

    describe('list', function() {
        it('can open consumers managements and list the consumers', function() {
            consumersManagement.openConsumersManagement();
        });

        it('can create a new consumer', function() {
            consumersManagement.openConsumersManagement();

            element(by.css('button.navbtn.sd-create-btn'))
                .click()
                .then(function() {
                    return element(by.css('input#name')).isDisplayed();
                })
                .then(function() {
                    return element(by.css('input#name')).sendKeys(consumer.name);
                })
                .then(function() {
                    return element(by.css('#save-edit-btn')).click();
                })
                .then(function() {
                    return assertToastMsg('success', 'consumer saved.');
                })
                .then(function() {
                    var firstRowName = element(by.css('ul.table-body div.row-wrapper div.name'));
                    expect(firstRowName.getText()).toEqual(consumer.name);
                    return;
                });
        });

        it('can update a consumer', function() {
            consumersManagement.openConsumersManagement();

            var firstRowName = element(by.css('ul.table-body div.row-wrapper div.name'));
            expect(firstRowName.getText()).toEqual('John Deere');

            firstRowName
                .click()
                .then(function() {
                    return element(by.css('input#name')).isDisplayed();
                })
                .then(function() {
                    return element(by.css('input#name')).clear();
                })
                .then(function() {
                    return element(by.css('input#name')).sendKeys(consumer.name);
                })
                .then(function() {
                    return element(by.css('#save-edit-btn')).click();
                })
                .then(function() {
                    return assertToastMsg('success', 'consumer saved.');
                })
                .then(function() {
                    var firstRowName = element(by.css('ul.table-body div.row-wrapper div.name'));
                    expect(firstRowName.getText()).toEqual(consumer.name);
                    return;
                });
        });

        //it('can delete a consumer', function() {});
    });
});
