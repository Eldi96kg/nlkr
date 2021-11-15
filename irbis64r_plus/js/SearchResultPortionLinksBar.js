function SearchResultPortionLinksBar(ui_container, portionSize, currentPortion_documentNumber, documentCount, fn_goPortion)
{
   this._maxLinkCount = 10;
   
   this._ui_container = ui_container;
   this._portionSize = portionSize;
   
   this._fn_goPortion = fn_goPortion;
   
   this._currentPortionNumber = Math.floor((currentPortion_documentNumber - 1) / this._portionSize);
   
   this._portionsCount = Math.floor((documentCount - 1) / this._portionSize) + 1;
   this._links_count = Math.min(this._portionsCount, this._maxLinkCount);
   this._links_shift = Math.floor(this._maxLinkCount / 2);
   this._links_start = this._currentPortionNumber - this._links_shift;
   if (this._links_start < 0)
      this._links_start = 0;
   if (this._links_start + this._links_count > this._portionsCount)
      this._links_start = this._portionsCount - this._links_count;
   
   this._links_end = this._links_start + this._links_count - 1;
   
   if (this._currentPortionNumber > 0)
   {
      this.addLink(this.getStartDocument(this._currentPortionNumber - 1), "Предыдущая", false);
      this.addSpace();
      this.addSpace();
      this.addSpace();
   }
   
   if (this._links_start > 0)
   {
      this.addLink(1, "1", false);
      this.addDots();
   }
      
   for (var n = this._links_start; n <= this._links_end; n++)
   {
      var linkNumber = n + 1;
      var isCurrentPortion = (n == this._currentPortionNumber);
      var portionStartDocument = this.getStartDocument(n);
      
      this.addLink(portionStartDocument, linkNumber, isCurrentPortion);
   }
         
   if (this._links_end < this._portionsCount - 1)
   {
      this.addDots();
      this.addLink(this.getStartDocument(this._portionsCount - 1), this._portionsCount, false);
   }
   
   if (this._currentPortionNumber < this._portionsCount - 1)
   {
      this.addSpace();
      this.addSpace();
      this.addSpace();
      this.addLink(this.getStartDocument(this._currentPortionNumber + 1), "Следующая", false);
   }
}

SearchResultPortionLinksBar.prototype.getStartDocument = function (portionNumber)
{
   return portionNumber * this._portionSize + 1;
}

SearchResultPortionLinksBar.prototype.addLink = function (portionStartDocument, label, isCurrentPortion)
{
   var fn_goPortion = this._fn_goPortion;
   var goPortion_click = function () { fn_goPortion(portionStartDocument); };
   
   var ui_portion = $("<span />")
      .addClass(isCurrentPortion ? "current-portion" : "portion")
      .text(label)
      .click(goPortion_click);
      
   this._ui_container.append(ui_portion);
   
   this.addSpace();
}

SearchResultPortionLinksBar.prototype.addSpace = function ()
{
   this._ui_container.append($("<span>&nbsp;&nbsp;&nbsp;</span>"));
}

SearchResultPortionLinksBar.prototype.addDots = function ()
{
   this._ui_container.append($("<span>...</span>"));
   this.addSpace();
}
