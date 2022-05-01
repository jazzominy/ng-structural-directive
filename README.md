# Structural Directive

An attempt to create a `*forEach` of my own


## The implementation

For a structural directive for e.g `*forEach` on an element, lets say `<div *forEach></div>`, what angular internally does is, it converts this to

```
<ng-template forEach>
    <div></div>
</ng-template>
```
 
So having a * on an attribute/directive tells angular to wrap the host element within
```
<ng-template></ng-template>
```
  
 Now lets say we want to set context for the template which is created using *. We do it by using `let` keyword as
```
<div *forEach="let message">
    {{message}}
</div>
```
  
What angular will do internally is
```
<ng-template forEach let-message>
    <div>{{message}}</div>
</ng-template>
```
  
Here, we can pass in the value for message template var as
 
```
ngAfterViewInit() {
    this.view.createEmbeddedView(this.template, {
        $implicit: 'This is the context'
    });
}
```

The value of $implicit will be passed on as is to message template variable and it will be displayed in the host element div

Now lets say we want to pass in the context dynamically like 
```
<div *forEach="let message from messages">{{message}}</div>
```
In this case what angular will do is it will pass in the `messages` object to the an input property by the name forEachFrom like

```
<ng-template forEach let-message [forEachFrom]="messages">
    <div>{{message}}</div>
</ng-template>
```

The input prop name is formed as directive selector + key word used in expression passed in to *forEach.
So in our example we have `*forEach="let message from messages"`. Here `from` is a keyword.
So the input prop name formed is `forEachFrom`. We define a setter for this input prop as

``` 
@Input()
set forEachFrom (value: any) {
    console.info(value);
}
```

So now that we have the data, we can use it to pass in the context to the template dynamically as

``` 
@Input()
set forEachFrom (value: any) {
    this.view.clear();

    if (Array.isArray(value)) {
        value.forEach(item => {
            this.view.createEmbeddedView(this.template, {
                $implicit: item
            });
        })
    }
}
```
Complete implementation is [here](src/app/directive/for-each.directive.ts)