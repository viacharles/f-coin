import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private $store: AngularFirestore) {}

  public request = (collection: string) => ({
    create: () => {},
    read: (doc?: string) =>
      doc
        ? this.readDocument(collection, doc)
        : this.readCollection(collection),
    update: () => {},
    delete: () => {},
  });

  private readDocument(collection: string, doc: string): Promise<any> {
    return new Promise<any>((resolve) => {
      this.$store
        .collection(collection)
        .doc(doc)
        .get()
        .subscribe((res) => resolve(res.data()));
    });
  }

  private readCollection(collection: string): Promise<any> {
    return new Promise<any>((resolve) => {
      this.$store
        .collection(collection)
        .get()
        .subscribe((res) => resolve(res.docs.map((doc) => doc.data())));
    });
  }
}
