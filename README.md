Suparo
======
Micro javascript library for testing. It hasn't got huge amount of unbelievable features. It is just for small works, not for extremely large projects. It aims to simple integration and using. Just embed `<script type="text/javascript" src="path/to/suparo.js"></script>` tag anywhere in your html page, write some test and see the result in a console.

Note
----
I have made this library mostly for learning me more complex javascript. I know the code of Suparo is piece of cake but I had to start somehow. And of course, feel free to use it (MIT licensed), ask me or report an issue.

Usage
-----
First, you can use `given()` function to separate blocks with similar topic.

```javascript
given('Basic functions', function (context) {
    context.number = 3; //Let's declare and assign a variable
});
```

In `given()` scopes you write your tests using `when()` and chained `then()` functions.

```javascript
when('I add 3 and 5', function (context) {
    context.result = 3 + 5;
})
.then('It should equal to 8', function (context) {
    context.equality(context.result, 8);
});
```

So, let's use all of our knowledge and put it together.

```javascript
given('Basic math operations', function (context) {
    context.two = 2;
    
    when('I add 2 and 2 and multiply 2 and 2', function (context) {
        context.add = 2 + 2;
        context.multiply = 2 * 2;
    })
    .then('It should both equal to 4', function (context) {
        context.equality(context.add, context.multiply, 4); //number two is so magical, isn't it?
    });
});
```

See results in a browser console. And that's all! Suparo is very simple. If you don't any special requirements, it is here at your service.

Want to see more examples? Ok, check out this!

```javascript
given('Show the possibility of comparing more than two values', function (ctx) {
    ctx.first = 1;
    ctx.third = 3;
    ctx.eleventh = 11;
    ctx.fifteenth = 15;
    
    when('You can pass more than two arguments into Suparo tests')
    .then('In this case I appoint it right', function (ctx) {
        ctx.leftLower(ctx.first, ctx.third, ctx.eleventh, ctx.fifteenth);
    });
    
    when('If you do not believe me I can prove it')
    .then('In this case I make mistake purposely (it should fail)', function (ctx) {
        ctx.leftLower(ctx.first, ctx.third, ctx.fifteenth, ctx.eleventh);
    });
});
```