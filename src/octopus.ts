import { OctopusComponent } from './periferics/OctopusComponent.ts'
import { OctopusNervousSystem } from './periferics/nervous/OctopusNervousSystem.ts'
import { OctopusMind } from './control/OctopusMind.ts'

import type { Selector } from './periferics/OctopusUtils.ts'

export class octopus {

    private constructor(){}

    /**
     * Factory method to instantiate an OctopusComponent object.
     * @static
     * @param {Selector} [selector=undefined] - CSS Selector, DOM Element or undefined (for self-discovery of the OctopusComponent).
     * @returns {OctopusComponent} A new OctopusComponent instance.
     */
    static getComponent(selector: Selector = undefined): OctopusComponent
    {
        return new OctopusComponent(selector)
    }

/* =====================================================================
    OCTOPUS VALUES
   ===================================================================== */

    /**
     * Sends a value to the Octopus Central Nervous System.
     * @static
     * @param {string} name - The name of the value.
     * @param {any} [value=undefined] - The optional data payload to send.
     * @param {string|undefined} [password=undefined] - Prevents write access to the value by password.
     * @param {boolean} [accessible=true] - If true, allows public read access. If false, prevents public read access by password.
     * @returns {void}
     */
    static sendValue(name: string, value: any = undefined, password: string|undefined = undefined, accessible: boolean = true): void
    {
        OctopusNervousSystem.sendValue(name, value, password, accessible)
    }

    /**
     * Receives the value sent to the Octopus Central Nervous System.
     * @static
     * @param {string} name - The name of the sent value.
     * @param {Function} callback - The function to execute.
     * @param {boolean|undefined} [immediate=undefined] 
     * - If true: Forces immediate execution even if the value was not yet sent (undefined).
     * - If false: The execution always waits to the next sent value.
     * - If undefined: Executes as soon as the value is available.
     * @param {boolean} [once=false] - If true, the receiver will execute only once. If false, the receiver will execute whenever the value changes.
     * @param {string|undefined} [password=undefined] - Allows receiving private values protected by password.
     * @returns {void}
     */
    static receiveValue(name: string, callback: Function, immediate: boolean|undefined = undefined, once: boolean = false, password: string|undefined = undefined): void
    {
        OctopusNervousSystem.receiveValue(name, callback, immediate, once, password)
    }

/* =====================================================================
    OCTOPUS HELPERS
   ===================================================================== */

    /**
     * Sends a helper function to the Octopus Central Nervous System.
     * @static
     * @param {string} name - The name of the helper.
     * @param {Function} helper - The helper function to send.
     * @param {string|undefined} [password=undefined] - Prevents write access to the helper by password.
     * @param {boolean} [accessible=true] - If true, allows public read access. If false, prevents public read access by password.
     * @returns {void}
     */
    static sendHelper(name: string, helper: Function, password: string|undefined = undefined, accessible: boolean = true): void
    {
        OctopusNervousSystem.sendHelper(name, helper, password, accessible)
    }

    /**
     * Receives the helper function sent to the Octopus Central Nervous System.
     * @static
     * @param {string} name - The name of the sent helper.
     * @param {Function} callback - The function to execute.
     * @param {boolean|undefined} [immediate=undefined] 
     * - If true: Forces immediate execution even if the helper was not yet sent (undefined).
     * - If false: The execution always waits to the next sent helper.
     * - If undefined: Executes as soon as the helper is available.
     * @param {boolean} [once=true] - If true, the receiver will execute only once. If false, the receiver will execute whenever the helper changes.
     * @param {string|undefined} [password=undefined] - Allows receiving private values protected by password.
     * @returns {void}
     */
    static receiveHelper(name: string, callback: Function, immediate: boolean|undefined = undefined, once: boolean = true, password: string|undefined = undefined): void
    {
        OctopusNervousSystem.receiveHelper(name, callback, immediate, once, password)
    }

/* =====================================================================
    OCTOPUS ACTIONS
   ===================================================================== */

    /**
     * Sets an action in the Octopus Central Nervous System.
     * @static
     * @param {string} name - The name of the action to set.
     * @param {Function} action - The action function to set.
     * @param {boolean|undefined} [immediate=undefined] 
     * - If true: Forces immediate execution even if a trigger was not yet sent (undefined).
     * - If false: The execution always waits to the next trigger.
     * - If undefined: Executes as soon as a trigger is available.
     * @param {boolean} [once=false] - If true, the action will execute only once. If false, the action will execute whenever it is triggered.
     * @param {string|undefined} [password=undefined] - Allows reacting to private triggers protected by password.
     * @returns {void}
     */
    static setAction(name: string, action: Function, immediate: boolean|undefined = undefined, once: boolean = false, password: string|undefined = undefined): void
    {
        OctopusNervousSystem.setAction(name, action, immediate, once, password)
    }

    /**
     * Triggers an action set in the Octopus Central Nervous System.
     * @static
     * @param {string} name - The name of the action to trigger.
     * @param {any} [value=undefined] - The optional data payload to pass to the action.
     * @param {string|undefined} [password=undefined] - Prevents write access to the value by password.
     * @param {boolean} [accessible=true] - If true, allows public read access. If false, prevents public read access by password.
     * @returns {void}
     */
    static triggerAction(name: string, value: any = undefined, password: string|undefined = undefined, accessible: boolean = true): void
    {
        OctopusNervousSystem.triggerAction(name, value, password, accessible)
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