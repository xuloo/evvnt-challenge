'use strict';

describe('Controller: EvvntCtrl', function () {

  // load the controller's module
  beforeEach(module('evvntApp'));

  var EvvntCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EvvntCtrl = $controller('EvvntCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EvvntCtrl.awesomeThings.length).toBe(3);
  });
});
