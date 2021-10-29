import { FirebaseService } from '@shared/services/firebase.service';
import { IFriend } from '@utility/interface/user.inteface';

export class Friend implements IFriend {
  public id: string;
  public name: string = '';
  constructor(id: string, private $firebase: FirebaseService) {
    this.id = id;
  }

  public initial(): Promise<boolean> {
    return new Promise<boolean>((resolve) =>
      this.$firebase
        .request('user')
        .read(this.id)
        .then(({ name }) => {
          this.name = name;
          resolve(true);
        })
    );
  }
}
