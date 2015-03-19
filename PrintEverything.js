function printThisThing(input, options)
{
	// Set Default options
	var defaults =
	{
		indentLevel          : 0,
		singleLine           : false,
		matchPropertyLengths : true,
		singleIndent         : "\t"
	}
	
	function extend(a, b)
	{
		if(typeof(a) != "object")
			a = {};
		
		var c = {}
		for (var p in b)
		{
			c[p] = (typeof (a[p]) == 'undefined' ? b[p] : a[p]);
		}
		return c;
	}
	
	options = extend(options, defaults);
	
	var singleIndent = options.singleIndent;
	var indent     = "";
	
	var lb = "\r\n";
	if(options.singleLine)
	{
		lb = "";
		// we only need to change singleIndent to "",
		// but by dropping options.indentLevel to 0 we
		// save some time on the loop below
		options.indentLevel = 0;
		singleIndent = "";
	}
	
	for(var i = 0; i < options.indentLevel; i++)
	{
		indent += singleIndent;
	}
	
	var ret = "";
	
	if(input === null)
	{
		ret = "[null]";
	}
	else
	{
		switch(typeof input)
		{
			case "undefined":
				ret = "[undefined]";
			break;
			case "object":
				options.indentLevel ++;
				
				if((typeof Object.prototype.toString == "function" ? Object.prototype.toString.call(input) : input.toString()) == "[object Array]")
				{
					ret = "[" + lb;
					for(var i = 0; i < input.length; i++)
					{
						ret += indent + singleIndent + printThisThing(input[i], options);
						
						if( i < input.length - 1)
						{
							ret += ", " + lb;
						}
					}
					ret += lb + indent + "]";
				}
				else
				{
					var namespaceLength = 0;
					if(options.matchPropertyLengths)
					{
						for(var e in input)
						{
							if(e.length > namespaceLength)
								namespaceLength = e.length;
						}
					}
					
					for(var e in input)
					{
						var namespacePadding = "";
						for(var s = 0; s < namespaceLength - e.length; s++)
							namespacePadding += " ";
						
						ret += indent + singleIndent + printThisThing(e, options) + namespacePadding + " : " + printThisThing(input[e], options) + ", " + lb;
					}
					
					if(ret == "")
					{
						ret = "[object]";
					}else{
						ret = "{" + lb + ret.slice(0, ret.lastIndexOf(",")) + lb + indent + "}";
					}
				}
			break;
			case "number":
				ret = input;
			break;
			case "string":
				ret = "\"" + input + "\"";
			break;
			case "boolean":
				ret = (input ? "true" : "false");
			break;
			case "function":
				ret = "[function]";
			break;
			default:
				ret = "[unknown type " + typeof input + "]";
			break;
		}
	}
	
	return ret;
}
