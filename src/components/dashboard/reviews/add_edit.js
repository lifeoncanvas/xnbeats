import React, { Component } from 'react';
import DashLayout from '../../../utils/dash_layout';
import ReviewForm from './form';

class ReviewAddEdit extends Component {
	render(){
		const props = this.props;
		return(
			<DashLayout
			auth={props.auth}
			title='Reviews'
			>
			<ReviewForm
				id={props.match.params.id}
				history={props.history}
			/>
			</DashLayout>
		)
	}
}
export default ReviewAddEdit;