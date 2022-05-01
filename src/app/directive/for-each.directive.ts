import { AfterViewInit, Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * For a structural directive for e.g *forEach on an element, lets say <div *forEach></div>,
 * what angular internally does is it converts to <ng-template forEach><div></div></ng-template>
 * 
 * So having a * on an attribute/directive tells angular to wrap the host element within
 * <ng-template></ng-template>
 * 
 * Now lets say we want to set context for the template which is created using *. We do it by using `let` keyword as
 * <div *forEach="let message">{{message}}</div>
 * 
 * What angular will do is
 * <ng-template [forEach] let-message>
 *     <div>{{message}}</div>
 * </ng-template>
 * 
 * Here, we can pass in the value for message template var as
 * 
 * ngAfterViewInit() {
        this.view.createEmbeddedView(this.template, {
            $implicit: 'Yo man'
        });
    }

 * The value of $implicit will be passed on as is to message template variable
    and it will be displayed in the host element div

 * Now lets say we want to pass in the context dynamically like <div *forEach="let message from messages">{{message}}</div>
    In this case what angular will do is it will pass in the `messages` object to the an input property by the name forEachFrom like
    <ng-template [forEach] let-message [forEachFrom]="messages">
 *     <div>{{message}}</div>
 * </ng-template>
 * The input prop name is formed as directive selector + key word used in expression passed in to *forEach.
 * So in our example we have `*forEach="let message from messages"`. Here `from` is a keyword.
 * So the input prop name formed is `forEachFrom`. We define a setter for this input prop as
 * 
 * `@Input()
    set forEachFrom (value: any) {
        console.info(value);
    }`
 * 
 */

@Directive({
    selector: '[forEach]',
})
export class ForEachDirective {

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

    constructor (
        private el: ElementRef,
        // This is host container where we create an embedded view for the template
        private view: ViewContainerRef,
        // This holds the reference to the ng-template that is generated from the element
        // on which *forEach is used
        private template: TemplateRef<any>
    ) {
    }
}