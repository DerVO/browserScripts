// ==UserScript==
// @name         SPON LaterPay Disabler
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Decodiert SPON LaterPay PayWall
// @updateURL    https://raw.githubusercontent.com/DerVO/browserScripts/master/SPON-LaterPay-Disabler.user.js
// @downloadURL  https://raw.githubusercontent.com/DerVO/browserScripts/master/SPON-LaterPay-Disabler.user.js
// @author       DerVO
// @match        http://www.spiegel.de/*
// @grant        GM_addStyle
// @require      http://code.jquery.com/jquery-latest.js
// ==/UserScript==

/*
Quellen:

Wie man LaterPay bei SPIEGEL Plus und anderswo mit einem Klick umgehen kann — webermartin.net/blog
http://webermartin.net/blog/wie-man-laterpay-bei-spiegel-plus-und-anderswo-mit-einem-klick-umgehen-kann/

SPIEGELplus - Was ein Quatsch... : de
https://www.reddit.com/r/de/comments/4qx2vn/spiegelplus_was_ein_quatsch/

Paste Guru - completely anonymous - Host your text anonymously . Share your codes & scripts. PasteGuru.com
http://pasteguru.com/22298

*/

(function() {
    'use strict';

    // nur ausfueren, wenn Element auf Seite vorkommt
    if ($('.laterpay-under-overlay').length === 0 ) return;

    // Your code here...
    // funktionier tnicht, wenn sofort ausgefuehrt, daher nach 1s ausfuhren
    setTimeout(function(){

        var unobfuscate = function(element) {
            element.contents().each(function() {
                if (this.nodeType === 3) {
                    var obfuscated = this.nodeValue;
                    var unobfuscated = '';
                    for (var i = 0; i < obfuscated.length; i++) {
                        var char = obfuscated.charCodeAt(i);
                        var newchar = char;
                        if (char > 33) {
                            newchar--;
                        }
                        unobfuscated += String.fromCharCode(newchar);
                    }
                    this.nodeValue = unobfuscated;
                } else if (this.tagName !== 'A') {
                    unobfuscate($(this));
                }
            });
        };
        var lp = $('.laterpay-under-overlay').next().children('div:first');
        lp.children('svg').remove();
        lp.children('div:last').remove();
        var ct = lp.children('div:first');
        ct.removeClass();
        $('.obfuscated', ct).each(function() {
            unobfuscate($(this));
        });

        // Intro zum Reader-Modus ausblenden
        $('.js-spiegelplus-obfuscated-intro').hide();

        // Spiegel Plus Logo grün umfärben
        $('.article-icon.spiegelplus').css('-webkit-filter', 'hue-rotate(180deg)');
    }, 1000);

})();