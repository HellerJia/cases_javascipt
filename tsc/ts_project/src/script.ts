class A {
  protected str;
  public constructor(input) {
    this.str = input;
  }
}

class B extends A {
  private output;
  public constructor(input) {
    super(input)
    this.output = this.str + ", B: " + input;
  }
  public show() {
    alert(this.output);
  }
}

let b = new B("b");
b.show();