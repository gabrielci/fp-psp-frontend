import Mn from 'backbone.marionette';
import Template from './template.hbs';
import storage from './storage';

export default Mn.View.extend({
  template: Template,
  regions: {
    surveysContent: '#management-content'
  },
  initialize(app) {
    this.app = app.app;
  },
  onRender() {
    let headerItems = storage.getSubHeaderItems();
    this.app.updateSubHeader(headerItems);
  }
});
