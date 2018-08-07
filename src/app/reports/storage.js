import Storage from 'backbone.storage';
import CollectionFamilyOrganization from './snapshots/by_organization/collection';
import ModelFamilyOrganization from './snapshots/by_organization/model';

var ReportsStorage = Storage.extend({
  model: ModelFamilyOrganization,
  collection: CollectionFamilyOrganization
});

export default new ReportsStorage();
