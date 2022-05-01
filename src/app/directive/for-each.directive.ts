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
 * <ng-template forEach let-message>
 *     <div>{{message}}</div>
 * </ng-template>
 * 
 * Here, we can pass in the value for message template var as
 * 
 * ngAfterViewInit() {
        this.view.createEmbeddedView(this.template, {
            $implicit: 'Yo man' // the value of $implicit will be passed on as is to message template variable
        });
    } 
 */

@Directive({
    selector: '[forEach]',
})
export class ForEachDirective implements AfterViewInit {

    @Input() set forEach (value: any) {
        console.info(value);
    }

    constructor (
        private el: ElementRef,
        private view: ViewContainerRef,
        private template: TemplateRef<any>
    ) {
    }

    ngAfterViewInit() {
        this.view.createEmbeddedView(this.template, {
            $implicit: 'Yo man'
        });
    }
}