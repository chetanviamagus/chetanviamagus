## After first download, run:

npm install

## To start in dev mode:

npm run start

## To build for prod:

npm run build

## CSS

index.js: Choose whether the CSS files (Theme & Icons) are needed - else comment out. e.g.

//import 'primereact/resources/themes/nova-light/theme.css';
import './asset/custom-theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './asset/custom.css';

Note:

- for the css that needs to be overridden in theme.css, use custom-theme.css
  - or comment out custom-theme.css & use primereact theme directly
- for the css that needs to be overridden in the primereact.min.css or primereact.css, use custom.css

## Boilerplate current status:

- ReactJs + Tailwind [done]
- Routing [done]
- Redux [done]
- Dark Mode
- Component Folder Structure [done]
- Auth Components [done]
- Services [done]
- Best practice for API Keys
- Basic Components Wrapper
- PrimeFaces [done]
- Primefaces Styling [done]
- Auth catch all [done]
  - Auth Validator [done]
  - Redirect to login, then take to original page..[done]
- 404 - redirect for missing pages [done]

## 9.0.0: 09-11-2023:18:23

- Moving from CRA to Vite: npm install --save-dev vite @vitejs/plugin-react vite-tsconfig-paths vite-plugin-svgr
- PS D:\react-js\boilerplate-react-web> npm audit

---

# npm audit report

axios <=0.21.1
Severity: high
Axios vulnerable to Server-Side Request Forgery - https://github.com/advisories/GHSA-4w2v-q235-vp99
axios Inefficient Regular Expression Complexity vulnerability - https://github.com/advisories/GHSA-cph5-m8f7-6c5x
Depends on vulnerable versions of follow-redirects
fix available via `npm audit fix --force`
Will install axios@1.6.1, which is a breaking change
node_modules/axios
axios-auth-refresh <=3.0.0
Depends on vulnerable versions of axios
node_modules/axios-auth-refresh

crypto-js <4.2.0
Severity: critical
crypto-js PBKDF2 1,000 times weaker than specified in 1993 and 1.3M times weaker than current standard - https://github.com/advisories/GHSA-xwcq-pm8m-c4vf
fix available via `npm audit fix`
node_modules/crypto-js

follow-redirects <=1.14.7
Severity: high
Exposure of sensitive information in follow-redirects - https://github.com/advisories/GHSA-74fj-2j2h-c42q
Exposure of Sensitive Information to an Unauthorized Actor in follow-redirects - https://github.com/advisories/GHSA-pw2r-vq6v-hr8c
fix available via `npm audit fix --force`
Will install axios@1.6.1, which is a breaking change
node_modules/follow-redirects

nth-check <2.0.1
Severity: high
Inefficient Regular Expression Complexity in nth-check - https://github.com/advisories/GHSA-rp65-9cf3-cjxr
fix available via `npm audit fix --force`
Will install react-scripts@3.0.1, which is a breaking change
node_modules/svgo/node_modules/nth-check
css-select <=3.1.0
Depends on vulnerable versions of nth-check
node_modules/svgo/node_modules/css-select
svgo 1.0.0 - 1.3.2
Depends on vulnerable versions of css-select
node_modules/svgo
@svgr/plugin-svgo <=5.5.0
Depends on vulnerable versions of svgo
node_modules/@svgr/plugin-svgo
@svgr/webpack 4.0.0 - 5.5.0
Depends on vulnerable versions of @svgr/plugin-svgo
node_modules/@svgr/webpack
react-scripts >=2.1.4
Depends on vulnerable versions of @svgr/webpack
Depends on vulnerable versions of resolve-url-loader
node_modules/react-scripts

postcss <8.4.31
Severity: moderate
PostCSS line return parsing error - https://github.com/advisories/GHSA-7fh5-64p2-3v2j
fix available via `npm audit fix --force`
Will install postcss-import@15.1.0, which is a breaking change
node_modules/postcss-import/node_modules/postcss
node_modules/resolve-url-loader/node_modules/postcss
postcss-import <=12.0.1
Depends on vulnerable versions of postcss
node_modules/postcss-import
resolve-url-loader 0.0.1-experiment-postcss || 3.0.0-alpha.1 - 4.0.0
Depends on vulnerable versions of postcss
node_modules/resolve-url-loader

13 vulnerabilities (4 moderate, 8 high, 1 critical)

To address issues that do not require attention, run:
npm audit fix

To address all issues (including breaking changes), run:
npm audit fix --force

---
