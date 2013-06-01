/*
    Suparo.js
    v0.1.0
    
    MIT licensed
*/

(function (win, con) {
    var outputKey = '4cb7da5d59a9d888609ffe555fd3b725cfa9a66b',
        context = {};
        
    context[outputKey] = 'Wrong written test';
    
    var given = function (title, doSomething) {
        con.log('[' + title + ']:');
        
        if (typeof doSomething === "function") { doSomething(context); }
    };
    
    var when = function (title, doSomething) {  
        con.log('    * ' + title + ':');
        
        if (typeof doSomething === "function") { doSomething(context); }
        
        var then = function (title, doSomething) {
            allowTestMethods();
            
            if (typeof doSomething === "function") { doSomething(context); }
            
            con.log('    * ' + title);
            con.log('      > ' + boolToOutput(context[outputKey]));
            con.log('');
        };
        
        return { then : then };
    };
    
    var iterateAnd = function(params, func) {
        var state = true,
            p;
            
        if (params.length === 0) { return false; }
        
        for (p = 0; p < params.length - 1; p++) {
            state = state && func(params[p], params[p + 1], params[0]);
        }
        
        return state;
    };
    
    var iterateOr = function(params, func) {
        var state = false,
            p;
            
        if (params.length === 0) { return false; }
        
        for (p = 0; p < params.length - 1; p++) {
            state = state || func(params[p], params[p + 1], params[0]);
        }
        
        return state;
    };
    
    var allowTestMethods = function () {
        //public API
        context.nonEquality = nonEquality;
        context.equality = equality;
        context.leftGreater = leftGreater;
        context.leftLower = leftLower;
        context.propertyOfFirst = propertyOfFirst;
        context.equalityOneOfThese = equalityOneOfThese;
        context.nonEqualityOneOfThese = nonEqualityOneOfThese;
    };
    
    var boolToOutput = function (value) {
        return (value) ? 'Passed' : 'Failed';
    };
    
    var argsToArray = function (args) {
        if (args.length < 2) { return []; } //it can be compared only more than two arguements
        return Array.prototype.slice.call(args);
    };
    
    var equality = function () {        
        this[outputKey] = iterateAnd(argsToArray(arguments), function (param1, param2) {
            return param1 === param2;
        });
    };
    
    var nonEquality = function () {        
        this[outputKey] = iterateAnd(argsToArray(arguments), function (param1, param2) {
            return param1 !== param2;
        });
    };
    
    var leftGreater = function () {        
        this[outputKey] = iterateAnd(argsToArray(arguments), function (param1, param2) {
            return param1 > param2;
        });
    };
    
    var leftLower = function () {        
        this[outputKey] = iterateAnd(argsToArray(arguments), function (param1, param2) {
            return param1 < param2;
        });
    };
    
    var propertyOfFirst = function () {        
        this[outputKey] = iterateAnd(argsToArray(arguments), function (param1, param2, firstParam) {
            return firstParam.hasOwnProperty(param2);
        });
    };
    
    var valueOwnedByFirst = function () {        
        this[outputKey] = iterateAnd(argsToArray(arguments), function (param1, param2, firstParam) {
            return iterateOr([firstParam, param2], function (param1, param2, firstParam) {
                //return firstParam
            });
        });
    };
    
    var equalityOneOfThese = function () {
        this[outputKey] = iterateOr(argsToArray(arguments), function (param1, param2) {
            return param1 === param2;
        });
    };
    
    var nonEqualityOneOfThese = function () {
        this[outputKey] = iterateOr(argsToArray(arguments), function (param1, param2) {
            return param1 !== param2;
        });
    };

    //public API
    win.given = given;
    win.when = when;
}(window, console));