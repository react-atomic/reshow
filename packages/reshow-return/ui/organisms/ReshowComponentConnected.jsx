import {connect} from 'reshow-flux';

import ReshowComponent from '../organisms/ReshowComponent';

export default connect(
  ReshowComponent,
  {withProps: true},
);
