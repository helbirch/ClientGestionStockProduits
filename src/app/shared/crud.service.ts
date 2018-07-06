import { Observable } from 'rxjs/Observable';

export interface CrudService<T, ID>{
  getAll(): Observable<any>;

  add(entity:T): Observable<any>;

  update(entity: T): Observable<any>;

  delete(id:ID): Observable<any>;
}
