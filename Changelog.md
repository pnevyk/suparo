0.1.1
=====
Overview
--------
New function called "summarize" has been added for checking summary of test. Architecture of Suparo has been changed little bit.

Public API
----------
* summarize([context])
* given(title, body)
* when(title, body)
* then(title, body)
* equality(params)
* inEquality(params)
* leftGreater(params)
* leftLower(params)
* propertyOfFirst(params)
* valueOwnedByFirst(params)
* equalityOneOfThese(params)
* inEqualityOneOfThese(params)

Bug fixes
---------
* Test functions which use OR logic now work properly.

0.1.0
=====
Overview
--------
First version of Suparo. Basic functions have been added.

Public API
----------
* given(title, body)
* when(title, body)
* then(title, body)
* equality(params)
* inEquality(params)
* leftGreater(params)
* leftLower(params)
* propertyOfFirst(params)
* valueOwnedByFirst(params)
* equalityOneOfThese(params)
* inEqualityOneOfThese(params)