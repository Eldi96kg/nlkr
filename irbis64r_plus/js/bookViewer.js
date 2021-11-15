function BookViewer(ui_container, ui_outlines, ui_img, pageCount)
{
   this._pageViewer = new PageViewer(ui_container, ui_img);
   this.pageViewer = this._pageViewer;
   this._pageCount = parseInt(pageCount, 10);
   
   this.isUserCommandExecuting = false;
   this.url_add_bookmark = "";
   this.url_del_bookmark = "";
   
   this.currentVisitController = new VisitController();
   
	this._visitedPageStack = [];
	
   this._canNotDownloadMessage = "";
   
   var bookViewer = this;
   var ui_bookViewer_state = $("#ctrl_bookViewer_state");
   this._onUserCommandStart = function()
   {
      bookViewer.isUserCommandExecuting = true;
      
      ui_bookViewer_state.html("loading...");
      $("#ctrl_userCard_browserWindow").css("cursor", "progress");
   };
   this._onUserCommandComplete = function()
   {
      bookViewer.isUserCommandExecuting = false;
      
      ui_bookViewer_state.html("");
      $("#ctrl_userCard_browserWindow").css("cursor", "default");
   };
   
   this._outlineViewer = new OutlineViewer(bookViewer, ui_outlines);
}

BookViewer.prototype.showCurrentPage = function ()
{
	if (this.isUserCommandExecuting) return;
   
   var bookViewer = this;
   var currentPage = this._currentPage;
   var onUserCommandComplete = this._onUserCommandComplete;
   
   var ui_bookViewer_pageNumber = $("#ctrl_bookViewer_pageNumber");
   
   var onUpdatePageControlPanelComplete =
      function()
      {
         ui_bookViewer_pageNumber.val(currentPage);
         
         onUserCommandComplete();
      };
   
   var updatePageControlPanel = 
      function (pageContext)
      {
         bookViewer.updatePageControlPanel(pageContext);
			
			bookViewer.showLinks(pageContext);
         
         setTimeout(onUpdatePageControlPanelComplete, 0);
      };
   
   this._onUserCommandStart();
   
   this.currentVisitController.visitPage(currentPage);
   
   this._pageViewer.showPageImage(currentPage, updatePageControlPanel);
	
	setTimeout(
		function () 
		{
			var viewer_left_panel_height = $("#ctrl_userCard_browserWindow").height() - $("#book_viewer_control_panel_main").height() - 20;
			var viewer_right_panel_height = viewer_left_panel_height - $("#book_viewer_control_panel_page").height();
			$("#photo_container_left").height(viewer_left_panel_height);
			$("#photo_container_right_outer").height(viewer_right_panel_height);
		});
}

BookViewer.prototype.showLinks = function (pageContext)
{
	var clearHyperlinks =
		function ()
		{
			$("#ctrl_hyperlinks").html("");
		};
	
	clearHyperlinks();
		
	if (pageContext.links.length == 0)
		return;
	
	var bookViewer = this;
	
	ui_link_lst = [];
	link_lst = [];
	for (var n in pageContext.links[0])
	{
		var link = pageContext.links[0][n];
		
		var ui_link = $("<div/>");
		
		var show_frame_maker = 
			function (ui_link)
			{
				return function () {
						ui_link.css("border", "3px solid blue");
					}
			};
		var show_frame = show_frame_maker(ui_link);
		
		var hide_frame_maker = 
			function (ui_link)
			{
				return function () {
						ui_link.css("border", "none");
					}
			};
		var hide_frame = hide_frame_maker(ui_link);
		
		var open_url_maker = 
			function (url)
			{
				return function () {
						window.open(url);
					}
			};
			
		var open_page_maker = 
			function (page)
			{
				return function () {
						clearHyperlinks();
		
						bookViewer.openPageLink(page);
					}
			};
		
		var open_link =
			link.type == "0"
			?
			open_page_maker(link.par1)
			:
			open_url_maker(link.par1);
		
		ui_link
			.css("position", "absolute")
			.css("cursor", "pointer")
			.css("border-radius", "10px")
			.click(open_link)
			.on("mouseover", show_frame)
			.on("mouseout", hide_frame)
			.css("z-index", "3")
			.attr("title", link.type == "0" ? "Перейти к странице " + link.par1 : link.par1)
			.appendTo($("#ctrl_hyperlinks"));
			
		ui_link_lst[ui_link_lst.length] = ui_link;
		link_lst[link_lst.length] = link;
	}
	
	this._pageViewer.setLinks(ui_link_lst, link_lst);
	this._pageViewer.scaleLinks();
}

