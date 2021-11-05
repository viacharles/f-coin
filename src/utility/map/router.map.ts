import { Module, Page } from '@utility/enum/route.enum';
import { IRouteConfig } from '@utility/interface/route.interface';

export const BusinessPageMap = new Map<string, IRouteConfig>([
  [Page.FCoin, { name: '挖礦', icon: 'trending_up' }],
]);

export const UserPageMap = new Map<string, IRouteConfig>([
  [Page.Chat, { name: '聊天', icon: '3p' }],
]);

export const IndividualPageQueue = new Set<Page>([Page.Landing]);

export function getPageMap(module: string): Map<string, IRouteConfig> {
  switch (module) {
    case Module.Business:
      return BusinessPageMap;
    case Module.User:
      return UserPageMap;
    default:
      return BusinessPageMap;
  }
}
