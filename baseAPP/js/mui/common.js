﻿! function(t) {
	function e(n) {
		if(i[n]) return i[n].exports;
		var o = i[n] = {
			exports: {},
			id: n,
			loaded: !1
		};
		return t[n].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports
	}
	var i = {};
	return e.m = t, e.c = i, e.p = "/jinrong/assets/", e(0)
}([function(t, e, i) {
	"use strict";

	function n(t, e) {
		var i = parseInt(document.documentElement.scrollTop || document.body.scrollTop),
			n = 0,
			o = 5;
		t = parseInt(t), e /= o;
		var s = setInterval(function() {
			n++, document.documentElement.scrollTop = (t - i) / e * n + i, document.body.scrollTop = (t - i) / e * n + i, n >= e && clearInterval(s)
		}, o)
	}
	i(2), i(1);
	var o = i(7);
	window.PointerEvent = void 0, window.tools = window.Tools = o;
	var s = o.wildcardUrl(),
		r = o.getUrlParam("from"),
		a = o.getUrlParam("semcode");
	r && (o.browser.versions.android && "yca7" == r ? o.setCookie("from", "yca8", "", s) : o.setCookie("from", r, "", s), o.browser.versions.android && "870" == r && o.setCookie("from", "871", "", s)), a && o.setCookie("semcode", a, "", s);
	var l = document.referrer;
	r || a || !l || (/baidu\.com/.test(l) ? o.setCookie("from", "seo_baidu", "", s) : /sm\.cn/.test(l) ? o.setCookie("from", "seo_sm", "", s) : /so\.com/.test(l) && o.setCookie("from", "seo_so", "", s));
	var c = o.isWebView(),
		h = Boolean("yixinapp" == c || "yixinbjapp" == c);
	$(function() {
		if(h) {
			if($(".header-bar").length) {
				var t = $(".header-bar>a").next().text();
				t = t.replace("·", ""), o.jsNativeBridge("getTitle", t)
			}
			var e = $('form input[name="Channel"]');
			e.length > 0 && e.val("87")
		}
	});
	var u = "",
		p = o.getCookie("logintype");
	u = "undefined" == typeof USERCENTERURL ? "//i.m.daikuan.com/User/GetCurrentUserIdentity" : USERCENTERURL + "/User/GetCurrentUserIdentity", $.ajax({
		url: u,
		dataType: "jsonp",
		beforeSend: function() {},
		success: function(t) {
			$("body").data("userStatusReady", !0), $(window).data("userStatusReady", !0).on("getUserStatus", function() {
				return {
					login: t.Islogin,
					id: t.LoanUserID,
					mobile: t.Telphone,
					hashMobile: t.HashTelphone,
					token: t.Token,
					name: t.UserName
				}
			}), h && t.Islogin && t.Token && !p && o.jsNativeBridge("pushUser", {
				tel: t.Telphone,
				token: t.Token
			})
		},
		error: function(t) {
			console.log(t)
		}
	});
	var d = ".bottom-to-top",
		f = $(window).height();
	$(d).on("click", function() {
		n(0, 500)
	});
	var m;
	$(document).on("scroll", function(t) {
		t.preventDefault(), document.documentElement.scrollTop || document.body.scrollTop > 1.5 * f ? $(d).show() : $(d).hide(), $(window).height() + $(window).scrollTop() >= $(document).height() && (m && clearTimeout(m), m = setTimeout(function() {
			$(d).hide()
		}, 1e3))
	}), window.Echo = function(t, e, i) {
		var n, o, s, r, a = [],
			l = function(i) {
				var o = i.getBoundingClientRect();
				return(o.top >= 0 && o.left >= 0 && o.top) <= (t.innerHeight || e.documentElement.clientHeight) + parseInt(n)
			},
			c = function() {
				for(var t = a.length; t--;) {
					var e = a[t];
					l(e) && (null !== e.getAttribute("data-echo-background") ? e.style.backgroundImage = "url(" + e.getAttribute("data-echo-background") + ")" : e.src !== (r = e.getAttribute("data-echo")) && (e.src = r), a.splice(t, 1))
				}
			},
			h = function() {
				clearTimeout(s), s = setTimeout(c, o)
			},
			u = function(i) {
				var s = e.querySelectorAll("[data-echo],[data-echo-background]"),
					r = i || {};
				n = r.offset || 0, o = r.throttle || 250;
				for(var l = 0; l < s.length; l++) a.push(s[l]);
				h(), e.addEventListener ? t.addEventListener("scroll", h, !1) : t.attachEvent("onscroll", h)
			};
		return {
			init: u,
			render: h
		}
	}(window, document)
}, function(t, e, i) {
	var n;
	(function() {
		! function(o, s) {
			n = function() {
				return s(o)
			}.call(e, i, e, t), !(void 0 !== n && (t.exports = n))
		}(this, function(t) {
			var e = function() {
				function e(t) {
					return null == t ? String(t) : H[Q.call(t)] || "object"
				}

				function i(t) {
					return "function" == e(t)
				}

				function n(t) {
					return null != t && t == t.window
				}

				function o(t) {
					return null != t && t.nodeType == t.DOCUMENT_NODE
				}

				function s(t) {
					return "object" == e(t)
				}

				function r(t) {
					return s(t) && !n(t) && Object.getPrototypeOf(t) == Object.prototype
				}

				function a(t) {
					var e = !!t && "length" in t && t.length,
						i = k.type(t);
					return "function" != i && !n(t) && ("array" == i || 0 === e || "number" == typeof e && e > 0 && e - 1 in t)
				}

				function l(t) {
					return B.call(t, function(t) {
						return null != t
					})
				}

				function c(t) {
					return t.length > 0 ? k.fn.concat.apply([], t) : t
				}

				function h(t) {
					return t.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
				}

				function u(t) {
					return t in D ? D[t] : D[t] = new RegExp("(^|\\s)" + t + "(\\s|$)")
				}

				function p(t, e) {
					return "number" != typeof e || O[h(t)] ? e : e + "px"
				}

				function d(t) {
					var e, i;
					return W[t] || (e = Y.createElement(t), Y.body.appendChild(e), i = getComputedStyle(e, "").getPropertyValue("display"), e.parentNode.removeChild(e), "none" == i && (i = "block"), W[t] = i), W[t]
				}

				function f(t) {
					return "children" in t ? U.call(t.children) : k.map(t.childNodes, function(t) {
						if(1 == t.nodeType) return t
					})
				}

				function m(t, e) {
					var i, n = t ? t.length : 0;
					for(i = 0; i < n; i++) this[i] = t[i];
					this.length = n, this.selector = e || ""
				}

				function v(t, e, i) {
					for(S in e) i && (r(e[S]) || tt(e[S])) ? (r(e[S]) && !r(t[S]) && (t[S] = {}), tt(e[S]) && !tt(t[S]) && (t[S] = []), v(t[S], e[S], i)) : e[S] !== E && (t[S] = e[S])
				}

				function g(t, e) {
					return null == e ? k(t) : k(t).filter(e)
				}

				function y(t, e, n, o) {
					return i(e) ? e.call(t, n, o) : e
				}

				function b(t, e, i) {
					null == i ? t.removeAttribute(e) : t.setAttribute(e, i)
				}

				function x(t, e) {
					var i = t.className || "",
						n = i && i.baseVal !== E;
					return e === E ? n ? i.baseVal : i : void(n ? i.baseVal = e : t.className = e)
				}

				function T(t) {
					try {
						return t ? "true" == t || "false" != t && ("null" == t ? null : +t + "" == t ? +t : /^[\[\{]/.test(t) ? k.parseJSON(t) : t) : t
					} catch(e) {
						return t
					}
				}

				function w(t, e) {
					e(t);
					for(var i = 0, n = t.childNodes.length; i < n; i++) w(t.childNodes[i], e)
				}
				var E, S, k, P, C, A, I = [],
					M = I.concat,
					B = I.filter,
					U = I.slice,
					Y = t.document,
					W = {},
					D = {},
					O = {
						"column-count": 1,
						columns: 1,
						"font-weight": 1,
						"line-height": 1,
						opacity: 1,
						"z-index": 1,
						zoom: 1
					},
					G = /^\s*<(\w+|!)[^>]*>/,
					N = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
					R = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
					z = /^(?:body|html)$/i,
					L = /([A-Z])/g,
					X = ["val", "css", "html", "text", "data", "width", "height", "offset"],
					j = ["after", "prepend", "before", "append"],
					V = Y.createElement("table"),
					F = Y.createElement("tr"),
					J = {
						tr: Y.createElement("tbody"),
						tbody: V,
						thead: V,
						tfoot: V,
						td: F,
						th: F,
						"*": Y.createElement("div")
					},
					K = /complete|loaded|interactive/,
					Z = /^[\w-]*$/,
					H = {},
					Q = H.toString,
					q = {},
					_ = Y.createElement("div"),
					$ = {
						tabindex: "tabIndex",
						readonly: "readOnly",
						"for": "htmlFor",
						"class": "className",
						maxlength: "maxLength",
						cellspacing: "cellSpacing",
						cellpadding: "cellPadding",
						rowspan: "rowSpan",
						colspan: "colSpan",
						usemap: "useMap",
						frameborder: "frameBorder",
						contenteditable: "contentEditable"
					},
					tt = Array.isArray || function(t) {
						return t instanceof Array
					};
				return q.matches = function(t, e) {
					if(!e || !t || 1 !== t.nodeType) return !1;
					var i = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
					if(i) return i.call(t, e);
					var n, o = t.parentNode,
						s = !o;
					return s && (o = _).appendChild(t), n = ~q.qsa(o, e).indexOf(t), s && _.removeChild(t), n
				}, C = function(t) {
					return t.replace(/-+(.)?/g, function(t, e) {
						return e ? e.toUpperCase() : ""
					})
				}, A = function(t) {
					return B.call(t, function(e, i) {
						return t.indexOf(e) == i
					})
				}, q.fragment = function(t, e, i) {
					var n, o, s;
					return N.test(t) && (n = k(Y.createElement(RegExp.$1))), n || (t.replace && (t = t.replace(R, "<$1></$2>")), e === E && (e = G.test(t) && RegExp.$1), e in J || (e = "*"), s = J[e], s.innerHTML = "" + t, n = k.each(U.call(s.childNodes), function() {
						s.removeChild(this)
					})), r(i) && (o = k(n), k.each(i, function(t, e) {
						X.indexOf(t) > -1 ? o[t](e) : o.attr(t, e)
					})), n
				}, q.Z = function(t, e) {
					return new m(t, e)
				}, q.isZ = function(t) {
					return t instanceof q.Z
				}, q.init = function(t, e) {
					var n;
					if(!t) return q.Z();
					if("string" == typeof t)
						if(t = t.trim(), "<" == t[0] && G.test(t)) n = q.fragment(t, RegExp.$1, e), t = null;
						else {
							if(e !== E) return k(e).find(t);
							n = q.qsa(Y, t)
						}
					else {
						if(i(t)) return k(Y).ready(t);
						if(q.isZ(t)) return t;
						if(tt(t)) n = l(t);
						else if(s(t)) n = [t], t = null;
						else if(G.test(t)) n = q.fragment(t.trim(), RegExp.$1, e), t = null;
						else {
							if(e !== E) return k(e).find(t);
							n = q.qsa(Y, t)
						}
					}
					return q.Z(n, t)
				}, k = function(t, e) {
					return q.init(t, e)
				}, k.extend = function(t) {
					var e, i = U.call(arguments, 1);
					return "boolean" == typeof t && (e = t, t = i.shift()), i.forEach(function(i) {
						v(t, i, e)
					}), t
				}, q.qsa = function(t, e) {
					var i, n = "#" == e[0],
						o = !n && "." == e[0],
						s = n || o ? e.slice(1) : e,
						r = Z.test(s);
					return t.getElementById && r && n ? (i = t.getElementById(s)) ? [i] : [] : 1 !== t.nodeType && 9 !== t.nodeType && 11 !== t.nodeType ? [] : U.call(r && !n && t.getElementsByClassName ? o ? t.getElementsByClassName(s) : t.getElementsByTagName(e) : t.querySelectorAll(e))
				}, k.contains = Y.documentElement.contains ? function(t, e) {
					return t !== e && t.contains(e)
				} : function(t, e) {
					for(; e && (e = e.parentNode);)
						if(e === t) return !0;
					return !1
				}, k.type = e, k.isFunction = i, k.isWindow = n, k.isArray = tt, k.isPlainObject = r, k.isEmptyObject = function(t) {
					var e;
					for(e in t) return !1;
					return !0
				}, k.isNumeric = function(t) {
					var e = Number(t),
						i = typeof t;
					return null != t && "boolean" != i && ("string" != i || t.length) && !isNaN(e) && isFinite(e) || !1
				}, k.inArray = function(t, e, i) {
					return I.indexOf.call(e, t, i)
				}, k.camelCase = C, k.trim = function(t) {
					return null == t ? "" : String.prototype.trim.call(t)
				}, k.uuid = 0, k.support = {}, k.expr = {}, k.noop = function() {}, k.map = function(t, e) {
					var i, n, o, s = [];
					if(a(t))
						for(n = 0; n < t.length; n++) i = e(t[n], n), null != i && s.push(i);
					else
						for(o in t) i = e(t[o], o), null != i && s.push(i);
					return c(s)
				}, k.each = function(t, e) {
					var i, n;
					if(a(t)) {
						for(i = 0; i < t.length; i++)
							if(e.call(t[i], i, t[i]) === !1) return t
					} else
						for(n in t)
							if(e.call(t[n], n, t[n]) === !1) return t;
					return t
				}, k.grep = function(t, e) {
					return B.call(t, e)
				}, t.JSON && (k.parseJSON = JSON.parse), k.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
					H["[object " + e + "]"] = e.toLowerCase()
				}), k.fn = {
					constructor: q.Z,
					length: 0,
					forEach: I.forEach,
					reduce: I.reduce,
					push: I.push,
					sort: I.sort,
					splice: I.splice,
					indexOf: I.indexOf,
					concat: function() {
						var t, e, i = [];
						for(t = 0; t < arguments.length; t++) e = arguments[t], i[t] = q.isZ(e) ? e.toArray() : e;
						return M.apply(q.isZ(this) ? this.toArray() : this, i)
					},
					map: function(t) {
						return k(k.map(this, function(e, i) {
							return t.call(e, i, e)
						}))
					},
					slice: function() {
						return k(U.apply(this, arguments))
					},
					ready: function(t) {
						return K.test(Y.readyState) && Y.body ? t(k) : Y.addEventListener("DOMContentLoaded", function() {
							t(k)
						}, !1), this
					},
					get: function(t) {
						return t === E ? U.call(this) : this[t >= 0 ? t : t + this.length]
					},
					toArray: function() {
						return this.get()
					},
					size: function() {
						return this.length
					},
					remove: function() {
						return this.each(function() {
							null != this.parentNode && this.parentNode.removeChild(this)
						})
					},
					each: function(t) {
						return I.every.call(this, function(e, i) {
							return t.call(e, i, e) !== !1
						}), this
					},
					filter: function(t) {
						return i(t) ? this.not(this.not(t)) : k(B.call(this, function(e) {
							return q.matches(e, t)
						}))
					},
					add: function(t, e) {
						return k(A(this.concat(k(t, e))))
					},
					is: function(t) {
						return this.length > 0 && q.matches(this[0], t)
					},
					not: function(t) {
						var e = [];
						if(i(t) && t.call !== E) this.each(function(i) {
							t.call(this, i) || e.push(this)
						});
						else {
							var n = "string" == typeof t ? this.filter(t) : a(t) && i(t.item) ? U.call(t) : k(t);
							this.forEach(function(t) {
								n.indexOf(t) < 0 && e.push(t)
							})
						}
						return k(e)
					},
					has: function(t) {
						return this.filter(function() {
							return s(t) ? k.contains(this, t) : k(this).find(t).size()
						})
					},
					eq: function(t) {
						return t === -1 ? this.slice(t) : this.slice(t, +t + 1)
					},
					first: function() {
						var t = this[0];
						return t && !s(t) ? t : k(t)
					},
					last: function() {
						var t = this[this.length - 1];
						return t && !s(t) ? t : k(t)
					},
					find: function(t) {
						var e, i = this;
						return e = t ? "object" == typeof t ? k(t).filter(function() {
							var t = this;
							return I.some.call(i, function(e) {
								return k.contains(e, t)
							})
						}) : 1 == this.length ? k(q.qsa(this[0], t)) : this.map(function() {
							return q.qsa(this, t)
						}) : k()
					},
					closest: function(t, e) {
						var i = [],
							n = "object" == typeof t && k(t);
						return this.each(function(s, r) {
							for(; r && !(n ? n.indexOf(r) >= 0 : q.matches(r, t));) r = r !== e && !o(r) && r.parentNode;
							r && i.indexOf(r) < 0 && i.push(r)
						}), k(i)
					},
					parents: function(t) {
						for(var e = [], i = this; i.length > 0;) i = k.map(i, function(t) {
							if((t = t.parentNode) && !o(t) && e.indexOf(t) < 0) return e.push(t), t
						});
						return g(e, t)
					},
					parent: function(t) {
						return g(A(this.pluck("parentNode")), t)
					},
					children: function(t) {
						return g(this.map(function() {
							return f(this)
						}), t)
					},
					contents: function() {
						return this.map(function() {
							return this.contentDocument || U.call(this.childNodes)
						})
					},
					siblings: function(t) {
						return g(this.map(function(t, e) {
							return B.call(f(e.parentNode), function(t) {
								return t !== e
							})
						}), t)
					},
					empty: function() {
						return this.each(function() {
							this.innerHTML = ""
						})
					},
					pluck: function(t) {
						return k.map(this, function(e) {
							return e[t]
						})
					},
					show: function() {
						return this.each(function() {
							"none" == this.style.display && (this.style.display = ""), "none" == getComputedStyle(this, "").getPropertyValue("display") && (this.style.display = d(this.nodeName))
						})
					},
					replaceWith: function(t) {
						return this.before(t).remove()
					},
					wrap: function(t) {
						var e = i(t);
						if(this[0] && !e) var n = k(t).get(0),
							o = n.parentNode || this.length > 1;
						return this.each(function(i) {
							k(this).wrapAll(e ? t.call(this, i) : o ? n.cloneNode(!0) : n)
						})
					},
					wrapAll: function(t) {
						if(this[0]) {
							k(this[0]).before(t = k(t));
							for(var e;
								(e = t.children()).length;) t = e.first();
							k(t).append(this)
						}
						return this
					},
					wrapInner: function(t) {
						var e = i(t);
						return this.each(function(i) {
							var n = k(this),
								o = n.contents(),
								s = e ? t.call(this, i) : t;
							o.length ? o.wrapAll(s) : n.append(s)
						})
					},
					unwrap: function() {
						return this.parent().each(function() {
							k(this).replaceWith(k(this).children())
						}), this
					},
					clone: function() {
						return this.map(function() {
							return this.cloneNode(!0)
						})
					},
					hide: function() {
						return this.css("display", "none")
					},
					toggle: function(t) {
						return this.each(function() {
							var e = k(this);
							(t === E ? "none" == e.css("display") : t) ? e.show(): e.hide()
						})
					},
					prev: function(t) {
						return k(this.pluck("previousElementSibling")).filter(t || "*")
					},
					next: function(t) {
						return k(this.pluck("nextElementSibling")).filter(t || "*")
					},
					html: function(t) {
						return 0 in arguments ? this.each(function(e) {
							var i = this.innerHTML;
							k(this).empty().append(y(this, t, e, i))
						}) : 0 in this ? this[0].innerHTML : null
					},
					text: function(t) {
						return 0 in arguments ? this.each(function(e) {
							var i = y(this, t, e, this.textContent);
							this.textContent = null == i ? "" : "" + i
						}) : 0 in this ? this.pluck("textContent").join("") : null
					},
					attr: function(t, e) {
						var i;
						return "string" != typeof t || 1 in arguments ? this.each(function(i) {
							if(1 === this.nodeType)
								if(s(t))
									for(S in t) b(this, S, t[S]);
								else b(this, t, y(this, e, i, this.getAttribute(t)))
						}) : 0 in this && 1 == this[0].nodeType && null != (i = this[0].getAttribute(t)) ? i : E
					},
					removeAttr: function(t) {
						return this.each(function() {
							1 === this.nodeType && t.split(" ").forEach(function(t) {
								b(this, t)
							}, this)
						})
					},
					prop: function(t, e) {
						return t = $[t] || t, 1 in arguments ? this.each(function(i) {
							this[t] = y(this, e, i, this[t])
						}) : this[0] && this[0][t]
					},
					removeProp: function(t) {
						return t = $[t] || t, this.each(function() {
							delete this[t]
						})
					},
					data: function(t, e) {
						var i = "data-" + t.replace(L, "-$1").toLowerCase(),
							n = 1 in arguments ? this.attr(i, e) : this.attr(i);
						return null !== n ? T(n) : E
					},
					val: function(t) {
						return 0 in arguments ? (null == t && (t = ""), this.each(function(e) {
							this.value = y(this, t, e, this.value)
						})) : this[0] && (this[0].multiple ? k(this[0]).find("option").filter(function() {
							return this.selected
						}).pluck("value") : this[0].value)
					},
					offset: function(e) {
						if(e) return this.each(function(t) {
							var i = k(this),
								n = y(this, e, t, i.offset()),
								o = i.offsetParent().offset(),
								s = {
									top: n.top - o.top,
									left: n.left - o.left
								};
							"static" == i.css("position") && (s.position = "relative"), i.css(s)
						});
						if(!this.length) return null;
						if(Y.documentElement !== this[0] && !k.contains(Y.documentElement, this[0])) return {
							top: 0,
							left: 0
						};
						var i = this[0].getBoundingClientRect();
						return {
							left: i.left + t.pageXOffset,
							top: i.top + t.pageYOffset,
							width: Math.round(i.width),
							height: Math.round(i.height)
						}
					},
					css: function(t, i) {
						if(arguments.length < 2) {
							var n = this[0];
							if("string" == typeof t) {
								if(!n) return;
								return n.style[C(t)] || getComputedStyle(n, "").getPropertyValue(t)
							}
							if(tt(t)) {
								if(!n) return;
								var o = {},
									s = getComputedStyle(n, "");
								return k.each(t, function(t, e) {
									o[e] = n.style[C(e)] || s.getPropertyValue(e)
								}), o
							}
						}
						var r = "";
						if("string" == e(t)) i || 0 === i ? r = h(t) + ":" + p(t, i) : this.each(function() {
							this.style.removeProperty(h(t))
						});
						else
							for(S in t) t[S] || 0 === t[S] ? r += h(S) + ":" + p(S, t[S]) + ";" : this.each(function() {
								this.style.removeProperty(h(S))
							});
						return this.each(function() {
							this.style.cssText += ";" + r
						})
					},
					index: function(t) {
						return t ? this.indexOf(k(t)[0]) : this.parent().children().indexOf(this[0])
					},
					hasClass: function(t) {
						return !!t && I.some.call(this, function(t) {
							return this.test(x(t))
						}, u(t))
					},
					addClass: function(t) {
						return t ? this.each(function(e) {
							if("className" in this) {
								P = [];
								var i = x(this),
									n = y(this, t, e, i);
								n.split(/\s+/g).forEach(function(t) {
									k(this).hasClass(t) || P.push(t)
								}, this), P.length && x(this, i + (i ? " " : "") + P.join(" "))
							}
						}) : this
					},
					removeClass: function(t) {
						return this.each(function(e) {
							if("className" in this) {
								if(t === E) return x(this, "");
								P = x(this), y(this, t, e, P).split(/\s+/g).forEach(function(t) {
									P = P.replace(u(t), " ")
								}), x(this, P.trim())
							}
						})
					},
					toggleClass: function(t, e) {
						return t ? this.each(function(i) {
							var n = k(this),
								o = y(this, t, i, x(this));
							o.split(/\s+/g).forEach(function(t) {
								(e === E ? !n.hasClass(t) : e) ? n.addClass(t): n.removeClass(t)
							})
						}) : this
					},
					scrollTop: function(t) {
						if(this.length) {
							var e = "scrollTop" in this[0];
							return t === E ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function() {
								this.scrollTop = t
							} : function() {
								this.scrollTo(this.scrollX, t)
							})
						}
					},
					scrollLeft: function(t) {
						if(this.length) {
							var e = "scrollLeft" in this[0];
							return t === E ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function() {
								this.scrollLeft = t
							} : function() {
								this.scrollTo(t, this.scrollY)
							})
						}
					},
					position: function() {
						if(this.length) {
							var t = this[0],
								e = this.offsetParent(),
								i = this.offset(),
								n = z.test(e[0].nodeName) ? {
									top: 0,
									left: 0
								} : e.offset();
							return i.top -= parseFloat(k(t).css("margin-top")) || 0, i.left -= parseFloat(k(t).css("margin-left")) || 0, n.top += parseFloat(k(e[0]).css("border-top-width")) || 0, n.left += parseFloat(k(e[0]).css("border-left-width")) || 0, {
								top: i.top - n.top,
								left: i.left - n.left
							}
						}
					},
					offsetParent: function() {
						return this.map(function() {
							for(var t = this.offsetParent || Y.body; t && !z.test(t.nodeName) && "static" == k(t).css("position");) t = t.offsetParent;
							return t
						})
					}
				}, k.fn.detach = k.fn.remove, ["width", "height"].forEach(function(t) {
					var e = t.replace(/./, function(t) {
						return t[0].toUpperCase()
					});
					k.fn[t] = function(i) {
						var s, r = this[0];
						return i === E ? n(r) ? r["inner" + e] : o(r) ? r.documentElement["scroll" + e] : (s = this.offset()) && s[t] : this.each(function(e) {
							r = k(this), r.css(t, y(this, i, e, r[t]()))
						})
					}
				}), j.forEach(function(i, n) {
					var o = n % 2;
					k.fn[i] = function() {
						var i, s, r = k.map(arguments, function(t) {
								var n = [];
								return i = e(t), "array" == i ? (t.forEach(function(t) {
									return t.nodeType !== E ? n.push(t) : k.zepto.isZ(t) ? n = n.concat(t.get()) : void(n = n.concat(q.fragment(t)))
								}), n) : "object" == i || null == t ? t : q.fragment(t)
							}),
							a = this.length > 1;
						return r.length < 1 ? this : this.each(function(e, i) {
							s = o ? i : i.parentNode, i = 0 == n ? i.nextSibling : 1 == n ? i.firstChild : 2 == n ? i : null;
							var l = k.contains(Y.documentElement, s);
							r.forEach(function(e) {
								if(a) e = e.cloneNode(!0);
								else if(!s) return k(e).remove();
								s.insertBefore(e, i), l && w(e, function(e) {
									if(!(null == e.nodeName || "SCRIPT" !== e.nodeName.toUpperCase() || e.type && "text/javascript" !== e.type || e.src)) {
										var i = e.ownerDocument ? e.ownerDocument.defaultView : t;
										i.eval.call(i, e.innerHTML)
									}
								})
							})
						})
					}, k.fn[o ? i + "To" : "insert" + (n ? "Before" : "After")] = function(t) {
						return k(t)[i](this), this
					}
				}), q.Z.prototype = m.prototype = k.fn, q.uniq = A, q.deserializeValue = T, k.zepto = q, k
			}();
			return t.Zepto = e, void 0 === t.$ && (t.$ = e),
				function(e) {
					function i(t) {
						return t._zid || (t._zid = d++)
					}

					function n(t, e, n, r) {
						if(e = o(e), e.ns) var a = s(e.ns);
						return(g[i(t)] || []).filter(function(t) {
							return t && (!e.e || t.e == e.e) && (!e.ns || a.test(t.ns)) && (!n || i(t.fn) === i(n)) && (!r || t.sel == r)
						})
					}

					function o(t) {
						var e = ("" + t).split(".");
						return {
							e: e[0],
							ns: e.slice(1).sort().join(" ")
						}
					}

					function s(t) {
						return new RegExp("(?:^| )" + t.replace(" ", " .* ?") + "(?: |$)")
					}

					function r(t, e) {
						return t.del && !b && t.e in x || !!e
					}

					function a(t) {
						return T[t] || b && x[t] || t
					}

					function l(t, n, s, l, c, u, d) {
						var f = i(t),
							m = g[f] || (g[f] = []);
						n.split(/\s/).forEach(function(i) {
							if("ready" == i) return e(document).ready(s);
							var n = o(i);
							n.fn = s, n.sel = c, n.e in T && (s = function(t) {
								var i = t.relatedTarget;
								if(!i || i !== this && !e.contains(this, i)) return n.fn.apply(this, arguments)
							}), n.del = u;
							var f = u || s;
							n.proxy = function(e) {
								if(e = h(e), !e.isImmediatePropagationStopped()) {
									e.data = l;
									var i = f.apply(t, e._args == p ? [e] : [e].concat(e._args));
									return i === !1 && (e.preventDefault(), e.stopPropagation()), i
								}
							}, n.i = m.length, m.push(n), "addEventListener" in t && t.addEventListener(a(n.e), n.proxy, r(n, d))
						})
					}

					function c(t, e, o, s, l) {
						var c = i(t);
						(e || "").split(/\s/).forEach(function(e) {
							n(t, e, o, s).forEach(function(e) {
								delete g[c][e.i], "removeEventListener" in t && t.removeEventListener(a(e.e), e.proxy, r(e, l))
							})
						})
					}

					function h(t, i) {
						return !i && t.isDefaultPrevented || (i || (i = t), e.each(k, function(e, n) {
							var o = i[e];
							t[e] = function() {
								return this[n] = w, o && o.apply(i, arguments)
							}, t[n] = E
						}), t.timeStamp || (t.timeStamp = Date.now()), (i.defaultPrevented !== p ? i.defaultPrevented : "returnValue" in i ? i.returnValue === !1 : i.getPreventDefault && i.getPreventDefault()) && (t.isDefaultPrevented = w)), t
					}

					function u(t) {
						var e, i = {
							originalEvent: t
						};
						for(e in t) S.test(e) || t[e] === p || (i[e] = t[e]);
						return h(i, t)
					}
					var p, d = 1,
						f = Array.prototype.slice,
						m = e.isFunction,
						v = function(t) {
							return "string" == typeof t
						},
						g = {},
						y = {},
						b = "onfocusin" in t,
						x = {
							focus: "focusin",
							blur: "focusout"
						},
						T = {
							mouseenter: "mouseover",
							mouseleave: "mouseout"
						};
					y.click = y.mousedown = y.mouseup = y.mousemove = "MouseEvents", e.event = {
						add: l,
						remove: c
					}, e.proxy = function(t, n) {
						var o = 2 in arguments && f.call(arguments, 2);
						if(m(t)) {
							var s = function() {
								return t.apply(n, o ? o.concat(f.call(arguments)) : arguments)
							};
							return s._zid = i(t), s
						}
						if(v(n)) return o ? (o.unshift(t[n], t), e.proxy.apply(null, o)) : e.proxy(t[n], t);
						throw new TypeError("expected function")
					}, e.fn.bind = function(t, e, i) {
						return this.on(t, e, i)
					}, e.fn.unbind = function(t, e) {
						return this.off(t, e)
					}, e.fn.one = function(t, e, i, n) {
						return this.on(t, e, i, n, 1)
					};
					var w = function() {
							return !0
						},
						E = function() {
							return !1
						},
						S = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,
						k = {
							preventDefault: "isDefaultPrevented",
							stopImmediatePropagation: "isImmediatePropagationStopped",
							stopPropagation: "isPropagationStopped"
						};
					e.fn.delegate = function(t, e, i) {
						return this.on(e, t, i)
					}, e.fn.undelegate = function(t, e, i) {
						return this.off(e, t, i)
					}, e.fn.live = function(t, i) {
						return e(document.body).delegate(this.selector, t, i), this
					}, e.fn.die = function(t, i) {
						return e(document.body).undelegate(this.selector, t, i), this
					}, e.fn.on = function(t, i, n, o, s) {
						var r, a, h = this;
						return t && !v(t) ? (e.each(t, function(t, e) {
							h.on(t, i, n, e, s)
						}), h) : (v(i) || m(o) || o === !1 || (o = n, n = i, i = p), o !== p && n !== !1 || (o = n, n = p), o === !1 && (o = E), h.each(function(h, p) {
							s && (r = function(t) {
								return c(p, t.type, o), o.apply(this, arguments)
							}), i && (a = function(t) {
								var n, s = e(t.target).closest(i, p).get(0);
								if(s && s !== p) return n = e.extend(u(t), {
									currentTarget: s,
									liveFired: p
								}), (r || o).apply(s, [n].concat(f.call(arguments, 1)))
							}), l(p, t, o, n, i, a || r)
						}))
					}, e.fn.off = function(t, i, n) {
						var o = this;
						return t && !v(t) ? (e.each(t, function(t, e) {
							o.off(t, i, e)
						}), o) : (v(i) || m(n) || n === !1 || (n = i, i = p), n === !1 && (n = E), o.each(function() {
							c(this, t, n, i)
						}))
					}, e.fn.trigger = function(t, i) {
						return t = v(t) || e.isPlainObject(t) ? e.Event(t) : h(t), t._args = i, this.each(function() {
							t.type in x && "function" == typeof this[t.type] ? this[t.type]() : "dispatchEvent" in this ? this.dispatchEvent(t) : e(this).triggerHandler(t, i)
						})
					}, e.fn.triggerHandler = function(t, i) {
						var o, s;
						return this.each(function(r, a) {
							o = u(v(t) ? e.Event(t) : t), o._args = i, o.target = a, e.each(n(a, t.type || t), function(t, e) {
								if(s = e.proxy(o), o.isImmediatePropagationStopped()) return !1
							})
						}), s
					}, "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(t) {
						e.fn[t] = function(e) {
							return 0 in arguments ? this.bind(t, e) : this.trigger(t)
						}
					}), e.Event = function(t, e) {
						v(t) || (e = t, t = e.type);
						var i = document.createEvent(y[t] || "Events"),
							n = !0;
						if(e)
							for(var o in e) "bubbles" == o ? n = !!e[o] : i[o] = e[o];
						return i.initEvent(t, n, !0), h(i)
					}
				}(e),
				function(e) {
					function i(t, i, n) {
						var o = e.Event(i);
						return e(t).trigger(o, n), !o.isDefaultPrevented()
					}

					function n(t, e, n, o) {
						if(t.global) return i(e || x, n, o)
					}

					function o(t) {
						t.global && 0 === e.active++ && n(t, null, "ajaxStart")
					}

					function s(t) {
						t.global && !--e.active && n(t, null, "ajaxStop")
					}

					function r(t, e) {
						var i = e.context;
						return e.beforeSend.call(i, t, e) !== !1 && n(e, i, "ajaxBeforeSend", [t, e]) !== !1 && void n(e, i, "ajaxSend", [t, e])
					}

					function a(t, e, i, o) {
						var s = i.context,
							r = "success";
						i.success.call(s, t, r, e), o && o.resolveWith(s, [t, r, e]), n(i, s, "ajaxSuccess", [e, i, t]), c(r, e, i)
					}

					function l(t, e, i, o, s) {
						var r = o.context;
						o.error.call(r, i, e, t), s && s.rejectWith(r, [i, e, t]), n(o, r, "ajaxError", [i, o, t || e]), c(e, i, o)
					}

					function c(t, e, i) {
						var o = i.context;
						i.complete.call(o, e, t), n(i, o, "ajaxComplete", [e, i]), s(i)
					}

					function h(t, e, i) {
						if(i.dataFilter == u) return t;
						var n = i.context;
						return i.dataFilter.call(n, t, e)
					}

					function u() {}

					function p(t) {
						return t && (t = t.split(";", 2)[0]), t && (t == k ? "html" : t == S ? "json" : w.test(t) ? "script" : E.test(t) && "xml") || "text"
					}

					function d(t, e) {
						return "" == e ? t : (t + "&" + e).replace(/[&?]{1,2}/, "?")
					}

					function f(t) {
						t.processData && t.data && "string" != e.type(t.data) && (t.data = e.param(t.data, t.traditional)), !t.data || t.type && "GET" != t.type.toUpperCase() && "jsonp" != t.dataType || (t.url = d(t.url, t.data), t.data = void 0)
					}

					function m(t, i, n, o) {
						return e.isFunction(i) && (o = n, n = i, i = void 0), e.isFunction(n) || (o = n, n = void 0), {
							url: t,
							data: i,
							success: n,
							dataType: o
						}
					}

					function v(t, i, n, o) {
						var s, r = e.isArray(i),
							a = e.isPlainObject(i);
						e.each(i, function(i, l) {
							s = e.type(l), o && (i = n ? o : o + "[" + (a || "object" == s || "array" == s ? i : "") + "]"), !o && r ? t.add(l.name, l.value) : "array" == s || !n && "object" == s ? v(t, l, n, i) : t.add(i, l)
						})
					}
					var g, y, b = +new Date,
						x = t.document,
						T = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
						w = /^(?:text|application)\/javascript/i,
						E = /^(?:text|application)\/xml/i,
						S = "application/json",
						k = "text/html",
						P = /^\s*$/,
						C = x.createElement("a");
					C.href = t.location.href, e.active = 0, e.ajaxJSONP = function(i, n) {
						if(!("type" in i)) return e.ajax(i);
						var o, s, c = i.jsonpCallback,
							h = (e.isFunction(c) ? c() : c) || "Zepto" + b++,
							u = x.createElement("script"),
							p = t[h],
							d = function(t) {
								e(u).triggerHandler("error", t || "abort")
							},
							f = {
								abort: d
							};
						return n && n.promise(f), e(u).on("load error", function(r, c) {
							clearTimeout(s), e(u).off().remove(), "error" != r.type && o ? a(o[0], f, i, n) : l(null, c || "error", f, i, n), t[h] = p, o && e.isFunction(p) && p(o[0]), p = o = void 0
						}), r(f, i) === !1 ? (d("abort"), f) : (t[h] = function() {
							o = arguments
						}, u.src = i.url.replace(/\?(.+)=\?/, "?$1=" + h), x.head.appendChild(u), i.timeout > 0 && (s = setTimeout(function() {
							d("timeout")
						}, i.timeout)), f)
					}, e.ajaxSettings = {
						type: "GET",
						beforeSend: u,
						success: u,
						error: u,
						complete: u,
						context: null,
						global: !0,
						xhr: function() {
							return new t.XMLHttpRequest
						},
						accepts: {
							script: "text/javascript, application/javascript, application/x-javascript",
							json: S,
							xml: "application/xml, text/xml",
							html: k,
							text: "text/plain"
						},
						crossDomain: !1,
						timeout: 0,
						processData: !0,
						cache: !0,
						dataFilter: u
					}, e.ajax = function(i) {
						var n, s, c = e.extend({}, i || {}),
							m = e.Deferred && e.Deferred();
						for(g in e.ajaxSettings) void 0 === c[g] && (c[g] = e.ajaxSettings[g]);
						o(c), c.crossDomain || (n = x.createElement("a"), n.href = c.url, n.href = n.href, c.crossDomain = C.protocol + "//" + C.host != n.protocol + "//" + n.host), c.url || (c.url = t.location.toString()), (s = c.url.indexOf("#")) > -1 && (c.url = c.url.slice(0, s)), f(c);
						var v = c.dataType,
							b = /\?.+=\?/.test(c.url);
						if(b && (v = "jsonp"), c.cache !== !1 && (i && i.cache === !0 || "script" != v && "jsonp" != v) || (c.url = d(c.url, "_=" + Date.now())), "jsonp" == v) return b || (c.url = d(c.url, c.jsonp ? c.jsonp + "=?" : c.jsonp === !1 ? "" : "callback=?")), e.ajaxJSONP(c, m);
						var T, w = c.accepts[v],
							E = {},
							S = function(t, e) {
								E[t.toLowerCase()] = [t, e]
							},
							k = /^([\w-]+:)\/\//.test(c.url) ? RegExp.$1 : t.location.protocol,
							A = c.xhr(),
							I = A.setRequestHeader;
						if(m && m.promise(A), c.crossDomain || S("X-Requested-With", "XMLHttpRequest"), S("Accept", w || "*/*"), (w = c.mimeType || w) && (w.indexOf(",") > -1 && (w = w.split(",", 2)[0]), A.overrideMimeType && A.overrideMimeType(w)), (c.contentType || c.contentType !== !1 && c.data && "GET" != c.type.toUpperCase()) && S("Content-Type", c.contentType || "application/x-www-form-urlencoded"), c.headers)
							for(y in c.headers) S(y, c.headers[y]);
						if(A.setRequestHeader = S, A.onreadystatechange = function() {
								if(4 == A.readyState) {
									A.onreadystatechange = u, clearTimeout(T);
									var t, i = !1;
									if(A.status >= 200 && A.status < 300 || 304 == A.status || 0 == A.status && "file:" == k) {
										if(v = v || p(c.mimeType || A.getResponseHeader("content-type")), "arraybuffer" == A.responseType || "blob" == A.responseType) t = A.response;
										else {
											t = A.responseText;
											try {
												t = h(t, v, c), "script" == v ? (0, eval)(t) : "xml" == v ? t = A.responseXML : "json" == v && (t = P.test(t) ? null : e.parseJSON(t))
											} catch(n) {
												i = n
											}
											if(i) return l(i, "parsererror", A, c, m)
										}
										a(t, A, c, m)
									} else l(A.statusText || null, A.status ? "error" : "abort", A, c, m)
								}
							}, r(A, c) === !1) return A.abort(), l(null, "abort", A, c, m), A;
						var M = !("async" in c) || c.async;
						if(A.open(c.type, c.url, M, c.username, c.password), c.xhrFields)
							for(y in c.xhrFields) A[y] = c.xhrFields[y];
						for(y in E) I.apply(A, E[y]);
						return c.timeout > 0 && (T = setTimeout(function() {
							A.onreadystatechange = u, A.abort(), l(null, "timeout", A, c, m)
						}, c.timeout)), A.send(c.data ? c.data : null), A
					}, e.get = function() {
						return e.ajax(m.apply(null, arguments))
					}, e.post = function() {
						var t = m.apply(null, arguments);
						return t.type = "POST", e.ajax(t)
					}, e.getJSON = function() {
						var t = m.apply(null, arguments);
						return t.dataType = "json", e.ajax(t)
					}, e.fn.load = function(t, i, n) {
						if(!this.length) return this;
						var o, s = this,
							r = t.split(/\s/),
							a = m(t, i, n),
							l = a.success;
						return r.length > 1 && (a.url = r[0], o = r[1]), a.success = function(t) {
							s.html(o ? e("<div>").html(t.replace(T, "")).find(o) : t), l && l.apply(s, arguments)
						}, e.ajax(a), this
					};
					var A = encodeURIComponent;
					e.param = function(t, i) {
						var n = [];
						return n.add = function(t, i) {
							e.isFunction(i) && (i = i()), null == i && (i = ""), this.push(A(t) + "=" + A(i))
						}, v(n, t, i), n.join("&").replace(/%20/g, "+")
					}
				}(e),
				function(t) {
					t.fn.serializeArray = function() {
						var e, i, n = [],
							o = function(t) {
								return t.forEach ? t.forEach(o) : void n.push({
									name: e,
									value: t
								})
							};
						return this[0] && t.each(this[0].elements, function(n, s) {
							i = s.type, e = s.name, e && "fieldset" != s.nodeName.toLowerCase() && !s.disabled && "submit" != i && "reset" != i && "button" != i && "file" != i && ("radio" != i && "checkbox" != i || s.checked) && o(t(s).val())
						}), n
					}, t.fn.serialize = function() {
						var t = [];
						return this.serializeArray().forEach(function(e) {
							t.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value))
						}), t.join("&")
					}, t.fn.submit = function(e) {
						if(0 in arguments) this.bind("submit", e);
						else if(this.length) {
							var i = t.Event("submit");
							this.eq(0).trigger(i), i.isDefaultPrevented() || this.get(0).submit()
						}
						return this
					}
				}(e),
				function() {
					try {
						getComputedStyle(void 0)
					} catch(e) {
						var i = getComputedStyle;
						t.getComputedStyle = function(t, e) {
							try {
								return i(t, e)
							} catch(n) {
								return null
							}
						}
					}
				}(), e
		})
	}).call(window)
}, function(t, e) {}, function(t, e) {
	! function(t, e) {
		function i(t) {
			return t.replace(/([A-Z])/g, "-$1").toLowerCase()
		}

		function n(t) {
			return o ? o + t : t.toLowerCase()
		}
		var o, s, r, a, l, c, h, u, p, d, f = "",
			m = {
				Webkit: "webkit",
				Moz: "",
				O: "o"
			},
			v = document.createElement("div"),
			g = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
			y = {};
		v.style.transform === e && t.each(m, function(t, i) {
			if(v.style[t + "TransitionProperty"] !== e) return f = "-" + t.toLowerCase() + "-", o = i, !1
		}), s = f + "transform", y[r = f + "transition-property"] = y[a = f + "transition-duration"] = y[c = f + "transition-delay"] = y[l = f + "transition-timing-function"] = y[h = f + "animation-name"] = y[u = f + "animation-duration"] = y[d = f + "animation-delay"] = y[p = f + "animation-timing-function"] = "", t.fx = {
			off: o === e && v.style.transitionProperty === e,
			speeds: {
				_default: 400,
				fast: 200,
				slow: 600
			},
			cssPrefix: f,
			transitionEnd: n("TransitionEnd"),
			animationEnd: n("AnimationEnd")
		}, t.fn.animate = function(i, n, o, s, r) {
			return t.isFunction(n) && (s = n, o = e, n = e), t.isFunction(o) && (s = o, o = e), t.isPlainObject(n) && (o = n.easing, s = n.complete, r = n.delay, n = n.duration), n && (n = ("number" == typeof n ? n : t.fx.speeds[n] || t.fx.speeds._default) / 1e3), r && (r = parseFloat(r) / 1e3), this.anim(i, n, o, s, r)
		}, t.fn.anim = function(n, o, f, m, v) {
			var b, x, T, w = {},
				E = "",
				S = this,
				k = t.fx.transitionEnd,
				P = !1;
			if(o === e && (o = t.fx.speeds._default / 1e3), v === e && (v = 0), t.fx.off && (o = 0), "string" == typeof n) w[h] = n, w[u] = o + "s", w[d] = v + "s", w[p] = f || "linear", k = t.fx.animationEnd;
			else {
				x = [];
				for(b in n) g.test(b) ? E += b + "(" + n[b] + ") " : (w[b] = n[b], x.push(i(b)));
				E && (w[s] = E, x.push(s)), o > 0 && "object" == typeof n && (w[r] = x.join(", "), w[a] = o + "s", w[c] = v + "s", w[l] = f || "linear")
			}
			return T = function(e) {
				if("undefined" != typeof e) {
					if(e.target !== e.currentTarget) return;
					t(e.target).unbind(k, T)
				} else t(this).unbind(k, T);
				P = !0, t(this).css(y), m && m.call(this)
			}, o > 0 && (this.bind(k, T), setTimeout(function() {
				P || T.call(S)
			}, 1e3 * (o + v) + 25)), this.size() && this.get(0).clientLeft, this.css(w), o <= 0 && setTimeout(function() {
				S.each(function() {
					T.call(this)
				})
			}, 0), this
		}, v = null
	}(Zepto)
}, function(t, e) {
	! function(t, e) {
		function i(i, n, o, s, r) {
			"function" != typeof n || r || (r = n, n = e);
			var a = {
				opacity: o
			};
			return s && (a.scale = s, i.css(t.fx.cssPrefix + "transform-origin", "0 0")), i.animate(a, n, null, r)
		}

		function n(e, n, o, s) {
			return i(e, n, 0, o, function() {
				r.call(t(this)), s && s.call(this)
			})
		}
		var o = window.document,
			s = (o.documentElement, t.fn.show),
			r = t.fn.hide,
			a = t.fn.toggle;
		t.fn.show = function(t, n) {
				return s.call(this), t === e ? t = 0 : this.css("opacity", 0), i(this, t, 1, "1,1", n)
			}, t.fn.hide = function(t, i) {
				return t === e ? r.call(this) : n(this, t, "0,0", i)
			}, t.fn.toggle = function(i, n) {
				return i === e || "boolean" == typeof i ? a.call(this, i) : this.each(function() {
					var e = t(this);
					e["none" == e.css("display") ? "show" : "hide"](i, n)
				})
			},
			t.fn.fadeTo = function(t, e, n) {
				return i(this, t, e, null, n)
			}, t.fn.fadeIn = function(t, e) {
				var i = this.css("opacity");
				return i > 0 ? this.css("opacity", 0) : i = 1, s.call(this).fadeTo(t, i, e)
			}, t.fn.fadeOut = function(t, e) {
				return n(this, t, null, e)
			}, t.fn.fadeToggle = function(e, i) {
				return this.each(function() {
					var n = t(this);
					n[0 == n.css("opacity") || "none" == n.css("display") ? "fadeIn" : "fadeOut"](e, i)
				})
			}
	}(Zepto)
}, function(t, e, i) {
	var n; /*! iScroll v5.2.0 ~ (c) 2008-2016 Matteo Spinelli ~ http://cubiq.org/license */
	! function(o, s, r) {
		function a(t, e) {
			this.wrapper = "string" == typeof t ? s.querySelector(t) : t, this.scroller = this.wrapper.children[0], this.scrollerStyle = this.scroller.style, this.options = {
				resizeScrollbars: !0,
				mouseWheelSpeed: 20,
				snapThreshold: .334,
				disablePointer: !u.hasPointer,
				disableTouch: u.hasPointer || !u.hasTouch,
				disableMouse: u.hasPointer || u.hasTouch,
				startX: 0,
				startY: 0,
				scrollY: !0,
				directionLockThreshold: 5,
				momentum: !0,
				bounce: !0,
				bounceTime: 600,
				bounceEasing: "",
				preventDefault: !0,
				preventDefaultException: {
					tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
				},
				HWCompositing: !0,
				useTransition: !0,
				useTransform: !0,
				bindToWrapper: "undefined" == typeof o.onmousedown
			};
			for(var i in e) this.options[i] = e[i];
			this.translateZ = this.options.HWCompositing && u.hasPerspective ? " translateZ(0)" : "", this.options.useTransition = u.hasTransition && this.options.useTransition, this.options.useTransform = u.hasTransform && this.options.useTransform, this.options.eventPassthrough = this.options.eventPassthrough === !0 ? "vertical" : this.options.eventPassthrough, this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault, this.options.scrollY = "vertical" != this.options.eventPassthrough && this.options.scrollY, this.options.scrollX = "horizontal" != this.options.eventPassthrough && this.options.scrollX, this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough, this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold, this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? u.ease[this.options.bounceEasing] || u.ease.circular : this.options.bounceEasing, this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling, this.options.tap === !0 && (this.options.tap = "tap"), "scale" == this.options.shrinkScrollbars && (this.options.useTransition = !1), this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1, this.x = 0, this.y = 0, this.directionX = 0, this.directionY = 0, this._events = {}, this._init(), this.refresh(), this.scrollTo(this.options.startX, this.options.startY), this.enable()
		}

		function l(t, e, i) {
			var n = s.createElement("div"),
				o = s.createElement("div");
			return i === !0 && (n.style.cssText = "position:absolute;z-index:9999", o.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px"), o.className = "iScrollIndicator", "h" == t ? (i === !0 && (n.style.cssText += ";height:7px;left:2px;right:2px;bottom:0", o.style.height = "100%"), n.className = "iScrollHorizontalScrollbar") : (i === !0 && (n.style.cssText += ";width:7px;bottom:2px;top:2px;right:1px", o.style.width = "100%"), n.className = "iScrollVerticalScrollbar"), n.style.cssText += ";overflow:hidden", e || (n.style.pointerEvents = "none"), n.appendChild(o), n
		}

		function c(t, e) {
			this.wrapper = "string" == typeof e.el ? s.querySelector(e.el) : e.el, this.wrapperStyle = this.wrapper.style, this.indicator = this.wrapper.children[0], this.indicatorStyle = this.indicator.style, this.scroller = t, this.options = {
				listenX: !0,
				listenY: !0,
				interactive: !1,
				resize: !0,
				defaultScrollbars: !1,
				shrink: !1,
				fade: !1,
				speedRatioX: 0,
				speedRatioY: 0
			};
			for(var i in e) this.options[i] = e[i];
			if(this.sizeRatioX = 1, this.sizeRatioY = 1, this.maxPosX = 0, this.maxPosY = 0, this.options.interactive && (this.options.disableTouch || (u.addEvent(this.indicator, "touchstart", this), u.addEvent(o, "touchend", this)), this.options.disablePointer || (u.addEvent(this.indicator, u.prefixPointerEvent("pointerdown"), this), u.addEvent(o, u.prefixPointerEvent("pointerup"), this)), this.options.disableMouse || (u.addEvent(this.indicator, "mousedown", this), u.addEvent(o, "mouseup", this))), this.options.fade) {
				this.wrapperStyle[u.style.transform] = this.scroller.translateZ;
				var n = u.style.transitionDuration;
				this.wrapperStyle[n] = u.isBadAndroid ? "0.0001ms" : "0ms";
				var r = this;
				u.isBadAndroid && h(function() {
					"0.0001ms" === r.wrapperStyle[n] && (r.wrapperStyle[n] = "0s")
				}), this.wrapperStyle.opacity = "0"
			}
		}
		var h = o.requestAnimationFrame || o.webkitRequestAnimationFrame || o.mozRequestAnimationFrame || o.oRequestAnimationFrame || o.msRequestAnimationFrame || function(t) {
				o.setTimeout(t, 1e3 / 60)
			},
			u = function() {
				function t(t) {
					return n !== !1 && ("" === n ? t : n + t.charAt(0).toUpperCase() + t.substr(1))
				}
				var e = {},
					i = s.createElement("div").style,
					n = function() {
						for(var t, e = ["t", "webkitT", "MozT", "msT", "OT"], n = 0, o = e.length; n < o; n++)
							if(t = e[n] + "ransform", t in i) return e[n].substr(0, e[n].length - 1);
						return !1
					}();
				e.getTime = Date.now || function() {
					return(new Date).getTime()
				}, e.extend = function(t, e) {
					for(var i in e) t[i] = e[i]
				}, e.addEvent = function(t, e, i, n) {
					t.addEventListener(e, i, !!n)
				}, e.removeEvent = function(t, e, i, n) {
					t.removeEventListener(e, i, !!n)
				}, e.prefixPointerEvent = function(t) {
					return o.MSPointerEvent ? "MSPointer" + t.charAt(7).toUpperCase() + t.substr(8) : t
				}, e.momentum = function(t, e, i, n, o, s) {
					var a, l, c = t - e,
						h = r.abs(c) / i;
					return s = void 0 === s ? 6e-4 : s, a = t + h * h / (2 * s) * (c < 0 ? -1 : 1), l = h / s, a < n ? (a = o ? n - o / 2.5 * (h / 8) : n, c = r.abs(a - t), l = c / h) : a > 0 && (a = o ? o / 2.5 * (h / 8) : 0, c = r.abs(t) + a, l = c / h), {
						destination: r.round(a),
						duration: l
					}
				};
				var a = t("transform");
				return e.extend(e, {
					hasTransform: a !== !1,
					hasPerspective: t("perspective") in i,
					hasTouch: "ontouchstart" in o,
					hasPointer: !(!o.PointerEvent && !o.MSPointerEvent),
					hasTransition: t("transition") in i
				}), e.isBadAndroid = function() {
					var t = o.navigator.appVersion;
					if(/Android/.test(t) && !/Chrome\/\d/.test(t)) {
						var e = t.match(/Safari\/(\d+.\d)/);
						return !(e && "object" == typeof e && e.length >= 2) || parseFloat(e[1]) < 535.19
					}
					return !1
				}(), e.extend(e.style = {}, {
					transform: a,
					transitionTimingFunction: t("transitionTimingFunction"),
					transitionDuration: t("transitionDuration"),
					transitionDelay: t("transitionDelay"),
					transformOrigin: t("transformOrigin")
				}), e.hasClass = function(t, e) {
					var i = new RegExp("(^|\\s)" + e + "(\\s|$)");
					return i.test(t.className)
				}, e.addClass = function(t, i) {
					if(!e.hasClass(t, i)) {
						var n = t.className.split(" ");
						n.push(i), t.className = n.join(" ")
					}
				}, e.removeClass = function(t, i) {
					if(e.hasClass(t, i)) {
						var n = new RegExp("(^|\\s)" + i + "(\\s|$)", "g");
						t.className = t.className.replace(n, " ")
					}
				}, e.offset = function(t) {
					for(var e = -t.offsetLeft, i = -t.offsetTop; t = t.offsetParent;) e -= t.offsetLeft, i -= t.offsetTop;
					return {
						left: e,
						top: i
					}
				}, e.preventDefaultException = function(t, e) {
					for(var i in e)
						if(e[i].test(t[i])) return !0;
					return !1
				}, e.extend(e.eventType = {}, {
					touchstart: 1,
					touchmove: 1,
					touchend: 1,
					mousedown: 2,
					mousemove: 2,
					mouseup: 2,
					pointerdown: 3,
					pointermove: 3,
					pointerup: 3,
					MSPointerDown: 3,
					MSPointerMove: 3,
					MSPointerUp: 3
				}), e.extend(e.ease = {}, {
					quadratic: {
						style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
						fn: function(t) {
							return t * (2 - t)
						}
					},
					circular: {
						style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
						fn: function(t) {
							return r.sqrt(1 - --t * t)
						}
					},
					back: {
						style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
						fn: function(t) {
							var e = 4;
							return(t -= 1) * t * ((e + 1) * t + e) + 1
						}
					},
					bounce: {
						style: "",
						fn: function(t) {
							return(t /= 1) < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
						}
					},
					elastic: {
						style: "",
						fn: function(t) {
							var e = .22,
								i = .4;
							return 0 === t ? 0 : 1 == t ? 1 : i * r.pow(2, -10 * t) * r.sin((t - e / 4) * (2 * r.PI) / e) + 1
						}
					}
				}), e.tap = function(t, e) {
					var i = s.createEvent("Event");
					i.initEvent(e, !0, !0), i.pageX = t.pageX, i.pageY = t.pageY, t.target.dispatchEvent(i)
				}, e.click = function(t) {
					var e, i = t.target;
					/(SELECT|INPUT|TEXTAREA)/i.test(i.tagName) || (e = s.createEvent("MouseEvents"), e.initMouseEvent("click", !0, !0, t.view, 1, i.screenX, i.screenY, i.clientX, i.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, 0, null), e._constructed = !0, i.dispatchEvent(e))
				}, e
			}();
		a.prototype = {
			version: "5.2.0",
			_init: function() {
				this._initEvents(), (this.options.scrollbars || this.options.indicators) && this._initIndicators(), this.options.mouseWheel && this._initWheel(), this.options.snap && this._initSnap(), this.options.keyBindings && this._initKeys()
			},
			destroy: function() {
				this._initEvents(!0), clearTimeout(this.resizeTimeout), this.resizeTimeout = null, this._execEvent("destroy")
			},
			_transitionEnd: function(t) {
				t.target == this.scroller && this.isInTransition && (this._transitionTime(), this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1, this._execEvent("scrollEnd")))
			},
			_start: function(t) {
				if(1 != u.eventType[t.type]) {
					var e;
					if(e = t.which ? t.button : t.button < 2 ? 0 : 4 == t.button ? 1 : 2, 0 !== e) return
				}
				if(this.enabled && (!this.initiated || u.eventType[t.type] === this.initiated)) {
					!this.options.preventDefault || u.isBadAndroid || u.preventDefaultException(t.target, this.options.preventDefaultException) || t.preventDefault();
					var i, n = t.touches ? t.touches[0] : t;
					this.initiated = u.eventType[t.type], this.moved = !1, this.distX = 0, this.distY = 0, this.directionX = 0, this.directionY = 0, this.directionLocked = 0, this.startTime = u.getTime(), this.options.useTransition && this.isInTransition ? (this._transitionTime(), this.isInTransition = !1, i = this.getComputedPosition(), this._translate(r.round(i.x), r.round(i.y)), this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1, this._execEvent("scrollEnd")), this.startX = this.x, this.startY = this.y, this.absStartX = this.x, this.absStartY = this.y, this.pointX = n.pageX, this.pointY = n.pageY, this._execEvent("beforeScrollStart")
				}
			},
			_move: function(t) {
				if(this.enabled && u.eventType[t.type] === this.initiated) {
					this.options.preventDefault && t.preventDefault();
					var e, i, n, o, s = t.touches ? t.touches[0] : t,
						a = s.pageX - this.pointX,
						l = s.pageY - this.pointY,
						c = u.getTime();
					if(this.pointX = s.pageX, this.pointY = s.pageY, this.distX += a, this.distY += l, n = r.abs(this.distX), o = r.abs(this.distY), !(c - this.endTime > 300 && n < 10 && o < 10)) {
						if(this.directionLocked || this.options.freeScroll || (n > o + this.options.directionLockThreshold ? this.directionLocked = "h" : o >= n + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"), "h" == this.directionLocked) {
							if("vertical" == this.options.eventPassthrough) t.preventDefault();
							else if("horizontal" == this.options.eventPassthrough) return void(this.initiated = !1);
							l = 0
						} else if("v" == this.directionLocked) {
							if("horizontal" == this.options.eventPassthrough) t.preventDefault();
							else if("vertical" == this.options.eventPassthrough) return void(this.initiated = !1);
							a = 0
						}
						a = this.hasHorizontalScroll ? a : 0, l = this.hasVerticalScroll ? l : 0, e = this.x + a, i = this.y + l, (e > 0 || e < this.maxScrollX) && (e = this.options.bounce ? this.x + a / 3 : e > 0 ? 0 : this.maxScrollX), (i > 0 || i < this.maxScrollY) && (i = this.options.bounce ? this.y + l / 3 : i > 0 ? 0 : this.maxScrollY), this.directionX = a > 0 ? -1 : a < 0 ? 1 : 0, this.directionY = l > 0 ? -1 : l < 0 ? 1 : 0, this.moved || this._execEvent("scrollStart"), this.moved = !0, this._translate(e, i), c - this.startTime > 300 && (this.startTime = c, this.startX = this.x, this.startY = this.y)
					}
				}
			},
			_end: function(t) {
				if(this.enabled && u.eventType[t.type] === this.initiated) {
					this.options.preventDefault && !u.preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault();
					var e, i, n = (t.changedTouches ? t.changedTouches[0] : t, u.getTime() - this.startTime),
						o = r.round(this.x),
						s = r.round(this.y),
						a = r.abs(o - this.startX),
						l = r.abs(s - this.startY),
						c = 0,
						h = "";
					if(this.isInTransition = 0, this.initiated = 0, this.endTime = u.getTime(), !this.resetPosition(this.options.bounceTime)) {
						if(this.scrollTo(o, s), !this.moved) return this.options.tap && u.tap(t, this.options.tap), this.options.click && u.click(t), void this._execEvent("scrollCancel");
						if(this._events.flick && n < 200 && a < 100 && l < 100) return void this._execEvent("flick");
						if(this.options.momentum && n < 300 && (e = this.hasHorizontalScroll ? u.momentum(this.x, this.startX, n, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
								destination: o,
								duration: 0
							}, i = this.hasVerticalScroll ? u.momentum(this.y, this.startY, n, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
								destination: s,
								duration: 0
							}, o = e.destination, s = i.destination, c = r.max(e.duration, i.duration), this.isInTransition = 1), this.options.snap) {
							var p = this._nearestSnap(o, s);
							this.currentPage = p, c = this.options.snapSpeed || r.max(r.max(r.min(r.abs(o - p.x), 1e3), r.min(r.abs(s - p.y), 1e3)), 300), o = p.x, s = p.y, this.directionX = 0, this.directionY = 0, h = this.options.bounceEasing
						}
						return o != this.x || s != this.y ? ((o > 0 || o < this.maxScrollX || s > 0 || s < this.maxScrollY) && (h = u.ease.quadratic), void this.scrollTo(o, s, c, h)) : void this._execEvent("scrollEnd")
					}
				}
			},
			_resize: function() {
				var t = this;
				clearTimeout(this.resizeTimeout), this.resizeTimeout = setTimeout(function() {
					t.refresh()
				}, this.options.resizePolling)
			},
			resetPosition: function(t) {
				var e = this.x,
					i = this.y;
				return t = t || 0, !this.hasHorizontalScroll || this.x > 0 ? e = 0 : this.x < this.maxScrollX && (e = this.maxScrollX), !this.hasVerticalScroll || this.y > 0 ? i = 0 : this.y < this.maxScrollY && (i = this.maxScrollY), (e != this.x || i != this.y) && (this.scrollTo(e, i, t, this.options.bounceEasing), !0)
			},
			disable: function() {
				this.enabled = !1
			},
			enable: function() {
				this.enabled = !0
			},
			refresh: function() {
				this.wrapper.offsetHeight;
				this.wrapperWidth = this.wrapper.clientWidth, this.wrapperHeight = this.wrapper.clientHeight, this.scrollerWidth = this.scroller.offsetWidth, this.scrollerHeight = this.scroller.offsetHeight, this.maxScrollX = this.wrapperWidth - this.scrollerWidth, this.maxScrollY = this.wrapperHeight - this.scrollerHeight, this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0, this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0, this.hasHorizontalScroll || (this.maxScrollX = 0, this.scrollerWidth = this.wrapperWidth), this.hasVerticalScroll || (this.maxScrollY = 0, this.scrollerHeight = this.wrapperHeight), this.endTime = 0, this.directionX = 0, this.directionY = 0, this.wrapperOffset = u.offset(this.wrapper), this._execEvent("refresh"), this.resetPosition()
			},
			on: function(t, e) {
				this._events[t] || (this._events[t] = []), this._events[t].push(e)
			},
			off: function(t, e) {
				if(this._events[t]) {
					var i = this._events[t].indexOf(e);
					i > -1 && this._events[t].splice(i, 1)
				}
			},
			_execEvent: function(t) {
				if(this._events[t]) {
					var e = 0,
						i = this._events[t].length;
					if(i)
						for(; e < i; e++) this._events[t][e].apply(this, [].slice.call(arguments, 1))
				}
			},
			scrollBy: function(t, e, i, n) {
				t = this.x + t, e = this.y + e, i = i || 0, this.scrollTo(t, e, i, n)
			},
			scrollTo: function(t, e, i, n) {
				n = n || u.ease.circular, this.isInTransition = this.options.useTransition && i > 0;
				var o = this.options.useTransition && n.style;
				!i || o ? (o && (this._transitionTimingFunction(n.style), this._transitionTime(i)), this._translate(t, e)) : this._animate(t, e, i, n.fn)
			},
			scrollToElement: function(t, e, i, n, o) {
				if(t = t.nodeType ? t : this.scroller.querySelector(t)) {
					var s = u.offset(t);
					s.left -= this.wrapperOffset.left, s.top -= this.wrapperOffset.top, i === !0 && (i = r.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)), n === !0 && (n = r.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)), s.left -= i || 0, s.top -= n || 0, s.left = s.left > 0 ? 0 : s.left < this.maxScrollX ? this.maxScrollX : s.left, s.top = s.top > 0 ? 0 : s.top < this.maxScrollY ? this.maxScrollY : s.top, e = void 0 === e || null === e || "auto" === e ? r.max(r.abs(this.x - s.left), r.abs(this.y - s.top)) : e, this.scrollTo(s.left, s.top, e, o)
				}
			},
			_transitionTime: function(t) {
				t = t || 0;
				var e = u.style.transitionDuration;
				if(this.scrollerStyle[e] = t + "ms", !t && u.isBadAndroid) {
					this.scrollerStyle[e] = "0.0001ms";
					var i = this;
					h(function() {
						"0.0001ms" === i.scrollerStyle[e] && (i.scrollerStyle[e] = "0s")
					})
				}
				if(this.indicators)
					for(var n = this.indicators.length; n--;) this.indicators[n].transitionTime(t)
			},
			_transitionTimingFunction: function(t) {
				if(this.scrollerStyle[u.style.transitionTimingFunction] = t, this.indicators)
					for(var e = this.indicators.length; e--;) this.indicators[e].transitionTimingFunction(t)
			},
			_translate: function(t, e) {
				if(this.options.useTransform ? this.scrollerStyle[u.style.transform] = "translate(" + t + "px," + e + "px)" + this.translateZ : (t = r.round(t), e = r.round(e), this.scrollerStyle.left = t + "px", this.scrollerStyle.top = e + "px"), this.x = t, this.y = e, this.indicators)
					for(var i = this.indicators.length; i--;) this.indicators[i].updatePosition()
			},
			_initEvents: function(t) {
				var e = t ? u.removeEvent : u.addEvent,
					i = this.options.bindToWrapper ? this.wrapper : o;
				e(o, "orientationchange", this), e(o, "resize", this), this.options.click && e(this.wrapper, "click", this, !0), this.options.disableMouse || (e(this.wrapper, "mousedown", this), e(i, "mousemove", this), e(i, "mousecancel", this), e(i, "mouseup", this)), u.hasPointer && !this.options.disablePointer && (e(this.wrapper, u.prefixPointerEvent("pointerdown"), this), e(i, u.prefixPointerEvent("pointermove"), this), e(i, u.prefixPointerEvent("pointercancel"), this), e(i, u.prefixPointerEvent("pointerup"), this)), u.hasTouch && !this.options.disableTouch && (e(this.wrapper, "touchstart", this), e(i, "touchmove", this), e(i, "touchcancel", this), e(i, "touchend", this)), e(this.scroller, "transitionend", this), e(this.scroller, "webkitTransitionEnd", this), e(this.scroller, "oTransitionEnd", this), e(this.scroller, "MSTransitionEnd", this)
			},
			getComputedPosition: function() {
				var t, e, i = o.getComputedStyle(this.scroller, null);
				return this.options.useTransform ? (i = i[u.style.transform].split(")")[0].split(", "), t = +(i[12] || i[4]), e = +(i[13] || i[5])) : (t = +i.left.replace(/[^-\d.]/g, ""), e = +i.top.replace(/[^-\d.]/g, "")), {
					x: t,
					y: e
				}
			},
			_initIndicators: function() {
				function t(t) {
					if(s.indicators)
						for(var e = s.indicators.length; e--;) t.call(s.indicators[e])
				}
				var e, i = this.options.interactiveScrollbars,
					n = "string" != typeof this.options.scrollbars,
					o = [],
					s = this;
				this.indicators = [], this.options.scrollbars && (this.options.scrollY && (e = {
					el: l("v", i, this.options.scrollbars),
					interactive: i,
					defaultScrollbars: !0,
					customStyle: n,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenX: !1
				}, this.wrapper.appendChild(e.el), o.push(e)), this.options.scrollX && (e = {
					el: l("h", i, this.options.scrollbars),
					interactive: i,
					defaultScrollbars: !0,
					customStyle: n,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenY: !1
				}, this.wrapper.appendChild(e.el), o.push(e))), this.options.indicators && (o = o.concat(this.options.indicators));
				for(var r = o.length; r--;) this.indicators.push(new c(this, o[r]));
				this.options.fadeScrollbars && (this.on("scrollEnd", function() {
					t(function() {
						this.fade()
					})
				}), this.on("scrollCancel", function() {
					t(function() {
						this.fade()
					})
				}), this.on("scrollStart", function() {
					t(function() {
						this.fade(1)
					})
				}), this.on("beforeScrollStart", function() {
					t(function() {
						this.fade(1, !0)
					})
				})), this.on("refresh", function() {
					t(function() {
						this.refresh()
					})
				}), this.on("destroy", function() {
					t(function() {
						this.destroy()
					}), delete this.indicators
				})
			},
			_initWheel: function() {
				u.addEvent(this.wrapper, "wheel", this), u.addEvent(this.wrapper, "mousewheel", this), u.addEvent(this.wrapper, "DOMMouseScroll", this), this.on("destroy", function() {
					clearTimeout(this.wheelTimeout), this.wheelTimeout = null, u.removeEvent(this.wrapper, "wheel", this), u.removeEvent(this.wrapper, "mousewheel", this), u.removeEvent(this.wrapper, "DOMMouseScroll", this)
				})
			},
			_wheel: function(t) {
				if(this.enabled) {
					t.preventDefault();
					var e, i, n, o, s = this;
					if(void 0 === this.wheelTimeout && s._execEvent("scrollStart"), clearTimeout(this.wheelTimeout), this.wheelTimeout = setTimeout(function() {
							s.options.snap || s._execEvent("scrollEnd"), s.wheelTimeout = void 0
						}, 400), "deltaX" in t) 1 === t.deltaMode ? (e = -t.deltaX * this.options.mouseWheelSpeed, i = -t.deltaY * this.options.mouseWheelSpeed) : (e = -t.deltaX, i = -t.deltaY);
					else if("wheelDeltaX" in t) e = t.wheelDeltaX / 120 * this.options.mouseWheelSpeed, i = t.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
					else if("wheelDelta" in t) e = i = t.wheelDelta / 120 * this.options.mouseWheelSpeed;
					else {
						if(!("detail" in t)) return;
						e = i = -t.detail / 3 * this.options.mouseWheelSpeed
					}
					if(e *= this.options.invertWheelDirection, i *= this.options.invertWheelDirection, this.hasVerticalScroll || (e = i, i = 0), this.options.snap) return n = this.currentPage.pageX, o = this.currentPage.pageY, e > 0 ? n-- : e < 0 && n++, i > 0 ? o-- : i < 0 && o++, void this.goToPage(n, o);
					n = this.x + r.round(this.hasHorizontalScroll ? e : 0), o = this.y + r.round(this.hasVerticalScroll ? i : 0), this.directionX = e > 0 ? -1 : e < 0 ? 1 : 0, this.directionY = i > 0 ? -1 : i < 0 ? 1 : 0, n > 0 ? n = 0 : n < this.maxScrollX && (n = this.maxScrollX), o > 0 ? o = 0 : o < this.maxScrollY && (o = this.maxScrollY), this.scrollTo(n, o, 0)
				}
			},
			_initSnap: function() {
				this.currentPage = {}, "string" == typeof this.options.snap && (this.options.snap = this.scroller.querySelectorAll(this.options.snap)), this.on("refresh", function() {
					var t, e, i, n, o, s, a = 0,
						l = 0,
						c = 0,
						h = this.options.snapStepX || this.wrapperWidth,
						u = this.options.snapStepY || this.wrapperHeight;
					if(this.pages = [], this.wrapperWidth && this.wrapperHeight && this.scrollerWidth && this.scrollerHeight) {
						if(this.options.snap === !0)
							for(i = r.round(h / 2), n = r.round(u / 2); c > -this.scrollerWidth;) {
								for(this.pages[a] = [], t = 0, o = 0; o > -this.scrollerHeight;) this.pages[a][t] = {
									x: r.max(c, this.maxScrollX),
									y: r.max(o, this.maxScrollY),
									width: h,
									height: u,
									cx: c - i,
									cy: o - n
								}, o -= u, t++;
								c -= h, a++
							} else
								for(s = this.options.snap, t = s.length, e = -1; a < t; a++)(0 === a || s[a].offsetLeft <= s[a - 1].offsetLeft) && (l = 0, e++), this.pages[l] || (this.pages[l] = []), c = r.max(-s[a].offsetLeft, this.maxScrollX), o = r.max(-s[a].offsetTop, this.maxScrollY), i = c - r.round(s[a].offsetWidth / 2), n = o - r.round(s[a].offsetHeight / 2), this.pages[l][e] = {
									x: c,
									y: o,
									width: s[a].offsetWidth,
									height: s[a].offsetHeight,
									cx: i,
									cy: n
								}, c > this.maxScrollX && l++;
						this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0), this.options.snapThreshold % 1 === 0 ? (this.snapThresholdX = this.options.snapThreshold, this.snapThresholdY = this.options.snapThreshold) : (this.snapThresholdX = r.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold), this.snapThresholdY = r.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold))
					}
				}), this.on("flick", function() {
					var t = this.options.snapSpeed || r.max(r.max(r.min(r.abs(this.x - this.startX), 1e3), r.min(r.abs(this.y - this.startY), 1e3)), 300);
					this.goToPage(this.currentPage.pageX + this.directionX, this.currentPage.pageY + this.directionY, t)
				})
			},
			_nearestSnap: function(t, e) {
				if(!this.pages.length) return {
					x: 0,
					y: 0,
					pageX: 0,
					pageY: 0
				};
				var i = 0,
					n = this.pages.length,
					o = 0;
				if(r.abs(t - this.absStartX) < this.snapThresholdX && r.abs(e - this.absStartY) < this.snapThresholdY) return this.currentPage;
				for(t > 0 ? t = 0 : t < this.maxScrollX && (t = this.maxScrollX), e > 0 ? e = 0 : e < this.maxScrollY && (e = this.maxScrollY); i < n; i++)
					if(t >= this.pages[i][0].cx) {
						t = this.pages[i][0].x;
						break
					}
				for(n = this.pages[i].length; o < n; o++)
					if(e >= this.pages[0][o].cy) {
						e = this.pages[0][o].y;
						break
					}
				return i == this.currentPage.pageX && (i += this.directionX, i < 0 ? i = 0 : i >= this.pages.length && (i = this.pages.length - 1), t = this.pages[i][0].x), o == this.currentPage.pageY && (o += this.directionY, o < 0 ? o = 0 : o >= this.pages[0].length && (o = this.pages[0].length - 1), e = this.pages[0][o].y), {
					x: t,
					y: e,
					pageX: i,
					pageY: o
				}
			},
			goToPage: function(t, e, i, n) {
				n = n || this.options.bounceEasing, t >= this.pages.length ? t = this.pages.length - 1 : t < 0 && (t = 0), e >= this.pages[t].length ? e = this.pages[t].length - 1 : e < 0 && (e = 0);
				var o = this.pages[t][e].x,
					s = this.pages[t][e].y;
				i = void 0 === i ? this.options.snapSpeed || r.max(r.max(r.min(r.abs(o - this.x), 1e3), r.min(r.abs(s - this.y), 1e3)), 300) : i, this.currentPage = {
					x: o,
					y: s,
					pageX: t,
					pageY: e
				}, this.scrollTo(o, s, i, n)
			},
			next: function(t, e) {
				var i = this.currentPage.pageX,
					n = this.currentPage.pageY;
				i++, i >= this.pages.length && this.hasVerticalScroll && (i = 0, n++), this.goToPage(i, n, t, e)
			},
			prev: function(t, e) {
				var i = this.currentPage.pageX,
					n = this.currentPage.pageY;
				i--, i < 0 && this.hasVerticalScroll && (i = 0, n--), this.goToPage(i, n, t, e)
			},
			_initKeys: function(t) {
				var e, i = {
					pageUp: 33,
					pageDown: 34,
					end: 35,
					home: 36,
					left: 37,
					up: 38,
					right: 39,
					down: 40
				};
				if("object" == typeof this.options.keyBindings)
					for(e in this.options.keyBindings) "string" == typeof this.options.keyBindings[e] && (this.options.keyBindings[e] = this.options.keyBindings[e].toUpperCase().charCodeAt(0));
				else this.options.keyBindings = {};
				for(e in i) this.options.keyBindings[e] = this.options.keyBindings[e] || i[e];
				u.addEvent(o, "keydown", this), this.on("destroy", function() {
					u.removeEvent(o, "keydown", this)
				})
			},
			_key: function(t) {
				if(this.enabled) {
					var e, i = this.options.snap,
						n = i ? this.currentPage.pageX : this.x,
						o = i ? this.currentPage.pageY : this.y,
						s = u.getTime(),
						a = this.keyTime || 0,
						l = .25;
					switch(this.options.useTransition && this.isInTransition && (e = this.getComputedPosition(), this._translate(r.round(e.x), r.round(e.y)), this.isInTransition = !1), this.keyAcceleration = s - a < 200 ? r.min(this.keyAcceleration + l, 50) : 0, t.keyCode) {
						case this.options.keyBindings.pageUp:
							this.hasHorizontalScroll && !this.hasVerticalScroll ? n += i ? 1 : this.wrapperWidth : o += i ? 1 : this.wrapperHeight;
							break;
						case this.options.keyBindings.pageDown:
							this.hasHorizontalScroll && !this.hasVerticalScroll ? n -= i ? 1 : this.wrapperWidth : o -= i ? 1 : this.wrapperHeight;
							break;
						case this.options.keyBindings.end:
							n = i ? this.pages.length - 1 : this.maxScrollX, o = i ? this.pages[0].length - 1 : this.maxScrollY;
							break;
						case this.options.keyBindings.home:
							n = 0, o = 0;
							break;
						case this.options.keyBindings.left:
							n += i ? -1 : 5 + this.keyAcceleration >> 0;
							break;
						case this.options.keyBindings.up:
							o += i ? 1 : 5 + this.keyAcceleration >> 0;
							break;
						case this.options.keyBindings.right:
							n -= i ? -1 : 5 + this.keyAcceleration >> 0;
							break;
						case this.options.keyBindings.down:
							o -= i ? 1 : 5 + this.keyAcceleration >> 0;
							break;
						default:
							return
					}
					if(i) return void this.goToPage(n, o);
					n > 0 ? (n = 0, this.keyAcceleration = 0) : n < this.maxScrollX && (n = this.maxScrollX, this.keyAcceleration = 0), o > 0 ? (o = 0, this.keyAcceleration = 0) : o < this.maxScrollY && (o = this.maxScrollY, this.keyAcceleration = 0), this.scrollTo(n, o, 0), this.keyTime = s
				}
			},
			_animate: function(t, e, i, n) {
				function o() {
					var p, d, f, m = u.getTime();
					return m >= c ? (s.isAnimating = !1, s._translate(t, e), void(s.resetPosition(s.options.bounceTime) || s._execEvent("scrollEnd"))) : (m = (m - l) / i, f = n(m), p = (t - r) * f + r, d = (e - a) * f + a, s._translate(p, d), void(s.isAnimating && h(o)))
				}
				var s = this,
					r = this.x,
					a = this.y,
					l = u.getTime(),
					c = l + i;
				this.isAnimating = !0, o()
			},
			handleEvent: function(t) {
				switch(t.type) {
					case "touchstart":
					case "pointerdown":
					case "MSPointerDown":
					case "mousedown":
						this._start(t);
						break;
					case "touchmove":
					case "pointermove":
					case "MSPointerMove":
					case "mousemove":
						this._move(t);
						break;
					case "touchend":
					case "pointerup":
					case "MSPointerUp":
					case "mouseup":
					case "touchcancel":
					case "pointercancel":
					case "MSPointerCancel":
					case "mousecancel":
						this._end(t);
						break;
					case "orientationchange":
					case "resize":
						this._resize();
						break;
					case "transitionend":
					case "webkitTransitionEnd":
					case "oTransitionEnd":
					case "MSTransitionEnd":
						this._transitionEnd(t);
						break;
					case "wheel":
					case "DOMMouseScroll":
					case "mousewheel":
						this._wheel(t);
						break;
					case "keydown":
						this._key(t);
						break;
					case "click":
						this.enabled && !t._constructed && (t.preventDefault(), t.stopPropagation())
				}
			}
		}, c.prototype = {
			handleEvent: function(t) {
				switch(t.type) {
					case "touchstart":
					case "pointerdown":
					case "MSPointerDown":
					case "mousedown":
						this._start(t);
						break;
					case "touchmove":
					case "pointermove":
					case "MSPointerMove":
					case "mousemove":
						this._move(t);
						break;
					case "touchend":
					case "pointerup":
					case "MSPointerUp":
					case "mouseup":
					case "touchcancel":
					case "pointercancel":
					case "MSPointerCancel":
					case "mousecancel":
						this._end(t)
				}
			},
			destroy: function() {
				this.options.fadeScrollbars && (clearTimeout(this.fadeTimeout), this.fadeTimeout = null), this.options.interactive && (u.removeEvent(this.indicator, "touchstart", this), u.removeEvent(this.indicator, u.prefixPointerEvent("pointerdown"), this), u.removeEvent(this.indicator, "mousedown", this), u.removeEvent(o, "touchmove", this), u.removeEvent(o, u.prefixPointerEvent("pointermove"), this), u.removeEvent(o, "mousemove", this), u.removeEvent(o, "touchend", this), u.removeEvent(o, u.prefixPointerEvent("pointerup"), this), u.removeEvent(o, "mouseup", this)), this.options.defaultScrollbars && this.wrapper.parentNode.removeChild(this.wrapper)
			},
			_start: function(t) {
				var e = t.touches ? t.touches[0] : t;
				t.preventDefault(), t.stopPropagation(), this.transitionTime(), this.initiated = !0, this.moved = !1, this.lastPointX = e.pageX, this.lastPointY = e.pageY, this.startTime = u.getTime(), this.options.disableTouch || u.addEvent(o, "touchmove", this), this.options.disablePointer || u.addEvent(o, u.prefixPointerEvent("pointermove"), this), this.options.disableMouse || u.addEvent(o, "mousemove", this), this.scroller._execEvent("beforeScrollStart")
			},
			_move: function(t) {
				var e, i, n, o, s = t.touches ? t.touches[0] : t;
				u.getTime();
				this.moved || this.scroller._execEvent("scrollStart"), this.moved = !0, e = s.pageX - this.lastPointX, this.lastPointX = s.pageX, i = s.pageY - this.lastPointY, this.lastPointY = s.pageY, n = this.x + e, o = this.y + i, this._pos(n, o), t.preventDefault(), t.stopPropagation()
			},
			_end: function(t) {
				if(this.initiated) {
					if(this.initiated = !1, t.preventDefault(), t.stopPropagation(), u.removeEvent(o, "touchmove", this), u.removeEvent(o, u.prefixPointerEvent("pointermove"), this), u.removeEvent(o, "mousemove", this), this.scroller.options.snap) {
						var e = this.scroller._nearestSnap(this.scroller.x, this.scroller.y),
							i = this.options.snapSpeed || r.max(r.max(r.min(r.abs(this.scroller.x - e.x), 1e3), r.min(r.abs(this.scroller.y - e.y), 1e3)), 300);
						this.scroller.x == e.x && this.scroller.y == e.y || (this.scroller.directionX = 0, this.scroller.directionY = 0, this.scroller.currentPage = e, this.scroller.scrollTo(e.x, e.y, i, this.scroller.options.bounceEasing))
					}
					this.moved && this.scroller._execEvent("scrollEnd")
				}
			},
			transitionTime: function(t) {
				t = t || 0;
				var e = u.style.transitionDuration;
				if(this.indicatorStyle[e] = t + "ms", !t && u.isBadAndroid) {
					this.indicatorStyle[e] = "0.0001ms";
					var i = this;
					h(function() {
						"0.0001ms" === i.indicatorStyle[e] && (i.indicatorStyle[e] = "0s")
					})
				}
			},
			transitionTimingFunction: function(t) {
				this.indicatorStyle[u.style.transitionTimingFunction] = t
			},
			refresh: function() {
				this.transitionTime(), this.options.listenX && !this.options.listenY ? this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? "block" : "none" : this.options.listenY && !this.options.listenX ? this.indicatorStyle.display = this.scroller.hasVerticalScroll ? "block" : "none" : this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? "block" : "none", this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ? (u.addClass(this.wrapper, "iScrollBothScrollbars"), u.removeClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "8px" : this.wrapper.style.bottom = "8px")) : (u.removeClass(this.wrapper, "iScrollBothScrollbars"), u.addClass(this.wrapper, "iScrollLoneScrollbar"), this.options.defaultScrollbars && this.options.customStyle && (this.options.listenX ? this.wrapper.style.right = "2px" : this.wrapper.style.bottom = "2px"));
				this.wrapper.offsetHeight;
				this.options.listenX && (this.wrapperWidth = this.wrapper.clientWidth, this.options.resize ? (this.indicatorWidth = r.max(r.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8), this.indicatorStyle.width = this.indicatorWidth + "px") : this.indicatorWidth = this.indicator.clientWidth, this.maxPosX = this.wrapperWidth - this.indicatorWidth, "clip" == this.options.shrink ? (this.minBoundaryX = -this.indicatorWidth + 8, this.maxBoundaryX = this.wrapperWidth - 8) : (this.minBoundaryX = 0, this.maxBoundaryX = this.maxPosX), this.sizeRatioX = this.options.speedRatioX || this.scroller.maxScrollX && this.maxPosX / this.scroller.maxScrollX), this.options.listenY && (this.wrapperHeight = this.wrapper.clientHeight, this.options.resize ? (this.indicatorHeight = r.max(r.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8), this.indicatorStyle.height = this.indicatorHeight + "px") : this.indicatorHeight = this.indicator.clientHeight, this.maxPosY = this.wrapperHeight - this.indicatorHeight, "clip" == this.options.shrink ? (this.minBoundaryY = -this.indicatorHeight + 8, this.maxBoundaryY = this.wrapperHeight - 8) : (this.minBoundaryY = 0, this.maxBoundaryY = this.maxPosY), this.maxPosY = this.wrapperHeight - this.indicatorHeight, this.sizeRatioY = this.options.speedRatioY || this.scroller.maxScrollY && this.maxPosY / this.scroller.maxScrollY), this.updatePosition()
			},
			updatePosition: function() {
				var t = this.options.listenX && r.round(this.sizeRatioX * this.scroller.x) || 0,
					e = this.options.listenY && r.round(this.sizeRatioY * this.scroller.y) || 0;
				this.options.ignoreBoundaries || (t < this.minBoundaryX ? ("scale" == this.options.shrink && (this.width = r.max(this.indicatorWidth + t, 8), this.indicatorStyle.width = this.width + "px"), t = this.minBoundaryX) : t > this.maxBoundaryX ? "scale" == this.options.shrink ? (this.width = r.max(this.indicatorWidth - (t - this.maxPosX), 8), this.indicatorStyle.width = this.width + "px", t = this.maxPosX + this.indicatorWidth - this.width) : t = this.maxBoundaryX : "scale" == this.options.shrink && this.width != this.indicatorWidth && (this.width = this.indicatorWidth, this.indicatorStyle.width = this.width + "px"), e < this.minBoundaryY ? ("scale" == this.options.shrink && (this.height = r.max(this.indicatorHeight + 3 * e, 8), this.indicatorStyle.height = this.height + "px"), e = this.minBoundaryY) : e > this.maxBoundaryY ? "scale" == this.options.shrink ? (this.height = r.max(this.indicatorHeight - 3 * (e - this.maxPosY), 8), this.indicatorStyle.height = this.height + "px", e = this.maxPosY + this.indicatorHeight - this.height) : e = this.maxBoundaryY : "scale" == this.options.shrink && this.height != this.indicatorHeight && (this.height = this.indicatorHeight, this.indicatorStyle.height = this.height + "px")),
					this.x = t, this.y = e, this.scroller.options.useTransform ? this.indicatorStyle[u.style.transform] = "translate(" + t + "px," + e + "px)" + this.scroller.translateZ : (this.indicatorStyle.left = t + "px", this.indicatorStyle.top = e + "px")
			},
			_pos: function(t, e) {
				t < 0 ? t = 0 : t > this.maxPosX && (t = this.maxPosX), e < 0 ? e = 0 : e > this.maxPosY && (e = this.maxPosY), t = this.options.listenX ? r.round(t / this.sizeRatioX) : this.scroller.x, e = this.options.listenY ? r.round(e / this.sizeRatioY) : this.scroller.y, this.scroller.scrollTo(t, e)
			},
			fade: function(t, e) {
				if(!e || this.visible) {
					clearTimeout(this.fadeTimeout), this.fadeTimeout = null;
					var i = t ? 250 : 500,
						n = t ? 0 : 300;
					t = t ? "1" : "0", this.wrapperStyle[u.style.transitionDuration] = i + "ms", this.fadeTimeout = setTimeout(function(t) {
						this.wrapperStyle.opacity = t, this.visible = +t
					}.bind(this, t), n)
				}
			}
		}, a.utils = u, "undefined" != typeof t && t.exports ? t.exports = a : (n = function() {
			return a
		}.call(e, i, e, t), !(void 0 !== n && (t.exports = n)))
	}(window, document, Math)
}, function(t, e) {
	"use strict";
	var i = {
		Wi: [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1],
		ValideCode: [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2],
		IdCardValidate: function(t) {
			if(t = t.trim(), "" == t) return "";
			if(15 == t.length) return i.IsValidityBrithBy15IdCard(t);
			if(18 == t.length) {
				var e = t.split("");
				return !(!i.IsValidityBrithBy18IdCard(t) || !i.IsTrueValidateCodeBy18IdCard(e))
			}
			return !1
		},
		IsTrueValidateCodeBy18IdCard: function(t) {
			var e = 0;
			"x" == t[17].toLowerCase() && (t[17] = 10);
			for(var n = 0; n < 17; n++) e += i.Wi[n] * t[n];
			var o = e % 11;
			return t[17] == i.ValideCode[o]
		},
		MaleOrFemalByIdCard: function(t) {
			return t = trim(t.replace(/ /g, "")), 15 == t.length ? t.substring(14, 15) % 2 == 0 ? "female" : "male" : 18 == t.length ? t.substring(14, 17) % 2 == 0 ? "female" : "male" : null
		},
		IsValidityBrithBy18IdCard: function(t) {
			var e = t.substring(6, 10),
				i = t.substring(10, 12),
				n = t.substring(12, 14),
				o = new Date(e, parseFloat(i) - 1, parseFloat(n));
			return o.getFullYear() == parseFloat(e) && o.getMonth() == parseFloat(i) - 1 && o.getDate() == parseFloat(n)
		},
		IsValidityBrithBy15IdCard: function(t) {
			var e = t.substring(6, 8),
				i = t.substring(8, 10),
				n = t.substring(10, 12),
				o = new Date(e, parseFloat(i) - 1, parseFloat(n));
			return o.getYear() == parseFloat(e) && o.getMonth() == parseFloat(i) - 1 && o.getDate() == parseFloat(n)
		},
		IsPhoneNumber: function(t) {
			var e = new RegExp(/^1[3|4|5|7|8][0-9]{9}$/);
			return "" == t ? "" : e.test(t)
		},
		IsPassport: function(t) {
			var e = new RegExp(/^1[45][0-9]{7}|([P|p|S|s]\d{7})|([S|s|G|g]\d{8})|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8})|([H|h|M|m]\d{8，10})$/);
			return "" == t ? "" : e.test(t)
		},
		IsName: function(t) {
			var e = new RegExp(/^[\u4e00-\u9fa5]{2,8}$/);
			return "" == t ? "" : e.test(t)
		},
		IsEmail: function(t) {
			var e = /^[\w\-\.]+@[\w\-\.]+(\.\w+)+$/;
			return "" == t ? "" : e.test(t)
		},
		IsCarName: function(t) {
			var e = new RegExp(/^[\u4e00-\u9fa5]{1}[a-z_A-Z]{1}[0-9_a-z_A-Z]{5}$/);
			return "" == t ? "" : e.test(t)
		},
		IsLandline: function(t) {
			var e = new RegExp(/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/);
			return "" == t ? "" : e.test(t)
		},
		getCode: function(t, e) {
			var n = {
					seconds: 60,
					tel_id: "mobile",
					gvc_id: "GetValidateCode",
					line: "550",
					url: CODE_GETTING_URL,
					__RequestVerificationToken: ""
				},
				o = $.extend(n, t);
			if(o.seconds <= 0) return alert(倒计时时间不能小于0), !1;
			if($("#" + o.gvc_id).hasClass("disable")) return !1;
			var s = ($("#" + o.tel_id).val() || "").replace(/\s/g, ""),
				r = {
					mobile: s,
					line: o.line
				},
				a = o.__RequestVerificationToken || $("input[name=__RequestVerificationToken]").val() || $("input[name=__RequestVerificationToken]").data("id");
			if(a && (r.__RequestVerificationToken = a), i.IsPhoneNumber(s)) {
				try {
					bc.evt.send("mobile", "codeclk", r.mobile)
				} catch(l) {}
				return tools.$ajax({
					url: o.url,
					data: r,
					type: "POST",
					dataType: "json",
					success: function(t) {
						e(t)
					}
				}), $("#" + o.gvc_id).addClass("disable").text(o.seconds + "秒后获取"), window.tmo = setInterval(function() {
					return 0 == --o.seconds ? (clearInterval(tmo), void $("#" + o.gvc_id).removeClass("disable").text("获取验证码")) : void $("#" + o.gvc_id).text(o.seconds + "秒后获取")
				}, 1e3), !0
			}
			return !1
		},
		checkCode: function(t, e) {
			var i = {
					number: "",
					tel_id: "mobile",
					gvc_id: "GetValidateCode",
					line: "550",
					url: CODE_VALIDATING_URL
				},
				n = $.extend(i, t);
			if("" == n.number) return "";
			var o = {
					mobile: ($("#" + n.tel_id).val() || "").replace(/\s/g, ""),
					validatecode: n.number,
					line: n.line
				},
				s = n.__RequestVerificationToken || $("input[name=__RequestVerificationToken]").val() || $("input[name=__RequestVerificationToken]").data("id");
			s && (o.__RequestVerificationToken = s);
			try {
				bc.evt.send("mobile", "chkcode", o.mobile)
			} catch(r) {}
			tools.$ajax({
				url: n.url,
				type: "POST",
				data: o,
				success: e,
				error: function(t, e, i) {
					alert(e)
				}
			})
		},
		IsCreditCard: function(t) {
			if("" == t) return "";
			var e = function(t) {
				var e = t,
					i = "";
				for(a = e.length - 1; a >= 0; a--) i += e.charAt(a);
				return i
			};
			if(0 == t.length || t.length < 12 || t.length > 19) return !1;
			var i = /[34569]/,
				n = new RegExp(i);
			if(n.test(0 == t.charAt(0))) return !1;
			for(var o = e(t), s = 0, r = 0, a = 0; a < o.length; a++)
				if(a % 2 == 0) s += 1 * o.charAt(a);
				else {
					var l = 2 * o.charAt(a);
					l > 9 ? r = r + (l / 10 | 0) + l % 10 : r += l
				}
			var c = s + r;
			return c % 10 == 0
		},
		IsPassword: function(t) {
			var e = new RegExp(/^((?=.*[a-zA-Z])(?=.*\d)|(?=[a-zA-Z])(?=.*[#@!~%^&*])|(?=.*\d)(?=.*[#@!~%^&*]))[a-zA-Z\d#@!~%^&*]{6,20}$/);
			return "" == t ? "" : e.test(t)
		},
		IsValidateCode: function(t) {
			var e = new RegExp(/^[0-9]{6}$/);
			return "" === t ? "" : e.test(t)
		},
		IsAge: function(t) {
			var e = new RegExp(/^[2][2-9]|[3-5]\d|[6][0-5]$/);
			return "" === t ? "" : e.test(t)
		},
		IsKilometres: function(t) {
			var e = new RegExp(/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/);
			return "" === t ? "" : e.test(t)
		}
	};
	t.exports = {
		isPhoneNumber: i.IsPhoneNumber,
		isID: i.IdCardValidate,
		isPassport: i.IsPassport,
		isName: i.IsName,
		isEmail: i.IsEmail,
		isCarName: i.IsCarName,
		isLandline: i.IsLandline,
		isCreditCard: i.IsCreditCard,
		getCode: i.getCode,
		checkCode: i.checkCode,
		isPassword: i.IsPassword,
		isValidateCode: i.IsValidateCode,
		isAge: i.IsAge,
		isKilometres: i.IsKilometres
	}
}, function(module, exports, __webpack_require__) {
	"use strict";
	var $ = __webpack_require__(1);
	__webpack_require__(3), __webpack_require__(4);
	var IScroll = __webpack_require__(5),
		check = __webpack_require__(6),
		applyTimer = null,
		applyBln = !0,
		Tools = {
			ajaxUrl: {},
			provisionUrl: "",
			$ajax: function(t) {
				return !Tools.ajaxUrl[t.url] && (Tools.ajaxUrl[t.url] = !0, t.cache = !0, t.dataType = t.dataType ? t.dataType : "json", t.type = t.type ? t.type : "POST", t.error = function(t, e) {
					var i = t.status;
					0 != i && (500 == i ? alert("服务器错误") : 404 == i && alert("请求没有找到"))
				}, t.goSuccess = t.success, t.success = function(e) {
					t.goSuccess && t.goSuccess(e)
				}, t.complete = function() {
					delete Tools.ajaxUrl[t.url]
				}, void $.ajax(t))
			},
			SetCookie: function(t, e, i, n) {
				var o = 1,
					s = "";
				void 0 != i && "" != i || (i = new Date, i.setTime(i.getTime() + 24 * o * 60 * 60 * 1e3), i = i.toGMTString()), n && (s = ";domain=" + n), document.cookie = t + "=" + escape(e) + ";path=/;expires=" + i + s
			},
			GetCookie: function(t) {
				var e, i = new RegExp("(^| )" + t + "=([^;]*)(;|$)");
				return(e = document.cookie.match(i)) ? unescape(e[2]) : null
			},
			IsIp: function(t) {
				var e = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
					i = t.match(e);
				return null != i
			},
			WildcardUrl: function() {
				var t = "",
					e = window.location.hostname;
				if(Tools.IsIp(e) || "localhost" == e) t = e;
				else {
					var i = e.split(".");
					t = i[i.length - 2] + "." + i[i.length - 1]
				}
				return t
			},
			GetUrlParam: function(t) {
				var e = t.toLowerCase(),
					i = window.location.search.substr(1).toLowerCase(),
					n = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
					o = i.match(n);
				return null != o ? unescape(o[2]) : null
			},
			SetUrlParam: function SetUrlParam(name, value, urlStr) {
				var pattern = name + "=([^&]*)",
					replaceText = name + "=" + value,
					url = urlStr || window.location.href;
				if(url.match(pattern)) {
					var tmp = "/(" + name + "=)([^&]*)/gi";
					return tmp = url.replace(eval(tmp), replaceText)
				}
				return url.match("[?]") ? url + "&" + replaceText : url + "?" + replaceText
			},
			ShowAlert: function(t, e) {
				var i, n = 0,
					o = t;
				$("#showAlertBox").length > 0 ? i = $("showAlertBox") : (i = $('<div id="showAlertBox"><div class="layout-text font-title"><div></div>'), $("body").append(i)), $("#showAlertBox .layout-text").html(o), $("#showAlertBox").fadeIn(), $("body").bind("touchmove", function(t) {
					t.preventDefault()
				}), n = void 0 == e ? 2e3 : e, setTimeout(function() {
					$("body").unbind("touchmove"), $("#showAlertBox").fadeOut(300)
				}, n)
			},
			ServiceProvision: function(t) {
				var e, i = {
					url: "",
					txt: "",
					title: "",
					params: {}
				};
				i = $.extend(i, t), $("#servicePsionBox").length > 0 ? (e = $("#servicePsionBox"), e.find(".layout-title").html('<div class="layout-close"></div>' + i.title)) : (e = $('<div id="servicePsionBox"><div class="layout-text"><div class="layout-title font-title"><div class="layout-close"></div>' + i.title + '</div><div class="layout-con" id="serviceLayoutCon"><div></div></div></div></div>'), $("body").append(e)), e.show();
				var n = new IScroll("#serviceLayoutCon");
				$("body").bind("touchmove", function(t) {
					t.preventDefault()
				}), e.on("click", ".layout-close", function() {
					e.hide(), $("body").unbind("touchmove")
				}), "" != i.url && Tools.provisionUrl != i.url ? Tools.$ajax({
					url: i.url,
					dataType: "text",
					data: i.params,
					success: function(t) {
						e.find("#serviceLayoutCon>div").html(t + "<br/><br/>"), n.refresh(), Tools.provisionUrl = i.url
					}
				}) : "" == i.url && "" != i.txt && (e.find("#serviceLayoutCon>div").html(i.txt), n.refresh())
			},
			AddCmma: function(t) {
				var e = String(t).substring(t.length, t.length - 1),
					i = String(Math.round(t));
				return "元" == e ? i = String(Math.round(t.substring(0, t.length - 1))) : "万" == e && (i = String(Math.round(1e4 * Number(t.substring(0, t.length - 1))))), i.replace(/\B(?=(?:\d{3})+\b)/g, ",")
			},
			IsApply: function(t) {
				applyTimer ? t(applyBln) : (t(applyBln), applyBln = !1, applyTimer = setTimeout(function() {
					applyBln = !0, clearTimeout(applyTimer), applyTimer = null
				}, 1e3))
			},
			Browser: {
				versions: function() {
					var t = navigator.userAgent;
					navigator.appVersion;
					return {
						trident: t.indexOf("Trident") > -1,
						presto: t.indexOf("Presto") > -1,
						webKit: t.indexOf("AppleWebKit") > -1,
						gecko: t.indexOf("Gecko") > -1 && t.indexOf("KHTML") == -1,
						mobile: !!t.match(/AppleWebKit.*Mobile.*/) || !!t.match(/AppleWebKit/),
						ios: !!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
						android: t.indexOf("Android") > -1 || t.indexOf("Linux") > -1,
						iPhone: t.indexOf("iPhone") > -1 || t.indexOf("Mac") > -1,
						iPad: t.indexOf("iPad") > -1,
						webApp: t.indexOf("Safari") == -1
					}
				}(),
				language: (navigator.browserLanguage || navigator.language).toLowerCase()
			},
			JsNativeBridge: function(t, e) {
				if(Tools.Browser.versions.ios || Tools.Browser.versions.iPhone || Tools.Browser.versions.iPad) {
					var i = function(t) {
						if(window.WebViewJavascriptBridge) return t(WebViewJavascriptBridge);
						if(window.WVJBCallbacks) return window.WVJBCallbacks.push(t);
						window.WVJBCallbacks = [t];
						var e = document.createElement("iframe");
						e.style.display = "none", e.src = "wvjbscheme://__BRIDGE_LOADED__", document.documentElement.appendChild(e), setTimeout(function() {
							document.documentElement.removeChild(e)
						}, 0)
					};
					i(function(i) {
						i.callHandler(t, e, function(t) {})
					})
				} else if(Tools.Browser.versions.android) {
					var n = function() {
						window.WebViewJavascriptBridge.callHandler(t, e, function(t) {})
					};
					window.WebViewJavascriptBridge ? n() : document.addEventListener("WebViewJavascriptBridgeReady", n, !1)
				}
			},
			IfPopExtnum: function(t) {
				var e = {
						versions: function() {
							var t = navigator.userAgent;
							navigator.appVersion, t.toLowerCase();
							return {
								mobile: !!t.match(/AppleWebKit.*Mobile.*/) || !!t.match(/AppleWebKit/),
								ios: !!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
								android: t.indexOf("Android") > -1 || t.indexOf("Linux") > -1,
								weixin: t.indexOf("MicroMessenger") > -1
							}
						}(),
						language: (navigator.browserLanguage || navigator.language).toLowerCase()
					},
					i = "";
				if(e.versions.android) {
					var n = t.split(","),
						o = n[n.length - 1],
						i = '<section id="popExt" class="tools_pop_ext"><div class="pop_ext_cont"><p class="ext_num">' + o + '</p><p class="ext_msg">请您牢记分机号</p><a href="javascript:void(0);" class="ext_btn">我记住了</a></div></section><div id="maskLayerExt" style="display:block;"></div>';
					$("#yxWrapper").append(i), $("body").bind("touchmove", function(t) {
						t.preventDefault()
					}), $("#popExt .ext_btn").click(function() {
						$("#popExt, #maskLayerExt").remove(), $("body").unbind("touchmove"), e.versions.weixin || e.versions.qq ? (location.href = t + "#http://mp.weixin.qq.com", event.stopPropagation()) : (location.href = t, event.stopPropagation())
					}), $("#maskLayerExt").click(function() {
						$("#popExt, #maskLayerExt").remove(), $("body").unbind("touchmove")
					})
				} else location.href = t
			},
			GetLoginStatus: function(t) {
				var e = Tools.IsWebView(),
					i = Boolean("yixinapp" == e || "yixinbjapp" == e),
					n = "";
				n = "undefined" == typeof USERCENTERURL ? "//i.m.daikuan.com/User/GetCurrentUserIdentity" : USERCENTERURL + "/User/GetCurrentUserIdentity", $.ajax({
					url: n,
					dataType: "jsonp",
					beforeSend: function() {},
					success: function(e) {
						"function" == typeof t && t(e), i && Tools.JsNativeBridge("pushUser", {
							tel: e.Telphone,
							token: e.Token
						})
					},
					error: function(e) {
						console.log(e), "function" == typeof t && t(e)
					}
				})
			},
			AppDown: function() {
				var t, e = !(arguments.length <= 0 || void 0 === arguments[0]) && arguments[0],
					i = Tools.IsWebView(),
					n = Boolean("yixinapp" == i || "yixinbjapp" == i),
					o = Tools.GetUrlParam("from") ? Tools.GetUrlParam("from") : Tools.GetCookie("from");
				if("undefined" != typeof noAppDown) {
					var s = noAppDown.split(",");
					s.indexOf(o) >= 0 && (t = !0)
				}
				var r = $("#loadAppButton"),
					a = $("body").children("div").get(0),
					l = 'style="height: 1.44rem;"';
				if(e) var c = "position: fixed; top: 0; left: 0; z-index: 8888; width: 100%; max-width:10rem; height: 1.44rem; left: 50%; -webkit-transform: translate3d(-50%, 0, 0); transform: translate3d(-50%, 0, 0); background: rgba(0, 0, 0, .8); ";
				else var c = "position: relative; top: 0; left: 0; z-index: 8888; width: 100%; max-width:10rem; height: 1.44rem; left: 50%; -webkit-transform: translate3d(-50%, 0, 0); transform: translate3d(-50%, 0, 0); background: rgba(0, 0, 0, .8); ";
				var h = "display: -webkit-box; display: -webkit-flex; display: flex;",
					u = "-webkit-align-items: center; align-items: center; -webkit-box-align: center;",
					p = "position:relative; -webkit-box-flex: 1; box-flex: 1; -webkit-flex: 1; flex: 1;",
					d = "display: block; width: 1.2rem; height: 100%; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlDRDkwMURFODE1QjExRTZCNTE5RDFBREFBNEZBMjBCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlDRDkwMURGODE1QjExRTZCNTE5RDFBREFBNEZBMjBCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUNEOTAxREM4MTVCMTFFNkI1MTlEMUFEQUE0RkEyMEIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUNEOTAxREQ4MTVCMTFFNkI1MTlEMUFEQUE0RkEyMEIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6x1rmxAAADUElEQVR42syY3UsUURjGp3G7KAmkws/AO9foLiqWKMu66MMLa+syDQyTEqGuTLpv+wuKEipybyIyQ1aWyHIrUim6dfOqcNUskq7ywph6XniOTMPszDm7U3Tg5+zMnPd9H8/He86Z2FxhwTIsMdAEDoB9YDeo47tF8Ba8BjkwC36aOF9nIKgRDIBuYGvaOGAQpMAnHQMdx5tBBnwEPeAruAx2gE2gQv4xUsFn8u4S6/bQNkNfZbXQGTDE39IFF0Ae/NLtAXbvLXaxlA6QNm0heX6PYr6DBDgIZgzEWKz7gbYJ+hqib1tXkM3mPctWqQfTVvllmr5y9J3xi+8nSAbhUTACDoEVK7qyQp8jjDEYJqgTdIFxcIqzJOri0Pc4Y3UWG9QyA76xn+sjbhm/sgFI8CqwBSyrJKfKfV6PecVsa6iLREFhftHbfRJrkgO9zd1ljXzwAkwF+KzmVLYMpn11wPspxjxODWuCrvB6MUTMEhjWTKhS5zFtagLq9fI6oIyk287TMB9gKFn3CTgBHoWIsim8nTZfAurOMLYsSevFME4HKY0kl9QQ5RWT1EimKdo1yZ8WPnyqOWXdorzd5ydGJ3Wo2C22a42ZM8gjSlS7S1SpYtyx98v42cmbH4bJLekSMMznpYhxx94Tc22unBIyrluUVaIYd+wa2/rPis1tp+5mLWg2eceUqS8pS/LjPW82liEmWWSg6xYV+50YvVJLVhlinIDZp1NU7JwYTPDmSBliwlJCWFGxX9o8qoijfo2FUifP+IkKW5D7aTcrglbBbU7/5pDFVTfPeEUFrfhxxpbd46pqzuu83ggwlAWwFpzUzDMO69bStli56VrP1vpXDnFjoJWngyBRpqeOIDEJxhxTB0m/LewyR/2/2MIWGHcrY/8xA0TIOVYYLSG5mSbCUcbqUmL8svMdchg8/EuixOcDxpBYd8POZbJzy3KWPGfTRtlNz8BpxujWOSg63PCnuVdaCBnouiVBX6303eY3W+2AKdtBqnhUmWDOMC1xtvQkfSm/TimfY9KcAVm2lhwCPoM+sB1U+mxhK/muj3XzbJUsfaWj/GB1lTPRZLBLBr7Gb0SRfkFzf9Jr5ieWvWAXaOC7edlCgDfs4rzpJ73fAgwANLH2bePw7RUAAAAASUVORK5CYII=); background-position: 0.4rem center; background-repeat: no-repeat; -webkit-background-size: 0.48rem 0.48rem; background-size: 0.48rem 0.48rem; ",
					f = "display: block; width: 1.066667rem; height: 1.066667rem; background-image: url(data:image/png;base64,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); background-repeat: no-repeat; -webkit-background-size: 100% 100%; background-size: 100% 100%;",
					m = "padding-left: 0.186667rem; line-height: 1.5;",
					v = "display: block; width: 3.333333rem; height: 100%; line-height: 1.44rem; text-align: center; background-color: #e9474d;";
				if(!n && !t && "tf" != Tools.GetUrlParam("track")) {
					$(a).before("<section " + l + ' id="appDown"><a href="yxcarloan://www.daikuan.com" id="loadAppButton" class=""></a><div style="' + c + h + u + '" ><a href="javascript:;" id="app_colse"  style="' + d + '" class="click_close" ><span class="hide">x</span></a><span alt="" style="' + f + '"></span><div style="' + m + p + '"><p style="color:#fff!important;" class="font-size-26">易鑫汽车报价</p><p style="color:#999!important;" class="font-size-24">底价买车还能贷款</p></div><a href="http://m.daikuan.com/app/baojiadown/" class="font-size-32" style=" ' + v + '       color:#fff!important;">快去看看</a></div></section>');
					var g = $("#appDown");
					if("1" == Tools.GetCookie("hideAppDown")) g.addClass("hide").css({
						display: "none !important"
					});
					else {
						g.removeClass("hide").css({
							display: "block !important"
						});
						var y = new Event("appDownShow", {
							bubbles: !0,
							cancelable: !1
						});
						document.dispatchEvent(y);
						var b = navigator.userAgent,
							x = /MicroMessenger/i.test(b) ? "weixin" : /Android/i.test(b) ? "android" : /iPhone|iPad|iPod/i.test(b) ? "ios" : "pc";
						if("pc" != x && "android" != x && "1" != Tools.GetCookie("hasOpen")) {
							var T = "hasOpen=1;path=/;domain=" + Tools.WildcardUrl();
							document.cookie = T, r.trigger("click")
						}
					}
					$(document).on("click", ".click_close", function(t) {
						t.preventDefault(), $("#appDown").addClass("hide").css({
							display: "none !important"
						}), $("body").animate({
							"padding-top": 0
						});
						var e = "hideAppDown=1;path=/;domain=" + Tools.WildcardUrl();
						document.cookie = e
					})
				}
			},
			TelChannel: function(t) {
				function e() {
					$("#telSuccess").addClass("hide"), c.css({
						bottom: 0,
						top: "auto"
					}).addClass("hide"), l.addClass("hide"), u.fadeOut(), h.removeClass("cur"), $("#TelPopUp .validateCode").val(""), $("#" + o.id + " #" + o.telId).val(""), $("#GetValidateCode").removeClass("disable").text("获取验证码"), clearInterval(window.tmo), $("body").css({
						position: "static"
					}).unbind("touchmove")
				}
				var i = this,
					n = {
						CarId: "",
						PackageId: "",
						CarText: "",
						CompanyId: "",
						PackageText: "",
						CityId: "",
						CityText: "",
						DeviceType: 2,
						PageType: 1,
						statisticalMarker: "",
						isDefault: !0,
						id: "",
						telId: "mobile",
						isShowP1: !0
					},
					o = $.extend(n, t),
					s = '<div class="channel-box">\n                <p style="' + (o.isShowP1 ? "display:block;" : "display:none;") + '">没找到合适的？眼花缭乱？</p>\n                <p>免费打电话，获得专业的贷款建议</p>\n                <div class="uf">\n                    <div class="input-box">\n                        <input id="' + o.telId + '" type="tel" value="" name="Phone" placeholder="请输入手机号码" maxlength="11">\n                    </div>\n                    <div id="' + o.telId + 'Recommend" class="btn">为我推荐</div>\n                </div>\n            </div>',
					r = '<div class="channel-default">\n              <h3>小鑫建议您：</h3>\n              <p>1、调整首付或减少筛选条件</p>\n              <p>2、免费打电话，免费获得专业的贷款建议</p>\n              <div class="uf">\n                  <div class="input-box">\n                      <input id="' + o.telId + '" type="tel" value="" name="Phone" placeholder="请输入手机号码" maxlength="13">\n                  </div>\n                  <div id="' + o.telId + 'Recommend" class="btn">为我推荐</div>\n              </div>\n            </div>',
					a = !0,
					l = $("#TelPopUpMask"),
					c = $("#TelPopUp"),
					h = $("#TelPopUp .apply-btn"),
					u = $("#TelPopUp .tips p"),
					p = $("#__RequestVerificationToken").val();
				o.isDefault ? $("#" + o.id).html(s) : $("#" + o.id).html(r), document.onkeydown = function(t) {
					a = 8 != t.keyCode
				}, $("#" + o.telId).on("focus", function(t) {
					try {
						_hmt.push(["_trackEvent", o.statisticalMarker + "1", "click", "", ""])
					} catch(t) {}
				}), $("#" + o.id).off("click").on("click", "#" + o.telId + "Recommend", function() {
					var t = $.trim($("#" + o.telId).val());
					if(t.length > 0 && (t = t.replace(/\s/g, "")), $("#Phone").val(t), check.isPhoneNumber(t)) {
						try {
							_hmt.push(["_trackEvent", o.statisticalMarker + "2", "click", "", ""])
						} catch(e) {}
						i.$ajax({
							url: ADVISERAPIURL + "user/validatephone?Phone=" + t,
							type: "Get",
							success: function(e) {
								e.Result ? ($("#TelNum").text(t.replace(/(\d{3})\d{4}(\d{4})/, "$1 **** $2")), check.getCode({
									tel_id: "Phone",
									gvc_id: "GetValidateCode",
									line: BusinessLine,
									url: CODE_GETTING_URL,
									__RequestVerificationToken: p
								}, function() {}), $("body").css({
									position: "fixed",
									top: 0,
									left: 0
								}).bind("touchmove", function(t) {
									t.preventDefault()
								}), setTimeout(function() {
									$("#TelPopUp").removeClass("hide")
								}, 300), l.removeClass("hide"), c.removeClass("hide")) : Tools.ShowAlert(e.Message, 2e3)
							}
						})
					} else Tools.ShowAlert("请输入正确手机号", 2e3)
				}), $("#GetValidateCode").on("click", function() {
					check.getCode({
						tel_id: "Phone",
						gvc_id: "GetValidateCode",
						line: BusinessLine,
						__RequestVerificationToken: p
					}, function() {})
				}), $("#TelPopUp .validateCode").bind({
					blur: function() {
						var t = $.trim($(this).val()).length;
						6 == t ? h.addClass("cur") : 0 == t ? (h.removeClass("cur"), u.fadeOut().text("请输入验证码")) : (u.fadeIn().text("请输入验证码"), $("#TelPopUp .validateCode").addClass("red"))
					},
					focus: function() {
						var t = $.trim($(this).val()).length;
						0 != t && 6 != t || $("#TelPopUp .validateCode").hasClass("red") ? ($("#TelPopUp .validateCode").val("").removeClass("red"), h.removeClass("cur"), u.fadeOut()) : 6 == t && u.fadeOut();
						try {
							_hmt.push(["_trackEvent", o.statisticalMarker + "3", "click", "", ""])
						} catch(e) {}
					},
					"input propertychange": function() {
						var t = $.trim($(this).val()).length;
						6 == t && (h.addClass("cur"), u.fadeOut())
					}
				}), h.off("click").on("click", function(t) {
					"" == $("#TelPopUp .validateCode").val() ? u.fadeIn().text("请输入验证码") : check.checkCode({
						number: $.trim($("#TelPopUp .validateCode").val()),
						tel_id: "Phone",
						gvc_id: "GetValidateCode",
						line: BusinessLine
					}, function(t) {
						if(t.Result) {
							try {
								_hmt.push(["_trackEvent", o.statisticalMarker + "4", "click", "", ""])
							} catch(e) {}
							u.fadeOut(), i.$ajax({
								url: ADVISERAPIURL + "user/postuserphone?Phone=" + $("#Phone").val() + "&DeviceType=" + o.DeviceType + "&CityId=" + o.CityId + "&CarId=" + o.CarId + "&PackageId=" + o.PackageId + "&PageType=" + (c.data("page-type") || o.PageType) + "&CarText=" + o.CarText + "&CityText=" + o.CityText + "&PackageText=" + o.PackageText + "&CompanyId=" + o.CompanyId,
								type: "Get",
								success: function(t) {
									c.data("page-type", ""), t.Result ? ($("#TelPopUp").addClass("hide"), $("#telSuccess").removeClass("hide"), c.css({
										bottom: "auto",
										top: "50%"
									})) : Tools.ShowAlert(t.Message, 2e3)
								}
							})
						} else u.fadeIn().text("验证码错误"), $("#TelPopUp .validateCode").addClass("red")
					})
				}), $("#telSuccess .ok-btn,  #TelPopUp .close").on("click", function() {
					e()
				})
			},
			IsWebView: function() {
				if(yiXinAppInfoCookie) {
					var t = JSON.parse(yiXinAppInfoCookie).SOURCE;
					return t
				}
				return !1
			},
			AdvHeader: function(t) {
				var e, i = {
						isFlex: !1,
						headerAdvUrl: "javascript:void(0);",
						advImgBase64: ""
					},
					n = $.extend(i, t),
					o = Tools.GetCookie("YiXinAppInfo"),
					s = Tools.GetUrlParam("from") ? Tools.GetUrlParam("from") : Tools.GetCookie("from");
				if("undefined" != typeof noAppDown) {
					var r = noAppDown.split(",");
					r.indexOf(s) >= 0 && (e = !0)
				}
				var a = ($("#loadAppButton"), $("body").children("div").get(0)),
					l = 'style="height: 1.44rem;"';
				if(n.isFlex) var c = "position: fixed; top: 0; left: 0; z-index: 8888; width: 100%; max-width:10rem; height: 1.44rem; left: 50%; -webkit-transform: translate3d(-50%, 0, 0); transform: translate3d(-50%, 0, 0);";
				else var c = "position: relative; top: 0; left: 0; z-index: 8888; width: 100%; max-width:10rem; height: 1.44rem; left: 50%; -webkit-transform: translate3d(-50%, 0, 0); transform: translate3d(-50%, 0, 0);";
				var h = "display: -webkit-box; display: -webkit-flex; display: flex;",
					u = "position:relative; -webkit-box-flex: 1; box-flex: 1; -webkit-flex: 1; flex: 1;",
					p = "-webkit-align-items: center; align-items: center; -webkit-box-align: center;",
					d = "display: block; width: 1.2rem; height: 100%; background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlDRDkwMURFODE1QjExRTZCNTE5RDFBREFBNEZBMjBCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlDRDkwMURGODE1QjExRTZCNTE5RDFBREFBNEZBMjBCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUNEOTAxREM4MTVCMTFFNkI1MTlEMUFEQUE0RkEyMEIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUNEOTAxREQ4MTVCMTFFNkI1MTlEMUFEQUE0RkEyMEIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6x1rmxAAADUElEQVR42syY3UsUURjGp3G7KAmkws/AO9foLiqWKMu66MMLa+syDQyTEqGuTLpv+wuKEipybyIyQ1aWyHIrUim6dfOqcNUskq7ywph6XniOTMPszDm7U3Tg5+zMnPd9H8/He86Z2FxhwTIsMdAEDoB9YDeo47tF8Ba8BjkwC36aOF9nIKgRDIBuYGvaOGAQpMAnHQMdx5tBBnwEPeAruAx2gE2gQv4xUsFn8u4S6/bQNkNfZbXQGTDE39IFF0Ae/NLtAXbvLXaxlA6QNm0heX6PYr6DBDgIZgzEWKz7gbYJ+hqib1tXkM3mPctWqQfTVvllmr5y9J3xi+8nSAbhUTACDoEVK7qyQp8jjDEYJqgTdIFxcIqzJOri0Pc4Y3UWG9QyA76xn+sjbhm/sgFI8CqwBSyrJKfKfV6PecVsa6iLREFhftHbfRJrkgO9zd1ljXzwAkwF+KzmVLYMpn11wPspxjxODWuCrvB6MUTMEhjWTKhS5zFtagLq9fI6oIyk287TMB9gKFn3CTgBHoWIsim8nTZfAurOMLYsSevFME4HKY0kl9QQ5RWT1EimKdo1yZ8WPnyqOWXdorzd5ydGJ3Wo2C22a42ZM8gjSlS7S1SpYtyx98v42cmbH4bJLekSMMznpYhxx94Tc22unBIyrluUVaIYd+wa2/rPis1tp+5mLWg2eceUqS8pS/LjPW82liEmWWSg6xYV+50YvVJLVhlinIDZp1NU7JwYTPDmSBliwlJCWFGxX9o8qoijfo2FUifP+IkKW5D7aTcrglbBbU7/5pDFVTfPeEUFrfhxxpbd46pqzuu83ggwlAWwFpzUzDMO69bStli56VrP1vpXDnFjoJWngyBRpqeOIDEJxhxTB0m/LewyR/2/2MIWGHcrY/8xA0TIOVYYLSG5mSbCUcbqUmL8svMdchg8/EuixOcDxpBYd8POZbJzy3KWPGfTRtlNz8BpxujWOSg63PCnuVdaCBnouiVBX6303eY3W+2AKdtBqnhUmWDOMC1xtvQkfSm/TimfY9KcAVm2lhwCPoM+sB1U+mxhK/muj3XzbJUsfaWj/GB1lTPRZLBLBr7Gb0SRfkFzf9Jr5ieWvWAXaOC7edlCgDfs4rzpJ73fAgwANLH2bePw7RUAAAAASUVORK5CYII=); background-position: 0.4rem center; background-repeat: no-repeat; -webkit-background-size: 0.48rem 0.48rem; background-size: 0.48rem 0.48rem; ",
					f = "display: block; height: 100%; ",
					m = "background-image: url(" + n.advImgBase64 + ");background-repeat: no-repeat; background-size: contain;";
				if(!o && !e && "tf" != Tools.GetUrlParam("track")) {
					$(a).before("<section " + l + ' id="appDown"><div id="adv_img" style="' + c + m + h + p + '" ><a href="javascript:;" id="app_colse"  style="' + d + '" class="click_close" ><span class="hide">x</span></a><a href=' + n.headerAdvUrl + ' style="' + f + u + '"></a></div></section>');
					var v = $("#appDown");
					"1" == Tools.GetCookie("hideAppDown") ? v.addClass("hide").css({
						display: "none !important"
					}) : v.removeClass("hide").css({
						display: "block !important"
					}), $(document).on("click", "#app_colse", function(t) {
						$("#appDown").addClass("hide").css({
							display: "none !important"
						}), $("body").animate({
							"padding-top": 0
						});
						var e = "hideAppDown=1;path=/;domain=" + Tools.WildcardUrl();
						document.cookie = e
					})
				}
			}
		},
		yiXinAppInfoCookie = Tools.GetCookie("YiXinAppInfo");
	module.exports = {
		$ajax: Tools.$ajax,
		setCookie: Tools.SetCookie,
		getCookie: Tools.GetCookie,
		getUrlParam: Tools.GetUrlParam,
		setUrlParam: Tools.SetUrlParam,
		showAlert: Tools.ShowAlert,
		alert: Tools.ShowAlert,
		serviceProvision: Tools.ServiceProvision,
		wildcardUrl: Tools.WildcardUrl,
		isIP: Tools.IsIP,
		addCmma: Tools.AddCmma,
		isApply: Tools.IsApply,
		jsNativeBridge: Tools.JsNativeBridge,
		browser: Tools.Browser,
		ifPopExtnum: Tools.IfPopExtnum,
		getLoginStatus: Tools.GetLoginStatus,
		appDown: Tools.AppDown,
		telChannel: Tools.TelChannel,
		isWebView: Tools.IsWebView,
		advHeader: Tools.AdvHeader
	}
}]);

