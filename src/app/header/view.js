import Mn from 'backbone.marionette';
import _toLower from 'lodash/toLower';
import _startCase from 'lodash/startCase';
import $ from 'jquery';
import Template from './template.hbs';

export default Mn.View.extend({
  template: Template,

  events: {
    'click #menu-left .menu-item': 'highlight',
    'click #menu-left img': 'highlightFirstElement',
    'click #locales li': 'localeSelected'
  },

  highlight(e) {
    $(e.target)
      .parent()
      .siblings('.active')
      .removeClass('active');
    $(e.target)
      .parent()
      .addClass('active');
  },

  highlightFirstElement() {
    $('#menu-left:first-child a')
      .parent()
      .addClass('active');
    let $list = $('#menu-left a:not(:first)');
    $list.parent().removeClass('active');
  },
  initialize(options) {
    this.app = options.app;
  },

  // FIXME Temporary function.
  // The full profile user name should
  // be retrieved from the server and not parsed from username.
  getUserProfileName() {
    const { username } = this.app.getSession().get('user');
    if (!username) {
      return 'Anonymous';
    }
    if (username.indexOf('@') > 0) {
      return username;
    }
    if (username.indexOf('_') > 0) {
      return _startCase(_toLower(username.split('_').join(' ')));
    }
    return _startCase(username);
  },
  serializeData() {
    return {
      mainItem: this.model.get('mainItem'),
      navigationItems: this.model.get('navigationItems'),
      username: this.getUserProfileName(),
      currentLocale: t(`header.locale.${this.app.getSession().getLocale()}`),
      currentFlag: this.getFlag()
    };
  },
  getFlag() {

    return  this.app.getSession().getLocale()
        .substring(3)
        .toLowerCase();
  },

  localeSelected(event) {
    event.preventDefault();
    this.app.changeLocale($(event.currentTarget).attr('class'));
  }
});
