/*istanbul ignore next*/'use strict';

exports.__esModule = true;
exports.dateFormat = dateFormat;
/**
 * log4js <https://github.com/anigenero/log4js2>
 *
 * Copyright 2016-present Robin Schultz <http://anigenero.com>
 * Released under the MIT License
 */

var i18n = {
	'dayNames': ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
	'monthNames': ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};

var TOKEN = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|'[^']*'|'[^']*'/g;
var TIMEZONE = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
var TIMEZONE_CLIP = /[^-+\dA-Z]/g;

/**
 * Pads numbers in the date format
 *
 * @param value
 * @param length
 *
 * @returns {?string}
 */
function pad(value, length) {
	value = String(value);
	length = length || 2;
	while (value.length < length) {
		value = '0' + value;
	}
	return value;
}

function dateFormat(date, mask, utc) {

	// You can't provide utc if you skip other args (use the 'UTC:' mask prefix)
	if (arguments.length == 1 && Object.prototype.toString.call(date) == '[object String]' && !/\d/.test(date)) {
		mask = date;
		date = undefined;
	}

	// Passing date through Date applies Date.parse, if necessary
	date = date ? new Date(date) : new Date();
	if (isNaN(date)) {
		throw new SyntaxError('invalid date');
	}

	mask = String(mask || 'yyyy-mm-dd HH:MM:ss,S');

	// Allow setting the utc argument via the mask
	if (mask.slice(0, 4) == 'UTC:') {
		mask = mask.slice(4);
		utc = true;
	}

	var _ = utc ? 'getUTC' : 'get';
	var d = date[_ + 'Date']();
	var D = date[_ + 'Day']();
	var m = date[_ + 'Month']();
	var y = date[_ + 'FullYear']();
	var H = date[_ + 'Hours']();
	var M = date[_ + 'Minutes']();
	var s = date[_ + 'Seconds']();
	var L = date[_ + 'Milliseconds']();
	var o = utc ? 0 : date.getTimezoneOffset();
	var flags = {
		'd': d,
		'dd': pad(d),
		'ddd': i18n.dayNames[D],
		'dddd': i18n.dayNames[D + 7],
		'M': m + 1,
		'MM': pad(m + 1),
		'MMM': i18n.monthNames[m],
		'MMMM': i18n.monthNames[m + 12],
		'yy': String(y).slice(2),
		'yyyy': y,
		'h': H % 12 || 12,
		'hh': pad(H % 12 || 12),
		'H': H,
		'HH': pad(H),
		'm': M,
		'mm': pad(M),
		's': s,
		'ss': pad(s),
		'S': pad(L, 1),
		't': H < 12 ? 'a' : 'p',
		'tt': H < 12 ? 'am' : 'pm',
		'T': H < 12 ? 'A' : 'P',
		'TT': H < 12 ? 'AM' : 'PM',
		'Z': utc ? 'UTC' : (String(date).match(TIMEZONE) || ['']).pop().replace(TIMEZONE_CLIP, ''),
		'o': (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4)
	};

	return mask.replace(TOKEN, function ($0) {
		return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
	});
}
//# sourceMappingURL=data:application/json;base64,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LENBQUQsQ0FBeUMsR0FBekMsR0FBK0MsT0FBL0MsQ0FBdUQsYUFBdkQsRUFBc0UsRUFBdEUsQ0FBZDtBQUNOLE9BQU0sQ0FBQyxJQUFJLENBQUosR0FBUSxHQUFSLEdBQWMsR0FBZCxDQUFELEdBQXNCLElBQUksS0FBSyxLQUFMLENBQVcsS0FBSyxHQUFMLENBQVMsQ0FBVCxJQUFjLEVBQWQsQ0FBWCxHQUErQixHQUEvQixHQUFxQyxLQUFLLEdBQUwsQ0FBUyxDQUFULElBQWMsRUFBZCxFQUFrQixDQUEzRCxDQUF0QjtFQXpCSCxDQWhDdUM7O0FBNEQzQyxRQUFPLEtBQUssT0FBTCxDQUFhLEtBQWIsRUFBb0IsVUFBVSxFQUFWLEVBQWM7QUFDeEMsU0FBTyxNQUFNLEtBQU4sR0FBYyxNQUFNLEVBQU4sQ0FBZCxHQUEwQixHQUFHLEtBQUgsQ0FBUyxDQUFULEVBQVksR0FBRyxNQUFILEdBQVksQ0FBWixDQUF0QyxDQURpQztFQUFkLENBQTNCLENBNUQyQztDQUFyQyIsImZpbGUiOiJkYXRlRm9ybWF0dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIGxvZzRqcyA8aHR0cHM6Ly9naXRodWIuY29tL2FuaWdlbmVyby9sb2c0anMyPlxyXG4gKlxyXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50IFJvYmluIFNjaHVsdHogPGh0dHA6Ly9hbmlnZW5lcm8uY29tPlxyXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcclxuICovXHJcblxyXG5sZXQgaTE4biA9IHtcclxuXHQnZGF5TmFtZXMnIDogWyAnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0JywgJ1N1bmRheScsICdNb25kYXknLFxyXG5cdFx0J1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheScgXSxcclxuXHQnbW9udGhOYW1lcycgOiBbICdKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsXHJcblx0XHQnT2N0JywgJ05vdicsICdEZWMnLCAnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsXHJcblx0XHQnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInIF1cclxufTtcclxuXHJcbmNvbnN0IFRPS0VOID0gL2R7MSw0fXxtezEsNH18eXkoPzp5eSk/fChbSGhNc1R0XSlcXDE/fFtMbG9TWl18J1teJ10qJ3wnW14nXSonL2c7XHJcbmNvbnN0IFRJTUVaT05FID0gL1xcYig/OltQTUNFQV1bU0RQXVR8KD86UGFjaWZpY3xNb3VudGFpbnxDZW50cmFsfEVhc3Rlcm58QXRsYW50aWMpICg/OlN0YW5kYXJkfERheWxpZ2h0fFByZXZhaWxpbmcpIFRpbWV8KD86R01UfFVUQykoPzpbLStdXFxkezR9KT8pXFxiL2c7XHJcbmNvbnN0IFRJTUVaT05FX0NMSVAgPSAvW14tK1xcZEEtWl0vZztcclxuXHJcbi8qKlxyXG4gKiBQYWRzIG51bWJlcnMgaW4gdGhlIGRhdGUgZm9ybWF0XHJcbiAqXHJcbiAqIEBwYXJhbSB2YWx1ZVxyXG4gKiBAcGFyYW0gbGVuZ3RoXHJcbiAqXHJcbiAqIEByZXR1cm5zIHs/c3RyaW5nfVxyXG4gKi9cclxuZnVuY3Rpb24gcGFkKHZhbHVlLCBsZW5ndGgpIHtcclxuXHR2YWx1ZSA9IFN0cmluZyh2YWx1ZSk7XHJcblx0bGVuZ3RoID0gbGVuZ3RoIHx8IDI7XHJcblx0d2hpbGUgKHZhbHVlLmxlbmd0aCA8IGxlbmd0aCkge1xyXG5cdFx0dmFsdWUgPSAnMCcgKyB2YWx1ZTtcclxuXHR9XHJcblx0cmV0dXJuIHZhbHVlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZGF0ZUZvcm1hdChkYXRlLCBtYXNrLCB1dGMpIHtcclxuXHJcblx0Ly8gWW91IGNhbid0IHByb3ZpZGUgdXRjIGlmIHlvdSBza2lwIG90aGVyIGFyZ3MgKHVzZSB0aGUgJ1VUQzonIG1hc2sgcHJlZml4KVxyXG5cdGlmIChhcmd1bWVudHMubGVuZ3RoID09IDEgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGRhdGUpID09ICdbb2JqZWN0IFN0cmluZ10nICYmICEoL1xcZC8pLnRlc3QoZGF0ZSkpIHtcclxuXHRcdG1hc2sgPSBkYXRlO1xyXG5cdFx0ZGF0ZSA9IHVuZGVmaW5lZDtcclxuXHR9XHJcblxyXG5cdC8vIFBhc3NpbmcgZGF0ZSB0aHJvdWdoIERhdGUgYXBwbGllcyBEYXRlLnBhcnNlLCBpZiBuZWNlc3NhcnlcclxuXHRkYXRlID0gZGF0ZSA/IG5ldyBEYXRlKGRhdGUpIDogbmV3IERhdGUoKTtcclxuXHRpZiAoaXNOYU4oZGF0ZSkpIHtcclxuXHRcdHRocm93IG5ldyBTeW50YXhFcnJvcignaW52YWxpZCBkYXRlJyk7XHJcblx0fVxyXG5cclxuXHRtYXNrID0gU3RyaW5nKG1hc2sgfHwgJ3l5eXktbW0tZGQgSEg6TU06c3MsUycpO1xyXG5cclxuXHQvLyBBbGxvdyBzZXR0aW5nIHRoZSB1dGMgYXJndW1lbnQgdmlhIHRoZSBtYXNrXHJcblx0aWYgKG1hc2suc2xpY2UoMCwgNCkgPT0gJ1VUQzonKSB7XHJcblx0XHRtYXNrID0gbWFzay5zbGljZSg0KTtcclxuXHRcdHV0YyA9IHRydWU7XHJcblx0fVxyXG5cclxuXHRsZXQgXyA9IHV0YyA/ICdnZXRVVEMnIDogJ2dldCc7XHJcblx0bGV0IGQgPSBkYXRlW18gKyAnRGF0ZSddKCk7XHJcblx0bGV0IEQgPSBkYXRlW18gKyAnRGF5J10oKTtcclxuXHRsZXQgbSA9IGRhdGVbXyArICdNb250aCddKCk7XHJcblx0bGV0IHkgPSBkYXRlW18gKyAnRnVsbFllYXInXSgpO1xyXG5cdGxldCBIID0gZGF0ZVtfICsgJ0hvdXJzJ10oKTtcclxuXHRsZXQgTSA9IGRhdGVbXyArICdNaW51dGVzJ10oKTtcclxuXHRsZXQgcyA9IGRhdGVbXyArICdTZWNvbmRzJ10oKTtcclxuXHRsZXQgTCA9IGRhdGVbXyArICdNaWxsaXNlY29uZHMnXSgpO1xyXG5cdGxldCBvID0gdXRjID8gMCA6IGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcclxuXHRsZXQgZmxhZ3MgPSB7XHJcblx0XHQnZCcgOiBkLFxyXG5cdFx0J2RkJyA6IHBhZChkKSxcclxuXHRcdCdkZGQnIDogaTE4bi5kYXlOYW1lc1tEXSxcclxuXHRcdCdkZGRkJyA6IGkxOG4uZGF5TmFtZXNbRCArIDddLFxyXG5cdFx0J00nIDogbSArIDEsXHJcblx0XHQnTU0nIDogcGFkKG0gKyAxKSxcclxuXHRcdCdNTU0nIDogaTE4bi5tb250aE5hbWVzW21dLFxyXG5cdFx0J01NTU0nIDogaTE4bi5tb250aE5hbWVzW20gKyAxMl0sXHJcblx0XHQneXknIDogU3RyaW5nKHkpLnNsaWNlKDIpLFxyXG5cdFx0J3l5eXknIDogeSxcclxuXHRcdCdoJyA6IEggJSAxMiB8fCAxMixcclxuXHRcdCdoaCcgOiBwYWQoSCAlIDEyIHx8IDEyKSxcclxuXHRcdCdIJyA6IEgsXHJcblx0XHQnSEgnIDogcGFkKEgpLFxyXG5cdFx0J20nIDogTSxcclxuXHRcdCdtbScgOiBwYWQoTSksXHJcblx0XHQncycgOiBzLFxyXG5cdFx0J3NzJyA6IHBhZChzKSxcclxuXHRcdCdTJyA6IHBhZChMLCAxKSxcclxuXHRcdCd0JyA6IEggPCAxMiA/ICdhJyA6ICdwJyxcclxuXHRcdCd0dCcgOiBIIDwgMTIgPyAnYW0nIDogJ3BtJyxcclxuXHRcdCdUJyA6IEggPCAxMiA/ICdBJyA6ICdQJyxcclxuXHRcdCdUVCcgOiBIIDwgMTIgPyAnQU0nIDogJ1BNJyxcclxuXHRcdCdaJyA6IHV0YyA/ICdVVEMnIDogKFN0cmluZyhkYXRlKS5tYXRjaChUSU1FWk9ORSkgfHwgWyAnJyBdKS5wb3AoKS5yZXBsYWNlKFRJTUVaT05FX0NMSVAsICcnKSxcclxuXHRcdCdvJyA6IChvID4gMCA/ICctJyA6ICcrJykgKyBwYWQoTWF0aC5mbG9vcihNYXRoLmFicyhvKSAvIDYwKSAqIDEwMCArIE1hdGguYWJzKG8pICUgNjAsIDQpXHJcblx0fTtcclxuXHJcblx0cmV0dXJuIG1hc2sucmVwbGFjZShUT0tFTiwgZnVuY3Rpb24gKCQwKSB7XHJcblx0XHRyZXR1cm4gJDAgaW4gZmxhZ3MgPyBmbGFnc1skMF0gOiAkMC5zbGljZSgxLCAkMC5sZW5ndGggLSAxKTtcclxuXHR9KTtcclxuXHJcbn1cclxuIl19