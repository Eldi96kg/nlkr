function SortingBar(ui_container, sortingList, s21srw, s21srd)
{
   this._ui_container = ui_container;
	
	code_arr = sortingList.getIrbisField_Array("code");
	name_arr = sortingList.getIrbisField_Array("name");
	for (var n in code_arr)
   {
		this.addSorting(code_arr[n], name_arr[n], s21srw, s21srd);
	}
}

SortingBar.prototype.addSorting = function (code, label, s21srw, s21srd)
{
   var on_click_sorting = 
		function (code, s21srw, s21srd) 
		{ 
			return function () 
				{ 
					new WebIrbisSystem(CGI_PATH).goPortionSorted(code, s21srd);
				}
		}(code, s21srw, s21srd);
   
   var on_click_invert_sorting = 
		function (code, s21srw, s21srd) 
		{ 
			return function () 
				{ 
					new WebIrbisSystem(CGI_PATH).goPortionSorted(code, s21srd);
				}
		}(code, s21srw, this.invertS21srd(s21srd));
   
   var ui_portion = $("<span />")
      .addClass(s21srw == code ? "current-sorting" : "sorting")
      .text(label);
	
	if (s21srw != code)
		ui_portion.click(on_click_sorting);
      
   this._ui_container.append(ui_portion);
   
	if (s21srw == code)
	{
		var ui_img = $("<img />")
			.attr("src", HTTP_PATH + (this.substDefaultS21srd(s21srd) == "UP" ? "/images/Descending.bmp" : "/images/Ascending.bmp"))
			.css("cursor", "pointer")
			.click(on_click_invert_sorting);
			
		this._ui_container.append(ui_img);
   }
	
   this.addSpace();
}

SortingBar.prototype.substDefaultS21srd = function (s21srd)
{
	return s21srd == "" ? "UP" : s21srd;
}

SortingBar.prototype.invertS21srd = function (s21srd)
{
	return this.substDefaultS21srd(s21srd) == "UP" ? "DOWN" : "UP";
}

SortingBar.prototype.addSpace = function ()
{
   this._ui_container.append($("<span>&nbsp;&nbsp;&nbsp;</span>"));
}
