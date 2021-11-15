function ActionSet()
{
   this._actions = new Array();
}

ActionSet.prototype.addAction = function (action)
{
   this._actions[this._actions.length] = action;
}

ActionSet.prototype.callActions = function ()
{
   for (var i in this._actions) this._actions[i]();
}