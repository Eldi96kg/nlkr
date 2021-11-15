var title_udc_navigator = "Поиск по классификатору УДК";

function WebIrbisSystem(cgiPATH)
{
   this._webIrbis = new WebIrbisQuery(cgiPATH);
   this._cgiPATH = cgiPATH;
}

WebIrbisSystem.prototype.applyWebIrbisSyntax = function (data)
{
   return data.split("<--HTTP_PATH-->").join(HTTP_PATH).split("<--CGI_PATH-->").join(CGI_PATH).split("~~").join("");
}

WebIrbisSystem.prototype.uc_saveQuery = function (user, queryName, queryPartFulltext, queryPartBibl, queryDate)
{
   var webIrbis = this._webIrbis;
   var url = webIrbis.createQuery_accountContext(header_rec);
   webFunctionJSON(
      url,
      function (accountContext)
      {
         var queryCount = parseInt(accountContext.queryCount, 10);
         var maxQueryCount = parseInt(accountContext.maxQueryCount, 10);
         if (queryCount >= maxQueryCount)
         {
            alert("Запрос не был сохранён. Исчерпано ограничение на количество хранимых запросов.");
            return;
         }
         
         var url = webIrbis.createQuery_saveQuery(header_rec, accountContext, user, queryName, queryPartFulltext, queryPartBibl, queryDate);
         
         executeAction(
            url,
            function()
            {
               alert("Запрос сохранён.");
            },
            function(result)
            {
               alert("Сохранение завершилось ошибкой. Возвращено значение '" + result + "'.");
            });
      });
}

WebIrbisSystem.prototype.uc_deleteStoredQuery = function (mfn, n, v2)
{
   var url = this._webIrbis.createQuery_deleteStoredQuery(header_rec, mfn, n, v2);
   
   executeAction(
      url,
      function()
      {
         refreshBrowserWindow();
      },
      function(result)
      {
         alert("~~Удаление завершилось ошибкой. Возвращено значение ~~'" + result + "'.");
      });
}

WebIrbisSystem.prototype.uc_executeStoredQuery = function (query, s21all)
{
   var url = this._webIrbis.createQuery_executeStoredQuery(header_rec, query, s21all);
   window.location = url;
}

WebIrbisSystem.prototype.uc_navigateUDC = function (lng, s21all)
{
   var url = this._webIrbis.createQuery_navigateUDC(header_rec, lng, s21all);
   browseURL(url, title_udc_navigator);
}

WebIrbisSystem.prototype.uc_searchUDC = function (lng, s21all, s21str, s21log, s21p01, s21stn)
{
   if (s21str.trim() == "")
      return;
   
   var url = this._webIrbis.createQuery_searchUDC(header_rec, lng, s21all, s21str, s21log, s21p01, s21stn);
   browseURL(url, title_udc_navigator);
}

WebIrbisSystem.prototype.uc_goPortionUDC = function (lng, s21all, s21stn)
{
   var url = this._webIrbis.createQuery_searchUDC(header_rec, lng, s21all, "", "", "", s21stn);
   
   browseURL(url, title_udc_navigator);
}

WebIrbisSystem.prototype.uc_createUrl_searchByUDC = function (lng, checkbox_elements)
{
   if (checkbox_elements.length == 0)
      return "";
   
   var udc_query_maker = function ()
      {
         var name = this.name;
         return name + "S21STR=" + encodeURIComponent(this.value) + "&" + name + "S21P02=1&" + name + "S21P03=U=&";
      };
      
   var udc_query = checkbox_elements.map(udc_query_maker).get().join("");
   var url = this._webIrbis.createQuery_searchByUDC(header_rec, lng);
   url = url + udc_query;
   return url;
}

WebIrbisSystem.prototype.uc_uploadText = function (form)
{
   if (checkOfDoubleClickForReloadCommand()) return;
   
   var formData = new FormData(form);
   browseURL(this._cgiPATH, "Результат запроса на загрузку текста", undefined, undefined, "POST", formData);
}

WebIrbisSystem.prototype.uc_printSearchResult = function (s21fmt, selection_type, sorting_type, max_count)
{
   var checked_controls = serializeCheckedControls();
   
   if ((selection_type == 2) && (checked_controls == ""))
   {
      alert("Отсутствуют отмеченные документы");
      return;
   }
   var url = this._webIrbis.createQuery_printSearchResult(header_rec, "_PRINT", s21fmt, selection_type, sorting_type, checked_controls, max_count);
   
   window.open(url);
}

