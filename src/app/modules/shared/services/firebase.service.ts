import { Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { OverlayService } from '@shared/overlay/overlay.service';
import { finalize, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(
    private $store: AngularFirestore,
    private $overlay: OverlayService
  ) {}

  public request(collection: string): any {
    const LoadingId = this.$overlay.startLoading();
    return {
      create: (target: any, doc: string) =>
        this.getDoc(collection, doc)
          .set(target)
          .then(() => this.$overlay.endLoading(LoadingId)),
      read: (doc?: string) =>
        doc
          ? this.readDocument(collection, doc, LoadingId)
          : this.readCollection(collection, LoadingId),
      read$: (doc?: string) =>
        doc
          ? this.getDoc(collection, doc)
              .get()
              .pipe(
                finalize(() => this.$overlay.endLoading(LoadingId)),
                map((res) => res.data())
              )
          : this.$store
              .collection(collection)
              .get()
              .pipe(
                finalize(() => this.$overlay.endLoading(LoadingId)),
                map((res) =>
                  res.docs.map((resDoc) => ({
                    key: resDoc.id,
                    value: resDoc.data(),
                  }))
                )
              ),
      update: (target: any, doc: string) =>
        this.getDoc(collection, doc)
          .update(target)
          .then(() => this.$overlay.endLoading(LoadingId)),
      delete: (doc: string) =>
        this.getDoc(collection, doc)
          .delete()
          .then(() => this.$overlay.endLoading(LoadingId)),
    };
  }

  public watch(collection: string): any {
    const LoadingId = this.$overlay.startLoading();
    return {
      onChanges$: () =>
        this.$store
          .collection(collection)
          .valueChanges()
          .pipe(tap(() => this.$overlay.endLoading(LoadingId))),
      doc: (doc: string) => ({
        onChanges$: () =>
          this.$store
            .collection(collection)
            .doc(doc)
            .valueChanges()
            .pipe(tap(() => this.$overlay.endLoading(LoadingId))),
      }),
    };
  }

  /**
   * @description 獲得對應collection下的doc
   */
  public getDoc(collection: string, doc: string): AngularFirestoreDocument {
    return this.$store.collection(collection).doc(doc);
  }

  public getCollection(collection: string): AngularFirestoreCollection {
    return this.$store.collection(collection);
  }

  private readDocument(
    collection: string,
    doc: string,
    loadingId: string
  ): Promise<any> {
    return new Promise<any>((resolve) => {
      this.getDoc(collection, doc)
        .get()
        .subscribe((res) => {
          this.$overlay.endLoading(loadingId);
          resolve(res.data());
        });
    });
  }

  private readCollection(collection: string, loadingId: string): Promise<any> {
    return new Promise<any>((resolve) => {
      this.$store
        .collection(collection)
        .get()
        .subscribe((res) => {
          this.$overlay.endLoading(loadingId);
          resolve(res.docs.map((doc) => ({ key: doc.id, value: doc.data() })));
        });
    });
  }
}
