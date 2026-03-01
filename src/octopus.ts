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
     * Sets a value in the Octopus Central Nervous System.
     * @static
     * @param {string} name - The unique name for the value.
     * @param {any} value - The data payload to set.
     * @param {boolean} [override=false] - If true, overwrites an existing value with the same name.
     * @returns {void}
     */ 
    static setValue(name: string, value: any, override: boolean = false): void
    {
        OctopusNervousSystem.setValue(name, value, override)
    }

    /**
     * Receive the value setted in the Octopus Central Nervous System.
     * @static
     * @param {string} name - The name of the setted value.
     * @param {Function} callback - The function to execute when the value is available.
     * @param {boolean} [remember=true] - If true, the value will be received whenever it changes.
     * @returns {void}
     */
    static receiveValue(name: string, callback: Function, remember: boolean = true): void
    {
        OctopusNervousSystem.receiveValue(name, callback, remember)
    }

/* =====================================================================
    OCTOPUS PROTECTED VALUES
   ===================================================================== */

    /**
     * Sets a value protected by password in the Octopus Central Nervous System.
     * @static
     * @param {string} name - The unique name for the protected value.
     * @param {any} value - The protected data payload to set.
     * @param {string} password - The password required to access the value.
     * @returns {void}
     */
    static setProtected(name: string, value: any, password: string): void
    {
        OctopusNervousSystem.setProtected(name, value, password)
    }

    /**
     * Receive the protected value setted in the Octopus Central Nervous System.
     * @static
     * @param {string} name - The name of the protected value.
     * @param {string} password - The password required to access the value.
     * @param {Function} callback - The function to execute when the protected value is available.
     * @param {boolean} [remember=true] - If true, the protected value will be received whenever it changes.
     * @returns {void}
     */
    static receiveProtected(name: string, password: string, callback: Function, remember: boolean = true): void
    {
        OctopusNervousSystem.receiveProtected(name, password, callback, remember)
    }

/* =====================================================================
    OCTOPUS HELPERS
   ===================================================================== */

    /**
     * Sets a helper function in the Octopus Central Nervous System.
     * @static
     * @param {string} name - The unique name for the setted helper.
     * @param {Function} callback - The helper function to set.
     * @param {boolean} [override=false] - If true, overwrites an existing helper with the same name.
     * @returns {void}
     */
    static setHelper(name: string, callback: Function, override: boolean = false): void
    {
        OctopusNervousSystem.setHelper(name, callback, override)
    }

    /**
     * Receive the helper function setted in the Octopus Central Nervous System.
     * @static
     * @param {string} name - The name of the setted helper.
     * @param {Function} callback - The function to execute when the helper is available.
     * @param {boolean} [remember=false] - If true, the helper will be received whenever it changes.
     * @returns {void}
     */
    static receiveHelper(name: string, callback: Function, remember: boolean = false): void
    {
        OctopusNervousSystem.receiveHelper(name, callback, remember)
    }

/* =====================================================================
    OCTOPUS ACTIONS
   ===================================================================== */

    /**
     * Sets a action function in the Octopus Central Nervous System.
     * @static
     * @param {string} name - The unique name for the action.
     * @param {Function} action - The action function to set.
     * @param {boolean} [override=false] - If true, overwrites an existing action with the same name.
     * @returns {void}
     */
    static setAction(name: string, action: Function, override: boolean = false): void
    {
        OctopusNervousSystem.setAction(name, action, override)
    }

    /**
     * Triggers a action setted in the Octopus Central Nervous System.
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