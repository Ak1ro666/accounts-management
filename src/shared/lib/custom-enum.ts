export class CustomEnum<T> {
  protected raw: Readonly<T>

  public constructor(raw: T) {
    this.raw = raw
  }

  public compare(item: CustomEnum<T> | T): boolean {
    return (
      this.getRaw() ===
      (item && item instanceof Object && 'getRaw' in item
        ? item.getRaw()
        : item)
    )
  }

  public getRaw(): T {
    return this.raw
  }
}
