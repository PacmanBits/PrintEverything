# PrintEverything
Small Javascript function to help quickly transform any native object into a human-readable string.

To use simply call function `printThisThing` with the desired object in the first argument.  Additionally, an *options* object can be passed in the second argument; this object may contain the following values:

 - `indentLevel` (*int*, default **0**): The number of indents to set each line of the print out in by at the lowest level.
 - `singleLine` (*bool*, default **false**): If **true**, the entire object will be printed to a single line without indents.
 - `matchPropertyLengths` (*bool*, default **true**): If **true**, will find longest property name in object and insert enough spaces after every other property name to match the column for every colon (separating key and value) in the object.
 - `singleIndent` (*string*, default **"\t"**): The character (or characters) to use for a single indent.
