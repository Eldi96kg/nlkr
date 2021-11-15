function WebIrbisQuery(cgiPATH)
{
   this._cgiPATH = cgiPATH;
   this._params = new Object();
}

// 1) основной сценарий: в paramValSource явно задано строковое значение, которое и является значением параметра
// 2) альтернативный сценарий: значение берётся из объекта paramValPreferredSource, 
//    а если взятое из paramValPreferredSource является undefined, 
//    то берётся из объекта paramValSource
// Исключение для сценария 2:
// если в объекте paramValPreferredSource значение соответствующего атрибута (свойства) задано null,
// то не будет чтения из объекта paramValSource
WebIrbisQuery.prototype.getParam = function (paramName, paramValSource, paramValPreferredSource)
{
	var paramVal;
	
	// параметр указан явно
	if (typeof(paramValSource) != "object")
	{
		paramVal = paramValSource;
	}
	
	if (typeof(paramValSource) == "object")
	{
		if (typeof(paramValPreferredSource) == "object")
		{
			paramVal = paramValPreferredSource[paramName];
			
			if (paramVal === null) return;
		}
		
		if (paramVal === undefined)
		{
			var rec = paramValSource;
			paramVal = rec.getIrbisField_First(paramName);
		}
	}
	
   return paramVal;
}

// 1) основной сценарий: в paramValSource явно задано строковое значение, которое и является значением параметра
// 2) альтернативный сценарий: значение берётся из объекта paramValPreferredSource, 
//    а если взятое из paramValPreferredSource является undefined, 
//    то берётся из объекта paramValSource
// Исключение для сценария 2:
// если в объекте paramValPreferredSource значение соответствующего атрибута (свойства) задано null,
// то не будет чтения из объекта paramValSource
WebIrbisQuery.prototype.appendParam = function (paramName, paramValSource, paramValPreferredSource)
{
	var paramVal = this.getParam(paramName, paramValSource, paramValPreferredSource);
	
   this._params[paramName] = $.trim(paramVal);
}

// то же что appendParam, только с кодированием encodeURIComponent
WebIrbisQuery.prototype.appendParamEncodeURIComponent = function (paramName, paramValSource, paramValPreferredSource)
{
	var paramVal = this.getParam(paramName, paramValSource, paramValPreferredSource);
		
   this._params[paramName] = encodeURIComponent($.trim(paramVal));
}

WebIrbisQuery.prototype.blockCache = function ()
{
   this._params["block_cache"] = Math.random();
}

WebIrbisQuery.prototype.blockCacheChange = function (url)
{
   return url.replace(new RegExp("&block_cache=[\\d\\.]+&"), "&block_cache=" + Math.random() + "&");
}

WebIrbisQuery.prototype.createURL = function ()
{
   var url = this._cgiPATH + "?";
   for (var paramName in this._params)
      url += paramName + "=" + this._params[paramName] + "&";
   return url;
}

WebIrbisQuery.prototype.createQuery_saveQuery = function (header_rec, accountContext, user, queryName, queryPartFulltext, queryPartBibl, queryDate)
{
   var mfn = "0";
   if (accountContext.searchQueriesRecordMfn != "")
      mfn = accountContext.searchQueriesRecordMfn;
      
   this.appendParam("C21COM", "R");
   this.appendParam("P21DBN", "ZAPR");
   this.appendParam("I21DBN", "ZAPR");

   this.appendParam("Z21ID", header_rec);
   
   this.appendParam("1_R21MFN", mfn);
   this.appendParam("1_R21IFP", "1");
   this.appendParam("1_R21UPD", "1");

   this.appendParam("1_R21NUM1", "2");
   
   this.appendParam("1_R21SUB1_1", "A");
   this.appendParam("1_R21VOL1_1", encodeURIComponent(queryName));

   this.appendParam("1_R21SUB1_2", "B");
   this.appendParam("1_R21VOL1_2", encodeURIComponent(queryPartFulltext));

   this.appendParam("1_R21SUB1_3", "C");
   this.appendParam("1_R21VOL1_3", encodeURIComponent(queryPartBibl));

   this.appendParam("1_R21SUB1_4", "D");
   this.appendParam("1_R21VOL1_4", encodeURIComponent(queryDate));

   if (accountContext.searchQueriesRecordMfn == "")
   {
      this.appendParam("1_R21NUM2", "1");
      
      this.appendParam("1_R21VOL2_1", user);
   }

   this.blockCache();

   return this.createURL();
}

