# Intellimize API

To install Intellimize on your website, copy the snippet below and paste it after the `<head>` tag. Replace the CONSUMER_KEY with your consumer key.

```html
<script async src="./intellimize.min.js"></script>
<script>
  window.intellimizeQueue = window.intellimizeQueue || [];
  function intellimize() { intellimizeQueue.push(arguments); }
  
  intellimize("install", "CONSUMER_KEY");
</script>
```

After adding the snippet above, you can use the Intellimize API to retrieve variation ids.

```html
<script>
  intellimize("getVariations", function(variations) {
      console.log("Variations: " + variations.join());
  });
</script>
```

This API ensures that your calls will be executed in order even if the intellimize script is still not yet loaded and ready to be executed.

For synchronous-only loading and module usage:

```javascript
import { intellimize } from Intellimize;
intellimize.getVariations((variations) => {
    console.log("Variations: " + variations.join());
});
```

## Demo

### Install

```bash
git clone git@github.com:renatoi/intellimize-sim.git
cd intellimize-sim && npm install .
```

### Start

```bash
npm start
```

### Test

```bash
npm test
```

------------------------------------------

# Intellimize Dashboard Design Document

The main goal of the dashboard is to provide the best experience to Intellimize customers so they can visualize, and make smart decisions quickly, and intuively. To accomplish this goal, here's a breakdown of the main priorities of the app:

  * Lightning fast
  * Reliable
  * Accurate & Realtime
  * Ubiquitous

Based on the priorities above, a more detailed analysis might be required to choose the final architecture and tech stack, but here's a quick set of proposals.

## Server

The dashboard should have a thin server-side layer that has three primary roles:

1. Aggregates data requests to API servers.
2. Handle authentication and sessions.
3. Route requests from client and serve initial HTML.

Most of the interface logic will reside on the client. Data validation will be on the client, and all core validations will be done on the API.

### Stack:

Recommendation:

* NodeJS + Express

Other alternative:

* Java + Play Framework

## Data

  * GraphQL, a data query language, should be used on server and client for data requests to prevent over-fetching and under-fetching of data.

## Client

The client is where the bulk of the code will be. Most dashboard interactions won't need a full page refresh. This can be done using single page application frameworks such as React (with Redux and React Router), or Angular 2.

A more detailed analysis is required but here's a quick breakdown.

### Stack:

Recommendation:

  * React: View library.
  * Redux: State container library.
  * React Router: Handle router.

Other alternative:

  * Vanilla with Mixed libraries: Another alternative is to use less frameworks and tools with the goal to have less abstractions, reduce complexity, and rely on smaller libraries only when absolutely needed. The main reason for this is to take advantage of the latest advancements of browsers, including progressive web apps, and web components.
  * Angular 2: TypeScript is the main benefit here. It prevents common errors by introducing types in Javascript while also allowing the use modern javascript syntax that can be transpiled to older versions.

### Data visualization

  * D3 for creating new charts
  * Highcharts

Creating new types of charts for data visualization can be done using D3. For most charts I advise using Highcharts.js that provides a big set of charts maintained by a data visualization team with full support.

### Build tools

  * Tape: Test framework + Selenium WebDriver for 
  * WebPack: Pack JS files, using loaders to help transpile ES6, ES6+, CSS (with additional features).
