import type { DepartmentCardProps } from '../components/departments/types';

export const DEPARTMENTS: DepartmentCardProps[] = [
  {
    title: 'INVENTORY',
    hoverTitle: 'FIND YOURS TODAY',
    href: '/inventory',
    imageSrc:
      'https://image123.azureedge.net/uniquecarsltd/14234461564388767-6624010424445568-browse.inventory.webp',
  },
  {
    title: 'FINANCING',
    hoverTitle: 'APPLY NOW',
    href: '/CreditApplication',
    imageSrc:
      'https://image123.azureedge.net/uniquecarsltd/08930127675056165-uniq-finance-home.webp',
    isExternal: true,
  },
  {
    title: 'CAR FINDER',
    hoverTitle: 'FIND YOURS',
    href: '/CarFinderPage',
    imageSrc:
      'https://image123.azureedge.net/uniquecarsltd/09532539148185037-uniq-carfinde-home.webp',
  },
  {
    title: 'FEATURED VEHICLES',
    hoverTitle: 'VIEW HERE',
    href: '/inventory',
    imageSrc: 'https://uniquecars.ca/images/home/featured.webp',
  },
];





