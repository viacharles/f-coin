import { IMenu } from './../interface/route.interface';
import { EBusinessPage, EFriendPage, EIndividualPage, EModule, ESocialPage, EUserPage } from '@utility/enum/route.enum';
import { IPage } from '@utility/interface/route.interface';
import { environment } from 'src/environments/environment';

export const IndividualPageQueue = new Set<EIndividualPage>([
  EIndividualPage.Landing,
  EIndividualPage.SignOn
]);
export const MenuMap = new Map<EModule, IMenu>([
  [EModule.User, { icon: 'question_answer' }],
  [EModule.Business, { icon: 'trending_up', isHide: environment.production }],
  [EModule.Friend, { icon: 'person_add' }],
  [EModule.Social, { icon: 'article', isHide: environment.production }],
]);
export const UserPageMap = new Map<EUserPage, IPage>([
  [EUserPage.Chat, { path: 'chat' }]
]);
export const BusinessPageMap = new Map<EBusinessPage, IPage>([
  [EBusinessPage.Analyze, { path: 'analyze' }]
]);
export const FriendPageMap = new Map<EFriendPage, IPage>([
  [EFriendPage.Recommend, { path: 'recommend' }]
]);
export const SocialPageMap = new Map<ESocialPage, IPage>([
  [ESocialPage.SharedWall, { path: 'shared-wall' }],
])
