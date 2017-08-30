# Fake API

To install Fake on your website, copy the snippet below and paste it after the `<head>` tag. Replace the **CONSUMER_KEY** with your consumer key.

```html
<script async src="./fake.min.js"></script>
<script>
  window.fakeQueue = window.fakeQueue || [];
  function fake() { fakeQueue.push(arguments); }

  fake("install", "CONSUMER_KEY");
</script>
```

After adding the snippet above, you can use the Fake API to retrieve variation ids.

```html
<script>
  fake("getVariations", function(variations) {
      console.log("Variations: " + variations.join());
  });
</script>
```

This API ensures that your calls will be executed in order even if the fake script is still not yet loaded and ready to be executed.

For synchronous-only loading and module usage:

```javascript
import { fake } from Fake;
fake.getVariations((variations) => {
    console.log("Variations: " + variations.join());
});
```

## Demo

### Install

```bash
git clone git@github.com:renatoi/fake-sim.git
cd fake-sim && npm install .
```

### Start

```bash
npm start
```

### Test

```bash
npm test
```

### Dist

To generate the final minified file, run the command below. The generated file will be in the example dir.

```
npm run dist
```

------------------------------------------

# Fake Dashboard Design Document

The main goal of the dashboard is to provide the best experience to Fake customers so they can visualize, and make smart decisions quickly, and intuively. To accomplish this goal, here's a breakdown of the main priorities of the app:

  * Lightning fast
  * Reliable
  * Accurate & Realtime
  * Ubiquitous
  * Fast delivery

Based on the priorities above, a more detailed analysis might be required to choose the final architecture and tech stack, but here's a quick set of proposals.

## Server

The dashboard should have a thin server-side layer that has three primary roles:

1. Aggregates data requests to API servers.
2. Handle authentication and sessions.
3. Route requests from client and serve initial HTML.

Most of the interface logic will reside on the client. Data validation will be on the client, and all core validations will be done on the API.

## Recommendation

NodeJS + Express.

The primary reason to choose NodeJS over other languages relies on code reuse between client and server if necessary, specifically when it comes to processing templates. If React is the view library of choice on the client, then reusing components on the server can be trivial, making it possible to create isomorphic apps — that is, apps that can share its initial state on client and server, providing a faster and more complete time to first paint.

To make this possible using other languages we would need to maintain separate templates (components) in different view libraries between client and server, or using additional libraries and setup (node + JVM, for example). Language agnostic template engines such as Handlebars would make more sense in this case.

That said, since the server won't be primarily used for template processing and state isn't desired to be kept on the server, choosing a different language and web framework won't be highly impactful. This is why other alternatives such as Java + Play Framework are also good choices. In fact, when it comes to server-side languages, my preferred choice is Java, as I believe a more stable, robust, strongly-typed language makes more sense on the server. However, given that the server is a frontend server and has to potentially deal with template processing, my recommendation is to choose Node.

The web framework such as Express or Play Framework are the preferred choices primarily because they are lightweight while also providing useful APIs to deal with routing, CSRF, and easy integration with modern web apps (websockets for real time data). They also have constant stable releases and a big community.

In summary, the stack I recommend is one that provides the fastest experience to the user while also maintaining sanity for developers to deliver fast with quality.

## Data

GraphQL, a data query language, should be used on server and client for data requests to prevent over-fetching and under-fetching of data. This greatly reduces extra data that is usually not needed by the client.

## Client

The client is where the bulk of the code will be. Most dashboard interactions won't need a full page refresh. This can be done using single page application frameworks such as React (with Redux and React Router), or Angular 2.

A more detailed analysis is required but here's a quick breakdown.

### Recommendation:

  * React: View library.
  * Redux: State container library.
  * React Router: Handle router.

The reason why I listed 3 different libraries is because React itself is not a framework. React is just the view layer. Additional libraries are required to provide the same capabilities that a SPA framework would.

One of the problems of SPA frameworks is that they usually provide more than what is needed for the project. This can negatively affect the performance because of a higher payload to download. The main problem of non-isomorphic SPA is that they only let the browser render or have its UI interactive once the entire javascript bundle has been downloaded. Depending on the application this can surpass 500k (and sometimes even greater than 1MB) minified and gzipped. On 3G connections this can be significantly slow. There are many techniques to prevent slow time to first paint in SPAs such as smarter split of js bundles, tree shaking, among other techniques. However the user will usually have to pay a higher cost for the initial load in order to gain faster render for subsequent interactions.

For this reason, it's important to choose a good lightweight framework or cherry pick good and small libraries (when necessary).

React, as a view library, takes care of a few important things:

1. Browser abstraction for most event handling and DOM manipulation.
2. HTML + JS = JSX. Templates require logic. Loops and iteration, conditions, data transformations, are always used inside of templates. A language agnostic template engine such as Handlebars/Mustache or HTML + ng-attributes (Angular) requires developers to write templates in its own special language which most often falls short of the full power of an actual language. JSX is a javascript file with the possibility to write HTML elements. Giving developers the power of JS for templates. React doesn't need JSX, we can write it fully in JS. But JSX makes it easier to read.
3. UI Component = Presentation + Behavior. A UI component alone cannot be fully used if its template, css, and JS is present. For example, a Typeahead component or a Calendar component requires all 3 things to be available. When developing UI components, it's easier to develop them as a single unit. React takes care of behavior and templating, while CSS can be separate or bundled together in the JSX.

Redux and React Router are just the most used libraries in the industry that plays well with React. Further evaluatiuon is necessary to see if other frameworks are better. One alternative is the Fluxible framework, developed at Yahoo.

### Other alternatives:

  * Vanilla with Mixed libraries: Another alternative is to use less frameworks and tools with the goal to have less abstractions, reduce complexity, and rely on smaller libraries only when absolutely needed. The main reason for this is to take advantage of the latest advancements of browsers, including progressive web apps, and web components.
  * Angular 2: TypeScript is the main benefit here. It prevents common errors by introducing types in Javascript while also allowing the use modern javascript syntax that can be transpiled to older versions.

### Data visualization

  * D3 for creating new charts
  * Highcharts

Creating new types of charts for data visualization can be done using D3. For most charts I advise using Highcharts.js that provides a big set of charts maintained by a data visualization team with full support.

Creating trivial charts are not hard using D3, especially given the popularity of the library and its huge community. However, I advise using Highcharts primarily because developing and maintaining charts, especially more elaborated charts, can become expensive really fast. Choosing a stable and industry-proof library allows more time to focus on other parts of the app, providing better value to Fake customers.

### Build tools

  * Tape: Test framework + Selenium WebDriver
  * WebPack: Pack JS files, using loaders to help transpile ES6, ES6+, CSS (with additional features).
