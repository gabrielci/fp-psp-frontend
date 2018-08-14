import Storage from 'backbone.storage';
import Collection from './list/collection';
import Model from './add/model';

var SurveysStorage = Storage.extend({
  model: Model,
  collection: Collection,

  getUserSubHeaderItems() {
    return {
      navigationItems: [
        {
          name: t(`subheader.surveys.list-surveys`),
          link: `/#surveys`
        },
        /* TODO draft-feature, removing Draft Sub-Header Tab till the feature is
        reworked and brought back
        {
          name: t(`subheader.surveys.list-drafts`),
          link: `/#surveys/drafts`
        }
        */
      ]
    };
  }
});

export default new SurveysStorage();
