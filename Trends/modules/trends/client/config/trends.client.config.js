'use strict';

// Configuring the Trends module
angular.module('trends').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Trends',
      state: 'trends',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'trends', {
      title: 'List Trends',
      state: 'trends.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'trends', {
      title: 'Create Trends',
      state: 'trends.create',
      roles: ['user']
    });
  }
]);
