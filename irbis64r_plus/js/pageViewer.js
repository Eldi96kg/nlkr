function PageViewer(ui_container, ui_img)
{
   this._ui_container = ui_container;
   this._ui_img = ui_img;
   
   this._image = new Image();
	
	this._f_do_not_set_scale_userChangedValue = false;
}

PageViewer.prototype.showPageImage = function (pageNumber, updatePageControlParameters)
{
   var ui_img = this._ui_img;
   var pageViewer = this;
   var image = this._image;
   
   ui_img.attr("src", HTTP_PATH + "/images/loading2.gif");
	
	var pageViewer = this;
	
	var afterPageContextLoad =
		function (json_pageAccess)
		{
			var pageContext = JSON.parse(json_pageAccess);
			
			updatePageControlParameters(pageContext);
			
			//pageViewer.showLinks(pageContext);
		};

   var afterPageImageLoad =
      function ()
      {
         pageViewer.initializeScale();
         
         var url_pageAccess = new WebIrbisQuery(CGI_PATH).createQuery_pageAccess(header_reader_rec, pageNumber);
         $.ajax({
            url: url_pageAccess,
            success: afterPageContextLoad,
            error: function (XMLHttpRequest, textStatus, errorThrown) { alert("Error check access rights."); }
         });
      };
      
   var onload =
      function ()
      {
         ui_img.attr("src", image.src);
         
         afterPageImageLoad();
      };

   var onerror =
      function ()
      {
         ui_img.attr("src", HTTP_PATH + "/images/error.png");
         
         alert("Ошибка при загрузке страницы");
         
         afterPageImageLoad();
      };
      
   image.onload = onload;
   image.onerror = onerror;
   image.src = new WebIrbisQuery(CGI_PATH).createQuery_pageImage(header_reader_rec, pageNumber);
	
	$("#photo_container_right_outer").scrollTop(0);
}

// Инициализировать состояние элемента управления масштабом и текущий масштаб.
// Данная инициализация необходима:
// 1) после загрузки изображения
// 2) после включения/выключения показа панели Содержание
PageViewer.prototype.initializeScale = function ()
{
   var value;
   var defaultScaleValue;
   var maxValue;
   var image = this._image;
   
   this._ui_container.css("width", "100%");
   this._ui_container.css("height", "auto");
   this._ui_img.css("width", "100%");
   this._ui_img.css("height", "auto");
   
   if (this._ui_img.width() < image.width)
      maxValue = 100;
   else
      maxValue = (this._ui_img.width() / image.width) * 100;
   
   defaultScaleValue = (this._ui_img.width() / image.width) * maxValue;
   
   if (scale_userChangedValue == undefined)
      value = defaultScaleValue;
   else
      value = scale_userChangedValue;
   
   this._ui_container.width(this._ui_img.width());
   
   ui_scale.slider("option", "max", maxValue);
	this._f_do_not_set_scale_userChangedValue = true;
   ui_scale.slider("value", value);
	this._f_do_not_set_scale_userChangedValue = false;
}

PageViewer.prototype.setScale = function (scale)
{
	this._scale = scale;
	
   var image = this._image;
   
	if (!this._f_do_not_set_scale_userChangedValue)
		scale_userChangedValue = scale;
   
   this._ui_img.width(this.scaleValue(image.width));
   this._ui_img.height(this.scaleValue(image.height));
	
	this.scaleLinks();
}

PageViewer.prototype.scaleValue = function (value)
{
	return value * this._scale / 100;
}

PageViewer.prototype.setLinks = function (ui_link_lst, link_lst)
{
	this._ui_link_lst = ui_link_lst;
	this._link_lst = link_lst;
}

PageViewer.prototype.scaleLinks = function ()
{
	if (this._ui_link_lst !== undefined)
		for (var n in this._ui_link_lst)
		{
			this._ui_link_lst[n]
				.css("left", this.scaleValue(this._link_lst[n].left))
				.css("top", this.scaleValue(this._link_lst[n].top))
				.css("width", this.scaleValue(this._link_lst[n].width))
				.css("height", this.scaleValue(this._link_lst[n].height));
		}
}
