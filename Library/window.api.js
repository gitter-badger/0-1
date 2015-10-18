
window.jQuery = require("jquery");
window.$ = window.jQuery;

require("../cores/skin/for/semantic-ui/node_modules/semantic-ui-css/semantic.js");

var api = module.exports = {
	$: window.$,
	_: require("lodash"),
	EventEmitter: require("eventemitter2").EventEmitter2,
	RegExp_Escape: require("escape-regexp-component"),
	backbone: require("backbone"),
	numeral: require("numeral"),
	moment: require("moment"),
    urijs: require("urijs"),
    traverse: require("traverse"),
    CJSON: {
        stringify: require("canonical-json")
    },
	vdom: {
		h: require("../lib/cvdom/h"),
    	ch: require("../lib/cvdom/ch"),
    	createElement: require('virtual-dom/create-element')
	}
};

api._.mixin(require("lodash-deep"));


api["cores/data/for/ccjson.record.mapper/0-common.api"] = require("../cores/data/for/ccjson.record.mapper/0-common.api").forLib(api);



api.waitForWindowProperty = function (property, whenLoaded) {
	var waitInterval = setInterval(function () {
		if (typeof window[property] === "undefined") return;
		clearInterval(waitInterval);
		return whenLoaded(window[property]);
	}, 25);
};

api.waitForLibraryProperty = function (property) {
	return new window.Promise(function (resolve, reject) {
		// TODO: Throw if not found after timeout.
		var waitInterval = setInterval(function () {
			if (typeof api[property] === "undefined") return;
			clearInterval(waitInterval);
			return resolve(api[property]);
		}, 25);
	});
};


// Wait for appended code (at the end of this file) to be available (scheduled above)
;({"APPEND_AS_GLOBAL":"Library/node_modules/node-forge/js/forge.min.js"});
api.waitForWindowProperty("forge", function (forge) {
    api.forge = forge;
});


window.waitForLibrary = function (whenLoaded) {
	var waitInterval = setInterval(function () {
		if (!window.Library) return;
		clearInterval(waitInterval);

		window.Library.Promise = window.Promise;

		return whenLoaded(window.Library);
	}, 25);
}

