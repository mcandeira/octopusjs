# OctopusJS 🐙 

Develop smart frontend components with the raw power of native HTML, CSS and JavaScript using this high-performance distributed intelligence framework.

<div style="display:flex; gap:10px; flex-wrap:wrap;">
    <img src="https://img.shields.io/badge/Performance-~12ms%20(1k%20items)-seagreen?style=for-the-badge" alt="Performance">
    <img src="https://img.shields.io/badge/Size-6.4kB%20Gzipped-007ec6?style=for-the-badge" alt="Size">
    <img src="https://img.shields.io/badge/Logic-Distributed%20Intelligence-darkorchid?style=for-the-badge" alt="Logic">
    <img src="https://img.shields.io/badge/Dependencies-0-fe7d37?style=for-the-badge" alt="Dependencies">
    <img src="https://img.shields.io/npm/v/octopus-js-native?style=for-the-badge&color=critical" alt="NPM Version">
</div>

<hr>

Render 1,000 reactive components in **~12ms** (logic execution) using only native web standards.

![OctopusJS Performance Demo](./assets/demo.gif)

>Check out the [Live Demo](https://mcandeira.github.io/octopusjs/).

[<h2 id="table">Table of Contents</h2>](#table)

+ [What It Is](#what-it-is)
+ [Advantages](#advantages)
+ [Quick Start](#quick)
+ [How To Use](#use)
+ [OctopusJS Features](#features)
+ [Advanced Use Cases](#advanced)
+ [Release Notes](#release)
+ [Live Demo](https://mcandeira.github.io/octopusjs/)
+ [Benchmarks & Comparison](#benchmarks)
+ [Contact & Community](#contact)
+ [License & Acknowledgments](#footer)


[<h2 id="what-it-is">What It Is</h2>](#what-it-is)

OctopusJS is a high-performance, distributed intelligence frontend development framework designed for web developers who demand an intuitive and blazing-fast DX (Developer Experience) alongside "science-fiction" execution speeds.

Unlike traditional frameworks, OctopusJS **does not alter** the underlying behavior of web technologies. Instead, it leverages them directly, ensuring full compatibility with all native features. This allows developers to easily build sophisticated components without sacrificing the freedom and raw power of native HTML, CSS, and JavaScript.

To achieve this, OctopusJS distributes its logic across **Octopus Components**. These components represent a new paradigm in web development, allowing you to manage encapsulated logic, styles, and templates using pure web standards.


[Table of Contents](#table)


[<h2 id="advantages">Advantages</h2>](#advantages)

+ 🏎️ **As fast as Vanilla:** Octopus Components run directly on the browser without abstractions so the overhead is literally zero.

+ 🪶 **Featherweight:** At 6.4kB Gzipped, it flies on any device and keeps the memory footprint at an absolute minimum.

+ 🌐 **Pure HTML Components:** Build encapsulated components with scoped logic and styles directly inside HTML. If you know HTML, CSS and JavaScript, you already know OctopusJS.

+ 🚀 **Raw Power:** You have direct access to the full potential of the web platform. No abstractions to limit your creativity or performance.

+ 🔌 **Ready to Use:** Incredibly easy to pick up and lightning-fast to master.

+ 🛡️ **Strong Architecture:** Designed from the ground up to be highly fault-tolerant and secure.

+ 🛠️ **Ecosystem Ready:** Fully compatible with any other frontend library or backend framework. Keep your views in your server and let OctopusJS handle the client-side reactivity without friction.

[Table of Contents](#table)


[<h2 id="quick">🚀 Quick Start (in 60 seconds)</h2>](#quick)

Experience the zero-build philosophy in less than 60 seconds:

1. **Prepare your environment:** Open `VS Code` and install the `Live Preview` extension.

2. **Create the file:** Create a new `component.html` file.

3. **Paste the code:** Copy and paste the following snippet:

    ```html
    <div>
        <h1>Quick OctopusJS Example 🐙</h1>
        <input type="text" placeholder="Add your favorite movies...">
        <button>Add</button>

        <ul></ul>

        <template>
            8{for movie in movies}
                <li>
                    <span>{{ movie.name }}</span>
                </li>
            8{endfor}
        </template>

        <script type="module" class="octopus">
            import { octopus } from 'https://unpkg.com/octopus-js-native/dist/octopus.min.js'

            const component = octopus.getComponent(this)
            const template = component.getChild('template')
            const input = component.getChild('input')
            const button = component.getChild('button')
            const list = component.getChild('ul')

            const movies = []

            button.use('addEventListener', 'click', () => {
                const value = input.get('value')
                if(value){
                    movies.push({ name: value })
                    component.render([template, {movies}], 'into', list)
                    input.set('value', '')
                }
            })
        </script>

        <style>
            @scope{
                ul{padding: 0px;}
                li{
                    background-color: darkorchid;
                    color: white;
                    list-style-type: none;
                    border-radius: 5px;
                    padding: 10px;
                    margin: 5px;
                }
            }
        </style>
    </div>
    ```
4. **Launch:** Right-click on the code or the file name and select "Show Preview". That's it! You have a reactive component running natively.

### Now What? 🛠️

+ **Experiment:** Change the HTML code to whatever you want.

+ **Program:** Change all the JS code to whatever you want. OctopusJS provides lightweight utility functions, but it never blocks you. You retain full freedom to manipulate the DOM directly using Vanilla JS.

+ **Design:** Change the CSS styles to whatever you want.

### Ready for more?

To seriously use OctopusJS, continue reading.

[Table of Contents](#table)


[<h2 id="use">How To Use</h2>](#use)

[<h3 id="install">How To Install</h3>](#install)

You can integrate OctopusJS into your project using your preferred method:

#### 1\. Via NPM (Recommended for modern workflows)

Install the package using your favorite package manager:

```bash
npm install octopus-js-native
```

Then, you can import it directly into your JavaScript modules:

```javascript
import { octopus } from 'octopus-js-native'
```

#### 2\. Via CDN (Quick start)

For fast prototyping, static pages or zero-build projects, you can include OctopusJS directly from a CDN like Unpkg or JSDelivr:

```html
<script type="module">
    import { octopus } from 'https://unpkg.com/octopus-js-native/dist/octopus.min.js'
</script>
```

#### 3\. Local Download

If you prefer total control, simply download the `octopus.min.js` file from the `dist` folder in our [GitHub repository](https://github.com/mcandeira/octopusjs) and include it locally in your project.


[<h3 id="octopus-components">How To Use Octopus Components</h3>](#octopus-components)

An Octopus Component is primarily defined by a block-level HTML element that acts as a wrapper for the component. Inside this wrapper you can place the structure, behavior and style of your component without worrying about anything outside. Your Octopus Component always will work exactly as you designed it, regardless of where you place it.

To learn how to use an Octopus Component, follow these steps:

+ #### [<a id="wrapper">Create a wrapper for the Octopus Component:</a>](#wrapper)

    First, you have to use a block-level HTML element (like a `<div>`, `<section>`, or `<article>`) that serves as a wrapper for the Octopus Component. Then you can divide it conceptually into three sections: Structure, Behavior and Style.

    ```html
    <div>
        <!-- Structure -->

        <!-- Behavior -->

        <!-- Style -->
    </div>
    ```

+ #### [<a id="structure">Make the Structure of the Octopus Component:</a>](#structure)

    In the Structure section you can use any HTML element you want. For example:

    ```html
    <div>
        <h1>Octopus Component</h1>

        <template>
            8{if active}
                <p>The {{ name }} is here.</p>
            8{endif}
        </template>

        <!-- Behavior -->

        <!-- Style -->
    </div>
    ```

    Inside each `<template>` element you can define structural fragments that are not rendered initially but can be injected dynamically using JavaScript. In this case, we use the **[8-branch octopus syntax](#syntax)** (inspired by Twig syntax) to inject dynamic values ("{{ val }}") and handle logic ("8{if condition}").

+ #### [<a id="behavior">Code the Behavior of the Octopus Component:</a>](#behavior)

    To code the behavior of an Octopus Component you have to use an HTML `<script>` element with a `type="module"` attribute. The JavaScript logic within is entirely under your control:

    ```html
    <div>
        <h1>Octopus Component</h1>

        <template>
            8{if active}
                <p>The {{ name }} is here.</p>
            8{endif}
        </template>

        <script type="module">
            // Your JS code goes here
        </script>

        <!-- Style -->
    </div>
    ```

    For example, we could take the code inside the `<template>` element and inject it in the structure. To do this, we will import the OctopusJS framework and use the `class="octopus"` attribute as follows:

    ```html
    <div>
        <h1>Octopus Component</h1>

        <template>
            8{if active}
                <p>The {{ name }} is here.</p>
            8{endif}
        </template>

        <script type="module" class="octopus">
            import { octopus } from 'octopus-js-native'
            {
                const component = octopus.getComponent(this)
                const template = component.getChild('template')

                const data = {
                    name: 'Abyssal Octopus',
                    active: true,
                }

                component.render([template, data])
            }
        </script>

        <!-- Style -->
    </div>
    ```

    > 🐙 **The `class="octopus"` attribute** helps OctopusJS resolve the component's scope instantly.

    > 💡 **The `this` keyword** in this context returns `undefined` so you can omit it. However, explicitly passing `this` gives more semantic meaning to the operation.

    > 📦 **The `{ }` scope guard** prevents some editors from incorrectly flagging duplicate variable names when using multiple Octopus components in the same file.

    > ⚡ **Pure JavaScript:** You are not limited to use OctopusJS features; you can use any native Web API or third-party library inside the script.

    > 🛡️ **Scope Protection:** Using `type="module"` is mandatory to ensure encapsulation and use OctopusJS properly.

+ #### [<a id="style">Define the Style of the Octopus Component:</a>](#style)

    Finally, to style your component you can use an HTML `<style>` element. To ensure absolute encapsulation and avoid style leakage, we leverage the native `@scope` rule:

    ```html
    <div>
        <h1>Octopus Component</h1>

        <template>
            8{if active}
                <p>The {{ name }} is here.</p>
            8{endif}
        </template>

        <script type="module" class="octopus">
            import { octopus } from 'octopus-js-native'
            {
                const component = octopus.getComponent(this)
                const template = component.getChild('template')

                const data = {
                    name: 'Abyssal Octopus',
                    active: true,
                }

                component.render([template, data])
            }
        </script>

        <style>
            @scope{
                > h1 {
                    padding: 20px;
                    background-color: darkorchid;
                    color: white;
                }
            }
        </style>
    </div>
    ```

    > 🎨 **Best Practice:** Use appropriate CSS combinators (like `>`) to target elements precisely within your component's scope.

**And that's it\!** You now have a fully encapsulated, high-performance Octopus Component. You can drop it anywhere in your HTML, confident that its logic, structure, and styles will remain isolated and conflict-free. **It just works, perfectly.**


[<h3 id="syntax">Octopus 8-Branch Syntax</h3>](#syntax)

OctopusJS uses a proprietary, high-performance logic syntax inspired by Twig but optimized for client-side execution.

1. #### Variables & Interpolation
    
    Use double curly braces to safely inject text data into your HTML. If you need to render active HTML code directly, use the raw keyword:

    ```html
    <template>
        <span>Welcome, {{ user.name }}!</span>
        {{raw loginAnchor}}
    </template>
    ```

2. #### Conditionals (8{if})
    
    ```html
    <template>
        8{if isAdmin}
            <button>Delete Records</button>
        8{else}
            <p>View only mode</p>
        8{endif}
    </template>
    ```

3. #### Loops (8{for})

    ```html
    <template>
        <ul>
            8{for product in catalog}
                <li>{{ product.title }} - {{ product.price }}$</li>
            8{endfor}
        </ul>
    </template>
    ```

4. #### Why the 8?

    The 8 prefix is more than just a brand; it's a strategic technical choice. It ensures that the syntax never collides with server-side template engines (like Twig, Blade, or Jinja). You can write OctopusJS logic inside your backend views without escaping a single character.


[<h3 id="nested">Nested Components</h3>](#nested)

OctopusJS is built on an atomic architecture. To nest an Octopus Component inside another, you simply place it within the parent's structure. Each component remains an independent entity, managing its own scope, logic, and life cycle without interfering with its neighbors.

```html
<div>
    <h1>Octopus Components</h1>

    <div>
        <h2>I am a nested child</h2>

        <template>
            <p>Child render: Success!</p>
        </template>

        <script type="module" class="octopus">
            import { octopus } from 'octopus-js-native'

            const component = octopus.getComponent(this)
            const template = component.getChild('template')

            component.render(template)
        </script>

        <style>
            @scope{
                > h2 {
                    margin: 80px 0px 70px 0px;
                    color: darkslategray;
                    font-size: 24pt;
                }
            }
        </style>
    </div>

    <template>
        <p>Parent render: Also success!</p>
    </template>

    <script type="module" class="octopus">
        import { octopus } from 'octopus-js-native'

        const component = octopus.getComponent(this)
        const template = component.getChild('template')

        component.render(template)
    </script>

    <style>
        @scope{
            > h1 {
                padding: 20px;
                background-color: darkorchid;
                color: white;
            }
        }
    </style>
</div>
```

[Table of Contents](#table)


[<h2 id="features">OctopusJS Features</h2>](#features)

The OctopusJS library provides a robust API through the `octopus` "constant". It is designed to handle everything from DOM manipulation to complex inter-component state management.

### 1. Component Lifecycle & DOM Management
Accessed via `octopus.getComponent()`, these methods provide granular control over the component's internal universe:

* **`ref`**: (Getter) Returns the native DOM reference of the component wrapper.
* **`getChild(selector)`**: A scoped query selector to safely access elements within the component.
* **`set(prop, val)`**: Set the property of the underlying HTML element.
* **`get(prop)`**: Get the property value of the underlying HTML element.
* **`use(method, ...args)`**: Invokes any native method of the underlying HTML element.
* **`deleteAll(selector)`**: Efficiently removes all matching child elements from the DOM.
* **`onMount(callback)`**: Executes code as soon as the component is effectively attached to the DOM.
* **`onUnmount(callback)`**: Triggers when the component is removed from the DOM.
* **`render(input, position, relativeElement)`**: The engine that injects templates or strings.

### 2. Parent-Child Communication (Directed Flow)
Built-in methods to bridge the gap between nested components:

* **`sendProp()` & `receiveProp()`**: Allows a parent to pass data down to its children (Top-down data flow).
* **`sendParent()` & `receiveChild()`**: Enables a child to emit data or signals up to its parent (Bottom-up event flow).

### 3. The "Global Bridge" (Decoupled Communication)
These functions allow any two components to talk to each other, even if they aren't related in the DOM tree:

* **`sendValue()` & `receiveValue()`**: A lightweight global state manager to share reactive values.
* **`sendHelper()` & `receiveHelper()`**: Register and reuse utility functions across your entire application.
* **`setAction()` & `triggerAction()`**: A powerful command pattern to trigger specific behaviors remotely.

### 4. Advanced Server Integration
* **`fullActive()`**: Enables OctopusJS to orchestrate all server-side information exchange, turning your app into a high-performance, reactive SPA (Single Page Application) engine.


[Table of Contents](#table)


[<h2 id="advanced">Advanced Use Cases</h2>](#advanced)

OctopusJS doesn't impose arbitrary limits on your creativity. Its architecture is designed to scale with your component's complexity.

+ #### Advanced Structure:
    In an Octopus Component, **everything** outside of `<style>` and `<script>` tags is considered part of the Structure. This allows for seamless mixing of static content and dynamic fragments.
    
    Furthermore, `<template>` elements are fully recursive: they can contain other Octopus Components and complex logic using the **8-branch syntax**, enabling the creation of sophisticated, data-driven UI trees.

+ #### Modular Behavior and Styles:
    You are not restricted to a single script or style tag. You can fragment your component's logic and aesthetics for better maintainability:

    * **Multiple Scripts:** Place as many `<script type="module">` tags as needed. Use the `title` attribute to differentiate them (e.g., `title="logic"`, `title="events"`).
    * **Multiple Styles:** Use several `<style>` blocks to organize your CSS. By using `@scope` in each, you maintain perfect encapsulation while keeping your styles modular.

    This "Multi-Tag" approach allows you to separate concerns within the same component wrapper without any performance penalty.


[<h3 id="behind">What happens behind?</h3>](#behind)

Most modern frameworks rely on a **Virtual DOM**—a heavy, memory-consuming abstraction that acts as a middleman between your code and the browser. They constantly "diff" two massive trees of data to decide what to change.

**OctopusJS takes a different path.** It embraces the "Silicium Way": **Direct, Atomic, and Distributed.**

#### 1\. No Virtual DOM, No Overhead

OctopusJS doesn't waste cycles comparing virtual trees. It uses **Direct DOM Manipulation** through highly optimized native methods. When a component renders, it's not "calculating" a change; it's performing an **atomic injection** directly into the browser's render tree.

#### 2\. Distributed Intelligence

Instead of a centralized "Engine" that manages the entire application state (and slows down as the app grows), OctopusJS distributes the workload.

  * Each **OctopusComponent** is an independent, self-managed unit.
  * When a component updates, **only that component's scope is affected.**
  * The rest of the application remains untouched, ensuring that performance stays constant regardless of the application's size.

#### 3\. Native Standard Alignment

By using `@scope` for CSS and `type="module"` for JS, we offload the heavy lifting of encapsulation to the browser's C++ core instead of simulating it with expensive JavaScript workarounds.

> **The Result:** A framework that doesn't fight the browser, but flows with it. That's how we achieve **~12ms (avg)** for logic execution and near-vanilla speeds () for full DOM paint of 1,000 complet items while others are still parsing their virtual trees.

[Table of Contents](#table)


[<h2 id="release">Release Notes</h2>](#release)

> The "Abyssal Octopus" emerges from the deep abyss to show to the world its awesome intelligence, spectacular efficiency, and unparalleled agility in wielding the DOM.
>
> The v1.0.0 "Abyssal Octopus" release is a statement of intent. Tired of false promises of "better DX" that turn into development nightmares, OctopusJS comes to offer developers a true path to the pinnacle of performance and freedom.

[Table of Contents](#table)


[<h2 id="benchmarks">Benchmarks & Comparison</h2>](#benchmarks)

The [OctopusJS benchmark](https://github.com/mcandeira/octopusjs/blob/main/assets/benchmarks/benchmark_octopus.html) was tested against the [Vanilla JS standard benchmark](https://github.com/mcandeira/octopusjs/blob/main/assets/benchmarks/benchmark_vanilla.html). The following results show the time (in milliseconds) required to render and mount **1,000 complex items** into the DOM.

| Framework          | Render Time (1k items) | Relative Speed | Size (Gzipped) |
|--------------------|------------------------|----------------|----------------------|
| 🧊 Vanilla JS      | ~53.3ms (avg)          | 1.00x          | 0kB            |
| 🐙 **OctopusJS**   | **~54.8ms (avg)**      | 1.03x          | **6.4kB** |
| ⚡ Svelte / Solid   | ~59.0ms (avg)          | 1.10x          | ~7kB            |
| 💚 Vue 3           | ~64.0ms (avg)          | 1.20x          | ~33kB            |
| ⚛️ React 18        | ~75ms                  | 1.40x          | ~42kB          |
| 🅰️ Angular         | ~80.0ms                | 1.50x          | ~65kB          |

> Note: Vanilla JS and OctopusJS times are exact hardware measurements. Times for Svelte, Vue, React, and Angular are extrapolated based on their official js-framework-benchmark relative multipliers applied to the same Vanilla JS baseline. OctopusJS achieves near-vanilla speeds by eliminating the Virtual DOM overhead entirely.

[Table of Contents](#table)


[<h2 id="contact">Contact & Community</h2>](#contact)

OctopusJS is a project born from the passion for a better faster web development experience. If you want to contribute, report a bug, or simply share your experience, feel free to reach out:

+ **GitHub:** [Report an Issue](https://github.com/mcandeira/octopusjs/issues)
+ **Email:** mcandeira.code@gmail.com

**Let's build a better web together. 🐙**

[Table of Contents](#table)


[<h2 id="footer">License & Acknowledgments</h2>](#footer)

+ **License:** Distributed under the **MIT License**. See `LICENSE` for more information.
+ **Collaborative Engineering:** A special thanks to **Gemini (Google AI)** for its insightful role as a "Silicon Partner" in the documentation, release and improvement of this project.

[Table of Contents](#table)