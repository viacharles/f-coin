import { EIndividualPage, EModule, EUserPage } from '@utility/enum/route.enum';
import { IPage } from '@utility/interface/route.interface';

export const IndividualPageQueue = new Set(EIndividualPage.Landing);
export const MenuMap = new Map<EModule, string>([
    [EModule.User, 'question_answer'],
    [EModule.Business, 'trending_up']
]);
export const UserPageMap = new Map<EUserPage, IPage>([
    [EUserPage.Chat, {path: 'chat', icon: ''}]
]);
