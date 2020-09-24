// ==UserScript==
// @name         answerer_script
// @namespace    https://github.com/abrow425/gotIssues
// @version      1
// @description  handles issue_link_output.html links and enforces simultaneity
// @author       SherpDaWerp
// @include      file:/*/issue_link_output.html*
// @include      https://www.nationstates.net/container=*
// @include	 https://www.nationstates.net/page=enact_dilemma/*
// @include      https://www.nationstates.net/page=deck*
// @grant        GM.setValue
// @grant        GM.getValue
// @grant				 GM_cookie
// @grant        window.close
// ==/UserScript==


function readURLParameters(pathname) {
 		var parameters = pathname.split("/");
    var paramlist = {};

    for (a = 1; a < parameters.length; a++) {
        var paramsplit = parameters[a].split("=");

        paramlist[paramsplit[0]] = paramsplit[1];
    }

  	return paramlist;
}


async function fn_answer(event) {
  	if (await GM.getValue("answerer_is_ns_issue_tab_open") == "true") {
      	alert("To enforce NationStates' simultaneity rules, you can only open one tab at a time using this script.");
    } else if (await GM.getValue("answerer_is_ns_issue_tab_open") == "false") {
        var url = this.value;

        GM.setValue("answerer_is_ns_issue_tab_open", "true");

      	var row = this.parentNode.parentNode;
      	row.parentNode.removeChild(row);
      	
        window.open(url, "_blank");
    }
}


function addBtnFn() {
    var answer_btns = document.getElementsByClassName("issue-answer-button");

    for (i = 0; i < answer_btns.length; i++) {
        answer_btns.item(i).addEventListener("click", fn_answer, false);
    }
}


function closeAndResetTab() {
  	GM.setValue("answerer_pack_to_be_opened", "false");
  	GM.setValue("answerer_is_ns_issue_tab_open", "false");
  	window.close();
}


function handleIssueTab() {
    if (document.getElementById("dlegislationbox") !== null) {
        if (document.getElementsByClassName("button lootboxbutton").length > 0) {
            // yes packs, so focus the "open packs" button ready to be clicked.

            var button = document.getElementsByClassName("button lootboxbutton")[0];

            button.focus();
            button.addEventListener("click", function(event) {
                if (button.style.display == "none") {
                    // if the button is hidden for whatever reason, stop the click and close tab for another to be opened.

                    event.preventDefault();
                    closeAndResetTab();
                    return;
                }

                button.style.display = "none";
                GM.setValue("answerer_pack_to_be_opened", "true");
            }, false);
        } else {
            // no packs, so close tab and allow another to be opened.
            closeAndResetTab();
        }
    } else {
        // script goes to login page.

      	return;
    }
}


function cardflipwaiter() {
  	var cards = document.getElementsByClassName("ready");
  	for (i = 0; i < cards.length; i++) {
  	    if (cards.item(i).className.includes("flipped") && !(cards.item(i).className.includes("junked"))) {
            // if the back is showing (flipped) and it's not junked, then it hasn't been clicked yet.

  	        setTimeout(cardflipwaiter, 100);
  	    }
  	}
}


function flipAllCards() {
    var card_backs = document.getElementsByClassName("back")

    for (i = 0; i < 5; i++) {
        card_backs.item(i).click()
    }
}


(async function() {
  	'use strict';
  	
    if (window.location.href.includes("/issue_link_output.html")) {
      	// if on generated page, add fn_answer() to all buttons and notify the user that the script is ready to go.
      	GM.setValue("answerer_pack_to_be_opened", "false");
        GM.setValue("answerer_is_ns_issue_tab_open", "false");


        addBtnFn();
      	var autoflip = window.confirm("answerer Userscript is loaded. Do you want any card packs to auto open (instead of manually clicking to flip them)?").toString();
        GM.setValue("answerer_autoflip", autoflip);
    } else if (window.location.href.includes("https://www.nationstates.net/page=deck") && await GM.getValue("answerer_pack_to_be_opened") == "true") {
     	if (await GM.getValue("answerer_autoflip") == "true") {
     	    window.addEventListener("load", flipAllCards, false);

          	setTimeout(closeAndResetTab, 2000);
        } else {
          	cardflipwaiter()

          	setTimeout(closeAndResetTab, 2000);
        }
    } else {
			var params = readURLParameters(window.location.pathname);
  		var param_keys = Object.keys(params);
      
      if (param_keys.includes("container") && param_keys.includes("page") && param_keys.includes("dilemma") && param_keys.includes("template-overall") && param_keys.includes("asnation")) {
      	// if on issue page, wait for page to load and add handleIssueTab() function.

      	window.addEventListener("load", handleIssueTab, false);
      }
    }
})();
