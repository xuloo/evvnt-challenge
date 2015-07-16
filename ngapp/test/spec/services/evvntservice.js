'use strict';

describe('Service: evvntService', function () {

  // load the service's module
  beforeEach(module('evvntApp'));

  // instantiate service
  var evvntService;
  beforeEach(inject(function (_evvntService_) {
    evvntService = _evvntService_;
  }));

  it('should do something', function () {
    expect(!!evvntService).toBe(true);
  });

});
