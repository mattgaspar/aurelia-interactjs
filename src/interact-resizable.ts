import { inject, bindable, bindingMode } from "aurelia-framework";
import * as interact from "interact.js";

@inject(Element)
export class InteractresizableCustomAttribute {

  @bindable({ defaultBindingMode: bindingMode.oneTime })
  public options;

  constructor(private element: HTMLElement) { }

  public attached() {
    interact(this.element)
      .dropzone(Object.assign({}, this.options || {}))
        .on("resizestart", (event) => this.dispatch("interact-resizestart", event))
        .on("resizemove", (event) => this.dispatch("interact-dragenter", event))
        .on("resizeinertiastart", (event) => this.dispatch("interact-resizeinertiastart", event))
        .on("resizeend", (event) => this.dispatch("interact-resizeend", event));
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
