export interface IUser {
  name: string;
  summary: string;
  imgUrl: string;
}

export class UserList {
  constructor(){}

  public userList = new Map<string, IUser>([
    [ '1', {name: 'sam', summary: '嗨嗨嗨嗨嗨', imgUrl: '../assets/img/headshot-1.jpeg'}],
    [ '2', {name: '金太郎', summary: '肚子很餓肚子很餓肚子很餓肚子很餓肚子很餓肚子很餓肚子很餓肚子很餓肚子很餓肚子很餓', imgUrl: '../assets/img/headshot-5.jpeg'}],
    [ '3', {name: 'vivi', summary: '嗨嗨嗨嗨嗨', imgUrl: '../assets/img/headshot-2.jpeg'}],
    [ '4', {name: '王大明', summary: '嗨嗨嗨嗨嗨', imgUrl: '../assets/img/headshot-3.jpeg'}],
    [ '5', {name: 'john', summary: '嗨嗨嗨嗨嗨', imgUrl: '../assets/img/headshot-4.jpeg'}],
    [ '6', {name: 'sam', summary: '嗨嗨嗨嗨嗨', imgUrl: '../assets/img/headshot-5.jpeg'}],
    [ '7', {name: 'sam', summary: '嗨嗨嗨嗨嗨', imgUrl: '../assets/img/headshot-6.jpeg'}],
    [ '8', {name: 'sam', summary: '嗨嗨嗨嗨嗨', imgUrl: '../assets/img/headshot-1.jpeg'}],
    [ '9', {name: 'sam', summary: '嗨嗨嗨嗨嗨', imgUrl: '../assets/img/headshot-2.jpeg'}],
    [ '10', {name: 'sam', summary: '嗨嗨嗨嗨嗨', imgUrl: '../assets/img/headshot-3.jpeg'}],
    [ '11', {name: 'sam', summary: '嗨嗨嗨嗨嗨', imgUrl: '../assets/img/headshot-4.jpeg'}],
    [ '12', {name: 'sam', summary: '嗨嗨嗨嗨嗨', imgUrl: '../assets/img/headshot-5.jpeg'}],
    [ '13', {name: 'sam', summary: '嗨嗨嗨嗨嗨', imgUrl: '../assets/img/headshot-6.jpeg'}],
    [ '14', {name: 'sam', summary: '嗨嗨嗨嗨嗨', imgUrl: '../assets/img/headshot-1.jpeg'}],
    [ '15', {name: 'sam', summary: '嗨嗨嗨嗨嗨', imgUrl: '../assets/img/headshot-2.jpeg'}],
    [ '16', {name: 'sam', summary: '嗨嗨嗨嗨嗨', imgUrl: '../assets/img/headshot-3.jpeg'}],
    [ '17', {name: 'sam', summary: '嗨嗨嗨嗨嗨', imgUrl: '../assets/img/headshot-4.jpeg'}],
  ]);

}