WebIrbisSystem.prototype.uc_showCheckedBookLst = function (sorting_type, max_count)
{
   var checked_controls = serializeCheckedControls();
   
   orderLst_deleteCtrlName = new Array();
   orderLst_deleteUrl = new Array();
   
   if (checked_controls == "")
   {
      alert("Отсутствуют отмеченные документы");
      return;
   }
   var url = this._webIrbis.createQuery_printSearchResult(header_rec, "_FULLTEXT_SELECTED", "BriefHTML_ft", 2, sorting_type, checked_controls, max_count);
	
   browseURL(url, "Список отмеченных документов",
      function()
      {
         srrs_FULLTEXT_SELECTED.applyEachRecord(srShowResult_FULLTEXT_SELECTED);
      },
      function()
      {
         showCheckedControls();
      });
}

WebIrbisSystem.prototype.uc_openKO = function ()
{
   var url = this._webIrbis.createQuery_openKO(header_rec);
   
   window.open(url);
}

WebIrbisSystem.prototype.getSearchFieldList = function ()
{
   //return [sf_AVT, sf_NAME, sf_A1, sf_A34, sf_VAR];
   return [sf_NAME, sf_A1, sf_A34, sf_VAR];
}

WebIrbisSystem.prototype.goPortion = function (portionNumber)
{
	var url = this._webIrbis.getURL_viewPortion(header_rec, new Object(), this.getSearchFieldList(), portionNumber, isExtendedSearchFieldsOn, isPersonalPanelOn, serializeCheckedControls(), side_search_panel_info, undefined, false);
   
   window.location = url;
}

WebIrbisSystem.prototype.goPortionAtDatabase = function (DB_NAME)
{
	var url = this._webIrbis.getURL_viewPortion(header_rec,
		{
			"DB_NAME" : DB_NAME
		},
		this.getSearchFieldList(), 1, isExtendedSearchFieldsOn, isPersonalPanelOn, serializeCheckedControls(), side_search_panel_info, undefined, false);
   
   window.location = url;
}

WebIrbisSystem.prototype.goPortionSorted = function (s21srw, s21srd)
{
	var url = this._webIrbis.getURL_viewPortion(header_rec,
		{
			"S21SRW" : s21srw,
			"S21SRD" : s21srd
		},
		this.getSearchFieldList(), 1, isExtendedSearchFieldsOn, isPersonalPanelOn, serializeCheckedControls(), side_search_panel_info, undefined, false);
   
   window.location = url;
}

WebIrbisSystem.prototype.initializeSideSearchPanel = function (ui_side_search_panel_header, ui_side_search_panel, rec)
{
   side_search_panel_info = header_rec.getIrbisField_First("side_search_panel_info");
   
   var count_array = [];
   if (side_search_panel_info != "")
   {
      count_array = side_search_panel_info.split(";");
      count_array.pop();
   }
   
   var sideSourceLst = [];
   var settings_array = rec.getIrbisField_Array("settings");
   var name_array = rec.getIrbisField_Array("name");
   var isValidCountLst = (count_array.length == name_array.length);
   for (var i = 0; i < name_array.length; i++)
   {
      var source = new Object();
      source.name = name_array[i];
      var settings = JSON.parse(settings_array[i]);
      source.url_service = new WebIrbisQuery(settings.url).getURL_search_service(header_rec, this.getSearchFieldList(), isExtendedSearchFieldsOn, isPersonalPanelOn, serializeCheckedControls());
      source.url_GUI = new WebIrbisQuery(settings.url).getURL_viewPortion(header_rec, new Object(), this.getSearchFieldList(), 1, isExtendedSearchFieldsOn, isPersonalPanelOn, serializeCheckedControls(), undefined, settings.login, false);
      if (isValidCountLst)
         if (count_array[i] !== undefined)
         {
            source.info = new Object();
            source.info.count = count_array[i];
         }
      sideSourceLst.push(source);
   }
   
   var sideSearchPanel = new SideSearchPanel(
      ui_side_search_panel_header, 
      ui_side_search_panel, 
      sideSourceLst, 
      function() 
      {
         side_search_panel_info = sideSearchPanel.serializeCountLst();
      });
      
   sideSearchPanel.show();
}
