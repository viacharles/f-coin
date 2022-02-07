import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';
import { DatabaseService } from '@utility/abstract/database-service.abstract';
import { LoggerService } from './logger.service';
import firebase from 'firebase/app';
import { Post } from '@social/shared/models/posts.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SocialCenterService extends DatabaseService {

  constructor(public $fb: FirebaseService, public $logger: LoggerService) { super($fb, $logger); }

  protected databaseName = 'socialCenter';

  public sendPost( uid: string, article: string, images: string[]): void {
    console.log('sendPost', uid)
    this.$fb.getDoc(this.databaseName, uid).collection('history').add({
      createTime: firebase.firestore.Timestamp.now(),
      images,
      article,
      issuerId: uid,
    });
  }

  public fetchHistory( uid: string): Promise<Post>{
    return new Promise<Post>((resolve) => {
      resolve(this.$fb.getDoc(this.databaseName, uid).collection('history').get()
      .pipe( tap((posts: Post[]) => posts.map(post => new Post(post))) );)
    });
  }
}
