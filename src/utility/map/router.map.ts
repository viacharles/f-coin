import { EIndividualPage, EModule, EUserPage } from '@utility/enum/route.enum';
import { IPage } from '@utility/interface/route.interface';

export const IndividualPageQueue = new Set<EIndividualPage>([
    EIndividualPage.Landing,
    EIndividualPage.SignOn
]);
export const MenuMap = new Map<EModule, string>([
    [EModule.User, 'question_answer'],
    [EModule.Business, 'trending_up'],
    [EModule.Friend, 'person_add']
]);
export const UserPageMap = new Map<EUserPage, IPage>([
    [EUserPage.Chat, { path: 'chat', icon: '' }]
]);