(function(w) {
	// 空函数
	function shield() {
		return false;
	}
	document.addEventListener('touchstart', shield, false); //取消浏览器的所有事件，使得active的样式在手机上正常生效
	document.oncontextmenu = shield; //屏蔽选择函数
	// H5 plus事件处理
	var ws = null,
		as = 'pop-in';

	function plusReady() {
		ws = plus.webview.currentWebview();
		// Android处理返回键
		plus.key.addEventListener('backbutton', function() {
			back();
		}, false);
		compatibleAdjust();
	}
	if(w.plus) {
		plusReady();
	} else {
		document.addEventListener('plusready', plusReady, false);
	}
	// DOMContentLoaded事件处理
	var domready = false;
	document.addEventListener('DOMContentLoaded', function() {
		domready = true;
		gInit();
		document.body.onselectstart = shield;
		compatibleAdjust();
	}, false);
	// 处理返回事件
	w.back = function(hide) {
		if(w.plus) {
			ws || (ws = plus.webview.currentWebview());
			if(hide || ws.preate) {
				ws.hide('auto');
			} else {
				ws.close('auto');
			}
		} else if(history.length > 1) {
			history.back();
		} else {
			w.close();
		}
	};
	// 处理点击事件
	var openw = null,
		waiting = null;
	/**
	 * 打开新窗口
	 * @param {URIString} id : 要打开页面url
	 * @param {boolean} wa : 是否显示等待框
	 * @param {boolean} ns : 是否不自动显示
	 * @param {JSON} ws : Webview窗口属性
	 */
	w.clicked = function(id, wa, ns, ws) {
		if(openw) { //避免多次打开同一个页面
			return null;
		}
		if(w.plus) {
			wa && (waiting = plus.nativeUI.showWaiting());
			ws = ws || {};
			ws.scrollIndicator || (ws.scrollIndicator = 'none');
			ws.scalable || (ws.scalable = false);
			var pre = ''; //'http://192.168.1.178:8080/h5/';
			openw = plus.webview.create(pre + id, id, ws);
			ns || openw.addEventListener('loaded', function() { //页面加载完成后才显示
				//		setTimeout(function(){//延后显示可避免低端机上动画时白屏
				openw.show(as);
				closeWaiting();
				//		},200);
			}, false);
			openw.addEventListener('close', function() { //页面关闭后可再次打开
				openw = null;
			}, false);
			return openw;
		} else {
			w.open(id);
		}
		return null;
	};
	w.openDoc = function(t, c) {
		var d = plus.webview.getWebviewById('document');
		if(d) {
			d.evalJS('updateDoc("' + t + '","' + c + '")');
		} else {
			d = plus.webview.create('/plus/doc.html', 'document', {
				zindex: 9999,
				popGesture: 'hide'
			}, {
				preate: true
			});
			d.addEventListener('loaded', function() {
				d.evalJS('updateDoc("' + t + '","' + c + '")');
			}, false);
		}
	}
	/**
	 * 关闭等待框
	 */
	w.closeWaiting = function() {
		waiting && waiting.close();
		waiting = null;
	}
	// 兼容性样式调整
	var adjust = false;

	function compatibleAdjust() {
		if(adjust || !w.plus || !domready) {
			return;
		} // iOS平台使用滚动的div
		if('iOS' == plus.os.name) {
			var t = document.getElementById("dcontent");
			t && (t.className = "sdcontent");
			t = document.getElementById("content");
			t && (t.className = "scontent");
			//iOS8横竖屏切换div不更新滚动问题
			var lasto = window.orientation;
			window.addEventListener("orientationchange", function() {
				var nowo = window.orientation;
				if(lasto != nowo && (90 == nowo || -90 == nowo)) {
					window.dcontent && (0 == dcontent.scrollTop) && (dcontent.scrollTop = 1);
					window.content && (0 == content.scrollTop) && (content.scrollTop = 1);
				}
				lasto = nowo;
			}, false);
		}
		adjust = true;
	};
	w.compatibleConfirm = function() {
		plus.nativeUI.confirm('本OS原生层面不提供该控件，需使用mui框架实现类似效果。请点击“确定”下载Hello mui示例', function(e) {
			if(0 == e.index) {
				plus.runtime.openURL("http://www.dcloud.io/hellomui/");
			}
		}, "", ["确定", "取消"]);
	}
	// 通用元素对象
	var _dout_ = null,
		_dcontent_ = null;
	w.gInit = function() {
		_dout_ = document.getElementById("output");
		_dcontent_ = document.getElementById("dcontent");
	};
	// 清空输出内容
	w.outClean = function() {
		_dout_.innerText = "";
		_dout_.scrollTop = 0; //在iOS8存在不滚动的现象
	};
	// 输出内容
	w.outSet = function(s) {
		_dout_.innerText = s + "\n";
		(0 == _dout_.scrollTop) && (_dout_.scrollTop = 1); //在iOS8存在不滚动的现象
	};
	// 输出行内容
	w.outLine = function(s) {
		_dout_.innerText += s + "\n";
		(0 == _dout_.scrollTop) && (_dout_.scrollTop = 1); //在iOS8存在不滚动的现象
	};
	// 格式化时长字符串，格式为"HH:MM:SS"
	w.timeToStr = function(ts) {
		if(isNaN(ts)) {
			return "--:--:--";
		}
		var h = parseInt(ts / 3600);
		var m = parseInt((ts % 3600) / 60);
		var s = parseInt(ts % 60);
		return(ultZeroize(h) + ":" + ultZeroize(m) + ":" + ultZeroize(s));
	};
	// 格式化日期时间字符串，格式为"YYYY-MM-DD HH:MM:SS"
	w.dateToStr = function(d) {
		return(d.getFullYear() + "-" + ultZeroize(d.getMonth() + 1) + "-" + ultZeroize(d.getDate()) + " " + ultZeroize(d.getHours()) + ":" + ultZeroize(d.getMinutes()) + ":" + ultZeroize(d.getSeconds()));
	};
	/**
	 * zeroize value with length(default is 2).
	 * @param {Object} v
	 * @param {Number} l
	 * @return {String} 
	 */
	w.ultZeroize = function(v, l) {
		var z = "";
		l = l || 2;
		v = String(v);
		for(var i = 0; i < l - v.length; i++) {
			z += "0";
		}
		return z + v;
	};
})(window);

