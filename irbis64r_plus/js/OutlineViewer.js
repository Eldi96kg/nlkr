function OutlineViewer(bookViewer, ui_outlines)
{
   this._bookViewer = bookViewer;
   this._ui_outlines = ui_outlines;
   
   this._outlines = null;
	
	this._settings =
		{
			contents : true,
			bookmarks : true
		};
	
	this._outlinesPanelState_on = true;
	
	bindGlobalOutlineViewer(this);
}

OutlineViewer.prototype.setOutlines = function (outlines)
{
   this._outlines = outlines;
}

OutlineViewer.prototype.getOutlines = function ()
{
   return this._outlines;
}

OutlineViewer.prototype.getSettings = function ()
{
   return this._settings;
}

OutlineViewer.prototype.show = function ()
{
   var bookViewer = this._bookViewer;
   var ui_outlines = this._ui_outlines;
   var outlineViewer = this;
	var settings = this._settings;
	
   ui_outlines.html("");
   
	var ui_outline_control_panel =
		$("<div/>")
			//.text("Указатель:")
			.css("background", "#f6a828")
			.css("color", "white");
			//.css("padding-left", 10);
   
	ui_outlines.append(ui_outline_control_panel);
   
	var ui_outline_control_panel_contents = 
		$("<input>")
			.attr("id", "ctrl_outline_control_panel_contents")
			.attr("name", "ctrl_outline_control_panel_contents")
			.attr("type", "checkbox")
			.prop("checked", settings.contents);
	var ui_outline_control_panel_contents_label = 
		$("<label>")
			.attr("id", "ctrl_outline_control_panel_contents_label")
			.attr("for", "ctrl_outline_control_panel_contents")
			.css("padding-right", "10px")
			.html("оглавление");
	if (this._outlines.getContentItemCount() == 0)
		ui_outline_control_panel_contents.attr("disabled", "")
	else
		ui_outline_control_panel_contents.removeAttr("disabled");
	
	var ui_outline_control_panel_bookmarks = 
		$("<input>")
			.attr("id", "ctrl_outline_control_panel_bookmarks")
			.attr("name", "ctrl_outline_control_panel_bookmarks")
			.attr("type", "checkbox")
			.prop("checked", settings.bookmarks);
	var ui_outline_control_panel_bookmarks_label = 
		$("<label>")
			.attr("id", "ctrl_outline_control_panel_bookmarks_label")
			.attr("for", "ctrl_outline_control_panel_bookmarks")
			.css("padding-right", "10px")
			.html("закладки");
	if (this._outlines.getBookmarkItemCount() == 0)
		ui_outline_control_panel_bookmarks.attr("disabled", "")
	else
		ui_outline_control_panel_bookmarks.removeAttr("disabled");
	
	var outlines = this._outlines;
	var set_hint_for_contents =
		function (checked)
		{
			var hint_for_contents =
				outlines.getContentItemCount() != 0
					?
					(checked ? "Скрыть" : "Показать") + " оглавление (" + outlines.getContentItemCount() + " разделов)"
					:
					"нет разделов оглавления";
			ui_outline_control_panel_contents.attr("title", hint_for_contents);
			ui_outline_control_panel_contents_label.attr("title", hint_for_contents);
		};
	var set_hint_for_bookmarks =
		function (checked)
		{
			var hint_for_bookmarks =
				outlines.getBookmarkItemCount() != 0
					?
					(checked ? "Скрыть" : "Показать") + " закладки (" + outlines.getBookmarkItemCount() + " шт.)"
					:
					"нет закладок";
			ui_outline_control_panel_bookmarks.attr("title", hint_for_bookmarks);
			ui_outline_control_panel_bookmarks_label.attr("title", hint_for_bookmarks);
		};
	set_hint_for_contents(settings.contents);
	set_hint_for_bookmarks(settings.bookmarks);
	
	var on_update_settings = 
		function()
		{
			setTimeout(
				function()
				{
					settings.contents = ui_outline_control_panel_contents.prop("checked");
					settings.bookmarks = ui_outline_control_panel_bookmarks.prop("checked");
					
					set_hint_for_contents(settings.contents);
					set_hint_for_bookmarks(settings.bookmarks);
					
					outlineViewer.show();
				}, 0);
		};
	ui_outline_control_panel_contents.click(on_update_settings);
	ui_outline_control_panel_bookmarks.click(on_update_settings);
	
	ui_outline_control_panel.append(ui_outline_control_panel_contents);
	ui_outline_control_panel.append(ui_outline_control_panel_contents_label);
   ui_outline_control_panel.append(ui_outline_control_panel_bookmarks);
	ui_outline_control_panel.append(ui_outline_control_panel_bookmarks_label);
   
	var table = $("<table width='100%' />");
   ui_outlines.append(table);
   var outlineLst = this._outlines.getOutlineLst(this._settings);
   
   for (var outlineId in outlineLst)
   {
      var background = outlineLst[outlineId].is_current ? "#d5eaf2" : "#EEEEEE"; // #F2F2F2 #e5faff 929292
      
      var tr =
         $("<tr/>");
      table.append(tr);
      var td_title = 
			$("<td/>")
				.css("background", background);
      var td_page =
         $("<td/>")
				.css("background", background);
      
      tr
         .append(td_title)
         .append(td_page);
      
      var page = outlineLst[outlineId].page.toString();
      
		var title = outlineLst[outlineId].title;
		if (title == "")
			title = "\xa0"; // обеспечивает наличие фона ячейки в случае закладки с пустым примечанием
			
		var outline_on_click = function (page) { return function () { bookViewer.showPage(page); } }(page);
      
      var ui_outline_title = $("<div/>")
         .click(outline_on_click)
         .attr("title", title)
         .text(title)
         .css("padding-left", parseInt(outlineLst[outlineId].level, 10) * 10)
         .css("cursor", "pointer");
		
		if (outlineLst[outlineId].is_bookmark)
			ui_outline_title.prepend($("<img>").attr("src", HTTP_PATH + "/images/bookmark-f-.png"));
      
      var ui_outline_page = $("<div/>")
         .click(outline_on_click)
         .attr("title", title)
         .text(page)
         .css("cursor", "pointer");
            
      td_title.append(ui_outline_title);
      td_page.append(ui_outline_page);
   }

   this.refreshOutlinesVisibility();
}

OutlineViewer.prototype.refreshOutlinesVisibility = function ()
{
	var outlinesPanelState_visible = this._outlinesPanelState_on && this._outlines.haveOutlines();
	
	$("#ctrl_outlines_toggle")
		.css("display", this._outlines.haveOutlines() ? "block" : "none")
		.attr("title", outlinesPanelState_visible ? "Закрыть панель оглавления и закладок" : "Открыть панель оглавления и закладок");
   
   $("#photo_container_left")
      .css("display", outlinesPanelState_visible ? "block" : "none");
   $("#td_photo_container_left")
      .css("width", outlinesPanelState_visible ? "40%" : "0%");
   
   if (this._afterRefreshOutlinesVisibility_action !== undefined)
		setTimeout(this._afterRefreshOutlinesVisibility_action, 0);
}

OutlineViewer.prototype.set_afterRefreshOutlinesVisibility_action = function (action)
{
	this._afterRefreshOutlinesVisibility_action = action;
}

OutlineViewer.prototype.toggleOutlinesPanelState = function ()
{
   this._outlinesPanelState_on = !this._outlinesPanelState_on;
   
   this.refreshOutlinesVisibility();
}
