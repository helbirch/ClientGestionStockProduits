
export class Column{
  constructor(
    public columnName?: string,
    public columnRef?: string,
    public dataType?: string,
    public readonly?: boolean,
    public messages?: any
  ){}
}
