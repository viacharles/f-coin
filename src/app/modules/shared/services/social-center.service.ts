import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';
import { DatabaseService } from '@utility/abstract/database-service.abstract';
import { LoggerService } from './logger.service';
import firebase from 'firebase/app';
import { Post } from '@social/shared/models/posts.model';
import { tap } from 'rxjs/operators';
import { IPost } from '@utility/interface/socialCenter.interface';
import { OverlayService } from '@shared/overlay/overlay.service';

@Injectable({
  providedIn: 'root'
})
export class SocialCenterService extends DatabaseService {

  constructor(
    public $fb: FirebaseService,
    public $logger: LoggerService,
    private $overlay: OverlayService
  ) { super($fb, $logger); }

  protected databaseName = 'socialCenter';

  public sendPost(id: string, article: string, images: string[]): Promise<boolean> {
    const LoadingId = this.$overlay.startLoading();
    const ActivatedElement: HTMLElement = document.activeElement as HTMLElement;
    ActivatedElement.blur();
    return new Promise<boolean>((resolve) => {
      this.$fb
        .getDoc(this.databaseName, id)
        .collection('history')
        .add({
          createTime: firebase.firestore.Timestamp.now(),
          images,
          article,
          issuerId: id,
        } as IPost)
        .then((res) => {
          this.$logger.systemMessage(
            `article ${res.id} has successfully created.`
          );
          this.$fb
            .getDoc(this.databaseName, id)
            .collection('history')
            .doc(res.id)
            .update({ id: res.id })
            .then(() => {
              this.$overlay.endLoading(LoadingId, ActivatedElement);
              resolve(true);
            });
        });
    });
  }

  public fetchHistory(uid: string) {
    return new Promise<Post>((resolve) => {
      // resolve(this.$fb.getDoc(this.databaseName, uid).collection('history').get()
      // .pipe( tap(posts => posts.map(post => new Post(post))) );)
    });
  }
}
