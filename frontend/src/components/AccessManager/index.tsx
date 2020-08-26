import getRolesRules, {IRole} from "./rbac-rules";
import {IAppState} from "../../models/IAppState";
import {connect} from "react-redux";
import {FC, useEffect} from "react";
import {getUserRoutine} from "../../sagas/auth/routines";

interface IAccessManagerProps {
    role: string;
    staticPermission?: string;
    dynamicPermission?: string;
    endpoint?: string;
    data?: any;
    children: any;
    onDenied?(): any | null;
    getUser;
}

const AccessManager: FC<IAccessManagerProps> = (
    {role, staticPermission, dynamicPermission, endpoint, data, onDenied, children, getUser }) => {
    useEffect(() => {
        getUser();
    });

    const check = () => {
        const rolesRules = getRolesRules();
        const permissions: IRole = rolesRules[role];

        if (!permissions) {
            // role is not present
            return false;
        }

        if (!staticPermission && !dynamicPermission && !endpoint) {
            return true;
        }

        const userStaticPermissions = permissions.static;
        if (staticPermission
            && userStaticPermissions
            && userStaticPermissions.includes(staticPermission)) {
            // static rule not provided for action
            return true;
        }

        const userDynamicPermissions = permissions.dynamic;
        if (dynamicPermission && userDynamicPermissions) {
            const permissionCondition = userDynamicPermissions[dynamicPermission];
            if (!permissionCondition) {
                // dynamic rule not provided for action
                return false;
            }

            return permissionCondition(data);
        }

        const endpoints = permissions.endpoints;
        if (endpoint && endpoints && endpoints.includes(endpoint)) {
            return true;
        }

        if (endpoint === 'companyOwnerEndpointAccess')
            return true;

        return false;
    };

    return check() ? children
        : (onDenied ? onDenied() : null);
};

const mapStateToProps = (state: IAppState) => ({
    role: state.user.info?.role
});

const mapDispatchToProps = {
   getUser: getUserRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AccessManager);
