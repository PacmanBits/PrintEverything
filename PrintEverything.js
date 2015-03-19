/*
////////////////////////////////////////////////////////////////
//                                                            //
//    PrintEverything             Sanford Robinson Gifford    //
//                                                            //
//       https://github.com/PacmanBits/PrintEverything        //
//                                                            //
////////////////////////////////////////////////////////////////

Small Javascript function to help quickly transform any native object into
a human-readable string.

To use simply call function printThisThing with the desired object in the
first argument. Additionally, an options object can be passed in the second
argument; this object may contain the following values:
 - indentLevel (int, default 0): The number of indents to set each line of
   the print out in by at the lowest level.
 - singleLine (bool, default false): If true, the entire object will be
   printed to a single line without indents.
 - matchPropertyLengths (bool, default true): If true, will find longest
   property name in object and insert enough spaces after every other
   property name to match the column for every colon (separating key and
   value) in the object.
 - singleIndent (string, default "\t"): The character (or characters) to
   use for a single indent.


    Copyright (C) 2015 Sanford Robinson Gifford

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License along
    with this program; if not, write to the Free Software Foundation, Inc.,
    51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
*/

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
