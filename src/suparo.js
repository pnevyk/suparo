/*
    Suparo.js
    v0.1.0
    
    MIT licensed
*/

(function (win, con) {
    var outputKey = '4cb7da5d59a9d888609ffe555fd3b725cfa9a66b',
        context = {};
        
    context[outputKey] = 'Wrong written test';
    
    /**
     * Separates blocks of tests with similar topic, preconditions which define the start of a test block
     * @param {string} title Title of the tests' block
     * @param {function} body Function in which scope tests run
     */
    var given = function (title, body) {
        con.log('[' + title + ']:');
        
        if (typeof body === "function") { body(context); }
    };
    
    /**
     * Do some operations which are necessary to tests
     * @param {string} title Description of operations
     * @param {function} doSomething Function in which scope operations run
     * 
     * @returns {function} Object with reference of "then" function
     */
    var when = function (title, doSomething) {  
        con.log('    * ' + title + ':');
        
        if (typeof doSomething === "function") { doSomething(context); }
        
        /**
         * Postcondition which must be verified as the outcome of the action that follows the trigger
         * @param {string} title Description of opstconditions
         * @param {function} doSomething Function in which scope verifications be done
         */
        var then = function (title, doSomething) {
            allowTestMethods();
            
            if (typeof doSomething === "function") { doSomething(context); }
            
            con.log('    * ' + title);
            con.log('      > ' + boolToOutput(context[outputKey]));
            con.log('');
        };
        
        return { then : then };
    };
    
    /**
     * Private function which iterates over given array, does an action which is defined by given function and saves result using AND logic
     * @param {array} params Array of elements to iterate over
     * @param {function} func Function which defines what to do with elements
     * 
     * @returns {boolean} Final result of iteration using AND logic
     */
    var iterateAnd = function(params, func) {
        var state = true,
            p;
            
        if (params.length === 0) { return false; }
        
        for (p = 0; p < params.length - 1; p++) {
            state = state && func(params[p], params[p + 1], params[0]);
        }
        
        return state;
    };
    
    /**
     * Private function which iterates over given array, does an action which is defined by given function and saves result using OR logic
     * @param {array} params Array of elements to iterate over
     * @param {function} func Function which defines what to do with elements
     * 
     * @returns {boolean} Final result of iteration using AND logic
     */
    var iterateOr = function(params, func) {
        var state = false,
            p;
            
        if (params.length === 0) { return false; }
        
        for (p = 0; p < params.length - 1; p++) {
            state = state || func(params[p], params[p + 1], params[0]);
        }
        
        return state;
    };
    
    /**
     * Private function for making test functions accessible to the world
     */
    var allowTestMethods = function () {
        //public API        
        context.inEquality = inEquality;
        context.equality = equality;
        context.leftGreater = leftGreater;
        context.leftLower = leftLower;
        context.propertyOfFirst = propertyOfFirst;
        context.valueOwnedByFirst = valueOwnedByFirst;
        context.equalityOneOfThese = equalityOneOfThese;
        context.inEqualityOneOfThese = inEqualityOneOfThese;
    };
    
    /**
     * Private function for converting boolean value to string representation of a result
     * @param {boolean} value Boolean value
     * 
     * @returns {string} String representation of boolean value
     */
    var boolToOutput = function (value) {
        return (value) ? 'Passed' : 'Failed';
    };
    
    /**
     * Private function for converting Arguments object to array
     * @param {arguments} args Arguments object
     * 
     * @returns {array} Array which contains values of Arguments object
     */
    var argsToArray = function (args) {
        if (args.length < 2) { return []; } //it can be compared only more than two arguements
        return Array.prototype.slice.call(args);
    };
    
    /**
     * Function which tests equality between given arguments
     * @param {*[]} parameters Arguments to test
     */
    var equality = function () {        
        this[outputKey] = iterateAnd(argsToArray(arguments), function (param1, param2) {
            return param1 === param2;
        });
    };
    
    /**
     * Function which tests inequality between given arguments
     * @param {*[]} parameters Arguments to test
     */
    var inEquality = function () {        
        this[outputKey] = iterateAnd(argsToArray(arguments), function (param1, param2) {
            return param1 !== param2;
        });
    };
    
    /**
     * Function which tests that left arguments are greater than right
     * @param {*[]} parameters Arguments to test
     */
    var leftGreater = function () {        
        this[outputKey] = iterateAnd(argsToArray(arguments), function (param1, param2) {
            return param1 > param2;
        });
    };
    
    /**
     * Function which tests that left arguments are lower than right
     * @param {*[]} parameters Arguments to test
     */
    var leftLower = function () {        
        this[outputKey] = iterateAnd(argsToArray(arguments), function (param1, param2) {
            return param1 < param2;
        });
    };
    
    /**
     * Function which checks if given arguments are properties of first
     * @param {*[]} parameters Arguments to test
     */
    var propertyOfFirst = function () {        
        this[outputKey] = iterateAnd(argsToArray(arguments), function (param1, param2, firstParam) {
            return firstParam.hasOwnProperty(param2);
        });
    };
    
    /**
     * Function which checks if given arguments are values of first
     * @param {*[]} parameters Arguments to test
     */
    var valueOwnedByFirst = function () {        
        this[outputKey] = iterateAnd(argsToArray(arguments), function (param1, param2, firstParam) {
            for (var prop in firstParam) {
                if(firstParam.hasOwnProperty(prop) && firstParam[prop] === param2) {
                    return true;   
                }
            }
            
            return false;
        });
    };
    
    /**
     * Function which tests equality between given arguments using OR logic
     * @param {*[]} parameters Arguments to test
     */
    var equalityOneOfThese = function () {
        this[outputKey] = iterateOr(argsToArray(arguments), function (param1, param2) {
            return param1 === param2;
        });
    };
    
    /**
     * Function which tests inequality between given arguments using OR logic
     * @param {*[]} parameters Arguments to test
     */
    var inEqualityOneOfThese = function () {
        this[outputKey] = iterateOr(argsToArray(arguments), function (param1, param2) {
            return param1 !== param2;
        });
    };

    //public API
    win.given = given;
    win.when = when;
}(window, console));