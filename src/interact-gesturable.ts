import { inject, bindable, bindingMode } from "aurelia-framework";
import * as interact from "interact";

@inject(Element)
export class InteractgesturableCustomAttribute {

  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public options;

  constructor(private element: HTMLElement) { }

  public attached() {
    interact(this.element)
      .dropzone(Object.assign({}, this.options || {}))
        .on("gesturestart", (event) => this.dispatch("interact-gesturestart", event))
        .on("gesturemove", (event) => this.dispatch("interact-gesturemove", event))
        .on("gestureend", (event) => this.dispatch("interact-gestureend", event));
  }

  private dispatch(name, data) {
    this.element.dispatchEvent(
      new CustomEvent(name, {
        bubbles: true,
        detail: data,
      })
    );
  }
}
