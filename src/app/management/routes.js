import ManagementView from './view';
// Applications
import ApplicationsView from './hubs/index/layout-view';
import applicationsStorage from './hubs/storage';
import ApplicationFormView from './hubs/add/view';

const management = props => {
  const { app } = props;
  const routes = {
    appRoutes: {
      management: 'showManagement',
      'management/applications(/)': 'showApplications',
      'management/applications/new': 'newApplication',
      'management/applications/edit/:id': 'editApplication'
    },
    controller: {
      showManagement() {
        app.getSession().save({ termCond: 0, priv: 0 });
        app.getSession().save({ reAnswer: false, formData: null });
        app.showViewOnRoute(new ManagementView({ app }));
      },
      showApplications() {
        app.showViewOnRoute(new ApplicationsView({ app }));
      },
      newApplication() {
        app.showViewOnRoute(new ApplicationFormView({ app }));
      },
      editApplication(applicationId) {
        applicationsStorage.find(applicationId).then(model => {
          app.showViewOnRoute(new ApplicationFormView({ model, app }));
        });
      }
    }
  };
  return routes;
};

export default management;
