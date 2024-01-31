# HMR ISSUE

react_devtools_backend_compact.js:2367 ReferenceError: Cannot access 'withRouter' before initialization
at PageSessionListing.tsx:439:16

react_devtools_backend_compact.js:2367 [hmr] Failed to reload /src/view/PageFoundation/PageFoundation.tsx. This could be due to syntax errors or importing non-existent modules. (see errors above)

## solution

reload vite server or press r in terminal or reload browser

# Adding new folder under src

if you add a new folder directly under src Please make sure to add alias in vite.config.js
