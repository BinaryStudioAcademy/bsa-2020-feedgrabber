import {IAppState} from "../../models/IAppState";
import {connect} from "react-redux";
import {FC, useEffect} from "react";
import {getUserRoutine} from "../../sagas/auth/routines";
import rolesRules, {IRole} from "./rbac-rules";

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
        if (!role) {
            getUser();
        }
    }, [getUser, role]);

    const permissions: IRole = rolesRules[role];
    if (!permissions)
        return null;

    const checkStaticPermission = () => {
        const userStaticPermissions = permissions.static;
        return staticPermission
            && userStaticPermissions
            && userStaticPermissions.includes(staticPermission);
    };

    const checkDynamicPermission = () => {
        const userDynamicPermissions = permissions.dynamic;
        if (userDynamicPermissions) {
            const permissionCondition = userDynamicPermissions[dynamicPermission];
            if (!permissionCondition) {
                // dynamic rule not provided for action
                return false;
            }

            return permissionCondition(data);
        }

        return false;
    };

    const checkEndpoint = () => {
        const endpoints = permissions.endpoints;
        if (endpoint && endpoints && endpoints.includes(endpoint)) {
            return true;
        }

        // This check works only for company owners.
        // It's using for getting access to all endpoints without adding new rules and should be deleted later.
        if (endpoints.includes("companyOwnerEndpointAccess"))
            return true;

        return false;
    };

    const isStaticPermit = staticPermission ? checkStaticPermission() : true;
    const isDynamicPermit = dynamicPermission ? checkDynamicPermission() : true;
    const isEndpointPermit = endpoint ? checkEndpoint() : true;

    return isStaticPermit && isDynamicPermit && isEndpointPermit
        ? children : (onDenied ? onDenied() : null);
};

const mapStateToProps = (state: IAppState) => ({
    role: state.user.info?.role
});

const mapDispatchToProps = {
   getUser: getUserRoutine
};

export default connect(mapStateToProps, mapDispatchToProps)(AccessManager);
