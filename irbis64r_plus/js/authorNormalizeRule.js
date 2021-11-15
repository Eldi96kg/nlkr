 /**
  * normalize_author
  * Функция нормализации данных об авторе с инициалами. Добавляет запятую после автора и пробелы между инициалами.
  * @param author_string  -- строка, содержащая формулировку данных об авторе
  * @return -- результат нормализации данных об авторе или исходная версия строки, если основания для нормализации не найдены.
  */	
var normalize_author = function(author_string){
	var re=new RegExp("(?:^([^,\. ]{2,})\\,? ([^,\. ])\\. ?(?:(\\-?[^,\. ])\\.)?)|(?:^([^,\. ])\\. ?(?:(\\-?[^,\. ])\\.)? ?([^,\. ]{2,}))");
	if (re.exec($.trim(author_string))){
			var last_initial=RegExp.$3+RegExp.$5;					
			return (RegExp.$1+RegExp.$6+", "+RegExp.$2+RegExp.$4+"."+(last_initial ? " "+last_initial+"." : ""));
		}		
	return "";
};

var is_normalizable_author_expression =
	function(author_string)
	{
		if (author_string == "")
			return true;
		
		return normalize_author(author_string) != "";
	};

var assert_author_normalization =
	function(expression, normalized_expression)
	{
		console.assert(normalize_author(expression) == normalized_expression, "Провалилась проверка нормализации с выражениями: " + expression + " -> " + normalize_author(expression) + ", когда должно быть " + normalized_expression);
	};

assert_author_normalization("иВанОв, И.а.", "иВанОв, И. а.");
assert_author_normalization("иванов, И.", "иванов, И.");

assert_author_normalization("иванов и.а.", "иванов, и. а.");
assert_author_normalization("иВанОв и.а.", "иВанОв, и. а.");
assert_author_normalization("д'артаньян и.и.", "д'артаньян, и. и.");
assert_author_normalization("мольер ж.-б.", "мольер, ж. -б.");

assert_author_normalization("и. иванов", "иванов, и.");
assert_author_normalization("и.а. иванов", "иванов, и. а.");
assert_author_normalization("и. а. иванов", "иванов, и. а.");

assert_author_normalization("Лёвин а. а.", "Лёвин, а. а.");
assert_author_normalization("абвгдеёжзийклмнопрстуфхцчшщьъыэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЪЫЭЮЯ а. а.", "абвгдеёжзийклмнопрстуфхцчшщьъыэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЪЫЭЮЯ, а. а.");

assert_author_normalization("Åström Y. Y.", "Åström, Y. Y.");
assert_author_normalization("ÜNAY Y. Y.", "ÜNAY, Y. Y.");

assert_author_normalization("иванов и.а. абракадабра-будет-отброшена", "иванов, и. а.");

assert_author_normalization("иванов иван иванович", "");
assert_author_normalization("ким чен ир", "");
assert_author_normalization("иванов, иван иванович", "");
assert_author_normalization("иванов. иван иванович", "");
assert_author_normalization("Иванов Сер.", "");
assert_author_normalization("Иванов Сер. Вл.", "");
assert_author_normalization("Сер. Вл. Иванов", "");
assert_author_normalization("Сер. Иванов", "");

	    /**
     * add_comma
     * Функция нормализации данных об авторе с инициалами. Добавляет запятую после автора и пробелы между инициалами.
     * @param author_string  -- строка, содержащая формулировку данных об авторе, введённую пользователем
     * @return -- результат нормализации данных об авторе или false, если типовые шаблоны не диагностированы 
     */	
	var normalize_author_multiple = function(author_string)
	{	
		var re=new RegExp("^([^\\(\\\\]+)");   
		if (!re.exec(author_string))
			return "";
		
		author_string=RegExp.$1;		
		author_string=$.trim(author_string);
		
		var re=new RegExp("(?:^([^,\. ]{2,})\\,? ([^,\. ])\\. ?(?:(\\-?[^,\. ])\\.)?)|(?:^([^,\. ])\\. ?(?:(\\-?[^,\. ])\\.)? ?([^,\. ]{2,}))");   
		
		var variants=[];
		
		variants[0]=author_string;			
		if (re.exec(author_string)){
			var last_initial=RegExp.$3+RegExp.$5;					
			variants[1]=(RegExp.$1+RegExp.$6+", "+RegExp.$2+RegExp.$4+"."+(last_initial ? " "+last_initial+"." : ""));			
		}else{
			var re=new RegExp("^([^,\. ]{2,})\\,? ([^,\. ]{2,}) ?(?:(\\-?[^,\. ]{2,}))?$");   		
			if (re.exec(author_string)){			
				// Фамилия Имя Отчетство
				variants[1]=RegExp.$1+", "+RegExp.$2.charAt(0)+"."+(RegExp.$3 ? " "+RegExp.$3.charAt(0)+"." : "");				
				if (RegExp.$3){
					// Обработка Имя Отчество Фамилия
					variants[2]=RegExp.$3+", "+RegExp.$1.charAt(0)+"."+(RegExp.$2 ? " "+RegExp.$2.charAt(0)+"." : "");					
					// Только добавление запятой
					variants[3]=RegExp.$3+", "+RegExp.$1+(RegExp.$2 ? " "+RegExp.$2 : "");
				}else{
					variants[2]=RegExp.$2+", "+RegExp.$1.charAt(0)+".";				
					variants[3]=RegExp.$2+", "+RegExp.$1;
					variants[4]=RegExp.$1+", "+RegExp.$2;
				}
			}
		}
		
		//variants=jQuery.unique(variants);		
		
		variants=unique(variants);
		if (variants.length>0){			
			return "(<.>A="+variants.join("$<.>+<.>A=")+"$<.>)";
		}
		

		
		return ""; 		
	}
	
	var unique=function(arr){
	  var i,
	      len=arr.length,
	      out=[],
	      obj={};
	
	  for (i=0;i<len;i++) {
	    obj[arr[i]]=0;
	  }
	  for (i in obj) {
	    out.push(i);
	  }
	  return out;	
	}