BookViewer.prototype.openPageLink = function (textPageNumber)
{
	this.showPage(textPageNumber);
}

BookViewer.prototype.openOriginPage = function ()
{
	var bookViewer = this;
	var originPage = this._visitedPageStack.pop();
	
	setTimeout(
		function () { bookViewer._showPage(originPage, true); },
		0);
}

BookViewer.prototype.updatePageControlPanel = function (pageContext)
{
   if (pageContext.url_add_bookmark_error != null)
   {
      alert(pageContext.url_add_bookmark_error);
      return;
   }
   
   this.url_add_bookmark = pageContext.url_add_bookmark;
   this.url_del_bookmark = pageContext.url_del_bookmark;
   url_set_rating = pageContext.url_set_rating;
   
   updated_value_count = parseInt(pageContext.ratingValueCount, 10);
   if (updated_value_count > 0)
      updated_average_rating = parseInt(pageContext.sumRating, 10) / updated_value_count;
   
   updated_digital_give_out_count = parseInt(pageContext.digitalGiveOutCount, 10);
   updated_give_out_count = parseInt(pageContext.giveOutCount, 10);
   
   var msg_title_rest = "";
   var msg_title_first = "Первая страница ";
   var msg_title_previous = "Предыдущая страница ";
   var msg_title_next = "Следующая страница ";
   var msg_title_last = "Последняя страница ";
   if ((pageContext.accessCode == "1") && (pageContext.unlimited != "true"))
   {
      this.currentVisitController.activate(pageContext.maxCount);
      msg_title_rest = "(для просмотра доступно ещё " + this.currentVisitController.rest() + " страниц)"
   }
   msg_title_first += msg_title_rest;
   msg_title_previous += msg_title_rest;
   msg_title_next += msg_title_rest;
   msg_title_last += msg_title_rest;
   $("#ctrl_firstPage").attr("title", msg_title_first);
   $("#ctrl_previousPage").attr("title", msg_title_previous);
   $("#ctrl_nextPage").attr("title", msg_title_next);
   $("#ctrl_lastPage").attr("title", msg_title_last);

   var opacityNone = 0;
   var opacityHalf = 0.1;
   var opacityFull = 0.5;
   var setLeftBigOpacity = function (value)
      {
         $("#ctrl_left_big_img").css("opacity", value);
      };
   var setRightBigOpacity = function (value)
      {
         $("#ctrl_right_big_img").css("opacity", value);
      };
   var bookViewer = this;
   setLeftBigOpacity(opacityNone);
   setRightBigOpacity(opacityNone);
   $("#ctrl_left_big_img").css("cursor", "default");
   $("#ctrl_left_big").off("click");
   $("#ctrl_left_big").off("mouseover");
   $("#ctrl_left_big").off("mouseout");
   if (this._currentPage > 1)
   {
      $("#ctrl_left_big_img").css("cursor", "pointer");
      $("#ctrl_left_big").on(
         "click",
         function () { bookViewer.showPrevPage(); }
         );
      $("#ctrl_left_big").on(
         "mouseover",
         function () { setLeftBigOpacity(opacityFull); }
         );
      $("#ctrl_left_big").on(
         "mouseout",
         function () { setLeftBigOpacity(opacityHalf); }
         );
   }
   $("#ctrl_right_big_img").css("cursor", "default");
   $("#ctrl_right_big")
		.off("click")
		.off("mouseover")
		.off("mouseout");
   if (this._currentPage < this._pageCount)
   {
      $("#ctrl_right_big_img").css("cursor", "pointer");
      $("#ctrl_right_big")
			.on(
				"click",
				function () { bookViewer.showNextPage(); }
				)
			.on(
				"mouseover",
				function () { setRightBigOpacity(opacityFull); }
				)
			.on(
				"mouseout",
				function () { setRightBigOpacity(opacityHalf); }
				);
   }
	
   var setBackOpacity = function (value)
      {
         $("#ctrl_left_back_img").css("opacity", value);
      };
	setBackOpacity(opacityHalf);
	if (this._visitedPageStack.length == 0)
	{
		$("#ctrl_left_back")
			.css("display", "none");
			
		$("#ctrl_back")
			.css("display", "none");
	}
	else
	{
		var title = "Обратный переход к странице " + this._visitedPageStack[this._visitedPageStack.length - 1];
		
		$("#ctrl_left_back_img").css("cursor", "pointer");
		$("#ctrl_left_back")
			.css("display", "block")
			.attr("title", title)
			.off("click")
			.on(
				"click",
				function () { bookViewer.openOriginPage(); }
				)
			.on(
				"mouseover",
				function () { setBackOpacity(opacityFull); }
				)
			.on(
				"mouseout",
				function () { setBackOpacity(opacityHalf); }
				);
				
		$("#ctrl_back")
			.css("display", "block")
			.attr("title", title)
			.off("click")
			.on(
				"click",
				function () { bookViewer.openOriginPage(); }
				);
	}
   
   this._canNotDownloadMessage = "";
   if (pageContext.accessCode == "2")
   {
      var msg_title_download_link = "";
      if (pageContext.unlimited != "true")
      {
         var maxCount = parseInt(pageContext.maxCount, 10);
         var wasDownloadCount = parseInt(pageContext.wasDownloadCount, 10);
         if (maxCount > wasDownloadCount)
            msg_title_download_link = "Скачано " + wasDownloadCount + " страниц из " + maxCount + " доступных.";
         else
         {
            msg_title_download_link = "Скачивание недоступно. Исчерпано ограничение на количество скачанных страниц, уже скачано " + maxCount + " страниц.";
            this._canNotDownloadMessage = msg_title_download_link;
         }
      }
      else
         msg_title_download_link = "Скачать страницу";
      
      $("#ctrl_downloadPage").attr("title", msg_title_download_link);
      $("#ctrl_downloadPage").css("cursor", this._canNotDownloadMessage == "" ? "pointer" : "default");
   }
   else
   {
      this._canNotDownloadMessage = "Скачивание недоступно";
   }
   
   this.isPageAtBookmark = false;
   if (pageContext.bookmark_list != "")
   {
      var bookmark_list = pageContext.bookmark_list.split(",");
      for (n in bookmark_list)
      {
         if (this._currentPage == bookmark_list[n])
            this.isPageAtBookmark = true;
      }
   }
   
   $("#ctrl_bookViewer_bookmarkButton")
      .attr("title", this.isPageAtBookmark ? "Удалить закладку" : "Добавить закладку")
      .attr("src", this.isPageAtBookmark ? HTTP_PATH + "/images/bookmark-f-.png" : HTTP_PATH + "/images/bookmark-f+.png");
   
   var isPageAtBookmark = this.isPageAtBookmark;
   var bookmark_count = parseInt(pageContext.bookmark_count, 10);
   var max_bookmark_count = parseInt(pageContext.max_bookmark_count, 10);
   
   this.max_bookmark_count = max_bookmark_count;
   
   this.canAddBookmark = 
      function ()
      {
         if (bookmark_count < max_bookmark_count)
            return true;
         
         return false;
      };

   var noPageOption = $("#ctrl_bookViewer_sr [value='']");
   var currentPageOption = $("#ctrl_bookViewer_sr [value='" + this._currentPage + "']");
   if (currentPageOption.length > 0)
   {
      currentPageOption.prop("selected", true);
      if (noPageOption.length > 0)
         noPageOption.remove();
   }
   else
   {
      if (noPageOption.length == 0)
         $("#ctrl_bookViewer_sr").prepend($("<option value=''> </option>"));
      $("#ctrl_bookViewer_sr :first").prop("selected", true);
   }
   
	var pageViewer = this._pageViewer;
	var afterRefreshOutlinesVisibility_action = 
		function ()
		{
			pageViewer.initializeScale();
		};
	this._outlineViewer.setOutlines(new Outlines(pageContext.outlines, pageContext.bookmark_comments_list, this._outlineViewer.getSettings(), this._currentPage));
	this._outlineViewer.set_afterRefreshOutlinesVisibility_action(afterRefreshOutlinesVisibility_action);
	this._outlineViewer.show();
   
   this.fld903 = pageContext.fld903;
}

