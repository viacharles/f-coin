import { EBusinessPage, EFriendPage, EIndividualPage, EModule, ESocialPage, EUserPage } from '@utility/enum/route.enum';
import { IPage } from '@utility/interface/route.interface';

export const IndividualPageQueue = new Set<EIndividualPage>([
    EIndividualPage.Landing,
    EIndividualPage.SignOn
]);
export const MenuMap = new Map<EModule, {iconCode: string, name: string}>([
    [EModule.User, {iconCode: 'question_answer', name: '聊天'}],
    [EModule.Business, {iconCode: 'trending_up', name: '挖礦'}],
    [EModule.Friend, {iconCode: 'person_add', name: '加友'}],
    [EModule.Social, {iconCode: 'article', name: '貼文'}],
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