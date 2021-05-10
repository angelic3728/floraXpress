import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function ExamplePage(props) {
	const classes = useStyles(props);
	const { t } = useTranslation('HomePage');

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="p-24">
					<h4>Welcome to FloraXpress</h4>
				</div>
			}
			content={
				<div className="p-24">
					<h4>DEMO PAGE</h4>
					<br />
                    <h5>I can edit this page as you wish.</h5>
					<DemoContent />
				</div>
			}
		/>
	);
}

export default ExamplePage;