BookViewer.prototype.showPage = function (textPageNumber)
{
   if (this.isUserCommandExecuting) return;
   
   var pageNumber = this.user_case_validatePageNumber(textPageNumber);
   
   if (isNaN(pageNumber))
   {
      this.showValidatorMessage();
      return;
   }
   
   this._showPage(pageNumber, false);
}

BookViewer.prototype._showPage = function (pageNumber, isComeBack)
{
   if (this.isUserCommandExecuting) return;
   
   if (!this.user_case_isValidDiapason(pageNumber)) return;
   
   if (!this.currentVisitController.isAvaliablePage(pageNumber))
   {
      alert("Просмотр недоступен. Исчерпано ограничение на количество просмотренных страниц, уже просмотрено " + this.currentVisitController.visitedPageCount() + " страниц.");
      return;
   }
   
	if (!isComeBack)
		if (this._currentPage !== undefined)
			this._visitedPageStack.push(this._currentPage);
	
   this._currentPage = pageNumber;
   
   this.showCurrentPage();
}

BookViewer.prototype.user_case_validatePageNumber = function (textPageNumber)
{
   textPageNumber = textPageNumber.trim();
   if (textPageNumber == "") return NaN;
   var pageNumber = parseInt(textPageNumber, 10);
   if (isNaN(pageNumber))
      showValidatorMessage();
   return pageNumber;
}

