var lastUrlOfBrowserWindow;
var prevUrlOfBrowserWindow;
var lastTitleOfBrowserWindow;
var prevTitleOfBrowserWindow;
var lastCompleteFunctionOfBrowserWindow;
var lastCloseFunctionOfBrowserWindow;

function webFunctionJSON(url, onComplete, type)
{
   $.ajax({
         url: url,
         cache: false,
         contentType: false,
         processData: false,
         type: (type == undefined ? "GET" : type),
         success: function (data)
         {
            onComplete(JSON.parse(data));
         },
         error: function () {
              alert("Ошибка при асинхронном запросе к серверу.");
          }
      });
}

function executeAction(url, onComplete, onFail, type)
{
   $.ajax({
         url: url,
         cache: false,
         contentType: false,
         processData: false,
         type: (type == undefined ? "GET" : type),
         success: function (data)
         {
            var result = JSON.parse(data);
            if (result.value == "0")
               onComplete();
            else
               onFail(result.value);
         },
         error: function () {
              alert("Ошибка при асинхронном запросе к серверу.");
          }
      });
}

function browseURL(url, title, onComplete, onClose, type, formData)
{
   prevUrlOfBrowserWindow = lastUrlOfBrowserWindow;
   lastUrlOfBrowserWindow = url;
   prevCompleteFunctionOfBrowserWindow = lastCompleteFunctionOfBrowserWindow;
   lastCompleteFunctionOfBrowserWindow = onComplete;
   
   $("#ctrl_userCard_browserWindow").html("<img src='" + HTTP_PATH + "/images/loading2.gif'>");
   $.ajax({
         url: url,
         data: formData,
         cache: false,
         contentType: false,
         processData: false,
         type: (type === undefined ? "GET" : type),
         success: function (data)
         {
            openHTML(data, title, onClose);
            if (isAuthPage)
               window.location.href = CGI_PATH + "?C21COM=F&Z21ID=";
            if (onComplete !== undefined)
               onComplete();
         },
         error: function (XMLHttpRequest, textStatus, errorThrown) {
              alert("Ошибка при асинхронном запросе к серверу");
          }
      });
   /*$.get(url,
      function (data)
      {
         $("#ctrl_userCard_browserWindow").html(data);
         onComplete();
      });
   $("#ctrl_userCard_browserWindow").load(url, onComplete);*/
}

var dialog_userCard_browserWindow = undefined;

function openHTML(html, title, onClose)
{
   prevTitleOfBrowserWindow = lastTitleOfBrowserWindow;
   lastTitleOfBrowserWindow = title;
   prevCloseFunctionOfBrowserWindow = lastCloseFunctionOfBrowserWindow;
   lastCloseFunctionOfBrowserWindow = onClose;
   
   $("#ctrl_userCard_browserWindow").html(html);
   
   if ($("#ctrl_userCard_browserWindow").dialog("instance") !== undefined)
      dialog_userCard_browserWindow.dialog("close");
   
	$("body").css("overflow", "hidden");
	dialog_userCard_browserWindow = $("#ctrl_userCard_browserWindow")
      .dialog(
      {
         title: title,
         modal: true,
         width: "95%",
			height: document.body.clientHeight * 0.95,
         position: { my: "center top", at: "center top", of: "#ctrl_userCard_browserWindow_holder" },
         close: 
				function () 
				{
					if (onClose !== undefined)
						onClose(); 
					$("body").css("overflow", "auto"); 
				}
      });
   
   var ctrl = document.getElementById("ctrl_userCard_browserWindow");
   if (ctrl != null)
      window.scrollTo(0, getOffset(ctrl).top - 50);
}

function refreshBrowserWindow()
{
   var url = new WebIrbisQuery(CGI_PATH).blockCacheChange(lastUrlOfBrowserWindow);
   
   browseURL(url, lastTitleOfBrowserWindow, lastCompleteFunctionOfBrowserWindow, lastCloseFunctionOfBrowserWindow);
}

function haveBrowserWindow()
{
   return document.getElementById("ctrl_userCard_browserWindow") != null;
}

function browsePrevURL()
{
   if (prevUrlOfBrowserWindow === undefined) return;
   if (prevTitleOfBrowserWindow === undefined) return;
   
   browseURL(prevUrlOfBrowserWindow, prevTitleOfBrowserWindow);
}

function clearBrowseHistory()
{
   prevUrlOfBrowserWindow = undefined;
   prevCompleteFunctionOfBrowserWindow = undefined;
   prevTitleOfBrowserWindow = undefined;
   prevCloseFunctionOfBrowserWindow = undefined;

   lastUrlOfBrowserWindow = undefined;
   lastCompleteFunctionOfBrowserWindow = undefined;
   lastTitleOfBrowserWindow = undefined;
   lastCloseFunctionOfBrowserWindow = undefined;
}

