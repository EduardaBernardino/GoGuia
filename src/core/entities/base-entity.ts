export abstract class BaseEntity<Props> {
  public readonly id?: string | number;
  protected props: Props;

  constructor(props: Props, id?: string | number) {
    this.props = props;
    this.id = id;
  }

  // Mantém compatibilidade com código que usa .data
  public get data(): Props {
    return this.props;
  }

  public equals(entity: BaseEntity<unknown>) {
    return entity.id === this.id;
  }
}