
export class Column{
  constructor(
    private columnName?: string,
    private columnRef?: string,
    private dataType?: string,
    private readonly?: boolean,
    private messages?: any
  ){}
}
