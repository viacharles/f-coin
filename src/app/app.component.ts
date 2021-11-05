import { Component } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { FirebaseService } from '@shared/services/firebase.service';

const imgUrls = [
  'https://f-coin-1bf5f.appspot.com/img/headshot/headshot-1.jpeg',
  'https://f-coin-1bf5f.appspot.com/img/headshot/headshot-2.jpeg',
  'https://f-coin-1bf5f.appspot.com/img/headshot/headshot-3.jpeg',
  'https://f-coin-1bf5f.appspot.com/img/headshot/headshot-4.jpeg',
  'https://f-coin-1bf5f.appspot.com/img/headshot/headshot-5.jpeg',
  'https://f-coin-1bf5f.appspot.com/img/headshot/headshot-6.jpeg',
];
const users = [
  'KMfn9NQTBJkQkTjKx7D7',
  'L3HlBy07LBJhCD7ihFsL',
  'MzxJBxM6ZoHBmyS7tmAz',
  'NGD60AXC4rizVsbVs2e0',
  'OHatVbvPiibO2mSFKNZM',
  'Q4NB3LV49GP5cAPz04xJ',
  'RzEWzpeR24jVylI0Exss',
  'WqjeDTqebqamXh5lwjUi',
  'XAqhLmfHp2ZebUpQXwzp',
  'bFQxkwTqXKv5c73bSTgx',
  'bNqpXiXu6qXEhpw1jdUo',
  'bjzPvn1Di5zsE9l4rYm0',
  'c4k18rl70pep3yPykLM2',
  'l0ZURvyR7TwWfSOuPDS7',
  'mXofRWAtAIyRPDpemoJz',
  'n6KZ8iX44MMlbPgWtt5pzB7tb4D2',
  'n6KZ8iX44MMlbPgWttXXXX7tb4D2',
  'u0EKLdn22JmfxeVvFIBl',
  'u8DVikyQrWPWOabQTQJA',
  'xihabkvwkzCjti8s82ez',
  'zGWnZyT3h3VsVxkLlWUX',
  '0MSN5yaaApHsxg9uUC14',
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private $store: FirebaseService, private fb: AngularFirestore) {
  }



}
