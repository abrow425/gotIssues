// ==UserScript==
// @name         answerer_script
// @namespace    https://github.com/abrow425/gotIssues
// @version      0.0.1
// @description  handles output.html links and enforces simultaneity
// @author       SherpDaWerp
// @include			 file:/*/issue_link_output.html*
// @include			 https://www.nationstates.net/container=*/page=enact_dilemma/choice-*=1/dilemma=*/template-overall=none/nation=*/asnation=*
// @include			 http://www.nationstates.net/container=*/page=enact_dilemma/choice-*=1/dilemma=*/template-overall=none/nation=*/asnation=*
// @include			 https://www.nationstates.net/page=deck
// @grant				 GM_setValue
// @grant				 GM_getValue
// @grant				 window.close
// ==/UserScript==

function fn_answer(event) {
  	if (GM_getValue("answerer_is_ns_issue_tab_open") == "true") {
      	alert("To enforce NationStates' simultaneity rules, you can only open one tab at a time using this script.");
    } else if (GM_getValue("answerer_is_ns_issue_tab_open") == "false") {
        var url = this.value;

        GM_setValue("answerer_is_ns_issue_tab_open", "true");
      	
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
  	GM_setValue("answerer_pack_to_be_opened", "false");
  	GM_setValue("answerer_is_ns_issue_tab_open", "false");
  	window.close();
}

function handleIssueTab() {
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
          	GM_setValue("answerer_pack_to_be_opened", "true");
        }, false);
    } else {
      	// no packs, so close tab and allow another to be opened.
      	
     	  closeAndResetTab();
    }
}

function cardflipwaiter() {
  	// check if there are 5 flipped or 5 junked cards.
  	
  	setTimeout(cardflipwaiter, 50);
}


(function() {
  	'use strict';
  	
    if (window.location.href.includes("/issue_link_output.html")) {
      	// if on generated page, add fn_answer() to all buttons and notify the user that the script is ready to go.
      
        addBtnFn();
      	var autoflip = window.confirm("answerer Userscript is loaded. Do you want any card packs to auto open (instead of manually clicking to flip them)?").toString();
        GM_setValue("answerer_autoflip", autoflip);
    } else if (window.location.href.match("http.*\:\/\/www\.nationstates\.net\/container=.*\/page=enact_dilemma\/choice-.*=1\/dilemma=.*\/template-overall=none\/nation=.*\/asnation=.*")) {
      	// if on issue page, wait for page to load and add handleIssueTab() function.
      
      	window.addEventListener("load", handleIssueTab, false);
    } else if (window.location.href.includes("https://www.nationstates.net/page=deck") && GM_getValue("pack_to_be_opened") == "true") {
     		if (GM_getValue("answerer_autoflip") == "true") {
          	var card_backs = document.getElementsByClassName("back")
          	for (i = 0; i < 5; i++) {
              	card_backs.item(i).click()
            }
          
          	setTimeout(closeAndResetTab, 2000);
        } else {
          	cardflipwaiter()
          
          	setTimeout(closeAndResetTab, 2000);
        }
    }
})();
