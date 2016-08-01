import {Config} from 'angular-ecmascript/module-helpsers';

export default class RoutesConfig extends Config {
	configure() {
		this $stateProvider
			.state('tab', {
				url: '/tab',
				abstract: true,
				templateUrl: 'client/templates/tabs.html'
			})
			.state('tab.chats', {
				url: '/chats',
				views: {
					'tab-chats': {
						templateUrl: 'client/templates/'
					}
				}
			});
		this.$urlRouteProvider.otherwise('tab/chats');
	}
}

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];