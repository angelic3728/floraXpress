import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import React, { useRef } from 'react';
import reducer from './store';
import UsersHeader from './UsersHeader';
import UsersTable from './UsersTable';
import UsersSidebarContent from './UsersSidebarContent'

function UsersPage() {
    const pageLayout = useRef(null);

    return (
        <FusePageSimple
            classes={{
                contentWrapper: 'p-0 sm:p-24 h-full',
                content: 'flex flex-col h-full',
                leftSidebar: 'w-256 border-0',
                header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
                wrapper: 'min-h-0'
            }}
            header={<UsersHeader pageLayout={pageLayout} />}
            content={<UsersTable />}
            leftSidebarContent={<UsersSidebarContent />}
            sidebarInner
            ref={pageLayout}
            innerScroll
        />
    );
}

export default withReducer('floraXpressApp', reducer)(UsersPage);
