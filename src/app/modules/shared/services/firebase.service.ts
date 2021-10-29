import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private $store: AngularFirestore) {}

  public request = (collection: string) => ({
    create: (target: any, doc: string) =>
      this.getDoc(collection, doc).set(target),
    read: (doc?: string) =>
      doc
        ? this.readDocument(collection, doc)
        : this.readCollection(collection),
    update: (target: any, doc: string) =>
      this.getDoc(collection, doc).update(target),
    delete: (doc: string) => this.getDoc(collection, doc).delete(),
  });

  public watch = (collection: string) => ({
    onChanges$: () => this.$store.collection(collection).valueChanges(),
    doc: (doc: string) => ({
      onChanges$: () =>
        this.$store.collection(collection).doc(doc).valueChanges(),
    }),
  });

  private readDocument(collection: string, doc: string): Promise<any> {
    return new Promise<any>((resolve) => {
      this.getDoc(collection, doc)
        .get()
        .subscribe((res) => resolve(res.data()));
    });
  }

  private readCollection(collection: string): Promise<any> {
    return new Promise<any>((resolve) => {
      this.$store
        .collection(collection)
        .get()
        .subscribe((res) =>
          resolve(res.docs.map((doc) => ({ key: doc.id, value: doc.data() })))
        );
    });
  }

  private getDoc(collection: string, doc: string): AngularFirestoreDocument {
    return this.$store.collection(collection).doc(doc);
  }
}
