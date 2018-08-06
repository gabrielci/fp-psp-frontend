import Storage from 'backbone.storage';
import Model from './model';

const allMenuItems = {
  mainItem: { link: '#' },
  navigationItems: [
    { name: 'hubs', link: '#hubs' },
    { name: 'reports', link: '#reports/snapshots' },
    { name: 'users', link: '#users' },
    { name: 'families', link: '#families' },
    { name: 'surveys', link: '#surveys' },
    { name: 'management', link: '#management' },
    { name: 'map', link: '#map' }
  ]
};

var HeaderStorage = Storage.extend({
  model: Model,
  getByRolesInSession(session) {
    if (!session.isAuthenticationEnabled()) {
      return new Model(allMenuItems);
    }

    if (session.userHasRole('ROLE_ROOT')) {
      const items = {
        navigationItems: allMenuItems.navigationItems
          .filter(
            item =>
              !(item.link === '#organizations') &&
              !(item.link === '#reports/snapshots')
          )
          .map(item => {
            item.name = t(`header.${item.name}`);
            return item;
          })
      };
      return new Model(items);
    }

    if (session.userHasRole('ROLE_HUB_ADMIN')) {
      const items = {
        mainItem: { link: `#${session.getLoggedUserHomeRoute()}` },
        navigationItems: allMenuItems.navigationItems
          .filter(
            item =>
              !(item.link.indexOf('#hubs') !== -1) &&
              !(item.link === '#applications')
          )
          .map(item => {
            item.name = t(`header.${item.name}`);
            return item;
          })
      };

      return new Model(items);
    }

    // APP_ADMIN is a member and admin
    // of an organization, so cannot CRUD
    // other organizations.
    if (session.userHasRole('ROLE_APP_ADMIN')) {
      const items = {
        mainItem: { link: `#${session.getLoggedUserHomeRoute()}` },
        navigationItems: allMenuItems.navigationItems
          .filter(
            item =>
              !(item.link === '#applications') &&
              !(item.link === '#families') &&
              !(item.link.indexOf('#hubs') !== -1) &&
              !(item.link === '#management')
          )
          .map(item => {
            item.name = t(`header.${item.name}`);
            return item;
          })
      };
      return new Model(items);
    }

    // regular user
    const items = {
      mainItem: { link: `#${session.getLoggedUserHomeRoute()}` },
      navigationItems: allMenuItems.navigationItems
        .filter(
          item =>
            !(item.link === '#applications') &&
            !(item.link === '#reports/snapshots') &&
            !(item.link.indexOf('#hubs') !== -1) &&
            !(item.link === '#management') &&
            !(item.link === '#users')
        )

        .map(item => {
          item.name = t(`header.${item.name}`);
          return item;
        })
    };
    return new Model(items);
  }
});

export default new HeaderStorage();
