'use strict';

const templates = {
	messageSource: {
		source: '<ul class="message-source-list"><li class="server" data-connection-id="{{connectionId}}" data-value="SERVER"><i class="fa fa-server"></i><span>{{serverName}}</span><div class="arrow"><span></div></li>{{#with sources}}<li class="channel" data-connection-id="{{data.connectionId}}" data-value="{{key}}" data-alert=""><i class="fa fa-comments-o"></i><span>{{key}}</span><div class="arrow"><span></div></li>{{/with}}</ul>',
	},
	userList: {
		source: '<li><p data-rank="{{rank}}" data-rank-icon="{{{icon}}}">{{nick}}</p></li>',
	},
	message: {
		source: '<article class="consoleMessage" data-messageType="{{type}}" data-connection-id="{{connectionId}}" data-source="{{source}}"><aside><time>{{timestamp}}</time><span class="{{icon}}">{{head}}</span></aside><p>{{{message}}}</p></article><article class="filler"><div></div></article>',
	},
	modal: {
		source: '<div class="modal"><header>{{title}}<button type="button">&times;</button></header>{{> modalContent}}</div>',
	}
};

let partials = {
	settingsPartial: '',
	connectPartial: '',
};

Handlebars.registerHelper('with', function(context, options) {
	var content = (function() {
		var results = [];
		for (let key in context) {
			var value = context[key];
			results.push(options.fn({
				key: key,
				value: value,
				data: options.data.root,
			}));
		}

		return results;
	})();

	return content.join('');
});

// Compile templates and save them back in the template object
for (let index in templates) {
	templates[index].compiled = Handlebars.compile(templates[index].source);
}

// Register all partials
Handlebars.registerPartial(partials);
