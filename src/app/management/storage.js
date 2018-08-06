import Storage from 'backbone.storage';
import Collection from './collection';

var ManagementStorage = Storage.extend({
  model: null,
  collection: Collection,
  getSubHeaderItems() {
    return {
      navigationItems: [
        {
          name: t(`subheader.management.organizations`),
          link: `/#management/organizations`
        }
      ]
    };
  }
});

export default new ManagementStorage();
