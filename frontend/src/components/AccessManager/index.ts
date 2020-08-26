import {rolesRules} from "./rbac-rules";
import {IAppState} from "../../models/IAppState";
import {connect} from "react-redux";
import {FC} from "react";

interface IAccessManagerProps {
    role: string;
    credentials: string;
    data?: any;
    children: any;
    denied?(): any | null;
}

const AccessManager: FC<IAccessManagerProps>= ({ role, credentials, data, children, denied }) => {
    const check = () => {
        const permissions = rolesRules[role];
        if (!permissions) {
            // role is not present
            return false;
        }

        const staticPermissions = permissions.static;
        if (staticPermissions && staticPermissions.includes(credentials)) {
            // static rule not provided for action
            return true;
        }

        const dynamicPermissions = permissions.dynamic;
        if (dynamicPermissions) {
            const permissionCondition = dynamicPermissions[credentials];
            if (!permissionCondition) {
                // dynamic rule not provided for action
                return false;
            }

            return permissionCondition(data);
        }
        return false;
    };

    return check() ? children
        : (denied ? denied() : null);
};

const mapStateToProps = (state: IAppState) => {
    return {
        role: state.user.info?.role
    };
};

export default connect(mapStateToProps)(AccessManager);