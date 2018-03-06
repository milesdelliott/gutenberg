/**
 * External dependencies
 */
import { connect } from 'react-redux';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { withFocusReturn } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import './style.scss';
import PostSettings from './post-settings';
import BlockInspectorPanel from './block-inspector-panel';
import Header from './header';
import { getActiveGeneralSidebarName } from '../../store/selectors';

/**
 * Returns the panel that should be rendered in the sidebar.
 *
 * @param {string} panel The currently active panel.
 *
 * @return {Object} The React element to render as a panel.
 */
function getPanel( panel ) {
	switch ( panel ) {
		case 'edit-post/document':
			return PostSettings;
		case 'edit-post/block':
			return BlockInspectorPanel;
		default:
			return PostSettings;
	}
}

/**
 * Renders a sidebar with the relevant panel.
 *
 * @param {string} panel The currently active panel.
 *
 * @return {Object} The rendered sidebar.
 */
const Sidebar = ( { activeSidebarName } ) => {
	const ActivePanel = getPanel( activeSidebarName );

	return (
		<div
			className="edit-post-sidebar"
			role="region"
			aria-label={ __( 'Editor advanced settings' ) }
			tabIndex="-1"
		>
			<Header />
			<ActivePanel panel={ activeSidebarName } />
		</div>
	);
};

export default connect(
	( state ) => {
		return {
			activeSidebarName: getActiveGeneralSidebarName( state ),
		};
	},
	undefined,
	undefined,
	{ storeKey: 'edit-post' }
)( withFocusReturn( Sidebar ) );
