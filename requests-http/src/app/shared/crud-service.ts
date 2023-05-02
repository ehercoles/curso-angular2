import { HttpClient } from "@angular/common/http";
import { delay, take, tap } from "rxjs/operators";

export abstract class CrudService<T  extends { id?: number }> {

    constructor(
        protected http: HttpClient,
        private API_URL: string) { }

    list() {
        return this.http.get<T[]>(this.API_URL)
        .pipe(
            delay(2000),
            tap(console.log)
        )
    }

    private create(obj: T) {
        return this.http.post(this.API_URL, obj).pipe(take(1));
    }

    read(id: number) {
        return this.http.get(`${ this.API_URL }/${ id }`).pipe(take(1));
    }

    private update(obj: T) {
        return this.http.put(`${ this.API_URL }/${ obj.id }`, obj).pipe(take(1));
    }

    save(obj: T) {
        if (obj.id) {
        return this.update(obj);
        }

        return this.create(obj);
    }

    delete(id: number) {
        return this.http.delete(`${ this.API_URL }/${ id }`).pipe(take(1));
    }
}
