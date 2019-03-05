// This file belongs to https://github.com/netflixparty1/netflixparty-chrome
// It has been modified to properly work with this application

// can't use strict mode for this file because of socket.io

// make sure the content script is only run once on the page

/* global jQuery, $, document, window, MouseEvent, Identicon */

document.addEventListener('DOMContentLoaded', function (event) { 
    if (!window.netflixPartyLoaded) {
        window.netflixPartyLoaded = true
        const setImmediate = require('setimmediate') // eslint-disable-line
        window.$ = window.jQuery = require('jquery')
        const { ipcRenderer, clipboard } = require('electron')
        const io = require('socket.io-client')

        var withChatInterval = null;

        (function ($) {
            $.isBlank = function (obj) {
                return (!obj || $.trim(obj) === '')
            }
        })(jQuery)
    
        /// ///////////////////////////////////////////////////////////////////////
        // Vendor libraries                                                     //
        /// ///////////////////////////////////////////////////////////////////////  
    
        /* PNGLib.js v1.0 */
        // eslint-disable-next-line
        !(function () { function i (i, t) { for (var s = 2; s < arguments.length; s++) for (var h = 0; h < arguments[s].length; h++)i[t++] = arguments[s].charAt(h) } function t (i) { return String.fromCharCode(i >> 8 & 255, 255 & i) } function s (i) { return String.fromCharCode(i >> 24 & 255, i >> 16 & 255, i >> 8 & 255, 255 & i) } function h (i) { return String.fromCharCode(255 & i, i >> 8 & 255) }window.PNGlib = function (f, e, r) { this.width = f, this.height = e, this.depth = r, this.pix_size = e * (f + 1), this.data_size = 2 + this.pix_size + 5 * Math.floor((65534 + this.pix_size) / 65535) + 4, this.ihdr_offs = 0, this.ihdr_size = 25, this.plte_offs = this.ihdr_offs + this.ihdr_size, this.plte_size = 8 + 3 * r + 4, this.trns_offs = this.plte_offs + this.plte_size, this.trns_size = 8 + r + 4, this.idat_offs = this.trns_offs + this.trns_size, this.idat_size = 8 + this.data_size + 4, this.iend_offs = this.idat_offs + this.idat_size, this.iend_size = 12, this.buffer_size = this.iend_offs + this.iend_size, this.buffer = new Array(), this.palette = new Object(), this.pindex = 0; for (var n = new Array(), o = 0; o < this.buffer_size; o++) this.buffer[o] = '\x00'; i(this.buffer, this.ihdr_offs, s(this.ihdr_size - 12), 'IHDR', s(f), s(e), '\b'), i(this.buffer, this.plte_offs, s(this.plte_size - 12), 'PLTE'), i(this.buffer, this.trns_offs, s(this.trns_size - 12), 'tRNS'), i(this.buffer, this.idat_offs, s(this.idat_size - 12), 'IDAT'), i(this.buffer, this.iend_offs, s(this.iend_size - 12), 'IEND'); var a = 30912; a += 31 - a % 31, i(this.buffer, this.idat_offs + 8, t(a)); for (var o = 0; (o << 16) - 1 < this.pix_size; o++) { var d, _; o + 65535 < this.pix_size ? (d = 65535, _ = '\x00') : (d = this.pix_size - (o << 16) - o, _ = ''), i(this.buffer, this.idat_offs + 8 + 2 + (o << 16) + (o << 2), _, h(d), h(~d)) } for (var o = 0; o < 256; o++) { for (var u = o, z = 0; z < 8; z++)u = 1 & u ? -306674912 ^ u >> 1 & 2147483647 : u >> 1 & 2147483647; n[o] = u } this.index = function (i, t) { var s = t * (this.width + 1) + i + 1; var h = this.idat_offs + 8 + 2 + 5 * Math.floor(s / 65535 + 1) + s; return h }, this.color = function (i, t, s, h) { h = h >= 0 ? h : 255; var f = ((h << 8 | i) << 8 | t) << 8 | s; if (typeof this.palette[f] === 'undefined') { if (this.pindex == this.depth) return '\x00'; var e = this.plte_offs + 8 + 3 * this.pindex; this.buffer[e + 0] = String.fromCharCode(i), this.buffer[e + 1] = String.fromCharCode(t), this.buffer[e + 2] = String.fromCharCode(s), this.buffer[this.trns_offs + 8 + this.pindex] = String.fromCharCode(h), this.palette[f] = String.fromCharCode(this.pindex++) } return this.palette[f] }, this.getBase64 = function () { var i; var t; var s; var h; var f; var e; var r; var n = this.getDump(); var o = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='; var a = n.length; var d = 0; var _ = ''; do i = n.charCodeAt(d), h = i >> 2, t = n.charCodeAt(d + 1), f = (3 & i) << 4 | t >> 4, s = n.charCodeAt(d + 2), e = d + 2 > a ? 64 : (15 & t) << 2 | s >> 6, r = d + 3 > a ? 64 : 63 & s, _ += o.charAt(h) + o.charAt(f) + o.charAt(e) + o.charAt(r); while ((d += 3) < a);return _ }, this.getDump = function () { function t (t, h, f) { for (var e = -1, r = 4; f - 4 > r; r += 1)e = n[255 & (e ^ t[h + r].charCodeAt(0))] ^ e >> 8 & 16777215; i(t, h + f - 4, s(-1 ^ e)) } for (var h = 65521, f = 5552, e = 1, r = 0, o = f, a = 0; a < this.height; a++) for (var d = -1; d < this.width; d++)e += this.buffer[this.index(d, a)].charCodeAt(0), r += e, (o -= 1) == 0 && (e %= h, r %= h, o = f); return e %= h, r %= h, i(this.buffer, this.idat_offs + this.idat_size - 8, s(r << 16 | e)), t(this.buffer, this.ihdr_offs, this.ihdr_size), t(this.buffer, this.plte_offs, this.plte_size), t(this.buffer, this.trns_offs, this.trns_size), t(this.buffer, this.idat_offs, this.idat_size), t(this.buffer, this.iend_offs, this.iend_size), 'PNG\r\n\n' + this.buffer.join('') } } }())

        /* Identicon.js v1.0 */
        // eslint-disable-next-line
        !(function () { Identicon = function (n, t, r) { this.hash = n, this.size = t || 64, this.margin = r || 0 }, Identicon.prototype = { hash:null, size:null, margin:null, render:function () { var n; var t; var r = this.hash; var e = this.size; var i = Math.floor(e * this.margin); var s = Math.floor((e - 2 * i) / 5); var o = new PNGlib(e, e, 256); var h = o.color(0, 0, 0, 0); var a = this.hsl2rgb(parseInt(r.substr(-7), 16) / 268435455, 0.5, 0.7); var c = o.color(255 * a[0], 255 * a[1], 255 * a[2]); for (n = 0; n < 15; n++)t = parseInt(r.charAt(n), 16) % 2 ? h : c, n < 5 ? this.rectangle(2 * s + i, n * s + i, s, s, t, o) : n < 10 ? (this.rectangle(1 * s + i, (n - 5) * s + i, s, s, t, o), this.rectangle(3 * s + i, (n - 5) * s + i, s, s, t, o)) : n < 15 && (this.rectangle(0 * s + i, (n - 10) * s + i, s, s, t, o), this.rectangle(4 * s + i, (n - 10) * s + i, s, s, t, o)); return o }, rectangle:function (n, t, r, e, i, s) { var o, h; for (o = n; n + r > o; o++) for (h = t; t + e > h; h++)s.buffer[s.index(o, h)] = i }, hsl2rgb:function (n, t, r) { return n *= 6, t = [r += t *= r < 0.5 ? r : 1 - r, r - n % 1 * t * 2, r -= t *= 2, r, r + n % 1 * t, r + t], [t[~~n % 6], t[(16 | n) % 6], t[(8 | n) % 6]] }, toString:function () { return this.render().getBase64() } }, window.Identicon = Identicon }())

        /* SHA256 (Chris Veness) */
        // eslint-disable-next-line
        var Sha256 = {}; Sha256.hash = function (t) { t = t.utf8Encode(); var r = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298]; var e = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]; t += String.fromCharCode(128); for (var n = t.length / 4 + 2, o = Math.ceil(n / 16), a = new Array(o), h = 0; o > h; h++) { a[h] = new Array(16); for (var S = 0; S < 16; S++)a[h][S] = t.charCodeAt(64 * h + 4 * S) << 24 | t.charCodeAt(64 * h + 4 * S + 1) << 16 | t.charCodeAt(64 * h + 4 * S + 2) << 8 | t.charCodeAt(64 * h + 4 * S + 3) }a[o - 1][14] = 8 * (t.length - 1) / Math.pow(2, 32), a[o - 1][14] = Math.floor(a[o - 1][14]), a[o - 1][15] = 8 * (t.length - 1) & 4294967295; for (var u, f, c, i, d, R, p, y, x = new Array(64), h = 0; o > h; h++) { for (var O = 0; O < 16; O++)x[O] = a[h][O]; for (var O = 16; O < 64; O++)x[O] = Sha256.σ1(x[O - 2]) + x[O - 7] + Sha256.σ0(x[O - 15]) + x[O - 16] & 4294967295; u = e[0], f = e[1], c = e[2], i = e[3], d = e[4], R = e[5], p = e[6], y = e[7]; for (var O = 0; O < 64; O++) { var T = y + Sha256.Σ1(d) + Sha256.Ch(d, R, p) + r[O] + x[O]; var s = Sha256.Σ0(u) + Sha256.Maj(u, f, c); y = p, p = R, R = d, d = i + T & 4294967295, i = c, c = f, f = u, u = T + s & 4294967295 }e[0] = e[0] + u & 4294967295, e[1] = e[1] + f & 4294967295, e[2] = e[2] + c & 4294967295, e[3] = e[3] + i & 4294967295, e[4] = e[4] + d & 4294967295, e[5] = e[5] + R & 4294967295, e[6] = e[6] + p & 4294967295, e[7] = e[7] + y & 4294967295 } return Sha256.toHexStr(e[0]) + Sha256.toHexStr(e[1]) + Sha256.toHexStr(e[2]) + Sha256.toHexStr(e[3]) + Sha256.toHexStr(e[4]) + Sha256.toHexStr(e[5]) + Sha256.toHexStr(e[6]) + Sha256.toHexStr(e[7]) }, Sha256.ROTR = function (t, r) { return r >>> t | r << 32 - t }, Sha256.Σ0 = function (t) { return Sha256.ROTR(2, t) ^ Sha256.ROTR(13, t) ^ Sha256.ROTR(22, t) }, Sha256.Σ1 = function (t) { return Sha256.ROTR(6, t) ^ Sha256.ROTR(11, t) ^ Sha256.ROTR(25, t) }, Sha256.σ0 = function (t) { return Sha256.ROTR(7, t) ^ Sha256.ROTR(18, t) ^ t >>> 3 }, Sha256.σ1 = function (t) { return Sha256.ROTR(17, t) ^ Sha256.ROTR(19, t) ^ t >>> 10 }, Sha256.Ch = function (t, r, e) { return t & r ^ ~t & e }, Sha256.Maj = function (t, r, e) { return t & r ^ t & e ^ r & e }, Sha256.toHexStr = function (t) { for (var r, e = '', n = 7; n >= 0; n--)r = t >>> 4 * n & 15, e += r.toString(16); return e }, typeof String.prototype.utf8Encode === 'undefined' && (String.prototype.utf8Encode = function () { return unescape(encodeURIComponent(this)) }), typeof String.prototype.utf8Decode === 'undefined' && (String.prototype.utf8Decode = function () { try { return decodeURIComponent(escape(this)) } catch (t) { return this } }), typeof module !== 'undefined' && module.exports && (module.exports = Sha256), typeof define === 'function' && define.amd && define([], function () { return Sha256 })

        /// ///////////////////////////////////////////////////////////////////////
        // Version                                                              //
        /// ///////////////////////////////////////////////////////////////////////

        var version = null

        /// ///////////////////////////////////////////////////////////////////////
        // Helpers                                                              //
        /// ///////////////////////////////////////////////////////////////////////

        // returns an action which delays for some time
        var delay = function (milliseconds) {
            return function (result) {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve(result)
                    }, milliseconds)
                })
            }
        }

        // returns an action which waits until the condition thunk returns true,
        // rejecting if maxDelay time is exceeded
        var delayUntil = function (condition, maxDelay) {
            return function (result) {
                var delayStep = 250
                var startTime = (new Date()).getTime()
                var checkForCondition = function () {
                    if (condition()) {
                        return Promise.resolve(result)
                    }
                    if (maxDelay !== null && (new Date()).getTime() - startTime > maxDelay) {
                        return Promise.reject(Error('delayUntil timed out'))
                    }
                    return delay(delayStep)().then(checkForCondition)
                }
                return checkForCondition()
            }
        }

        // add value to the end of array, and remove items from the beginning
        // such that the length does not exceed limit
        var shove = function (array, value, limit) {
            array.push(value)
            if (array.length > limit) {
                array.splice(0, array.length - limit)
            }
        }

        // compute the mean of an array of numbers
        var mean = function (array) {
            return array.reduce(function (a, b) { return a + b }) / array.length
        }

        // compute the median of an array of numbers
        var median = function (array) {
            return array.concat().sort()[Math.floor(array.length / 2)]
        }

        // swallow any errors from an action
        // and log them to the console
        var swallow = function (action) {
            return function (result) {
                return action(result).catch(function (e) {
                    console.error(e)
                })
            }
        }

        // promise.ensure(fn) method
        // note that this method will not swallow errors
        // eslint-disable-next-line
        Promise.prototype.ensure = function (fn) {
            return this.then(fn, function (e) {
                fn()
                throw e
            })
        }

        /// ///////////////////////////////////////////////////////////////////////
        // Netflix API                                                          //
        /// ///////////////////////////////////////////////////////////////////////

        // how many simulated UI events are currently going on
        // don't respond to UI events unless this is 0, otherwise
        // we will mistake simulated actions for real ones
        var uiEventsHappening = 0

        // video duration in milliseconds
        var lastDuration = 60 * 60 * 1000
        var getDuration = function () {
            var video = jQuery('video')
            if (video.length > 0) {
                lastDuration = Math.floor(video[0].duration * 1000)
            }
            return lastDuration
        }

        // 'playing', 'paused', 'loading', or 'idle'
        var getState = function () {
            if (jQuery('.legacy-controls-styles.legacy.dimmed').length > 0) {
                return 'idle'
            }
            if (jQuery('.AkiraPlayerSpinner--container').length > 0) {
                return 'loading'
            }
            if (jQuery('.button-nfplayerPause').length > 0) {
                return 'playing'
            } else {
                return 'paused'
            }
        }

        // current playback position in milliseconds
        var getPlaybackPosition = function () {
            return Math.floor(jQuery('.VideoContainer video')[0].currentTime * 1000)
        }

        // wake up from idle mode
        var wakeUp = function () {
            uiEventsHappening += 1

            var idleDisplay = jQuery('.legacy-controls-styles.legacy.dimmed')
            var eventOptions = {
                'bubbles': true,
                'button': 0,
                'currentTarget': idleDisplay[0]
            }
            idleDisplay[0].dispatchEvent(new MouseEvent('mouseover', eventOptions))

            return delayUntil(function () {
                return getState() !== 'idle'
            }, 2500)().ensure(function () {
                uiEventsHappening -= 1
            })
        }

        // show the playback controls
        var showControls = function () {
            uiEventsHappening += 1
            var scrubber = jQuery('.text-control')
            var eventOptions = {
                'bubbles': true,
                'button': 0,
                'currentTarget': scrubber[0]
            }
            scrubber[0].dispatchEvent(new MouseEvent('mousemove', eventOptions))
            return delayUntil(function () {
                return scrubber.is(':visible')
            }, 1000)().ensure(function () {
                uiEventsHappening -= 1
            })
        }

        // hide the playback controls
        var hideControls = function () {
            uiEventsHappening += 1
            var player = jQuery('.VideoContainer')
            var mouseX = 100 // relative to the document
            var mouseY = 100 // relative to the document
            var eventOptions = {
                'bubbles': true,
                'button': 0,
                'screenX': mouseX - jQuery(window).scrollLeft(),
                'screenY': mouseY - jQuery(window).scrollTop(),
                'clientX': mouseX - jQuery(window).scrollLeft(),
                'clientY': mouseY - jQuery(window).scrollTop(),
                'offsetX': mouseX - player.offset().left,
                'offsetY': mouseY - player.offset().top,
                'pageX': mouseX,
                'pageY': mouseY,
                'currentTarget': player[0]
            }
            player[0].dispatchEvent(new MouseEvent('mousemove', eventOptions))
            return delay(1)().ensure(function () {
                uiEventsHappening -= 1
            })
        }

        // pause
        var pause = function () {
            uiEventsHappening += 1
            jQuery('.button-nfplayerPause').click()
            return delayUntil(function () {
                return getState() === 'paused'
            }, 1000)().then(hideControls).ensure(function () {
                uiEventsHappening -= 1
            })
        }

        // play
        var play = function () {
            uiEventsHappening += 1
            jQuery('.button-nfplayerPlay').click()
            return delayUntil(function () {
                return getState() === 'playing'
            }, 2500)().then(hideControls).ensure(function () {
                uiEventsHappening -= 1
            })
        }

        // freeze playback for some time and then play
        var freeze = function (milliseconds) {
            return function () {
                uiEventsHappening += 1
                jQuery('.button-nfplayerPause').click()
                return delay(milliseconds)().then(function () {
                    jQuery('.button-nfplayerPlay').click()
                }).then(hideControls).ensure(function () {
                    uiEventsHappening -= 1
                })
            }
        }

        // jump to a specific time in the video
        var seekErrorRecent = []
        var seekErrorMean = 0
        var seek = function (milliseconds) {
            return function () {
                uiEventsHappening += 1
                var eventOptions, oldPlaybackPosition, newPlaybackPosition
                return showControls().then(function () {
                    // compute the parameters for the mouse events
                    var scrubber = jQuery('.scrubber-container')
                    var factor = (milliseconds - seekErrorMean) / getDuration()
                    factor = Math.min(Math.max(factor, 0), 1)
                    var mouseX = scrubber.offset().left + Math.round(scrubber.width() * factor) // relative to the document
                    var mouseY = scrubber.offset().top + scrubber.height() / 2                  // relative to the document
                    eventOptions = {
                        'bubbles': true,
                        'button': 0,
                        'screenX': mouseX - jQuery(window).scrollLeft(),
                        'screenY': mouseY - jQuery(window).scrollTop(),
                        'clientX': mouseX - jQuery(window).scrollLeft(),
                        'clientY': mouseY - jQuery(window).scrollTop(),
                        'offsetX': mouseX - scrubber.offset().left,
                        'offsetY': mouseY - scrubber.offset().top,
                        'pageX': mouseX,
                        'pageY': mouseY,
                        'currentTarget': scrubber[0]
                    }

                    // make the trickplay preview show up
                    // scrubber[0].dispatchEvent(new MouseEvent('mouseover', eventOptions));

                    //   scrubber[0].dispatchEvent(new MouseEvent('mousemove', eventOptions));
                    // }).then(delayUntil(function() {
                    //   // wait for the trickplay preview to show up
                    //   return jQuery('.trickplay').is(':visible');
                    // }, 2500)).then(function() {

                    // remember the old position
                    oldPlaybackPosition = getPlaybackPosition()

                    // simulate a click on the scrubber
                    scrubber[0].dispatchEvent(new MouseEvent('mousedown', eventOptions))
                    scrubber[0].dispatchEvent(new MouseEvent('mouseup', eventOptions))
                    scrubber[0].dispatchEvent(new MouseEvent('mouseout', eventOptions))
                }).then(delayUntil(function () {
                    // wait until the seeking is done
                    newPlaybackPosition = getPlaybackPosition()
                    return Math.abs(newPlaybackPosition - oldPlaybackPosition) >= 1
                }, 5000)).then(function () {
                    // compute mean seek error for next time
                    var newSeekError = Math.min(Math.max(newPlaybackPosition - milliseconds, -10000), 10000)
                    shove(seekErrorRecent, newSeekError, 5)
                    seekErrorMean = mean(seekErrorRecent)
                }).then(hideControls).ensure(function () {
                    uiEventsHappening -= 1
                })
            }
        }

        /// ///////////////////////////////////////////////////////////////////////
        // Socket                                                               //
        /// ///////////////////////////////////////////////////////////////////////

        // connection to the server
        var socket = io('https://s1.netflixparty.com')

        var getURLParameter = function (url, key, queryIndex) {
            var searchString = '?' + url.split('?')[queryIndex]
            if (searchString === undefined) {
                return null
            }
            var escapedKey = key.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
            var regex = new RegExp('[?|&]' + escapedKey + '=' + '([^&]*)(&|$)')
            var match = regex.exec(searchString)
            if (match === null) {
                return null
            }
            return decodeURIComponent(match[1])
        }

        // get the userId from the server
        var userId = null
        socket.on('userId', function (data) {
            if (userId === null) {
                userId = data
            }
        })

        /// ///////////////////////////////////////////////////////////////////////
        // Chat API                                                             //
        /// ///////////////////////////////////////////////////////////////////////

        // chat state
        var messages = []
        var unreadCount = 0
        var originalTitle = document.title
        var currentPartyCount = 0
        var userInfo = null

        // UI constants
        var chatSidebarWidth = 360
        var chatSidebarPadding = 16
        var avatarSize = 20
        var avatarPadding = 4
        var avatarBorder = 2
        var chatVericalMargin = 4
        var chatInputBorder = 2
        var chatMessageHorizontalPadding = 8
        var chatMessageVerticalPadding = 8
        var presenceIndicatorHeight = 30

        // this is the markup that needs to be injected onto the page for chat
        var chatHtml = `
      <style>
        .nf-player-container.with-chat {
          width: calc(100% - ${chatSidebarWidth}px) !important;
        }

        #chat-container, #chat-container * {
          box-sizing: border-box;
        }

        #chat-container {
          width: ${chatSidebarWidth}px;
          height: 100%;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          cursor: auto;
          user-select: text;
          -webkit-user-select: text;
          z-index: 9999999999;
          padding: ${chatSidebarPadding}px;
        }

        #chat-container #chat-history-container {
          height: calc(100% - ${chatMessageVerticalPadding * 2 + avatarSize + avatarPadding * 2 + avatarBorder * 2 + chatVericalMargin * 2 + presenceIndicatorHeight}px);
          position: relative;
        }

        #chat-container #chat-history-container #chat-history {
          width: ${chatSidebarWidth - chatSidebarPadding * 2}px;
          position: absolute;
          left: 0;
          bottom: 0;
          max-height: 100%;
          overflow: auto;
        }

        #chat-container #chat-history-container #chat-history .chat-message {
          background-color: #222;
          color: #999;
          padding: ${chatMessageVerticalPadding}px ${chatMessageHorizontalPadding}px;
          margin-top: ${chatVericalMargin}px;
          border-radius: 2px;
          word-wrap: break-word;
          overflow: auto;
        }

        #chat-container #chat-history-container #chat-history .chat-message .chat-message-avatar {
          float: left;
          width: ${avatarSize + avatarPadding * 2 + avatarBorder * 2}px;
          height: ${avatarSize + avatarPadding * 2 + avatarBorder * 2}px;
          padding: ${avatarPadding}px;
          border: ${avatarBorder}px solid #444;
          border-radius: 2px;
        }

        #chat-container #chat-history-container #chat-history .chat-message .chat-message-avatar img {
          display: block;
          width: ${avatarSize}px;
          height: ${avatarSize}px;
        }

        #chat-container #chat-history-container #chat-history .chat-message .chat-message-body {
          padding-left: ${avatarSize + avatarPadding * 2 + avatarBorder * 2 + chatMessageHorizontalPadding}px;
        }

        #chat-container #chat-history-container #chat-history .chat-message.system-message .chat-message-body {
          font-style: italic;
          color: #666;
        }

        #chat-container #presence-indicator {
          position: absolute;
          left: ${chatSidebarPadding}px;
          bottom: ${chatSidebarPadding + chatMessageVerticalPadding * 2 + avatarSize + avatarPadding * 2 + avatarBorder * 2 + chatVericalMargin}px;
          width: ${chatSidebarWidth - chatSidebarPadding * 2}px;
          height: ${presenceIndicatorHeight}px;
          line-height: ${presenceIndicatorHeight}px;
          color: #666;
          font-style: italic;
        }

        #chat-container #chat-input-container {
          position: absolute;
          height: ${chatMessageVerticalPadding * 2 + avatarSize + avatarPadding * 2 + avatarBorder * 2}px;
          left: ${chatSidebarPadding}px;
          bottom: ${chatSidebarPadding}px;
          width: ${chatSidebarWidth - chatSidebarPadding * 2}px;
          background-color: #111;
          border: ${chatInputBorder}px solid #333;
          border-radius: 2px;
          overflow: auto;
          cursor: text;
        }

        #chat-container #chat-input-container #chat-input-avatar {
          float: left;
          width: ${avatarSize + avatarPadding * 2 + avatarBorder * 2}px;
          height: ${avatarSize + avatarPadding * 2 + avatarBorder * 2}px;
          padding: ${avatarPadding}px;
          border: ${avatarBorder}px solid #333;
          margin-left: ${chatMessageHorizontalPadding - chatInputBorder}px;
          margin-top: ${chatMessageVerticalPadding - chatInputBorder}px;
          margin-bottom: ${chatMessageVerticalPadding - chatInputBorder}px;
          border-radius: 2px;
        }

        #chat-container #chat-input-container #chat-input-avatar img {
          display: block;
          width: ${avatarSize}px;
          height: ${avatarSize}px;
        }

        #chat-container #chat-input-container #chat-input {
          display: block;
          height: ${avatarSize + avatarPadding * 2 + avatarBorder * 2 + chatMessageVerticalPadding * 2 - chatInputBorder * 2}px;
          line-height: ${avatarSize + avatarPadding * 2 + avatarBorder * 2}px;
          width: ${chatSidebarWidth - chatSidebarPadding * 2 - avatarSize - avatarPadding * 2 - avatarBorder * 2 - chatMessageHorizontalPadding - chatInputBorder}px;
          margin-left: ${avatarSize + avatarPadding * 2 + avatarBorder * 2 + chatMessageHorizontalPadding - chatInputBorder}px;
          background-color: #111;
          border: none;
          outline-style: none;
          color: #999;
          padding-top: ${chatMessageVerticalPadding - chatInputBorder}px;
          padding-right: ${chatMessageHorizontalPadding - chatInputBorder}px;
          padding-bottom: ${chatMessageVerticalPadding - chatInputBorder}px;
          padding-left: ${chatMessageHorizontalPadding}px;
        }
      </style>
      <div id="chat-container">
        <div id="chat-history-container">
          <div id="chat-history"></div>
        </div>
        <div id="presence-indicator">People are typing...</div>
        <div id="chat-input-container">
          <div id="chat-input-avatar"></div>
          <input id="chat-input"></input>
        </div>
      </div>
    `

        // this is used for the chat presence feature
        var typingTimer = null

        // set up the chat state, or reset the state if the system has already been set up
        var initChat = function () {
            if (jQuery('#chat-container').length === 0) {
                jQuery('.nf-player-container').after(chatHtml)
                jQuery('#presence-indicator').hide()
                var oldPageX = null
                var oldPageY = null
                jQuery('#chat-container').mousedown(function (e) {
                    oldPageX = e.pageX
                    oldPageY = e.pageY
                })
                jQuery('#chat-container').mouseup(function (e) {
                    if ((e.pageX - oldPageX) * (e.pageX - oldPageX) + (e.pageY - oldPageY) * (e.pageY - oldPageY) < 5) {
                        jQuery('#chat-input').focus()
                        e.stopPropagation()
                    }
                })
                jQuery('#chat-input-container').click(function (e) {
                    jQuery('#chat-input').focus()
                })
                jQuery('#chat-input').keydown(function (e) {
                    e.stopPropagation()

                    if (e.which === 13) {
                        var body = jQuery('#chat-input').val().replace(/^\s+|\s+$/g, '')
                        if (body !== '') {
                            if (typingTimer !== null) {
                                clearTimeout(typingTimer)
                                typingTimer = null
                                socket.emit('typing', { typing: false }, function () {})
                            }

                            jQuery('#chat-input').prop('disabled', true)
                            socket.emit('sendMessage', {
                                body: (userInfo !== null) ? userInfo.username + ': ' + body : body
                            }, function () {
                                jQuery('#chat-input').val('').prop('disabled', false).focus()
                            })
                        }
                    } else {
                        if (typingTimer === null) {
                            socket.emit('typing', { typing: true }, function () {})
                        } else {
                            clearTimeout(typingTimer)
                        }
                        typingTimer = setTimeout(function () {
                            typingTimer = null
                            socket.emit('typing', { typing: false }, function () {})
                        }, 500)
                    }
                })
                jQuery('#chat-input-avatar').html(`<img src="data:image/png;base64,${new Identicon(Sha256.hash(userId).substr(0, 32), avatarSize * 2, 0).toString()}" />`)

                // receive messages from the server
                socket.on('sendMessage', function (data) {
                    console.log(data)
                    addMessage(data)

                    if (data.body === 'joined') {
                        currentPartyCount++
                        ipcRenderer.send('np', {
                            type: 'sessionUpdate',
                            partyCount: currentPartyCount
                        })
                    } else if (data.body === 'left') {
                        currentPartyCount--
                        ipcRenderer.send('np', {
                            type: 'sessionUpdate',
                            partyCount: currentPartyCount
                        })
                    }
                })

                // receive presence updates from the server
                socket.on('setPresence', function (data) {
                    setPresenceVisible(data.anyoneTyping)
                })
            } else {
                jQuery('#chat-history').html('')
            }
        }

        // query whether the chat sidebar is visible
        var getChatVisible = function () {
            return (withChatInterval != null)
        }

        // show or hide the chat sidebar
        var setChatVisible = function (visible) {
            if (visible) {
                withChatInterval = setInterval(() => {
                    if (!jQuery('.nf-player-container').hasClass('with-chat')) {
                        jQuery('.nf-player-container').addClass('with-chat')
                    }
                })
                $('.show-chat-check').css('display', 'block')
                jQuery('#chat-container').show()
                if (!document.hasFocus()) {
                    clearUnreadCount()
                }
            } else {
                jQuery('#chat-container').hide()
                clearInterval(withChatInterval)
                withChatInterval = null
                jQuery('.nf-player-container').removeClass('with-chat')
                $('.show-chat-check').css('display', 'none')
            }
        }

        // show or hide the "People are typing..." indicator
        var setPresenceVisible = function (visible) {
            if (visible) {
                jQuery('#presence-indicator').show()
            } else {
                jQuery('#presence-indicator').hide()
            }
        }

        // add a message to the chat history
        var addMessage = function (message) {
            messages.push(message)
            jQuery('#chat-history').append(`
        <div class="chat-message${message.isSystemMessage ? ' system-message' : ''}">
          <div class="chat-message-avatar"><img src="data:image/png;base64,${new Identicon(Sha256.hash(message.userId).substr(0, 32), avatarSize * 2, 0).toString()}" /></div>
          <div class="chat-message-body">${message.body.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
        </div>
      `)
            jQuery('#chat-history').scrollTop(jQuery('#chat-history').prop('scrollHeight'))
            unreadCount += 1
            if (!document.hasFocus()) {
                document.title = '(' + String(unreadCount) + ') ' + originalTitle
            }
        }

        // clear the unread count
        var clearUnreadCount = function () {
            if (unreadCount > 0) {
                unreadCount = 0
                document.title = originalTitle
            }
        }

        // clear the unread count when the window is focused
        jQuery(window).focus(function () {
            if (getChatVisible()) {
                clearUnreadCount()
            }
        })

        /// ///////////////////////////////////////////////////////////////////////
        // Main logic                                                           //
        /// ///////////////////////////////////////////////////////////////////////

        // the Netflix player be kept within this many milliseconds of our
        // internal representation for the playback time
        var maxTimeError = 2500

        // the session
        var sessionLockControls = true
        var sessionId = null
        var lastKnownTime = null
        var lastKnownTimeUpdatedAt = null
        var ownerId = null
        var state = null
        var videoId = null

        // ping the server periodically to estimate round trip time and client-server time offset
        var roundTripTimeRecent = []
        var roundTripTimeMedian = 0
        var localTimeMinusServerTimeRecent = []
        var localTimeMinusServerTimeMedian = 0
        var ping = function () {
            return new Promise(function (resolve, reject) {
                var startTime = (new Date()).getTime()
                socket.emit('getServerTime', { version: version }, function (serverTime) {
                    var now = new Date()

                    // compute median round trip time
                    shove(roundTripTimeRecent, now.getTime() - startTime, 5)
                    roundTripTimeMedian = median(roundTripTimeRecent)

                    // compute median client-server time offset
                    shove(localTimeMinusServerTimeRecent, (now.getTime() - Math.round(roundTripTimeMedian / 2)) - (new Date(serverTime)).getTime(), 5)
                    localTimeMinusServerTimeMedian = median(localTimeMinusServerTimeRecent)

                    resolve()
                })
            })
        }

        // this function should be called periodically to ensure the Netflix
        // player matches our internal representation of the playback state
        var sync = function () {
            if (sessionId === null) {
                return Promise.resolve()
            }
            if (state === 'paused') {
                var promise
                if (getState() === 'paused') {
                    promise = Promise.resolve()
                } else {
                    promise = pause()
                }
                return promise.then(function () {
                    if (Math.abs(lastKnownTime - getPlaybackPosition()) > maxTimeError) {
                        return seek(lastKnownTime)()
                    }
                })
            } else {
                return delayUntil(function () {
                    return getState() !== 'loading'
                }, Infinity)().then(function () {
                    var localTime = getPlaybackPosition()
                    var serverTime = lastKnownTime + (state === 'playing' ? ((new Date()).getTime() - (lastKnownTimeUpdatedAt.getTime() + localTimeMinusServerTimeMedian)) : 0)
                    if (Math.abs(localTime - serverTime) > maxTimeError) {
                        return seek(serverTime + 2000)().then(function () {
                            var localTime = getPlaybackPosition()
                            var serverTime = lastKnownTime + (state === 'playing' ? ((new Date()).getTime() - (lastKnownTimeUpdatedAt.getTime() + localTimeMinusServerTimeMedian)) : 0)
                            if (localTime > serverTime && localTime <= serverTime + maxTimeError) {
                                return freeze(localTime - serverTime)()
                            } else {
                                return play()
                            }
                        })
                    } else {
                        return play()
                    }
                })
            }
        }

        // this is called when we need to send an update to the server
        // waitForChange is a boolean that indicates whether we should wait for
        // the Netflix player to update itself before we broadcast
        var broadcast = function (waitForChange) {
            return function () {
                var promise
                if (waitForChange) {
                    var oldPlaybackPosition = getPlaybackPosition()
                    var oldState = getState()
                    promise = swallow(delayUntil(function () {
                        var newPlaybackPosition = getPlaybackPosition()
                        var newState = getState()
                        return Math.abs(newPlaybackPosition - oldPlaybackPosition) >= 250 || newState !== oldState
                    }, 2500))()
                } else {
                    promise = Promise.resolve()
                }

                return promise.then(delayUntil(function () {
                    return getState() !== 'loading'
                }, Infinity)).then(function () {
                    var now = new Date()
                    var localTime = getPlaybackPosition()
                    var serverTime = lastKnownTime + (state === 'playing' ? (now.getTime() - (lastKnownTimeUpdatedAt.getTime() + localTimeMinusServerTimeMedian)) : 0)
                    var newLastKnownTime = localTime
                    var newLastKnownTimeUpdatedAt = new Date(now.getTime() - localTimeMinusServerTimeMedian)
                    var newState = getState() === 'playing' ? 'playing' : 'paused'
                    if (state === newState && Math.abs(localTime - serverTime) < 1) {
                        return Promise.resolve()
                    } else {
                        var oldLastKnownTime = lastKnownTime
                        var oldLastKnownTimeUpdatedAt = lastKnownTimeUpdatedAt
                        var oldState = state
                        lastKnownTime = newLastKnownTime
                        lastKnownTimeUpdatedAt = newLastKnownTimeUpdatedAt
                        state = newState
                        return new Promise(function (resolve, reject) {
                            socket.emit('updateSession', {
                                lastKnownTime: newLastKnownTime,
                                lastKnownTimeUpdatedAt: newLastKnownTimeUpdatedAt.getTime(),
                                state: newState
                            }, function (data) {
                                if (data !== undefined && data.errorMessage !== null) {
                                    lastKnownTime = oldLastKnownTime
                                    lastKnownTimeUpdatedAt = oldLastKnownTimeUpdatedAt
                                    state = oldState
                                    reject() // eslint-disable-line
                                } else {
                                    resolve()
                                }
                            })
                        })
                    }
                })
            }
        }

        // this is called when data is received from the server
        var receive = function (data) {
            lastKnownTime = data.lastKnownTime
            lastKnownTimeUpdatedAt = new Date(data.lastKnownTimeUpdatedAt)
            state = data.state
            return sync
        }

        // the following allows us to linearize all tasks in the program to avoid interference
        var tasks = null
        var tasksInFlight = 0

        var pushTask = function (task) {
            if (tasksInFlight === 0) {
                // why reset tasks here? in case the native promises implementation isn't
                // smart enough to garbage collect old c  ompleted tasks in the chain.
                tasks = Promise.resolve()
            }
            tasksInFlight += 1
            tasks = tasks.then(function () {
                if (getState() === 'idle') {
                    swallow(wakeUp)()
                }
            }).then(swallow(task)).then(function () {
                tasksInFlight -= 1
            })
        }

        // broadcast the playback state if there is any user activity
        jQuery(document).mouseup(function () {
            if (sessionId !== null && uiEventsHappening === 0) {
                pushTask(function () {
                    return broadcast(true)().catch(sync)
                })
            }
        })

        jQuery(document).keydown(function () {
            if (sessionId !== null && uiEventsHappening === 0) {
                pushTask(function () {
                    return broadcast(true)().catch(sync)
                })
            }
        })

        socket.on('connect', function () {
            pushTask(ping)
            setInterval(function () {
                if (tasksInFlight === 0) {
                    var newVideoId = parseInt(window.location.href.match(/^.*\/([0-9]+)\??.*/)[1])
                    if (videoId !== null && videoId !== newVideoId) {
                        videoId = newVideoId
                        sessionId = null
                        setChatVisible(false)
                    }

                    pushTask(ping)
                    pushTask(sync)
                }
            }, 5000)
        })

        // if the server goes down, it can reconstruct the session with this
        socket.on('reconnect', function () {
            if (sessionId !== null) {
                socket.emit('reboot', {
                    sessionId: sessionId,
                    lastKnownTime: lastKnownTime,
                    lastKnownTimeUpdatedAt: lastKnownTimeUpdatedAt.getTime(),
                    messages: messages,
                    state: state,
                    ownerId: ownerId,
                    userId: userId,
                    videoId: videoId
                }, function (data) {
                    pushTask(receive(data))
                })
            }
        })

        // respond to updates from the server
        socket.on('update', function (data) {
            pushTask(receive(data))
        })

        var waitForEl = function (selector, callback) {
            if (jQuery(selector).length) {
                callback()
            } else {
                setTimeout(function () {
                    waitForEl(selector, callback)
                }, 100)
            }
        }

        var partyStyling = `
      <style>
        .netflix-party-container {
          display: -webkit-box;
          display: -webkit-flex;
          display: -moz-box;
          display: -ms-flexbox;
          display: flex;
          background: #282828;
          direction: ltr;
        }

        .NetflixPartyContainer .popup-content-wrapper {
          background: rgba(38,38,38,.85);
          border-radius: 0.3em;
          padding: unset;
        }

        .NetflixPartyContainer .popup-content-wrapper .netflix-party-header {
          text-align: center;
          cursor: default;
          font-size: .94444444em;
          color: #fff;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .nfp-popup-control .popup-content.netflix-party-container {
          background: transparent;
        }

        .netflix-party-container .list {
          list-style: none;
          margin: 0;
          -webkit-box-flex: 1;
          -webkit-flex-grow: 1;
          -moz-box-flex: 1;
          -ms-flex-positive: 1;
          flex-grow: 1;
          padding: 0 0 .5em 0;
        }

        .netflix-party-container .list .list-header {
          cursor: default;
          font-size: .94444444em;
          padding: .75em 2.6em;
          color: #fff;
          font-weight: 600;
        }

        .netflix-party-container .list .selected {
          color: #fff;
          font-weight: 600;
        }

        .netflix-party-container .list li .video-controls-check {
          top: 50%;
          margin-top: -.9em;
          position: absolute;
          fill: #fff;
          left: 0;
          margin-left: 1.3em;
        }

        .netflix-party-container .list li {
          padding: 1em 3.4em 1em 3.4em;
          cursor: pointer;
          white-space: nowrap;
          position: relative;
          font-size: .72222222em;
          color: #b3b3b3;
          outline: 0;
        }

        .netflix-party-container .list li:hover {
          background: rgba(255,255,255,.1);
          color: #fff;
        }

        .netflix-party-container .list .list-header:hover {
          background: 0 0;
        }

        .session-modal {
          position: fixed;
          justify-content: center;
          align-items: center;
          display: none;
        }

        .session-modal .modal-container {
          background: rgba(38,38,38,.85);
          border-radius: 0.3em;
          padding: 1rem;
        }

        .session-modal .modal-container h3 {
          margin-top: 0;
        }

        .session-modal .modal-container h3:not(:first-child) {
          margin-top: 1em;
        }

        .session-modal .modal-container .actions {
          margin-top: 1.2rem;
        }

        .netflix-party-button-header {
          font-size: 1.2em;
        }

        .lock-controls-input {
          margin-right: 0.25em;
        }
      </style>
    `

        var updatePartyPopup = (status) => {
            if (status === 'session') {
                $('.create-session').css('display', 'none')
                $('.join-session').css('display', 'none')
                $('.show-chat').css('display', 'list-item')
                $('.leave-session').css('display', 'list-item')
                $('.copy-session').css('display', 'list-item')
            } else if (status === 'nosession') {
                $('.create-session').css('display', 'list-item')
                $('.join-session').css('display', 'list-item')
                $('.show-chat').css('display', 'none')
                $('.leave-session').css('display', 'none')
                $('.copy-session').css('display', 'none')
            }
        }

        var joinSessionModal = null
        var createSessionModal = null
        // interaction with the electron app
        ipcRenderer.on('np',
            function (sender, request) {
                if (request.type === 'getInitData') {
                    version = request.data.version
                    ipcRenderer.send('np', {
                        type: 'response',
                        response: 'getInitData',
                        sessionId: sessionId,
                        chatVisible: getChatVisible()
                    })
                    return
                }

                if (request.type === 'createSession') {
                    socket.emit('createSession', {
                        controlLock: request.data.controlLock,
                        videoId: request.data.videoId
                    }, function (data) {
                        initChat()
                        setChatVisible(true)
                        lastKnownTime = data.lastKnownTime
                        lastKnownTimeUpdatedAt = new Date(data.lastKnownTimeUpdatedAt)
                        messages = []
                        sessionId = data.sessionId
                        ownerId = request.data.controlLock ? userId : null
                        state = data.state
                        videoId = request.data.videoId
                        currentPartyCount = 1
                        pushTask(broadcast(false))
                        ipcRenderer.send('np', {
                            type: 'response',
                            response: 'createSession',
                            sessionId: sessionId
                        })
                        ipcRenderer.send('np', {
                            type: 'sessionUpdate',
                            partyCount: currentPartyCount
                        })
                        updatePartyPopup('session')
                    })
                    return true
                }

                if (request.type === 'joinSession') {
                    socket.emit('joinSession', request.data.sessionId, function (data) {
                        if (data.errorMessage) {
                            ipcRenderer.send('np', {
                                type: 'response',
                                response: 'joinSession',
                                errorMessage: data.errorMessage
                            })
                            return
                        }

                        if (data.videoId !== request.data.videoId) {
                            socket.emit('leaveSession', null, function (data) {
                                ipcRenderer.send('np', {
                                    type: 'response',
                                    response: 'leaveSession',
                                    errorMessage: 'That session is for a different video.'
                                })
                            })
                            return
                        }

                        initChat()
                        setChatVisible(true)
                        sessionId = request.data.sessionId
                        lastKnownTime = data.lastKnownTime
                        lastKnownTimeUpdatedAt = new Date(data.lastKnownTimeUpdatedAt)
                        messages = []
                        for (var i = 0; i < data.messages.length; i += 1) {
                            addMessage(data.messages[i])
                        }
                        ownerId = data.ownerId
                        state = data.state
                        videoId = request.data.videoId
                        pushTask(receive(data))
                        ipcRenderer.send('np', {
                            type: 'response',
                            response: 'joinSession'
                        })
                        updatePartyPopup('session')
                    })
                    return true
                }

                if (request.type === 'leaveSession') {
                    socket.emit('leaveSession', null, function (_) {
                        sessionId = null
                        setChatVisible(false)
                        ipcRenderer.send('np', {
                            type: 'response',
                            response: 'leaveSession'
                        })
                        updatePartyPopup('nosession')
                    })
                    return true
                }

                if (request.type === 'showChat') {
                    if (request.data.visible) {
                        setChatVisible(true)
                    } else {
                        setChatVisible(false)
                    }
                    ipcRenderer.send('np', {
                        type: 'response',
                        response: 'showChat'
                    })
                }

                if (request.type === 'discordUser') {
                    userInfo = request.data
                }

                if (request.type === 'navigation') {
                    if (sessionId !== null) {
                        ipcRenderer.send('np', {
                            type: 'loopbackCall',
                            call: 'leaveSession',
                            data: {}
                        })
                    }
                }

                if (request.type === 'initialize') {
                    ipcRenderer.send('np', {
                        type: 'getDiscordUser'
                    })

                    // This event is called before everything is properly loaded
                    waitForEl('.PlayerControlsNeo__button-control-row .ReportAProblemPopupContainer', function () {
                        jQuery('.nf-player-container').after(partyStyling)
                        var button = $(`
              <div class="touchable NetflixPartyContainer PlayerControls--control-element nfp-popup-control">
                <button class="touchable PlayerControls--control-element nfp-button-control default-control-button button-nfplayerParty" tabindex="0" role="button" aria-label="Party with other Netflix users">
                  <h3 style="margin: unset;" class="netflix-party-button-header">NP</h3>
                </button>
              </div>
            `)
                        var popupContainer = $(`
              <div class="touchable popup-content-wrapper keep-right"></div>
            `)
                        button.append(popupContainer)
                        var popup = $(`
              <div class="popup-content netflix-party-container" data-uia="netflix-party-popup">
                <ul class="list structural">
                  <li class="list-header">Netflix Party</li>
                  <li class="create-session" tabindex="0">Create Session</li>
                  <li class="join-session" tabindex="0">Join Session</li>
                  <li class="show-chat">
                    <span class="show-chat-check video-controls-check">
                      <svg class="svg-icon svg-icon-nfplayerCheck" focusable="false"><use filter="" xlink:href="#nfplayerCheck"></use></svg>
                    </span>Show Chat
                  </li>
                  <li class="copy-session" tabindex="0">Copy Session Url</li>
                  <li class="leave-session" tabindex="0">Leave Session</li>
                </ul>
              </div>
            `)
                        popupContainer.append(popup)

                        if (joinSessionModal == null) {
                            joinSessionModal = $(`
                <div class="join-session-modal session-modal nfa-z-idx-1 nfa-d-flex nfa-w-100 nfa-h-100 nfa-flx-dir-col nfa-bs-bb-nfa-jc-center">
                  <div class="modal-container">
                    <h3>Enter Session ID</h3>
                    <div class="searchInput">
                      <input type="text" class="session-input-join" data-search-input="true" dir="ltr" data-uia="search-box-input" maxlength="80" style="opacity: 1; transition-duration: 300ms;">
                    </div>
                    <h3>Enter Nickname</h3>
                    <div class="searchInput">
                      <input type="text" class="nickname-input-join" placeholder="Leave blank to inherit Discord" data-search-input="true" dir="ltr" data-uia="search-box-input" maxlength="32" style="opacity: 1; transition-duration: 300ms;">
                    </div>
                    <div class="actions">
                      <button class="join-session-button nf-icon-button nf-flat-button nf-flat-button-primary nf-flat-button-uppercase">Join</button>
                      <button class="cancel-join-session-button nf-icon-button nf-flat-button nf-flat-button-uppercase">Cancel</button>
                    </div>
                  </div>
                </div>
              `)
                            $('body').append(joinSessionModal)

                            var joinSessionButton = $('.join-session-button')
                            joinSessionButton.on('click', () => {
                                var nickname = $('.nickname-input-join')
                                if (!$.isBlank(nickname.val())) {
                                    if (userInfo === null) {
                                        userInfo = {}
                                    }

                                    $('.nickname-input-create').val(nickname.val())
                                    userInfo.username = nickname.val()
                                }
                                joinSessionModal.css('display', 'none')
                                var videoId = parseInt(window.location.href.match(/^.*\/([0-9]+)\??.*/)[1])
                                var sessionId = getURLParameter($('.session-input-join').val(), 'npSessionId', 1)
                                ipcRenderer.send('np', {
                                    type: 'loopbackCall',
                                    call: 'joinSession',
                                    data: {
                                        sessionId: sessionId,
                                        videoId: videoId
                                    }
                                })
                            })

                            var cancelJoinSessionButton = $('.cancel-join-session-button')
                            cancelJoinSessionButton.on('click', () => {
                                joinSessionModal.css('display', 'none')
                            })
                        }

                        if (createSessionModal == null) {
                            createSessionModal = $(`
                <div class="create-session-modal session-modal nfa-z-idx-1 nfa-d-flex nfa-w-100 nfa-h-100 nfa-flx-dir-col nfa-bs-bb-nfa-jc-center">
                  <div class="modal-container">
                    <h3>Configuration</h3>
                    <div class="checkboxInput">
                      <input type="checkbox" class="lock-controls-input" data-search-input="true" dir="ltr" data-uia="search-box-input" maxlength="80" style="opacity: 1; transition-duration: 300ms;">Lock Controls
                    </div>
                    <h3>Enter Nickname</h3>
                    <div class="searchInput">
                      <input type="text" class="nickname-input-create" placeholder="Leave blank to inherit Discord" data-search-input="true" dir="ltr" data-uia="search-box-input" maxlength="32" style="opacity: 1; transition-duration: 300ms;">
                    </div>
                    <div class="actions">
                      <button class="create-session-button nf-icon-button nf-flat-button nf-flat-button-primary nf-flat-button-uppercase">Create</button>
                      <button class="cancel-create-session-button nf-icon-button nf-flat-button nf-flat-button-uppercase">Cancel</button>
                    </div>
                  </div>
                </div>
              `)
                            $('body').append(createSessionModal)

                            var createSessionButton = $('.create-session-button')
                            createSessionButton.on('click', () => {
                                var nickname = $('.nickname-input-create')
                                if (!$.isBlank(nickname.val())) {
                                    if (userInfo === null) {
                                        userInfo = {}
                                    }

                                    $('.nickname-input-join').val(nickname.val())
                                    userInfo.username = nickname.val()
                                }
                                createSessionModal.css('display', 'none')
                                var videoId = parseInt(window.location.href.match(/^.*\/([0-9]+)\??.*/)[1])
                                ipcRenderer.send('np', {
                                    type: 'loopbackCall',
                                    call: 'createSession',
                                    data: {
                                        controlLock: sessionLockControls,
                                        videoId: videoId
                                    }
                                })
                            })

                            var cancelCreateSessionButton = $('.cancel-create-session-button')
                            cancelCreateSessionButton.on('click', () => {
                                createSessionModal.css('display', 'none')
                            })
                        }
            
                        button.hover(() => {
                            button.addClass('PlayerControls--control-element--active')
                            popupContainer.addClass('active')
                        }, () => {
                            button.removeClass('PlayerControls--control-element--active')
                            popupContainer.removeClass('active')
                        })

                        $('.PlayerControlsNeo__button-control-row .ReportAProblemPopupContainer').before(button)

                        var controlLockCheck = $('.lock-controls-input')
                        if (sessionLockControls) {
                            controlLockCheck.prop('checked', true)
                        } else {
                            controlLockCheck.prop('checked', false)
                        }

                        var showChatCheck = $('.show-chat-check')
                        if (getChatVisible()) {
                            showChatCheck.css('display', 'block')
                        } else {
                            showChatCheck.css('display', 'none')
                        }

                        $('.show-chat').css('display', 'none')
                        $('.leave-session').css('display', 'none')
                        $('.copy-session').css('display', 'none')

                        var controlLock = $('.lock-controls-input')
                        controlLock.on('change', () => {
                            sessionLockControls = controlLock.prop('checked')
                        })

                        var showChat = $('.show-chat')
                        showChat.on('click', () => {
                            if (getChatVisible()) {
                                ipcRenderer.send('np', {
                                    type: 'loopbackCall',
                                    call: 'showChat',
                                    data: {
                                        visible: false
                                    }
                                })
                            } else {
                                ipcRenderer.send('np', {
                                    type: 'loopbackCall',
                                    call: 'showChat',
                                    data: {
                                        visible: true
                                    }
                                })
                            }
                        })

                        var joinSession = $('.join-session')
                        joinSession.on('click', () => {
                            joinSessionModal.css('display', 'flex')
                        })

                        var createSession = $('.create-session')
                        createSession.on('click', () => {
                            createSessionModal.css('display', 'flex')
                        })

                        var leaveSession = $('.leave-session')
                        leaveSession.on('click', () => {
                            ipcRenderer.send('np', {
                                type: 'loopbackCall',
                                call: 'leaveSession',
                                data: {}
                            })
                        })

                        var copySession = $('.copy-session')
                        copySession.on('click', () => {
                            clipboard.writeText('https://www.netflix.com/watch/' + videoId + '?npSessionId=' + sessionId + '&npServerId=s1')
                        })

                        ipcRenderer.send('npsetup')
                    })
                }
            }
        )
    }
})
