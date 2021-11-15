var lst_updateRating = new Object();
var lst_updateGiveOut = new Object();

var updated_average_rating;
var updated_value_count;
var updated_digital_give_out_count;
var updated_give_out_count;

var window_onload_actions = new ActionSet();

window.onload = function ()
{
  window_onload_actions.callActions();
}

orderLst_deleteCtrlName = new Array();
orderLst_deleteUrl = new Array();

function orderLst_setEvent(url)
{
   return function () {
         orderLst_deleteCtrlName = new Array();
         orderLst_deleteUrl = new Array();
         browseURL(url, "Корзина заказов", orderLst_setEvents);
      };
}

function orderLst_setEvents()
{
   for (var i in orderLst_deleteCtrlName)
      document.getElementById(orderLst_deleteCtrlName[i]).onclick = orderLst_setEvent(orderLst_deleteUrl[i]);
}

function VisitController()
{
   this._visitedPages = new Object();
   
   this._active = false;
   this._maxVisitCount = 0;
}   

VisitController.prototype.activate = function (maxVisitCount)
{
   this._active = true;
   this._maxVisitCount = maxVisitCount;
}

VisitController.prototype.isVisitedPage = function (page)
{
   for (var visitedPage in this._visitedPages)
      if (visitedPage == page)
         return true;
   return false;
}

VisitController.prototype.isAvaliablePage = function (page)
{
   if (!this._active)
      return true;
      
   if (this.isVisitedPage(page))
      return true;
      
   if (this.rest() > 0)
      return true;
      
   return false;
}

VisitController.prototype.visitPage = function (page)
{
   if (this.isVisitedPage(page))
      return;
      
   this._visitedPages[page] = "";
}

VisitController.prototype.visitedPageCount = function ()
{
   return Object.keys(this._visitedPages).length;
}

VisitController.prototype.rest = function ()
{
   if (!this._active)
      return 1;
      
   return this._maxVisitCount - this.visitedPageCount();
}

var pageViewer_title = "Постраничный просмотр полного текста";
var others_title = "\"Круг чтения\"";

var onClose_pageViewer = 
   function (mfn)
   {
      return function ()
      {
         var sr = document.getElementById("search_result_" + mfn);
         if (sr != null)
            window.scrollTo(0, getOffset(sr).top);
         
         if (lst_updateRating[mfn] != undefined)
            lst_updateRating[mfn](updated_average_rating, updated_value_count);
            
         if (lst_updateGiveOut[mfn] != undefined)
            lst_updateGiveOut[mfn](updated_digital_give_out_count, updated_give_out_count);
      };
   };
   
function openPageViewer_fromBookmark(url, mfn, startPage)
{
   var get_innerTextSearch_openPageViewer = function(url, mfn) 
   { 
      return function(query, pages, startPage)
      {
         scale_userChangedValue = undefined;
         var url_ = new WebIrbisQuery(CGI_PATH).createQuery_openPageViewer_appendsome(url, query, pages, startPage);
         browseURL(url_, pageViewer_title, undefined, onClose_pageViewer(mfn));
      }
   };
   
   innerTextSearch_openPageViewer = get_innerTextSearch_openPageViewer(url, mfn);
   
   currentVisitController = new VisitController();
   scale_userChangedValue = undefined;
   var url_ = new WebIrbisQuery(CGI_PATH).createQuery_openPageViewer_appendsome(url, "", "", startPage);
   browseURL(url_, pageViewer_title, undefined, onClose_pageViewer(mfn));
}

var outlineViewer;

function bindGlobalOutlineViewer(viewer)
{
	outlineViewer = viewer;
}

var innerTextSearch_openPageViewer;

var storageQueriesCount;

var wasStartedCommandWithReload = false;

function checkOfDoubleClickForReloadCommand()
{
   if (wasStartedCommandWithReload)
      return true;
   
   wasStartedCommandWithReload = true;
   
   return false;
}

//var sf_AVT;
var sf_NAME;
var sf_A1;
var sf_A34;
var sf_VAR;

var side_search_panel_info = undefined;

if(typeof String.prototype.trim !== 'function') {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, ''); 
  }
}