WebIrbisQuery.prototype.createQuery_deleteStoredQuery = function (header_rec, mfn, n, v2)
{
   this.appendParam("C21COM", "R");
   this.appendParam("P21DBN", "ZAPR");
   this.appendParam("I21DBN", "ZAPR");

   this.appendParam("Z21ID", header_rec);
   
   this.appendParam("1_R21MFN", mfn);
   this.appendParam("1_R21IFP", "1");
   this.appendParam("1_R21UPD", "5");  // удаление с контролем

   this.appendParam("1_R21NUM1", "2");

   this.appendParam("1_R21VOL1_1", encodeURIComponent(v2));
   
   this.appendParam("1_R21OCC1", n);
   
   this.blockCache();

   return this.createURL();
}

WebIrbisQuery.prototype.createQuery_accountContext = function (header_rec)
{
   this.appendParam("C21COM", "S");
   this.appendParam("P21DBN", "RDR");
   this.appendParam("I21DBN", "ACCOUNT_CONTEXT");

   this.appendParam("Z21ID", header_rec);
   
   this.blockCache();

   return this.createURL();
}

WebIrbisQuery.prototype.createQuery_navigateUDC = function (header_rec, lng, s21all)
{
   this.appendParam("C21COM", "S");
   this.appendParam("P21DBN", "RSUDC");
   this.appendParam("I21DBN", "UDC");

   this.appendParam("Z21ID", header_rec);
   
   this.appendParam("LNG", lng);
   this.appendParam("FTDBASENAME", header_rec.getIrbisField_First("DB_NAME"));
   
   this.appendParam("S21FMT", "UDC");
   
   this.appendParam("S21ALL", encodeURIComponent(s21all));
   
   this.appendParam("S21COLORTERMS", "0");
   
   this.blockCache();

   return this.createURL();
}

WebIrbisQuery.prototype.createQuery_searchByUDC = function (header_rec, lng)
{
   this.appendParam("C21COM", "S");
   this.appendParam("LNG", lng);
   this.appendParam("USES21ALL", "1");
   this.appendParam("S21FMT", "briefHTML_ft");
   this.appendParam("P21DBN", header_rec.getIrbisField_First("DB_NAME"));
   this.appendParam("I21DBN", header_rec.getIrbisField_First("DB_NAME") + "_FULLTEXT");
   this.appendParam("FTDBASENAME", header_rec.getIrbisField_First("DB_NAME"));
   
   this.appendParam("Z21ID", header_rec);
   
   this.appendParam("S21STN", "1");
   this.appendParam("S21CNR", "10");
   this.appendParam("S21REF", "10");
   this.appendParam("S21LOG", "0");
   
   this.blockCache();

   return this.createURL();
}

WebIrbisQuery.prototype.createQuery_searchUDC = function (header_rec, lng, s21all, s21str, s21log, s21p01, s21stn)
{
   return this.createQuery_search(header_rec, lng, "UDC", "0", s21all, s21str, s21log, s21p01, s21stn);
}

WebIrbisQuery.prototype.createQuery_search = function (header_rec, lng, s21fmt, colorterms, s21all, s21str, s21log, s21p01, s21stn)
{
   this.appendParam("C21COM", "S");
   this.appendParam("P21DBN", "RSUDC");
   this.appendParam("I21DBN", "UDC");
   
   this.appendParam("Z21ID", header_rec);
   
   this.appendParam("LNG", lng);
   this.appendParam("FTDBASENAME", header_rec.getIrbisField_First("DB_NAME"));
   
   this.appendParam("S21STN", s21stn);
   this.appendParam("S21CNR", "10");
   this.appendParam("S21REF", "10");
   
   this.appendParam("S21STR", encodeURIComponent(s21str));
   
   this.appendParam("S21P03", "K=");
   
   this.appendParam("S21LOG", s21log);
   this.appendParam("S21P01", s21p01);
   
   this.appendParam("S21FMT", s21fmt);
   this.appendParam("FT_PREFIX", "K=");
   this.appendParam("S21COLORTERMS", colorterms);

   this.appendParam("S21ALL", encodeURIComponent(s21all));
   
   this.blockCache();

   return this.createURL();
}

