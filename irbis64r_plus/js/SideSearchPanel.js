function SideSearchPanel(ui_sideSearchPanelHeader, ui_sideSearchPanel, sideSourceLst, allDoneCallback)
{
   this._ui_sideSearchPanelHeader = ui_sideSearchPanelHeader;
   this._ui_sideSearchPanel = ui_sideSearchPanel;
   
   this._sideSourceLst = sideSourceLst;
   
   this._allDoneCallback = allDoneCallback;
   
   this._doneSideSourceCount = 0;
   
   for (var i in this._sideSourceLst)
      if (this._sideSourceLst[i].info === undefined)
         this.loadSideSource(this._sideSourceLst[i]);
}

SideSearchPanel.prototype.allDoneCallbackExecution = function ()
{
   this._doneSideSourceCount++;
   
   if (this._doneSideSourceCount == this._sideSourceLst.length)
      this._allDoneCallback();
}

SideSearchPanel.prototype.loadSideSource = function (source)
{
   var sideSearchPanel = this;
   
   var onLoadSourceInfo = function(data)
      {
         source.info = data;
         
         sideSearchPanel.show();
         
         sideSearchPanel.allDoneCallbackExecution();
      };
   
   $.ajax({
      url: source.url_service,
      dataType: "jsonp",
      jsonp: false,
      jsonpCallback: "callbackLoadSourceInfo",
      success: onLoadSourceInfo,
      error: function (XMLHttpRequest, textStatus, errorThrown)
         {
            sideSearchPanel.allDoneCallbackExecution();
            
            alert("Error load side source info.\n" + textStatus);
         }});
}

SideSearchPanel.prototype.show = function ()
{
   this._ui_sideSearchPanel.html("");
   
   var sourceCount = 0;
   for (var i in this._sideSourceLst)
      if (this._sideSourceLst[i].info !== undefined)
         if (this._sideSourceLst[i].info.count > 0)
         {
            sourceCount++;
            
            var text = this._sideSourceLst[i].name + " (" + this._sideSourceLst[i].info.count + " документов)";
            
            $("<div>")
               .append(
                  $("<a>",
                  {
                     text: text,
                     href: this._sideSourceLst[i].url_GUI
                  }))
               .append("; ")
               .appendTo(this._ui_sideSearchPanel);
         }
   
   this._ui_sideSearchPanelHeader.css("display", sourceCount > 0 ? "block" : "none");
}

SideSearchPanel.prototype.serializeCountLst = function ()
{
   var countLst = "";
   for (var i in this._sideSourceLst)
      if (this._sideSourceLst[i].info !== undefined)
         countLst += this._sideSourceLst[i].info.count + ";";
   return countLst;
}