;
(function() {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/

	/**
	 * Instantiate fast-clicking listeners on the specified layer.
	 *
	 * @constructor
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
		 * Whether a click is currently being tracked.
		 *
		 * @type boolean
		 */
		this.trackingClick = false;

		/**
		 * Timestamp for when click tracking started.
		 *
		 * @type number
		 */
		this.trackingClickStart = 0;

		/**
		 * The element being tracked for a click.
		 *
		 * @type EventTarget
		 */
		this.targetElement = null;

		/**
		 * X-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartX = 0;

		/**
		 * Y-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartY = 0;

		/**
		 * ID of the last touch, retrieved from Touch.identifier.
		 *
		 * @type number
		 */
		this.lastTouchIdentifier = 0;

		/**
		 * Touchmove boundary, beyond which a click will be cancelled.
		 *
		 * @type number
		 */
		this.touchBoundary = options.touchBoundary || 10;

		/**
		 * The FastClick layer.
		 *
		 * @type Element
		 */
		this.layer = layer;

		/**
		 * The minimum time between tap(touchstart and touchend) events
		 *
		 * @type number
		 */
		this.tapDelay = options.tapDelay || 200;

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

		if(FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() {
				return method.apply(context, arguments);
			};
		}

		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for(var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if(deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if(!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if(type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if(type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if(!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if(typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
	 * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	 *
	 * @type boolean
	 */
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;

	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;

	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);

	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
		switch(target.nodeName.toLowerCase()) {

			// Don't send a synthetic click to disabled inputs (issue #62)
			case 'button':
			case 'select':
			case 'textarea':
				if(target.disabled) {
					return true;
				}

				break;
			case 'input':

				// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
				if((deviceIsIOS && target.type === 'file') || target.disabled) {
					return true;
				}

				break;
			case 'label':
			case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
			case 'video':
				return true;
		}

		return(/\bneedsclick\b/).test(target.className);
	};

	/**
	 * Determine whether a given element requires a call to focus to simulate click into element.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	 */
	FastClick.prototype.needsFocus = function(target) {
		switch(target.nodeName.toLowerCase()) {
			case 'textarea':
				return true;
			case 'select':
				return !deviceIsAndroid;
			case 'input':
				switch(target.type) {
					case 'button':
					case 'checkbox':
					case 'file':
					case 'image':
					case 'radio':
					case 'submit':
						return false;
				}

				// No point in attempting to focus disabled inputs
				return !target.disabled && !target.readOnly;
			default:
				return(/\bneedsfocus\b/).test(target.className);
		}
	};

	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if(document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if(deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};

	/**
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.focus = function(targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if(deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};

	/**
	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	 *
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if(!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if(parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if(scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};

	/**
	 * @param {EventTarget} targetElement
	 * @returns {Element|EventTarget}
	 */
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if(eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};

	/**
	 * On touch start, record the position and scroll offset.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if(event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if(deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if(selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if(!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if(touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};

	/**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0],
			boundary = this.touchBoundary;

		if(Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};

	/**
	 * Update the last position.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchMove = function(event) {
		if(!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if(this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};

	/**
	 * Attempt to find the labelled control for the given label element.
	 *
	 * @param {EventTarget|HTMLLabelElement} labelElement
	 * @returns {Element|null}
	 */
	FastClick.prototype.findControl = function(labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if(labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if(labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};

	/**
	 * On touch end, determine whether to send a click event at once.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if(!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if(deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if(targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if(forElement) {
				this.focus(targetElement);
				if(deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if(this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if(!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if(deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if(scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if(!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};

	/**
	 * On touch cancel, stop tracking the click.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};

	/**
	 * Determine mouse events which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onMouse = function(event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if(!this.targetElement) {
			return true;
		}

		if(event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if(!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if(!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if(event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};

	/**
	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	 * an actual click which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onClick = function(event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if(this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if(event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if(!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};

	/**
	 * Remove all FastClick's event listeners.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if(deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};

	/**
	 * Check whether FastClick is needed.
	 *
	 * @param {Element} layer The layer to listen on
	 */
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if(typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

		if(chromeVersion) {

			if(deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if(metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if(metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if(chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

				// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if(deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if(blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if(metaViewport) {
					// user-scalable=no eliminates click delay.
					if(metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if(document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if(layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

		if(firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if(metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if(layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};

	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};

	if(typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		// AMD. Register as an anonymous module.
		define(function() {
			return FastClick;
		});
	} else if(typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}

	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body);
	}, false);

}());