WebIrbisQuery.prototype.createQuery_executeStoredQuery = function (header_rec, query, s21all)
{
   //return this.createQuery_search_ft(header_rec, "_FULLTEXT", "briefHTML_ft", "1", query, s21all);
	return this.getURL_viewPortion(
		header_rec,
		{
			"S21FMT" : "briefHTML_ft", // инициализировать нужно по другому: не забивая переданные параметры из header_rec (если всегда инициализировать из header_rec, то не работает выполнение сохраненного запроса сразу после захода в личный кабинет, без поиска)
			"S21CNR" : "5", // инициализировать нужно по другому: не забивая переданные параметры из header_rec (если всегда инициализировать из header_rec, то не работает выполнение сохраненного запроса сразу после захода в личный кабинет, без поиска)
			"SEARCH_STRING" : query,
			"FT_S21STR" : query,
			"USES21ALL" : "0",
			"S21ALL" : s21all,
			"CHECKINDEX" : "",
			"S21SRD" : "",
			"S21SRW" : "",
			"end-of-object" : null
		},
		[], 1, isExtendedSearchFieldsOn, isPersonalPanelOn, "", side_search_panel_info, undefined, true);
}

WebIrbisQuery.prototype.createQuery_searchAtBook = function (header_rec, fld903, query)
{
   return this.createQuery_search_ft(header_rec, "_NOFRAME", "search_fulltext_ajax", "0", query, "<.>I=" + fld903 + "<.>");
}

WebIrbisQuery.prototype.createQuery_search_ft = function (header_rec, i21dbn_suffix, s21fmt, colorterms, query, s21all)
{
   this.appendParam("C21COM", "S");
   this.appendParam("FT_S21LOG", "4");
   this.appendParam("FT_S21P03", "K=");
   this.appendParam("FT_S21P01", "3");
   this.appendParam("S21FMT", s21fmt);
   this.appendParam("FT_PREFIX", "KT=");
   this.appendParam("S21COLORTERMS", colorterms);
   this.appendParam("P21DBN", header_rec.getIrbisField_First("DB_NAME"));
   this.appendParam("I21DBN", header_rec.getIrbisField_First("DB_NAME") + i21dbn_suffix);

   this.appendParam("Z21ID", header_rec);
   
   
   this.appendParam("SEARCH_STRING", encodeURIComponent(query));
   this.appendParam("FT_S21STR", encodeURIComponent(query));
   this.appendParam("S21ALL", encodeURIComponent(s21all));
   
   this.blockCache();

   return this.createURL();
}

WebIrbisQuery.prototype.createQuery_openPageViewer = function (withSearchResult, goFirstSearchResult, mfn, sr_rec, SEARCH_STRING, PDF_PAGES, S21STN)
{
   var wi = new WebIrbisQuery(this._cgiPATH);
   wi.appendParam("C21COM", "S");
   wi.appendParam("P21DBN", sr_rec.getIrbisField_First("DB_NAME"));
   wi.appendParam("I21DBN", sr_rec.getIrbisField_First("DB_NAME") + "_READER");
   
   wi.appendParam("Z21ID", sr_rec);
   wi.appendParam("S21STN", "1");
   wi.appendParam("S21CNR", "1");
   
   wi.appendParam("SEARCH_IN_FULL_TEXT", "1");
   wi.appendParam("S21COLORTERMS", "0");
   
   if (withSearchResult)
   {
      wi.appendParam("USES21ALL", "1");
   }
   else
   {
      wi.appendParam("USES21ALL", "0");
   }
   
   wi.appendParam("IMAGE_FILE_MFN", mfn);
   wi.appendParam("IMAGE_FILE_NAME", sr_rec);
   wi.appendParam("S21ALL", sr_rec);
   wi.appendParam("S21REF", sr_rec);
   
   if (withSearchResult)
   {
      wi.appendParam("S21ALLTRM", sr_rec);
      wi.appendParam("PDF_PAGES", PDF_PAGES === undefined ? sr_rec.getIrbisField_First("PDF_PAGES") : PDF_PAGES);
      wi.appendParam("SEARCH_STRING", encodeURIComponent(SEARCH_STRING === undefined ? sr_rec.getIrbisField_First("SEARCH_STRING") : SEARCH_STRING));
      if (goFirstSearchResult)
         wi.appendParam("S21STN", S21STN === undefined ? sr_rec.getIrbisField_First("S21STN") : S21STN);
   }
   return wi.createURL();
}

