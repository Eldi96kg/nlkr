function Outlines(raw_outlines, raw_bookmarks, settings, currentPage)
{
	this._raw_outlines = raw_outlines;
	this._raw_bookmarks = raw_bookmarks;
	this._currentPage = currentPage;
	
	this.getOutlineLst(settings);	
}

Outlines.prototype.insertBookmark = function (outlineLst, bookmark)
{
	if (outlineLst.length == 0)
	{
		outlineLst[outlineLst.length] = bookmark;
		return;
	}
		
	var n_ins = -1;
	var n = -1;
	for (var n in outlineLst)
	{
		if (bookmark.page_as_int < outlineLst[n].page_as_int)
		{
			n_ins = n;
			break;
		}
	}
	if (n_ins == -1)
		n_ins = n + 1;
	outlineLst.splice(n_ins, 0, bookmark);
}

Outlines.prototype.haveOutlines = function ()
{
	return (this._raw_outlines.length > 0) || (this._raw_bookmarks.length > 1);
}

Outlines.prototype.getOutlineLst = function (settings)
{
	this._contentItemCount = 0;
	this._bookmarkItemCount = 0;
	
	var outlineLst = new Array();
	if (this._raw_outlines.length > 0)
	{
		var prev_iterated_head;
		var current_head;
		var have_found_current_head = false;
		var n;
		var outline;
		for (var n in this._raw_outlines[0])
		{
			outline = this.parseOutlinePage(this._raw_outlines[0][n]);
			
			if (!have_found_current_head)
				if (this._currentPage < outline.page_as_int)
				{
					have_found_current_head = true;
					current_head = prev_iterated_head;
				}
			prev_iterated_head = outline;
			
			if (settings.contents)
				outlineLst[outlineLst.length] = outline;
			this._contentItemCount++;
		}
		if (!have_found_current_head)
			current_head = outline;
		if (current_head !== undefined)
			current_head.is_current = true;
	}
   
	if (this._raw_bookmarks.length > 0)
	{
		for (var n in this._raw_bookmarks)
			if (typeof(this._raw_bookmarks[n]) == "object")
			{
				var outline = this.parseOutlinePage(this._raw_bookmarks[n]);
				outline.is_bookmark = true;
				if (this._currentPage == outline.page_as_int)
					outline.is_current = true;
				if (settings.bookmarks)
					this.insertBookmark(outlineLst, outline);
				this._bookmarkItemCount++;
			}
	}
	
   return outlineLst;
}

Outlines.prototype.getContentItemCount = function ()
{
	return this._contentItemCount;
}

Outlines.prototype.getBookmarkItemCount = function ()
{
	return this._bookmarkItemCount;
}

Outlines.prototype.parseOutlinePage = function (outline)
{
	outline.page_as_int = parseInt(outline.page, 10);
	
	return outline;
}