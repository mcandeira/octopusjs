import { OctopusComponent } from './periferics/OctopusComponent'
import { OctopusNervousSystem } from './periferics/OctopusNervousSystem'
import { OctopusMind } from './control/OctopusMind'

import type { Selector } from './periferics/OctopusUtils'

export class octopus {

    private constructor(){}

    /**
     * Factory method to instantiate an OctopusComponent object.
     * @static
     * @param {Selector} [selector] - CSS Selector, DOM Element or undefined (for self-discovery of the OctopusComponent).
     * @returns {OctopusComponent} A new OctopusComponent instance.
     */
    static getComponent(selector?: Selector): OctopusComponent
    {
        return new OctopusComponent(selector)
    }

/* =====================================================================
    OCTOPUS VALUES
   ===================================================================== */

    /**
     * Registers a value in the Octopus Central Nervous System.
     * @static
     * @param {string} name - The unique name for the value.
     * @param {any} value - The data payload to register.
     * @param {boolean} [override=false] - If true, overwrites an existing value with the same name.
     * @returns {void}
     */ 
    static registerValue(name: string, value: any, override: boolean = false): void
    {
        OctopusNervousSystem.registerValue(name, value, override)
    }

    /**
     * Subscribes a callback to a registered value in the Octopus Central Nervous System.
     * @static
     * @param {string} name - The name of the registered value.
     * @param {Function} callback - The function to execute when the value is available.
     * @param {boolean} [remember=true] - If true, the value will be deliver whenever it changes.
     * @returns {void}
     */
    static deliverValue(name: string, callback: Function, remember: boolean = true): void
    {
        OctopusNervousSystem.deliverValue(name, callback, remember)
    }

/* =====================================================================
    OCTOPUS PROTECTED
   ===================================================================== */

    /**
     * Registers a protected value that requires a password for access.
     * @static
     * @param {string} name - The unique name for the protected value.
     * @param {any} value - The sensitive data payload to register.
     * @param {string} password - The password required to retrieve the value.
     * @returns {void}
     */
    static registerProtected(name: string, value: any, password: string): void
    {
        OctopusNervousSystem.registerProtected(name, value, password)
    }

    /**
     * Subscribes a callback to a protected value, providing the required password.
     * @static
     * @param {string} name - The name of the protected value.
     * @param {string} password - The password required to unlock the value.
     * @param {Function} callback - The function to execute when the protected value is available.
     * @param {boolean} [remember=true] - If true, the value will be deliver whenever it changes.
     * @returns {void}
     */
    static deliverProtected(name: string, password: string, callback: Function, remember: boolean = true): void
    {
        OctopusNervousSystem.deliverProtected(name, password, callback, remember)
    }

/* =====================================================================
    OCTOPUS HELPERS
   ===================================================================== */

    /**
     * Registers a global helper function.
     * @static
     * @param {string} name - The unique name for the helper.
     * @param {Function} callback - The helper function to register.
     * @param {boolean} [override=false] - If true, overwrites an existing helper with the same name.
     * @returns {void}
     */
    static registerHelper(name: string, callback: Function, override: boolean = false): void
    {
        OctopusNervousSystem.registerHelper(name, callback, override)
    }

    /**
     * Retrieves or subscribes to a registered helper function.
     * @static
     * @param {string} name - The name of the registered helper.
     * @param {Function} callback - The function that will receive the helper.
     * @param {boolean} [remember=false] - If true, the helper will be deliver whenever it changes.
     * @returns {void}
     */
    static deliverHelper(name: string, callback: Function, remember: boolean = false): void
    {
        OctopusNervousSystem.deliverHelper(name, callback, remember)
    }

/* =====================================================================
    OCTOPUS ACTIONS
   ===================================================================== */

    /**
     * Registers a global action in the Octopus Central Nervous System.
     * @static
     * @param {string} name - The unique name for the action.
     * @param {Function} action - The action function to register.
     * @param {boolean} [override=false] - If true, overwrites an existing action with the same name.
     * @returns {void}
     */
    static registerAction(name: string, action: Function, override: boolean = false): void
    {
        OctopusNervousSystem.registerAction(name, action, override)
    }

    /**
     * Triggers a registered action, optionally passing a payload.
     * @static
     * @param {string} name - The name of the action to trigger.
     * @param {any} [value=undefined] - The optional payload to pass to the action.
     * @param {boolean} [remember=false] - If true, the action will trigger whenever it changes.
     * @returns {void}
     */
    static triggerAction(name: string, value: any = undefined, remember: boolean = false): void
    {
        OctopusNervousSystem.triggerAction(name, value, remember)
    }

/* =====================================================================
    OCTOPUS FULL ACTIVE
   ===================================================================== */

    /**
     * Delegate the exchange of information with the server to OctopusJS.
     * @static
     * @returns {void}
     */
    static fullActive(): void
    {
        OctopusMind.takeControl()
    }

}