BookViewer.prototype.user_case_isValidDiapason = function (pageNumber)
{
   if ((pageNumber < 1) || (pageNumber > this._pageCount))
   {
      this.showValidatorMessage();
      return false;
   }
   return true;
}

BookViewer.prototype.showValidatorMessage = function ()
{
   alert("Укажите номер страницы от 1 до " + this._pageCount);
}

BookViewer.prototype.showFirstPage = function ()
{
   this._showPage(1);
}

BookViewer.prototype.showLastPage = function ()
{
   this._showPage(this._pageCount);
}

BookViewer.prototype.showNextPage = function ()
{
   this._showPage(this._currentPage + 1);
}

BookViewer.prototype.showPrevPage = function ()
{
   this._showPage(this._currentPage - 1);
}

BookViewer.prototype.downloadCurrentPage = function ()
{
   if (this.isUserCommandExecuting) return;
   
   if (this._canNotDownloadMessage != "")
   {
      alert(this._canNotDownloadMessage);
      return;
   }
   
   this._canNotDownloadMessage = "Вы уже скачали данную страницу.";
   $("#ctrl_downloadPage").attr("title", this._canNotDownloadMessage);
   $("#ctrl_downloadPage").css("cursor", "default");
   
   window.open(new WebIrbisQuery(CGI_PATH).createQuery_downloadPage(header_reader_rec, this._currentPage));
}

BookViewer.prototype.bookmarkCurrentPage = function (note)
{
   var url = this.isPageAtBookmark ? this.url_del_bookmark : this.url_add_bookmark;
   
   if (url == "") return;
   
   if (!this.isPageAtBookmark)
      url = url + "&1_R21SUB1_2=A&1_R21VOL1_2=" + encodeURIComponent(note);
   
   if (this.isUserCommandExecuting) return;
   
   this.isUserCommandExecuting = true;
   
   var bookViewer = this;
   
   $.get(url,
      function (data)
      {
         bookViewer.isUserCommandExecuting = false;
         bookViewer.showCurrentPage();
      });
}