WebIrbisQuery.prototype.createQuery_openPageViewer_appendsome = function (url, SEARCH_STRING, PDF_PAGES, S21STN)
{
   var url_ = url + "&";
   
   url_ += "SEARCH_STRING" + "=" + encodeURIComponent(SEARCH_STRING) + "&";
   url_ += "PDF_PAGES" + "=" + encodeURIComponent(PDF_PAGES) + "&";
   url_ += "S21STN" + "=" + encodeURIComponent(S21STN) + "&";
   
   return url_;
}

WebIrbisQuery.prototype.appendParamsOfCommonContext = function (header_rec, preferredValues)
{
   this.appendParamEncodeURIComponent("C21COM", "S");
   this.appendParamEncodeURIComponent("FT_PARAMS", header_rec);
   this.appendParamEncodeURIComponent("P21DBN", this.getParam("DB_NAME", header_rec, preferredValues));
   
	this.appendParamEncodeURIComponent("Z21ID", header_rec, preferredValues);
   
   this.appendParamEncodeURIComponent("S21FMT", header_rec, preferredValues);
   
	this.appendParamEncodeURIComponent("USES21ALL", header_rec, preferredValues);
	this.appendParamEncodeURIComponent("S21ALL", header_rec, preferredValues);
   
   //this.appendParam("SEARCHIN", header_rec); // лишний параметр??
   //if (header_rec.getIrbisField_First("SEARCHIN") != "")
	this.appendParamEncodeURIComponent("FT_S21STR", header_rec, preferredValues);
   this.appendParamEncodeURIComponent("FT_S21LOG", "4");
   this.appendParamEncodeURIComponent("FT_S21P03", "K=");
   this.appendParamEncodeURIComponent("FT_S21P01", "3");
   this.appendParamEncodeURIComponent("COM_S21STR", header_rec);
   this.appendParam("SEARCH_STRING", header_rec, preferredValues);
   this.appendParamEncodeURIComponent("FT_NEAR_MFN", header_rec);
   this.appendParamEncodeURIComponent("FT_DISTANCE", header_rec);
   this.appendParamEncodeURIComponent("FT_NEARLEVEL", header_rec);
   this.appendParamEncodeURIComponent("FT_CONTEXT", header_rec);
   this.appendParamEncodeURIComponent("FT_REQUEST", "");
   this.appendParamEncodeURIComponent("FT_PREFIX", "K=");
   this.appendParamEncodeURIComponent("S21CNR", header_rec, preferredValues);
   this.appendParamEncodeURIComponent("S21REF", header_rec);
   this.appendParamEncodeURIComponent("S21SRD", header_rec, preferredValues);
   this.appendParamEncodeURIComponent("S21SRW", header_rec, preferredValues);
   this.appendParamEncodeURIComponent("S21SCAN", header_rec);
   
   // отметить (или нет) цветом слова в HTML (используется для выделения слов на странице результатов поиска)
	this.appendParamEncodeURIComponent("S21COLORTERMS", header_rec, preferredValues);
}

WebIrbisQuery.prototype.appendParamsOfPageContext = function (header_rec, queryProfile, page)
{
   this.appendParamsOfCommonContext(
		header_rec,
		{
			"S21COLORTERMS" : "0",
			"end-of-object" : null
		});
   
   this.appendParam("SEARCH_IN_FULL_TEXT", "1");
   // термины для подчёркивания на изображении страницы
   this.appendParam("S21AllTRM", header_rec);
   this.appendParam("IMAGE_FILE_MFN", header_rec);
   this.appendParam("IMAGE_FILE_NAME", header_rec);
   this.appendParam("PDF_PAGES", header_rec);
   
   this.appendParam("I21DBN", queryProfile);
   
   this.appendParam("S21STN", page);
}

WebIrbisQuery.prototype.createQuery_viewPage = function (header_rec, page)
{
   var wi = new WebIrbisQuery(this._cgiPATH);
   
   wi.appendParamsOfPageContext(header_rec, header_rec.getIrbisField_First("DB_NAME") + "_READER", page);
   
   return wi.createURL();
}

