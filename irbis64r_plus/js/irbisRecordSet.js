function IrbisRecordSet()
{
   this._records = new Object();
}

IrbisRecordSet.prototype.applyEachRecord = function (method)
{
   for (var mfn in this._records)
      method(mfn, this._records[mfn]);
}

IrbisRecordSet.prototype.addRecord = function (recordObject)
{
   var mfn = recordObject.MFN;
   var rec = new IrbisRecord();
   rec.readIrbisRecord(recordObject);
   this._records[mfn] = rec;
}

IrbisRecordSet.prototype.getIrbisRecord = function (mfn)
{
   return this._records[mfn];
}

function IrbisRecord()
{
   this._fields = new Object();
}

IrbisRecord.prototype.readIrbisRecord = function (recordObject)
{
   
   for (var fldName in recordObject)
   {
      if (fldName == "MFN") continue;
      var fldVals = new Array();
      var fldEncodedVals = recordObject[fldName].split("|");
      for (var ii = 0; ii < fldEncodedVals.length - 1; ii++)
         fldVals[fldVals.length] = fldEncodedVals[ii];
      this._fields[fldName] = fldVals;
   }
}

IrbisRecord.prototype.getIrbisField_Array = function (irbisFieldName, maxFieldCount)
{
   var fldNames = irbisFieldName.split("^");
   var fldName = fldNames[0];
   var subFldName = "";
   if (fldNames.length > 1)
      subFldName = fldNames[1].toUpperCase();
   var originFldVals = this._fields[fldName];
   var fldVals = new Array();
   var fldVal = "";
   if (originFldVals !== undefined)
   {
      var n = originFldVals.length;
      if (maxFieldCount != undefined)
         if (n > maxFieldCount)
            n = maxFieldCount;
      for (var ii = 0; ii < n; ii++)
      {
         fldVal = originFldVals[ii];

         if ((subFldName != "") && (fldVal != ""))
         {
            var subFldVals = fldVal.split("^");
            var subFldVal = "";
            for (var i = 1; i < subFldVals.length; i++)
               if (subFldVals[i].length > 0)
                  if (subFldVals[i].charAt(0).toUpperCase() == subFldName)
                  {
                     subFldVal = subFldVals[i].substring(1);
                     break;
                  }
            fldVals[fldVals.length] = subFldVal;
         }
         else
         {
            fldVals[fldVals.length] = fldVal;
         }
      }
  }
  return fldVals;
}

IrbisRecord.prototype.getIrbisField_First = function (irbisFieldName)
{
  var fldVals = this.getIrbisField_Array(irbisFieldName, 1);
  if (fldVals.length > 0)
    return fldVals[0];
  else
    return "";
}