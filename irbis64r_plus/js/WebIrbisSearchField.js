function WebIrbisSearchField(ui_parent, cgiParamsPrefix, value, type)
{
   this._ui_parent = ui_parent;
   this._cgiParamsPrefix = cgiParamsPrefix;
   
   this._params = new Object();

	var main_cgi_param_name = "main";
	
   this.addCgiParam(main_cgi_param_name, value, (type != null ? type : "text"));
   
   this._ui = $("#" + cgiParamsPrefix + main_cgi_param_name);
	
   this.addCgiParam("S21STR", value);
}

WebIrbisSearchField.prototype.addCgiParam = function (name, value, type)
{
   var fullName = this._cgiParamsPrefix + name;
   
   var ui;
   
   if (type == "select")
   {
      ui = $("<select/>");
   }
   else
   {
      ui = $("<input/>")
         .attr("type", (type != null ? type : "hidden"));
   }
   
   ui
      .attr("id", fullName)
      .attr("name", fullName)
      .attr("value", value);
         
   this._ui_parent.append(ui);
   
   this._params[name] = ui;
   
   return this;
}

WebIrbisSearchField.prototype.setCgiParam = function (name, value)
{
	this._params[name].val(value);
	
	return this;
}

WebIrbisSearchField.prototype.get_ui = function ()
{
   return this._ui;
}

WebIrbisSearchField.prototype.fillS21STR = function ()
{
   return this._params["S21STR"].val(this._ui.val());
}

WebIrbisSearchField.prototype.setAutoComplete = function (cgiPATH, Z21ID, P21DBN, S21P03, autoCompleteType)
{
	setAutoComplete(this._ui, cgiPATH, Z21ID, P21DBN, S21P03, autoCompleteType);
	
	return this;
}
       
WebIrbisSearchField.prototype.appendParams = function (webIrbis)
{
   for (var name in this._params)
	{
		var ui = this._params[name];
      webIrbis.appendParam(ui.attr('id'), encodeURIComponent(ui.val())); // encodeURIComponent для IE
	}
}

WebIrbisSearchField.prototype.appendParamsMainUIOnly = function (webIrbis)
{
	var ui = this._params["main"];
	var ui_S21STR = this._params["S21STR"];
	webIrbis.appendParam(ui.attr('id'), encodeURIComponent(ui_S21STR.val())); // encodeURIComponent для IE
}
