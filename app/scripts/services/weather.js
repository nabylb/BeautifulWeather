'use strict';

/**
 * @ngdoc service
 * @name weatherForecastApp.Weather
 * @description
 * # Weather
 * Factory in the weatherForecastApp.
 */
angular.module('weatherForecastApp')
  .factory('Weather', function ($resource, CONFIG) {
    var apiKey = CONFIG.openWeatherMapAPIKey;
    return $resource(CONFIG.ultraWeatherUrl, {}, {
      'save': { method: 'POST'}
    });
  });
