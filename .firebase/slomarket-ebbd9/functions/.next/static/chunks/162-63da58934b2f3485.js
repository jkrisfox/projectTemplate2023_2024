(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[162],{82477:function(e,t,r){"use strict";var n=r(26314);t.Z=void 0;var o=n(r(80984)),a=r(57437),i=(0,o.default)((0,a.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z"}),"AccountCircle");t.Z=i},11116:function(e,t,r){"use strict";var n=r(26314);t.Z=void 0;var o=n(r(80984)),a=r(57437),i=(0,o.default)((0,a.jsx)("path",{d:"m7 10 5 5 5-5z"}),"ArrowDropDown");t.Z=i},58991:function(e,t,r){"use strict";var n=r(26314);t.Z=void 0;var o=n(r(80984)),a=r(57437),i=(0,o.default)((0,a.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),"Search");t.Z=i},76500:function(e,t,r){"use strict";r.d(t,{Z:function(){return b}});var n=r(20791),o=r(13428),a=r(2265),i=r(7216),l=r(95600),s=r(35843),u=r(87927),c=r(28702),d=r(29872),f=r(26520),p=r(25702);function getAppBarUtilityClass(e){return(0,p.Z)("MuiAppBar",e)}(0,f.Z)("MuiAppBar",["root","positionFixed","positionAbsolute","positionSticky","positionStatic","positionRelative","colorDefault","colorPrimary","colorSecondary","colorInherit","colorTransparent","colorError","colorInfo","colorSuccess","colorWarning"]);var m=r(57437);let h=["className","color","enableColorOnDark","position"],useUtilityClasses=e=>{let{color:t,position:r,classes:n}=e,o={root:["root",`color${(0,c.Z)(t)}`,`position${(0,c.Z)(r)}`]};return(0,l.Z)(o,getAppBarUtilityClass,n)},joinVars=(e,t)=>e?`${null==e?void 0:e.replace(")","")}, ${t})`:t,g=(0,s.ZP)(d.Z,{name:"MuiAppBar",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[`position${(0,c.Z)(r.position)}`],t[`color${(0,c.Z)(r.color)}`]]}})(({theme:e,ownerState:t})=>{let r="light"===e.palette.mode?e.palette.grey[100]:e.palette.grey[900];return(0,o.Z)({display:"flex",flexDirection:"column",width:"100%",boxSizing:"border-box",flexShrink:0},"fixed"===t.position&&{position:"fixed",zIndex:(e.vars||e).zIndex.appBar,top:0,left:"auto",right:0,"@media print":{position:"absolute"}},"absolute"===t.position&&{position:"absolute",zIndex:(e.vars||e).zIndex.appBar,top:0,left:"auto",right:0},"sticky"===t.position&&{position:"sticky",zIndex:(e.vars||e).zIndex.appBar,top:0,left:"auto",right:0},"static"===t.position&&{position:"static"},"relative"===t.position&&{position:"relative"},!e.vars&&(0,o.Z)({},"default"===t.color&&{backgroundColor:r,color:e.palette.getContrastText(r)},t.color&&"default"!==t.color&&"inherit"!==t.color&&"transparent"!==t.color&&{backgroundColor:e.palette[t.color].main,color:e.palette[t.color].contrastText},"inherit"===t.color&&{color:"inherit"},"dark"===e.palette.mode&&!t.enableColorOnDark&&{backgroundColor:null,color:null},"transparent"===t.color&&(0,o.Z)({backgroundColor:"transparent",color:"inherit"},"dark"===e.palette.mode&&{backgroundImage:"none"})),e.vars&&(0,o.Z)({},"default"===t.color&&{"--AppBar-background":t.enableColorOnDark?e.vars.palette.AppBar.defaultBg:joinVars(e.vars.palette.AppBar.darkBg,e.vars.palette.AppBar.defaultBg),"--AppBar-color":t.enableColorOnDark?e.vars.palette.text.primary:joinVars(e.vars.palette.AppBar.darkColor,e.vars.palette.text.primary)},t.color&&!t.color.match(/^(default|inherit|transparent)$/)&&{"--AppBar-background":t.enableColorOnDark?e.vars.palette[t.color].main:joinVars(e.vars.palette.AppBar.darkBg,e.vars.palette[t.color].main),"--AppBar-color":t.enableColorOnDark?e.vars.palette[t.color].contrastText:joinVars(e.vars.palette.AppBar.darkColor,e.vars.palette[t.color].contrastText)},{backgroundColor:"var(--AppBar-background)",color:"inherit"===t.color?"inherit":"var(--AppBar-color)"},"transparent"===t.color&&{backgroundImage:"none",backgroundColor:"transparent",color:"inherit"}))}),y=a.forwardRef(function(e,t){let r=(0,u.Z)({props:e,name:"MuiAppBar"}),{className:a,color:l="primary",enableColorOnDark:s=!1,position:c="fixed"}=r,d=(0,n.Z)(r,h),f=(0,o.Z)({},r,{color:l,position:c,enableColorOnDark:s}),p=useUtilityClasses(f);return(0,m.jsx)(g,(0,o.Z)({square:!0,component:"header",ownerState:f,elevation:4,className:(0,i.Z)(p.root,a,"fixed"===c&&"mui-fixed"),ref:t},d))});var b=y},88938:function(e,t,r){"use strict";r.d(t,{Z:function(){return P}});var n=r(20791),o=r(13428),a=r(2265),i=r(96593),l=r(61380),s=r(25702),u=r(95600),c=r(48153),d=r(39190),f=r(84775),p=r(57437);let m=["className","component","disableGutters","fixed","maxWidth","classes"],h=(0,f.Z)(),g=(0,d.Z)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[`maxWidth${(0,l.Z)(String(r.maxWidth))}`],r.fixed&&t.fixed,r.disableGutters&&t.disableGutters]}}),useThemePropsDefault=e=>(0,c.Z)({props:e,name:"MuiContainer",defaultTheme:h}),useUtilityClasses=(e,t)=>{let{classes:r,fixed:n,disableGutters:o,maxWidth:a}=e,i={root:["root",a&&`maxWidth${(0,l.Z)(String(a))}`,n&&"fixed",o&&"disableGutters"]};return(0,u.Z)(i,e=>(0,s.Z)(t,e),r)};var y=r(28702),b=r(35843),v=r(87927);let x=function(e={}){let{createStyledComponent:t=g,useThemeProps:r=useThemePropsDefault,componentName:l="MuiContainer"}=e,s=t(({theme:e,ownerState:t})=>(0,o.Z)({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!t.disableGutters&&{paddingLeft:e.spacing(2),paddingRight:e.spacing(2),[e.breakpoints.up("sm")]:{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}}),({theme:e,ownerState:t})=>t.fixed&&Object.keys(e.breakpoints.values).reduce((t,r)=>{let n=e.breakpoints.values[r];return 0!==n&&(t[e.breakpoints.up(r)]={maxWidth:`${n}${e.breakpoints.unit}`}),t},{}),({theme:e,ownerState:t})=>(0,o.Z)({},"xs"===t.maxWidth&&{[e.breakpoints.up("xs")]:{maxWidth:Math.max(e.breakpoints.values.xs,444)}},t.maxWidth&&"xs"!==t.maxWidth&&{[e.breakpoints.up(t.maxWidth)]:{maxWidth:`${e.breakpoints.values[t.maxWidth]}${e.breakpoints.unit}`}})),u=a.forwardRef(function(e,t){let a=r(e),{className:u,component:c="div",disableGutters:d=!1,fixed:f=!1,maxWidth:h="lg"}=a,g=(0,n.Z)(a,m),y=(0,o.Z)({},a,{component:c,disableGutters:d,fixed:f,maxWidth:h}),b=useUtilityClasses(y,l);return(0,p.jsx)(s,(0,o.Z)({as:c,ownerState:y,className:(0,i.Z)(b.root,u),ref:t},g))});return u}({createStyledComponent:(0,b.ZP)("div",{name:"MuiContainer",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[`maxWidth${(0,y.Z)(String(r.maxWidth))}`],r.fixed&&t.fixed,r.disableGutters&&t.disableGutters]}}),useThemeProps:e=>(0,v.Z)({props:e,name:"MuiContainer"})});var P=x},3857:function(e,t,r){"use strict";var n=r(13428),o=r(2265),a=r(87927),i=r(54281),l=r(57437);let html=(e,t)=>(0,n.Z)({WebkitFontSmoothing:"antialiased",MozOsxFontSmoothing:"grayscale",boxSizing:"border-box",WebkitTextSizeAdjust:"100%"},t&&!e.vars&&{colorScheme:e.palette.mode}),body=e=>(0,n.Z)({color:(e.vars||e).palette.text.primary},e.typography.body1,{backgroundColor:(e.vars||e).palette.background.default,"@media print":{backgroundColor:(e.vars||e).palette.common.white}}),styles=(e,t=!1)=>{var r;let o={};t&&e.colorSchemes&&Object.entries(e.colorSchemes).forEach(([t,r])=>{var n;o[e.getColorSchemeSelector(t).replace(/\s*&/,"")]={colorScheme:null==(n=r.palette)?void 0:n.mode}});let a=(0,n.Z)({html:html(e,t),"*, *::before, *::after":{boxSizing:"inherit"},"strong, b":{fontWeight:e.typography.fontWeightBold},body:(0,n.Z)({margin:0},body(e),{"&::backdrop":{backgroundColor:(e.vars||e).palette.background.default}})},o),i=null==(r=e.components)||null==(r=r.MuiCssBaseline)?void 0:r.styleOverrides;return i&&(a=[a,i]),a};t.ZP=function(e){let t=(0,a.Z)({props:e,name:"MuiCssBaseline"}),{children:r,enableColorScheme:n=!1}=t;return(0,l.jsxs)(o.Fragment,{children:[(0,l.jsx)(i.Z,{styles:e=>styles(e,n)}),r]})}},25210:function(e,t,r){"use strict";r.d(t,{Z:function(){return _}});var n=r(20791),o=r(13428),a=r(2265),i=r(7216),l=r(95600),s=r(28702),u=r(35843),c=r(87927),d=r(53308),f=r(37663),p=r(43226),m=r(26520),h=r(25702);function getLinkUtilityClass(e){return(0,h.Z)("MuiLink",e)}let g=(0,m.Z)("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]);var y=r(65227),b=r(89975);let v={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},transformDeprecatedColors=e=>v[e]||e;var Link_getTextDecoration=({theme:e,ownerState:t})=>{let r=transformDeprecatedColors(t.color),n=(0,y.DW)(e,`palette.${r}`,!1)||t.color,o=(0,y.DW)(e,`palette.${r}Channel`);return"vars"in e&&o?`rgba(${o} / 0.4)`:(0,b.Fq)(n,.4)},x=r(57437);let P=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant","sx"],useUtilityClasses=e=>{let{classes:t,component:r,focusVisible:n,underline:o}=e,a={root:["root",`underline${(0,s.Z)(o)}`,"button"===r&&"button",n&&"focusVisible"]};return(0,l.Z)(a,getLinkUtilityClass,t)},R=(0,u.ZP)(p.Z,{name:"MuiLink",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[`underline${(0,s.Z)(r.underline)}`],"button"===r.component&&t.button]}})(({theme:e,ownerState:t})=>(0,o.Z)({},"none"===t.underline&&{textDecoration:"none"},"hover"===t.underline&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},"always"===t.underline&&(0,o.Z)({textDecoration:"underline"},"inherit"!==t.color&&{textDecorationColor:Link_getTextDecoration({theme:e,ownerState:t})},{"&:hover":{textDecorationColor:"inherit"}}),"button"===t.component&&{position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"},[`&.${g.focusVisible}`]:{outline:"auto"}})),S=a.forwardRef(function(e,t){let r=(0,c.Z)({props:e,name:"MuiLink"}),{className:l,color:s="primary",component:u="a",onBlur:p,onFocus:m,TypographyClasses:h,underline:g="always",variant:y="inherit",sx:b}=r,S=(0,n.Z)(r,P),{isFocusVisibleRef:_,onBlur:C,onFocus:k,ref:O}=(0,d.Z)(),[j,Z]=a.useState(!1),M=(0,f.Z)(t,O),N=(0,o.Z)({},r,{color:s,component:u,focusVisible:j,underline:g,variant:y}),E=useUtilityClasses(N);return(0,x.jsx)(R,(0,o.Z)({color:s,className:(0,i.Z)(E.root,l),classes:h,component:u,onBlur:e=>{C(e),!1===_.current&&Z(!1),p&&p(e)},onFocus:e=>{k(e),!0===_.current&&Z(!0),m&&m(e)},ref:M,ownerState:N,variant:y,sx:[...Object.keys(v).includes(s)?[]:[{color:s}],...Array.isArray(b)?b:[b]]},S))});var _=S},34989:function(e,t,r){"use strict";r.d(t,{Z:function(){return g}});var n=r(20791),o=r(13428),a=r(2265),i=r(7216),l=r(95600),s=r(87927),u=r(35843),c=r(26520),d=r(25702);function getToolbarUtilityClass(e){return(0,d.Z)("MuiToolbar",e)}(0,c.Z)("MuiToolbar",["root","gutters","regular","dense"]);var f=r(57437);let p=["className","component","disableGutters","variant"],useUtilityClasses=e=>{let{classes:t,disableGutters:r,variant:n}=e;return(0,l.Z)({root:["root",!r&&"gutters",n]},getToolbarUtilityClass,t)},m=(0,u.ZP)("div",{name:"MuiToolbar",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,!r.disableGutters&&t.gutters,t[r.variant]]}})(({theme:e,ownerState:t})=>(0,o.Z)({position:"relative",display:"flex",alignItems:"center"},!t.disableGutters&&{paddingLeft:e.spacing(2),paddingRight:e.spacing(2),[e.breakpoints.up("sm")]:{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}},"dense"===t.variant&&{minHeight:48}),({theme:e,ownerState:t})=>"regular"===t.variant&&e.mixins.toolbar),h=a.forwardRef(function(e,t){let r=(0,s.Z)({props:e,name:"MuiToolbar"}),{className:a,component:l="div",disableGutters:u=!1,variant:c="regular"}=r,d=(0,n.Z)(r,p),h=(0,o.Z)({},r,{component:l,disableGutters:u,variant:c}),g=useUtilityClasses(h);return(0,f.jsx)(m,(0,o.Z)({as:l,className:(0,i.Z)(g.root,a),ref:t,ownerState:h},d))});var g=h},33948:function(e,t,r){"use strict";r.d(t,{Z:function(){return styles_ThemeProvider_ThemeProvider}});var n=r(13428),o=r(20791),a=r(2265);let i=a.createContext(null);function useTheme(){let e=a.useContext(i);return e}let l="function"==typeof Symbol&&Symbol.for;var s=l?Symbol.for("mui.nested"):"__THEME_NESTED__",u=r(57437),ThemeProvider_ThemeProvider=function(e){let{children:t,theme:r}=e,o=useTheme(),l=a.useMemo(()=>{let e=null===o?r:function(e,t){if("function"==typeof t){let r=t(e);return r}return(0,n.Z)({},e,t)}(o,r);return null!=e&&(e[s]=null!==o),e},[r,o]);return(0,u.jsx)(i.Provider,{value:l,children:t})},c=r(86375),d=r(44809);let f={};function useThemeScoping(e,t,r,o=!1){return a.useMemo(()=>{let a=e&&t[e]||t;if("function"==typeof r){let i=r(a),l=e?(0,n.Z)({},t,{[e]:i}):i;return o?()=>l:l}return e?(0,n.Z)({},t,{[e]:r}):(0,n.Z)({},t,r)},[e,t,r,o])}var esm_ThemeProvider_ThemeProvider=function(e){let{children:t,theme:r,themeId:n}=e,o=(0,d.Z)(f),a=useTheme()||f,i=useThemeScoping(n,o,r),l=useThemeScoping(n,a,r,!0);return(0,u.jsx)(ThemeProvider_ThemeProvider,{theme:l,children:(0,u.jsx)(c.T.Provider,{value:i,children:t})})},p=r(53469);let m=["theme"];function styles_ThemeProvider_ThemeProvider(e){let{theme:t}=e,r=(0,o.Z)(e,m),a=t[p.Z];return(0,u.jsx)(esm_ThemeProvider_ThemeProvider,(0,n.Z)({},r,{themeId:a?p.Z:void 0,theme:a||t}))}},19524:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"addLocale",{enumerable:!0,get:function(){return addLocale}}),r(43997);let addLocale=function(e){for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return e};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},64549:function(e,t,r){"use strict";function getDomainLocale(e,t,r,n){return!1}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getDomainLocale",{enumerable:!0,get:function(){return getDomainLocale}}),r(43997),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},68326:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return b}});let n=r(21024),o=n._(r(2265)),a=r(99121),i=r(68664),l=r(98130),s=r(36681),u=r(19524),c=r(36304),d=r(76313),f=r(71581),p=r(64549),m=r(89872),h=r(49706),g=new Set;function prefetch(e,t,r,n,o,a){if(!a&&!(0,i.isLocalURL)(t))return;if(!n.bypassPrefetchedCheck){let o=void 0!==n.locale?n.locale:"locale"in e?e.locale:void 0,a=t+"%"+r+"%"+o;if(g.has(a))return;g.add(a)}let l=a?e.prefetch(t,o):e.prefetch(t,r,n);Promise.resolve(l).catch(e=>{})}function formatStringOrUrl(e){return"string"==typeof e?e:(0,l.formatUrl)(e)}let y=o.default.forwardRef(function(e,t){let r,n;let{href:l,as:g,children:y,prefetch:b=null,passHref:v,replace:x,shallow:P,scroll:R,locale:S,onClick:_,onMouseEnter:C,onTouchStart:k,legacyBehavior:O=!1,...j}=e;r=y,O&&("string"==typeof r||"number"==typeof r)&&(r=o.default.createElement("a",null,r));let Z=o.default.useContext(c.RouterContext),M=o.default.useContext(d.AppRouterContext),N=null!=Z?Z:M,E=!Z,T=!1!==b,w=null===b?h.PrefetchKind.AUTO:h.PrefetchKind.FULL,{href:U,as:A}=o.default.useMemo(()=>{if(!Z){let e=formatStringOrUrl(l);return{href:e,as:g?formatStringOrUrl(g):e}}let[e,t]=(0,a.resolveHref)(Z,l,!0);return{href:e,as:g?(0,a.resolveHref)(Z,g):t||e}},[Z,l,g]),L=o.default.useRef(U),I=o.default.useRef(A);O&&(n=o.default.Children.only(r));let D=O?n&&"object"==typeof n&&n.ref:t,[W,z,B]=(0,f.useIntersection)({rootMargin:"200px"}),$=o.default.useCallback(e=>{(I.current!==A||L.current!==U)&&(B(),I.current=A,L.current=U),W(e),D&&("function"==typeof D?D(e):"object"==typeof D&&(D.current=e))},[A,D,U,B,W]);o.default.useEffect(()=>{N&&z&&T&&prefetch(N,U,A,{locale:S},{kind:w},E)},[A,U,z,S,T,null==Z?void 0:Z.locale,N,E,w]);let F={ref:$,onClick(e){O||"function"!=typeof _||_(e),O&&n.props&&"function"==typeof n.props.onClick&&n.props.onClick(e),N&&!e.defaultPrevented&&function(e,t,r,n,a,l,s,u,c,d){let{nodeName:f}=e.currentTarget,p="A"===f.toUpperCase();if(p&&(function(e){let t=e.currentTarget,r=t.getAttribute("target");return r&&"_self"!==r||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!c&&!(0,i.isLocalURL)(r)))return;e.preventDefault();let navigate=()=>{let e=null==s||s;"beforePopState"in t?t[a?"replace":"push"](r,n,{shallow:l,locale:u,scroll:e}):t[a?"replace":"push"](n||r,{forceOptimisticNavigation:!d,scroll:e})};c?o.default.startTransition(navigate):navigate()}(e,N,U,A,x,P,R,S,E,T)},onMouseEnter(e){O||"function"!=typeof C||C(e),O&&n.props&&"function"==typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),N&&(T||!E)&&prefetch(N,U,A,{locale:S,priority:!0,bypassPrefetchedCheck:!0},{kind:w},E)},onTouchStart(e){O||"function"!=typeof k||k(e),O&&n.props&&"function"==typeof n.props.onTouchStart&&n.props.onTouchStart(e),N&&(T||!E)&&prefetch(N,U,A,{locale:S,priority:!0,bypassPrefetchedCheck:!0},{kind:w},E)}};if((0,s.isAbsoluteUrl)(A))F.href=A;else if(!O||v||"a"===n.type&&!("href"in n.props)){let e=void 0!==S?S:null==Z?void 0:Z.locale,t=(null==Z?void 0:Z.isLocaleDomain)&&(0,p.getDomainLocale)(A,e,null==Z?void 0:Z.locales,null==Z?void 0:Z.domainLocales);F.href=t||(0,m.addBasePath)((0,u.addLocale)(A,e,null==Z?void 0:Z.defaultLocale))}return O?o.default.cloneElement(n,F):o.default.createElement("a",{...j,...F},r)}),b=y;("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},62389:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{requestIdleCallback:function(){return r},cancelIdleCallback:function(){return n}});let r="undefined"!=typeof self&&self.requestIdleCallback&&self.requestIdleCallback.bind(window)||function(e){let t=Date.now();return self.setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)},n="undefined"!=typeof self&&self.cancelIdleCallback&&self.cancelIdleCallback.bind(window)||function(e){return clearTimeout(e)};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},99121:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"resolveHref",{enumerable:!0,get:function(){return resolveHref}});let n=r(55991),o=r(98130),a=r(58137),i=r(36681),l=r(43997),s=r(68664),u=r(29289),c=r(20948);function resolveHref(e,t,r){let d;let f="string"==typeof t?t:(0,o.formatWithValidation)(t),p=f.match(/^[a-zA-Z]{1,}:\/\//),m=p?f.slice(p[0].length):f,h=m.split("?");if((h[0]||"").match(/(\/\/|\\)/)){console.error("Invalid href '"+f+"' passed to next/router in page: '"+e.pathname+"'. Repeated forward-slashes (//) or backslashes \\ are not valid in the href.");let t=(0,i.normalizeRepeatedSlashes)(m);f=(p?p[0]:"")+t}if(!(0,s.isLocalURL)(f))return r?[f]:f;try{d=new URL(f.startsWith("#")?e.asPath:e.pathname,"http://n")}catch(e){d=new URL("/","http://n")}try{let e=new URL(f,d);e.pathname=(0,l.normalizePathTrailingSlash)(e.pathname);let t="";if((0,u.isDynamicRoute)(e.pathname)&&e.searchParams&&r){let r=(0,n.searchParamsToUrlQuery)(e.searchParams),{result:i,params:l}=(0,c.interpolateAs)(e.pathname,e.pathname,r);i&&(t=(0,o.formatWithValidation)({pathname:i,hash:e.hash,query:(0,a.omit)(r,l)}))}let i=e.origin===d.origin?e.href.slice(e.origin.length):e.href;return r?[i,t||i]:i}catch(e){return r?[f]:f}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},71581:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return useIntersection}});let n=r(2265),o=r(62389),a="function"==typeof IntersectionObserver,i=new Map,l=[];function useIntersection(e){let{rootRef:t,rootMargin:r,disabled:s}=e,u=s||!a,[c,d]=(0,n.useState)(!1),f=(0,n.useRef)(null),p=(0,n.useCallback)(e=>{f.current=e},[]);(0,n.useEffect)(()=>{if(a){if(u||c)return;let e=f.current;if(e&&e.tagName){let n=function(e,t,r){let{id:n,observer:o,elements:a}=function(e){let t;let r={root:e.root||null,margin:e.rootMargin||""},n=l.find(e=>e.root===r.root&&e.margin===r.margin);if(n&&(t=i.get(n)))return t;let o=new Map,a=new IntersectionObserver(e=>{e.forEach(e=>{let t=o.get(e.target),r=e.isIntersecting||e.intersectionRatio>0;t&&r&&t(r)})},e);return t={id:r,observer:a,elements:o},l.push(r),i.set(r,t),t}(r);return a.set(e,t),o.observe(e),function(){if(a.delete(e),o.unobserve(e),0===a.size){o.disconnect(),i.delete(n);let e=l.findIndex(e=>e.root===n.root&&e.margin===n.margin);e>-1&&l.splice(e,1)}}}(e,e=>e&&d(e),{root:null==t?void 0:t.current,rootMargin:r});return n}}else if(!c){let e=(0,o.requestIdleCallback)(()=>d(!0));return()=>(0,o.cancelIdleCallback)(e)}},[u,r,t,c,f.current]);let m=(0,n.useCallback)(()=>{d(!1)},[]);return[p,c,m]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},24910:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"escapeStringRegexp",{enumerable:!0,get:function(){return escapeStringRegexp}});let r=/[|\\{}()[\]^$+*?.-]/,n=/[|\\{}()[\]^$+*?.-]/g;function escapeStringRegexp(e){return r.test(e)?e.replace(n,"\\$&"):e}},36304:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RouterContext",{enumerable:!0,get:function(){return a}});let n=r(21024),o=n._(r(2265)),a=o.default.createContext(null)},98130:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{formatUrl:function(){return formatUrl},urlObjectKeys:function(){return i},formatWithValidation:function(){return formatWithValidation}});let n=r(68533),o=n._(r(55991)),a=/https?|ftp|gopher|file/;function formatUrl(e){let{auth:t,hostname:r}=e,n=e.protocol||"",i=e.pathname||"",l=e.hash||"",s=e.query||"",u=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?u=t+e.host:r&&(u=t+(~r.indexOf(":")?"["+r+"]":r),e.port&&(u+=":"+e.port)),s&&"object"==typeof s&&(s=String(o.urlQueryToSearchParams(s)));let c=e.search||s&&"?"+s||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||a.test(n))&&!1!==u?(u="//"+(u||""),i&&"/"!==i[0]&&(i="/"+i)):u||(u=""),l&&"#"!==l[0]&&(l="#"+l),c&&"?"!==c[0]&&(c="?"+c),""+n+u+(i=i.replace(/[?#]/g,encodeURIComponent))+(c=c.replace("#","%23"))+l}let i=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function formatWithValidation(e){return formatUrl(e)}},29289:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{getSortedRoutes:function(){return n.getSortedRoutes},isDynamicRoute:function(){return o.isDynamicRoute}});let n=r(39255),o=r(55321)},20948:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"interpolateAs",{enumerable:!0,get:function(){return interpolateAs}});let n=r(21670),o=r(44586);function interpolateAs(e,t,r){let a="",i=(0,o.getRouteRegex)(e),l=i.groups,s=(t!==e?(0,n.getRouteMatcher)(i)(t):"")||r;a=e;let u=Object.keys(l);return u.every(e=>{let t=s[e]||"",{repeat:r,optional:n}=l[e],o="["+(r?"...":"")+e+"]";return n&&(o=(t?"":"/")+"["+o+"]"),r&&!Array.isArray(t)&&(t=[t]),(n||e in s)&&(a=a.replace(o,r?t.map(e=>encodeURIComponent(e)).join("/"):encodeURIComponent(t))||"/")})||(a=""),{params:u,result:a}}},55321:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isDynamicRoute",{enumerable:!0,get:function(){return isDynamicRoute}});let r=/\/\[[^/]+?\](?=\/|$)/;function isDynamicRoute(e){return r.test(e)}},68664:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isLocalURL",{enumerable:!0,get:function(){return isLocalURL}});let n=r(36681),o=r(26746);function isLocalURL(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,o.hasBasePath)(r.pathname)}catch(e){return!1}}},58137:function(e,t){"use strict";function omit(e,t){let r={};return Object.keys(e).forEach(n=>{t.includes(n)||(r[n]=e[n])}),r}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"omit",{enumerable:!0,get:function(){return omit}})},55991:function(e,t){"use strict";function searchParamsToUrlQuery(e){let t={};return e.forEach((e,r)=>{void 0===t[r]?t[r]=e:Array.isArray(t[r])?t[r].push(e):t[r]=[t[r],e]}),t}function stringifyUrlQueryParam(e){return"string"!=typeof e&&("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function urlQueryToSearchParams(e){let t=new URLSearchParams;return Object.entries(e).forEach(e=>{let[r,n]=e;Array.isArray(n)?n.forEach(e=>t.append(r,stringifyUrlQueryParam(e))):t.set(r,stringifyUrlQueryParam(n))}),t}function assign(e){for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return r.forEach(t=>{Array.from(t.keys()).forEach(t=>e.delete(t)),t.forEach((t,r)=>e.append(r,t))}),e}Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{searchParamsToUrlQuery:function(){return searchParamsToUrlQuery},urlQueryToSearchParams:function(){return urlQueryToSearchParams},assign:function(){return assign}})},21670:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getRouteMatcher",{enumerable:!0,get:function(){return getRouteMatcher}});let n=r(36681);function getRouteMatcher(e){let{re:t,groups:r}=e;return e=>{let o=t.exec(e);if(!o)return!1;let decode=e=>{try{return decodeURIComponent(e)}catch(e){throw new n.DecodeError("failed to decode param")}},a={};return Object.keys(r).forEach(e=>{let t=r[e],n=o[t.pos];void 0!==n&&(a[e]=~n.indexOf("/")?n.split("/").map(e=>decode(e)):t.repeat?[decode(n)]:decode(n))}),a}}},44586:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{getRouteRegex:function(){return getRouteRegex},getNamedRouteRegex:function(){return getNamedRouteRegex},getNamedMiddlewareRegex:function(){return getNamedMiddlewareRegex}});let n=r(84507),o=r(24910),a=r(39006);function parseParameter(e){let t=e.startsWith("[")&&e.endsWith("]");t&&(e=e.slice(1,-1));let r=e.startsWith("...");return r&&(e=e.slice(3)),{key:e,repeat:r,optional:t}}function getParametrizedRoute(e){let t=(0,a.removeTrailingSlash)(e).slice(1).split("/"),r={},i=1;return{parameterizedRoute:t.map(e=>{let t=n.INTERCEPTION_ROUTE_MARKERS.find(t=>e.startsWith(t)),a=e.match(/\[((?:\[.*\])|.+)\]/);if(t&&a){let{key:e,optional:n,repeat:l}=parseParameter(a[1]);return r[e]={pos:i++,repeat:l,optional:n},"/"+(0,o.escapeStringRegexp)(t)+"([^/]+?)"}if(!a)return"/"+(0,o.escapeStringRegexp)(e);{let{key:e,repeat:t,optional:n}=parseParameter(a[1]);return r[e]={pos:i++,repeat:t,optional:n},t?n?"(?:/(.+?))?":"/(.+?)":"/([^/]+?)"}}).join(""),groups:r}}function getRouteRegex(e){let{parameterizedRoute:t,groups:r}=getParametrizedRoute(e);return{re:RegExp("^"+t+"(?:/)?$"),groups:r}}function getSafeKeyFromSegment(e){let{getSafeRouteKey:t,segment:r,routeKeys:n,keyPrefix:o}=e,{key:a,optional:i,repeat:l}=parseParameter(r),s=a.replace(/\W/g,"");o&&(s=""+o+s);let u=!1;return(0===s.length||s.length>30)&&(u=!0),isNaN(parseInt(s.slice(0,1)))||(u=!0),u&&(s=t()),o?n[s]=""+o+a:n[s]=""+a,l?i?"(?:/(?<"+s+">.+?))?":"/(?<"+s+">.+?)":"/(?<"+s+">[^/]+?)"}function getNamedParametrizedRoute(e,t){let r;let i=(0,a.removeTrailingSlash)(e).slice(1).split("/"),l=(r=0,()=>{let e="",t=++r;for(;t>0;)e+=String.fromCharCode(97+(t-1)%26),t=Math.floor((t-1)/26);return e}),s={};return{namedParameterizedRoute:i.map(e=>{let r=n.INTERCEPTION_ROUTE_MARKERS.some(t=>e.startsWith(t)),a=e.match(/\[((?:\[.*\])|.+)\]/);return r&&a?getSafeKeyFromSegment({getSafeRouteKey:l,segment:a[1],routeKeys:s,keyPrefix:t?"nxtI":void 0}):a?getSafeKeyFromSegment({getSafeRouteKey:l,segment:a[1],routeKeys:s,keyPrefix:t?"nxtP":void 0}):"/"+(0,o.escapeStringRegexp)(e)}).join(""),routeKeys:s}}function getNamedRouteRegex(e,t){let r=getNamedParametrizedRoute(e,t);return{...getRouteRegex(e),namedRegex:"^"+r.namedParameterizedRoute+"(?:/)?$",routeKeys:r.routeKeys}}function getNamedMiddlewareRegex(e,t){let{parameterizedRoute:r}=getParametrizedRoute(e),{catchAll:n=!0}=t;if("/"===r)return{namedRegex:"^/"+(n?".*":"")+"$"};let{namedParameterizedRoute:o}=getNamedParametrizedRoute(e,!1);return{namedRegex:"^"+o+(n?"(?:(/.*)?)":"")+"$"}}},39255:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getSortedRoutes",{enumerable:!0,get:function(){return getSortedRoutes}});let UrlNode=class UrlNode{insert(e){this._insert(e.split("/").filter(Boolean),[],!1)}smoosh(){return this._smoosh()}_smoosh(e){void 0===e&&(e="/");let t=[...this.children.keys()].sort();null!==this.slugName&&t.splice(t.indexOf("[]"),1),null!==this.restSlugName&&t.splice(t.indexOf("[...]"),1),null!==this.optionalRestSlugName&&t.splice(t.indexOf("[[...]]"),1);let r=t.map(t=>this.children.get(t)._smoosh(""+e+t+"/")).reduce((e,t)=>[...e,...t],[]);if(null!==this.slugName&&r.push(...this.children.get("[]")._smoosh(e+"["+this.slugName+"]/")),!this.placeholder){let t="/"===e?"/":e.slice(0,-1);if(null!=this.optionalRestSlugName)throw Error('You cannot define a route with the same specificity as a optional catch-all route ("'+t+'" and "'+t+"[[..."+this.optionalRestSlugName+']]").');r.unshift(t)}return null!==this.restSlugName&&r.push(...this.children.get("[...]")._smoosh(e+"[..."+this.restSlugName+"]/")),null!==this.optionalRestSlugName&&r.push(...this.children.get("[[...]]")._smoosh(e+"[[..."+this.optionalRestSlugName+"]]/")),r}_insert(e,t,r){if(0===e.length){this.placeholder=!1;return}if(r)throw Error("Catch-all must be the last part of the URL.");let n=e[0];if(n.startsWith("[")&&n.endsWith("]")){let o=n.slice(1,-1),a=!1;if(o.startsWith("[")&&o.endsWith("]")&&(o=o.slice(1,-1),a=!0),o.startsWith("...")&&(o=o.substring(3),r=!0),o.startsWith("[")||o.endsWith("]"))throw Error("Segment names may not start or end with extra brackets ('"+o+"').");if(o.startsWith("."))throw Error("Segment names may not start with erroneous periods ('"+o+"').");function handleSlug(e,r){if(null!==e&&e!==r)throw Error("You cannot use different slug names for the same dynamic path ('"+e+"' !== '"+r+"').");t.forEach(e=>{if(e===r)throw Error('You cannot have the same slug name "'+r+'" repeat within a single dynamic path');if(e.replace(/\W/g,"")===n.replace(/\W/g,""))throw Error('You cannot have the slug names "'+e+'" and "'+r+'" differ only by non-word symbols within a single dynamic path')}),t.push(r)}if(r){if(a){if(null!=this.restSlugName)throw Error('You cannot use both an required and optional catch-all route at the same level ("[...'+this.restSlugName+']" and "'+e[0]+'" ).');handleSlug(this.optionalRestSlugName,o),this.optionalRestSlugName=o,n="[[...]]"}else{if(null!=this.optionalRestSlugName)throw Error('You cannot use both an optional and required catch-all route at the same level ("[[...'+this.optionalRestSlugName+']]" and "'+e[0]+'").');handleSlug(this.restSlugName,o),this.restSlugName=o,n="[...]"}}else{if(a)throw Error('Optional route parameters are not yet supported ("'+e[0]+'").');handleSlug(this.slugName,o),this.slugName=o,n="[]"}}this.children.has(n)||this.children.set(n,new UrlNode),this.children.get(n)._insert(e.slice(1),t,r)}constructor(){this.placeholder=!0,this.children=new Map,this.slugName=null,this.restSlugName=null,this.optionalRestSlugName=null}};function getSortedRoutes(e){let t=new UrlNode;return e.forEach(e=>t.insert(e)),t.smoosh()}},36681:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{WEB_VITALS:function(){return r},execOnce:function(){return execOnce},isAbsoluteUrl:function(){return isAbsoluteUrl},getLocationOrigin:function(){return getLocationOrigin},getURL:function(){return getURL},getDisplayName:function(){return getDisplayName},isResSent:function(){return isResSent},normalizeRepeatedSlashes:function(){return normalizeRepeatedSlashes},loadGetInitialProps:function(){return loadGetInitialProps},SP:function(){return o},ST:function(){return a},DecodeError:function(){return DecodeError},NormalizeError:function(){return NormalizeError},PageNotFoundError:function(){return PageNotFoundError},MissingStaticPage:function(){return MissingStaticPage},MiddlewareNotFoundError:function(){return MiddlewareNotFoundError},stringifyError:function(){return stringifyError}});let r=["CLS","FCP","FID","INP","LCP","TTFB"];function execOnce(e){let t,r=!1;return function(){for(var n=arguments.length,o=Array(n),a=0;a<n;a++)o[a]=arguments[a];return r||(r=!0,t=e(...o)),t}}let n=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,isAbsoluteUrl=e=>n.test(e);function getLocationOrigin(){let{protocol:e,hostname:t,port:r}=window.location;return e+"//"+t+(r?":"+r:"")}function getURL(){let{href:e}=window.location,t=getLocationOrigin();return e.substring(t.length)}function getDisplayName(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function isResSent(e){return e.finished||e.headersSent}function normalizeRepeatedSlashes(e){let t=e.split("?"),r=t[0];return r.replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?"?"+t.slice(1).join("?"):"")}async function loadGetInitialProps(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await loadGetInitialProps(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&isResSent(r))return n;if(!n){let t='"'+getDisplayName(e)+'.getInitialProps()" should resolve to an object. But found "'+n+'" instead.';throw Error(t)}return n}let o="undefined"!=typeof performance,a=o&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);let DecodeError=class DecodeError extends Error{};let NormalizeError=class NormalizeError extends Error{};let PageNotFoundError=class PageNotFoundError extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message="Cannot find module for page: "+e}};let MissingStaticPage=class MissingStaticPage extends Error{constructor(e,t){super(),this.message="Failed to load static file for page: "+e+" "+t}};let MiddlewareNotFoundError=class MiddlewareNotFoundError extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}};function stringifyError(e){return JSON.stringify({message:e.message,stack:e.stack})}},18089:function(e){e.exports={style:{fontFamily:"'__Inter_e66fe9', '__Inter_Fallback_e66fe9'",fontStyle:"normal"},className:"__className_e66fe9"}},22022:function(e){e.exports={style:{fontFamily:"'__sans_78de60', '__sans_Fallback_78de60'",fontWeight:400,fontStyle:"normal"},className:"__className_78de60"}},61396:function(e,t,r){e.exports=r(68326)}}]);