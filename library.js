(function(Butt) {
	"use strict";

	var pjson = require('./package.json'),
		Settings = module.parent.require('./settings'),
		AdminSockets = module.parent.require('./socket.io/admin').plugins,
		S = module.parent.require('string'),
		theWord = 'butt';

	var Config = {
		plugin: {
			name: 'Anything to butt',
			id: 'butt',
			version: pjson.version,
			description: pjson.description,
			icon: 'fa-edit',
			route: '/butt'
		},
		defaults: {
			words: 'cloud'
		},
		sockets: {
			sync: function() {
				Config.global.sync();
			}
		}
	};

	Butt.load = function(app, middleware, controllers, callback) {
		function renderAdmin(req, res, next) {
			res.render('/admin' + Config.plugin.route, {});
		}

		app.get('/admin' + Config.plugin.route, middleware.admin.buildHeader, renderAdmin);
		app.get('/api/admin' + Config.plugin.route, renderAdmin);

		AdminSockets[Config.plugin.id] = Config.sockets;
		Config.global = new Settings(Config.plugin.id, Config.plugin.version, Config.defaults);

		callback(null, app, middleware, controllers);
	};

	Butt.addNavigation = function(custom_header, callback) {
		custom_header.plugins.push({
			route: Config.plugin.route,
			icon: Config.plugin.icon,
			name: Config.plugin.name
		});
		callback(null, custom_header);
	};

	Butt.parse = function(postContent, callback) {
		var regex = '';
		var words = S(Config.global.get('words')).stripTags().s.split(',');
		if (words.length > 0) {
			for (var i = 0, l = words.length; i < l; i++) {
				regex += '(:?' + S(words[i]).trim().s + ')' + (i == l - 1 ? '' : '|');
			}

			postContent = postContent.replace(new RegExp(regex, 'gi'), theWord);
		}

		callback(null, postContent);
	};
}(module.exports));