function srShowResult(mfn, rec, frame_name)
{
   var get_innerTextSearch_openPageViewer = function(mfn, rec) 
   { 
      return function(query, pages, startPage)
      {
         scale_userChangedValue = undefined;
         var url = new WebIrbisQuery(CGI_PATH).createQuery_openPageViewer(true, true, mfn, rec, query, pages, startPage);
         browseURL(url, pageViewer_title, undefined, onClose_pageViewer(mfn));
      }
   };
   $("#ctrl_openPageViewer_withSearchResult_goFirstSearchResult_" + frame_name + "_" + mfn)
      .click(function () {
         innerTextSearch_openPageViewer = get_innerTextSearch_openPageViewer(mfn, rec);
         scale_userChangedValue = undefined;
         var url = new WebIrbisQuery(CGI_PATH).createQuery_openPageViewer(true, true, mfn, rec);
         browseURL(url, pageViewer_title, undefined, onClose_pageViewer(mfn));
      });
   $("#ctrl_openPageViewer_withSearchResult_" + frame_name + "_" + mfn)
      .click(function () {
         innerTextSearch_openPageViewer = get_innerTextSearch_openPageViewer(mfn, rec);
         scale_userChangedValue = undefined;
         var url = new WebIrbisQuery(CGI_PATH).createQuery_openPageViewer(true, false, mfn, rec);
         browseURL(url, pageViewer_title, undefined, onClose_pageViewer(mfn));
      });
	var fn_openPageViewer =
		function () {
         innerTextSearch_openPageViewer = get_innerTextSearch_openPageViewer(mfn, rec);
         scale_userChangedValue = undefined;
         var url = new WebIrbisQuery(CGI_PATH).createQuery_openPageViewer(false, false, mfn, rec);
         browseURL(url, pageViewer_title, undefined, onClose_pageViewer(mfn));
      };
   $("#ctrl_openPageViewer_" + frame_name + "_" + mfn)
      .click(fn_openPageViewer);
		
	if (auto_open_first_text === undefined)
		auto_open_first_text = fn_openPageViewer;
   
   var checkbox = $("#ctrl_search_result_checkbox_" + frame_name + "_" + mfn);
   if (!flag_pageLoading)
   {
      checkedCtrlArray_mfn.push(mfn);
      checkedCtrlArray_ctrl.push(checkbox);
   }
   else
   {
      allCheckedCtrlArray_ctrl.push(checkbox);
   }
   checkbox
      .prop("checked", isCheckedBook(mfn))
      .click(function () {
         depopulateCheckedControl(mfn, checkbox.prop("checked"));
      });
   
   if (rec.getIrbisField_First("others_ext") != "")
   {
      var others_click = function () 
         {
            scale_userChangedValue = undefined;
            openHTML(new WebIrbisSystem(CGI_PATH).applyWebIrbisSyntax(rec.getIrbisField_First("others_ext")), others_title);
         };
      $("#ctrl_others_link_container_" + frame_name + "_" + mfn)
         .attr("title", "Издания так же высоко оцененные другими читателями")
         .click(others_click)
         .css("display", "block");
      $("#ctrl_others_link_" + frame_name + "_" + mfn)
         .text(others_title)
         .attr("title", "Издания так же высоко оцененные другими читателями")
         .click(others_click);
   }
}

function openAtNewTab_onFormSubmit(ui_form)
{
   var url = CGI_PATH + "?" + ui_form.serialize();
   window.open(url);
}

function setAutoComplete(ui, cgiPATH, Z21ID, P21DBN, S21P03, autoCompleteType)
{
    function split( val ) {
      return val.split( /\s+/ );
    }
    
    function extractLastWord( term ) {
      return split( term ).pop();
    }
    
    function wholeQuery( term ) {
      return term;
    }
    
    function autocompleteSource(request, response, autocompleteSourceUrl, termProcessing)
    {
      var autocompleteTerm = termProcessing(request.term);
      $.ajax({
         url: autocompleteSourceUrl(autocompleteTerm),
         success: function(terms) {
            terms_arr = terms.split("\n");
            terms_for_autocomplete = new Array();
            for (term in terms_arr)
               terms_for_autocomplete.push(terms_arr[term].split("|")[0]);
            var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex(autocompleteTerm), "i" );
            response(
               $.grep(
                  terms_for_autocomplete,
                  function( item ){ return matcher.test( item ); }
               ));
            //response(terms_for_autocomplete);
         },
         error: function (XMLHttpRequest, textStatus, errorThrown) { response([]); }
      });
    }
    
    var autocompleteSourceUrl = function (autocompleteTerm)
       {
         return cgiPATH + "?"
               + "Z21ID=" + Z21ID + "&"
               //+ "SEARCH_IN_FULL_TEXT=1&"
               + "T21CNR=10&"
               + "C21COM=T&"
               + "T21PRF=" + S21P03 + "&"
               + "I21DBN=" + P21DBN + "&"
               + "T21TRM=" + encodeURIComponent(autocompleteTerm) + "&"; // encodeURIComponent для IE
       };
   
   var autocompleteSettings_wholeQuery =
         {
            source: function (request, response)
            {
               autocompleteSource(request, response, autocompleteSourceUrl, wholeQuery);
            },
            focus: function() {
                // prevent value inserted on focus
                return false;
            }
         };
      
   var autocompleteSettings_extractLastWord =
         {
            source: function (request, response) {
               autocompleteSource(request, response, autocompleteSourceUrl, extractLastWord);
            },
            focus: function() {
                // prevent value inserted on focus
                return false;
            },
            select: function( event, ui ) {
                var terms = split( this.value );
                // remove the current input
                terms.pop();
                // add the selected item
                terms.push( ui.item.value );
                // add placeholder to get the comma-and-space at the end
                terms.push( "" );
                this.value = terms.join( " " );
                return false;
            }
         };
      

   ui
		.bind( "keydown", function( event ) {
		  if ( event.keyCode === $.ui.keyCode.TAB &&
				$( this ).autocomplete( "instance" ).menu.active ) {
			 event.preventDefault();
		  }
		});
         
   if (autoCompleteType == "wholeQuery")
      ui.autocomplete(autocompleteSettings_wholeQuery);
   if (autoCompleteType == "extractLastWord")
      ui.autocomplete(autocompleteSettings_extractLastWord);
}

