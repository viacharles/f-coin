import { EBusinessPage, EFriendPage, EIndividualPage, EModule, ESocialPage, EUserPage } from '@utility/enum/route.enum';
import { IPage } from '@utility/interface/route.interface';

export const IndividualPageQueue = new Set<EIndividualPage>([
    EIndividualPage.Landing,
    EIndividualPage.SignOn
]);
export const MenuMap = new Map<EModule, string>([
    [EModule.User, 'question_answer'],
    [EModule.Business, 'trending_up'],
    [EModule.Friend, 'person_add'],
    [EModule.Social, 'article'],
]);
export const UserPageMap = new Map<EUserPage, IPage>([
    [EUserPage.Chat, { path: 'chat', icon: '' }]
]);
export const BusinessPageMap = new Map<EBusinessPage, IPage>([
    [EBusinessPage.Analyze, { path: 'analyze', icon: '' }]
]);
export const FriendPageMap = new Map<EFriendPage, IPage>([
    [EFriendPage.Recommend, { path: 'recommend', icon: '' }]
]);
export const SocialPageMap = new Map<ESocialPage, IPage>([
    [ESocialPage.SharedWall, {path: 'shared-wall', icon: ''}],
])