import Storage from 'backbone.storage';
import Model from './model';
import Collection from './collection';

var OrganizationsStorage = Storage.extend({
  model: Model,
  collection: Collection,
  getSubHeaderItems(model) {
    return {
      mainItem: {
        name: model.get('name'),
        link: `/#organizations/${model.get('id')}`,
        logoUrl: model.get('logoUrl') || '/static/images/icon_logo_place.png'
      },
      navigationItems: [
        {
          name: t('subheader.families'),
          link: `/#organizations/${model.get('id')}/families`
        }
      ]
    };
  },
  getUserSubHeaderItems(model) {
    return {
      mainItem: {
        name: model.get('name'),
        link: `/#management/organizations/${model.get('id')}`
      },
      navigationItems: [
        {
          name: t('subheader.families'),
          link: `/#management/organizations/${model.get('id')}/families`
        }
      ]
    };
  },
  getHubAdminHeaderItems(model) {
    return {
      mainItem: {
        name: model.get('name'),
        link: `/#management/organizations/${model.get('id')}`
      },
      navigationItems: []
    };
  }
});

export default new OrganizationsStorage();