WebIrbisQuery.prototype.createQuery_downloadPage = function (header_rec, page)
{
   var wi = new WebIrbisQuery(this._cgiPATH);
   
   wi.appendParam("C21COM", "2");
   wi.appendParam("I21DBN", header_rec.getIrbisField_First("DB_NAME"));
   wi.appendParam("P21DBN", header_rec.getIrbisField_First("DB_NAME"));
   wi.appendParam("Z21ID", header_rec);
   
   wi.appendParam("IMAGE_FILE_NAME", header_rec);
   wi.appendParam("IMAGE_FILE_MFN", header_rec);
   
   wi.appendParam("IMAGE_FILE_PAGE", page);
   
   wi.appendParam("IMAGE_FILE_DOWNLOAD", "1");
   
   return wi.createURL();
}

WebIrbisQuery.prototype.createQuery_pageAccess = function (header_rec, page)
{
   var wi = new WebIrbisQuery(this._cgiPATH);
   
   wi.appendParamsOfPageContext(header_rec, header_rec.getIrbisField_First("DB_NAME") + "_PAGE_ACCESS", page);
   
   wi.blockCache();

   return wi.createURL();
}

WebIrbisQuery.prototype.createQuery_pageImage = function (header_rec, page)
{
   var wi = new WebIrbisQuery(this._cgiPATH);
   
   wi.appendParam("C21COM", "7");
   wi.appendParam("I21DBN", header_rec.getIrbisField_First("DB_NAME") + "_READER");
   wi.appendParam("P21DBN", header_rec.getIrbisField_First("DB_NAME"));
   wi.appendParam("IMAGE_FILE_NAME", header_rec);
   wi.appendParam("IMAGE_FILE_MFN", header_rec);
   wi.appendParam("Z21ID", header_rec);
   wi.appendParam("FILE_PAGE", page);
   wi.appendParam("S21AllTRM", header_rec.getIrbisField_First("SEARCH_STRING"));
	
	if (!webIrbisSettings["page_image_cache_allow"])
		wi.blockCache();
   
   return wi.createURL();
}

WebIrbisQuery.prototype.createQuery_printSearchResult = function (header_rec, i21dbn_suffix, s21fmt, selection_type, sorting_type, checked_controls, max_count)
{
   var wi = new WebIrbisQuery(this._cgiPATH);
   
   wi.appendParamsOfCommonContext(
		header_rec,
		{
			"SEARCH_STRING" : (selection_type != 2 ? undefined : ""),
			"FT_S21STR" : (selection_type != 2 ? undefined : ""),
			"USES21ALL" : "0",
			"S21ALL" : (selection_type != 2 ? undefined : ""),
			"S21COLORTERMS" : "0",
			"S21CNR" : max_count, 
			"S21FMT" : s21fmt, 
			"S21SRW" : sorting_type, 
			"end-of-object" : null
		});
		
   //wi.appendParam("C21COM", "S");
   //wi.appendParam("S21CNR", "100");
   wi.appendParam("S21STN", "1");
   //wi.appendParam("S21COLORTERMS", "0");
   //wi.appendParam("P21DBN", header_rec.getIrbisField_First("DB_NAME"));
   wi.appendParam("I21DBN", header_rec.getIrbisField_First("DB_NAME") + i21dbn_suffix);
   wi.appendParam("CHECKINDEX", checked_controls);
   //wi.appendParam("Z21ID", header_rec);
   /*if (selection_type != 2)
   {
      wi.appendParam("S21ALL", header_rec);
      wi.appendParam("FT_REQUEST", header_rec.getIrbisField_First("3335"));
      wi.appendParam("FT_PREFIX", header_rec.getIrbisField_First("3337"));
   }*/
   //wi.appendParam("S21FMT", s21fmt);
   wi.appendParam("SEL_TYPE", selection_type);
   //wi.appendParam("S21SRW", sorting_type);
   
   wi.blockCache();

   return wi.createURL();
}

WebIrbisQuery.prototype.createQuery_openKO = function (header_rec)
{
   var wi = new WebIrbisQuery(this._cgiPATH);
   
   wi.appendParam("C21COM", "F");
   wi.appendParam("P21DBN", header_rec.getIrbisField_First("DB_NAME"));
   wi.appendParam("I21DBN", header_rec.getIrbisField_First("DB_NAME") + "_KO");
   wi.appendParam("Z21ID", header_rec);
   wi.appendParam("KOTABL", "IBISLIST");
   
   wi.blockCache();

   return wi.createURL();
}

