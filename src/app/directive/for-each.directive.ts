import { AfterViewInit, Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';

/**
 * Readme has all the explanation for the structural directive
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