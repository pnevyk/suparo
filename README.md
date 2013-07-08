Suparo <sup>v0.1.1</sup>
========================
Standalone, lightweight, fast javascript library for testing. It hasn't got huge amount of unbelievable features. It aims to simple integration and using. Just embed `<script type="text/javascript" src="path/to/suparo.js"></script>` tag anywhere in your html page, write some tests and see the result in a console.

-----------------------------------

* [Note](#note)
* [Usage](#usage)
* [API](#api)
* [Contributors](#contributors)
* [License](#license)

-----------------------------------

<a name="note"></a>
Note
----
I have made this library mostly for learning me more complex javascript. I know the code of Suparo is piece of cake but I had to start somehow. And of course, feel free to use it (MIT licensed), ask me or report an issue.

Suparo.js is not so much robust as it should be (for now, of course). But if you use it properly, it will not dissapoint you.

<a name="usage"></a>
Usage
-----
First, you should use `given()` function to separate blocks with similar topic. This function also pass you context object, in which are test functions and result of the block. Into context's `variables` (or `vars` or `v` - everything is the same object) you can assign some variables which you want to use.

```javascript
given('Basic functions', function (context) {
    context.vars.number = 3; //Let's declare and assign a variable
});
```

In `given()` scopes you write your tests using `when()` and chained `then()` functions. Test functions are in the context object passed from `given()` function. In `then()` scope, you should return context object for saving test result (each test function return its context object, so you can type return before last test function).

```javascript
when('I add 3 and 5', function () {
    context.v.result = 3 + 5;
})
.then('It should equal to 8', function () {
    return context.equality(context.v.result, 8);
});
```

So, let's use all of our knowledge and put it together.

```javascript
given('Basic math operations', function (context) {
    context.v.two = 2;
    
    when('I add 2 and 2 and multiply 2 and 2', function () {
        context.v.add = 2 + 2;
        context.v.multiply = 2 * 2;
    })
    .then('It should both equal to 4', function () {
        return context.equality(context.v.add, context.v.multiply, 4);
        //number two is so magical, isn't it?
    });
});
```

If you want to see the summary of whole test or only context, just call `summarize()` function.

```javascript

given('Use OR logic to compare values and then, summarize context', function (ctx) {    
    when('We save only one value from several', function () {
        ctx.v.random = Math.floor(Math.random() * 3); //number between 0 and 3
        ctx.v.array = [ 'Frodo', 'Sam', 'Merry', 'Pippin' ]; //array of four values
        ctx.v.chosen = ctx.v.array[ctx.v.random]; //choose random person
    })
    .then('And the test should be passed anyway', function () {
        ctx.equalityOneOfThese(ctx.v.chosen, ctx.v.array[0], ctx.v.array[1], ctx.v.array[2], ctx.v.array[3]);
        return ctx;
    });
    
    summarize(ctx, function (passed, failed, overall) {
        alert(passed + ' tests from ' + overall + ' passed!');
    });
});

```

See results in a browser console. And that's all! Suparo.js is very simple. If you don't any special requirements, it is here at your service.

Want to see more? Oh, I am glad to show you some [examples](https://github.com/nevyk/suparo/tree/master/examples)!

<a name="api"></a>
API
---

* **given(title, body)**
    + Separates blocks of tests with similar topic, preconditions which define the start of a test block
    + *string* **title** - Title of the tests' block
    + *function* **body** - Function in which scope tests run

```javascript
given('Basic functions', function (context) {
    //in context.vars (context.v, context.variables) object you can have your variables
    context.vars.number = 3;
});
```

* **when(title, body)**
    + Do some operations which are necessary to tests
* **then(title, body)**
    + Postcondition which must be verified as the outcome of the action that follows the trigger
    + *string* **title** - Description of operations
    + *function* **body** - Function in which scope operations run

```javascript
given('Basic math operations', function (context) {
    //in context.vars (context.v, context.variables) object you can have your variables
    context.vars.two = 2;
    
    when('I add 2 and 2 and multiply 2 and 2', function () {
        context.vars.add = 2 + 2;
        context.vars.multiply = 2 * 2;
    })
    .then('It should both equal to 4', function () {
        //there are test functions in context object,
        //just perform some tests you want
        //and return the context object then
        return context.equality(context.vars.add, context.vars.multiply, 4);
        
        /*
        
        you can return the context oject by two ways:
        
        return context.<testFunction>;
        
        - or -
        
        context.<testFunction>;
        return context;
        
        */
    });
});
```

* **summarize([context], [exporter])**
    + Summarizes results of whole test or context
    + *object* **[context]** - Context to summarize
    + *function* **[exporter]** - Function into which scope result will be passed - exporter(passed, failed, overall)

```javascript
given('summarize', function (context) {    
    when('Nothing important')
    .then('Test', function () {
        return context.equality(1, 1);
    });
    
    summarize(context);
});

given('summarize', function (context) {    
    when('Nothing important')
    .then('Test', function () {
        return context.equality(context.vars.i, 'y');
    });
});

summarize(function (passed, failed, overall) {
    alert('Passed: ' + passed + 'Failed: ' + failed + 'Overall: ' + overall);
});

//or just summarize();
```

* **equality(params)**
    + Function which tests equality between given arguments using AND logic and '===' operator
    + <em>\*\[\]</em> **params** - Arguments to test

```javascript
given('equality', function (context) {    
    when('Assign a variable', function () {
        context.vars.i = 'i';
    })
    .then('Test equality', function () {
        return context.equality(context.vars.i, 'i');
    });
});
```

* **inEquality(params)**
    + Function which tests inequality between given arguments using AND logic and '!==' operator
    + <em>\*\[\]</em> **params** - Arguments to test

```javascript
given('inEquality', function (context) {
    when('Assign a variable', function () {
        context.vars.i = 'i';
    })
    .then('Test inEquality', function () {
        return context.inEquality(context.vars.i, 'y');
    });
});
```

* **leftGreater(params)**
    + Function which tests that left arguments are greater than right using AND logic
    + <em>\*\[\]</em> **params** - Arguments to test

```javascript
given('leftGreater', function (context) {    
    when('Assign a variable', function () {
        context.vars.i = 0;
    })
    .then('Test leftGreater', function () {
        return context.leftGreater(context.vars.i, -1);
    });
});
```

* **leftLower(params)**
    + Function which tests that left arguments are lower than right using AND logic
    + <em>\*\[\]</em> **params** - Arguments to test

```javascript
given('leftLower', function (context) {    
    when('Assign a variable', function () {
        context.vars.i = 0;
    })
    .then('Test leftLower', function () {
        return context.leftLower(context.vars.i, 1);
    });
});
```

* **propertyOfFirst(params)**
    + Function which checks if given arguments are properties of first using AND logic
    + <em>\*\[\]</em> **params** - Arguments to test

```javascript
given('propertyOfFirst', function (context) {    
    when('Assign a variable', function () {
        context.vars.o = { i : 0 };
    })
    .then('Test propertyOfFirst', function () {
        return context.propertyOfFirst(context.vars.o, 'i');
    });
});
```

* **valueOwnedByFirst(params)**
    + Function which checks if given arguments are values of first using AND logic
    + <em>\*\[\]</em> **params** - Arguments to test

```javascript
given('valueOwnedByFirst', function (context) {    
    when('Assign a variable', function () {
        context.vars.o = { i : 'y' };
    })
    .then('Test valueOwnedByFirst', function () {
        return context.valueOwnedByFirst(context.vars.o, 'y');
    });
});
```

* **equalityOneOfThese(params)**
    + Function which tests equality between given arguments using OR logic and '===' operator
    + <em>\*\[\]</em> **params** - Arguments to test

```javascript
given('equalityOneOfThese', function (context) {    
    when('Assign a variable', function () {
        context.vars.i = 'i';
    })
    .then('Test equalityOneOfThese', function () {
        return context.equalityOneOfThese(context.vars.i, 'i');
    });
});
```

* **inEqualityOneOfThese(params)**
    + Function which tests inequality between given arguments using OR logic and '!==' operator
    + <em>\*\[\]</em> **params** - Arguments to test

```javascript
given('inEqualityOneOfThese', function (context) {    
    when('Assign a variable', function () {
        context.vars.i = 'i';
    })
    .then('Test inEqualityOneOfThese', function () {
        return context.inEqualityOneOfThese(context.vars.i, 'y');
    });
});
```

<a name="contributors"></a>
Contributors
------------
* [Petr Nevyhoštěný](https://github.com/nevyk) ([Twitter](https://twitter.com/nevyk3))

<a name="license"></a>
License
-------
Suparo.js is MIT licensed (see [LICENSE](https://github.com/nevyk/suparo/blob/master/LICENSE)).