// поисковый запрос реализован через отправку поисковой формы - 
// onSearchFormSubmit() в search_ft.frm

WebIrbisQuery.prototype.appendParamsOfSearchResultsContext = function (header_rec, preferredValues, search_field_list, portionNumber, isExtendedSearchFieldsOn, isPersonalPanelOn, ignoreSearchFields)
{
	preferredValues["S21COLORTERMS"] = "1";
	
   this.appendParamsOfCommonContext(header_rec, preferredValues);
   
   this.appendParam("I21DBN", header_rec, preferredValues);
   
   this.appendParam("USE_TAGS_IN_SEARCH", header_rec);
   
   this.appendParam("FT_RESTRICT", (isExtendedSearchFieldsOn ? "1" : ""));
   
   this.appendParam("isPersonalPanelOn", (isPersonalPanelOn ? "1" : "0"));

	if (!ignoreSearchFields)
	{
		this.appendParam("variant_search_field_selector", encodeURIComponent(decodeURIComponent(decodeURIComponent(header_rec.getIrbisField_First("variant_search_field_selector")))));
		
		for (var i in search_field_list)
			if (search_field_list[i] !== undefined)
				search_field_list[i].appendParamsMainUIOnly(this);
		
		this.appendParam("CHECK21", header_rec);
		//if (header_rec.getIrbisField_First("CHECK21") == "on")
		//   this.appendParam("S21ALL", "<.>V=FT<.>");
		
		this.appendParamEncodeURIComponent("AVT", header_rec);
		
		this.appendParam("DAT_S21P06", header_rec);
		this.appendParam("DAT_S21P07", header_rec);
		//this.appendParam("DAT_S21P03", "G=");
		//this.appendParam("DAT_S21P02", "1");
		//this.appendParam("DAT_S21LOG", "5");
		
		this.appendParam("DP_S21P06", header_rec);
		this.appendParam("DP_S21P07", header_rec);
		//this.appendParam("DP_S21P03", "DP=");
		//this.appendParam("DP_S21P02", "1");
		//this.appendParam("DP_S21LOG", "5");
   }
	
   this.appendParam("CHECKINDEX", header_rec, preferredValues);

	if (portionNumber != "")
		this.appendParam("S21STN", portionNumber);
   
	this.appendParam("side_search_panel_info", header_rec, preferredValues);
}

WebIrbisQuery.prototype.getURL_viewPortion = function (header_rec, preferredValues, search_field_list, portionNumber, isExtendedSearchFieldsOn, isPersonalPanelOn, checked_controls, side_search_panel_info, login, ignoreSearchFields)
{
   var wi = new WebIrbisQuery(this._cgiPATH);
   
	preferredValues["I21DBN"] = this.getParam("DB_NAME", header_rec, preferredValues) + "_FULLTEXT";
	preferredValues["Z21ID"] = login;
	preferredValues["CHECKINDEX"] = checked_controls;
	preferredValues["side_search_panel_info"] = side_search_panel_info;
	
   wi.appendParamsOfSearchResultsContext(
      header_rec,
		preferredValues,
      search_field_list, 
      portionNumber, 
      isExtendedSearchFieldsOn, 
      isPersonalPanelOn,
		ignoreSearchFields);
   
   wi.blockCache();
   
   return wi.createURL();
}

WebIrbisQuery.prototype.getURL_search_service = function (header_rec, search_field_list, isExtendedSearchFieldsOn, isPersonalPanelOn, checked_controls)
{
   var wi = new WebIrbisQuery(this._cgiPATH);
   
   wi.appendParamsOfSearchResultsContext(
      header_rec, 
		{
			"I21DBN" : header_rec.getIrbisField_First("DB_NAME") + "_FULLTEXT_SIDE",
			"CHECKINDEX" : checked_controls,
			"side_search_panel_info" : null,
			"end-of-object": null
		},
      search_field_list, 
      1, 
      isExtendedSearchFieldsOn, 
      isPersonalPanelOn,
		false);
   
   wi.blockCache();
   
   return wi.createURL();
}

