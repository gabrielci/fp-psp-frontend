import Bn from 'backbone';
import env from '../../../../env';

export default Bn.Model.extend({
  urlRoot: `${env.API}/snapshots/priority`,
  id: 'snapshotIndicatorId',

  validate(attrs = {}) {
    const errors = [];
    if(!attrs.is_success){
      if (attrs.action === '') {
        errors.push('Missing "action" field');
      }

      if (attrs.estimated_date === null) {
        errors.push('Missing "estimated date" field');
      }
    }

    if (attrs.reason === '') {
      errors.push('Missing "reason" field');
    }



    return errors.length > 0 ? errors : undefined;
  }
});
