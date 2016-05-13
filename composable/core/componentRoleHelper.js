/**
 * Created by nd on 15/03/2016.
 */

function ComponentRoleHelper (composable) {
    var helper = this;

    var componentRoles = {};

    helper.getComponentListForRole = getComponentListForRole;
    helper.generateComponentListGetterForRole = generateComponentListGetterForRole;

    function getComponentListForRole(role) {
        if (!componentRoles[role]) {
            componentRoles[role] = [];
        }
        return componentRoles[role];
    }

    function generateComponentListGetterForRole(role){
        if (!composable["get" + role + "List"]) {
            composable["get" + role + "List"] = function () {
                return componentRoles[role];
            };
        }
    }
}
