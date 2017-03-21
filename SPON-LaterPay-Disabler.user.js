// ==UserScript==
// @name         SPON LaterPay Disabler
// @namespace    http://tampermonkey.net/
// @version      2.0
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

"Verschlüsselung" von SpiegelOnline-Bezahlartikeln extrem einfach knackbar [D. Kriesel]
(insb Kommentare mit Infos zu falschen Sonderzeichen)
http://www.dkriesel.com/blog/2016/0703_verschluesselung_von_spiegelonline-bezahlartikeln_extrem_einfach_knackbar#comment_1076

*/

(function() {
    'use strict';

    // nur ausfueren, wenn Element auf Seite vorkommt
    if ($('.laterpay-under-overlay').length === 0 ) return;

    // funktionier tnicht, wenn sofort ausgefuehrt, daher nach 1s ausfuhren
    setTimeout(function(){

        /*
        var unobfuscate = function(element) {
            element.contents().each(function() {
                if (this.nodeType === 3) {
                    var obfuscated = this.nodeValue;
                    var unobfuscated = '';
                    for (var i = 0; i < obfuscated.length; i++) {
                        var char = obfuscated.charCodeAt(i);
                        var newchar = char;
                        if (char == 177) {
                            newchar=38; // & statt °
                        } else if (char == 178) {
                            newchar=33; // ! statt ±
                        } else if (char == 180) {
                            newchar=59; // ; statt ³
                        } else if (char > 33) {
                            newchar--; // Default Ceasar
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
        */

        // verwende direkt Laterpay Code
        // http://davidebove.com/blog/2016/07/18/laterpay-bei-spiegel-online-umgehen/
        SPLaterpay.callback.hasAccess();
        $('.lp_mwi_payment-method-wrapper').parent().parent().fadeOut();
        var x = $('.deobfuscated-content').parent().attr('class');
        $('.deobfuscated-content').parent().removeClass(x);

        // Spiegel Plus Logo grün umfärben
        $('.article-icon.spiegelplus').css('-webkit-filter', 'hue-rotate(180deg)');
    }, 1000);

})();