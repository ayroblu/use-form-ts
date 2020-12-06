(this["webpackJsonpdemo-form"]=this["webpackJsonpdemo-form"]||[]).push([[0],{15:function(e,t,r){},16:function(e,t,r){},21:function(e,t,r){"use strict";r.r(t);var n=r(0),a=r(2),c=r.n(a),o=r(9),i=r.n(o);r(15),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r(16);var s=r(3),l=r(1),u=r(6),j=r(5),b=r(4),m=r.n(b),d=function(){var e=c.a.useState({form:{firstname:"",lastname:""},log:[]}),t=Object(u.a)(e,2),r=t[0],a=t[1],o=Object(j.useForm)({values:r.form,onChange:function(e){return a(Object(l.a)(Object(l.a)({},r),{},{form:Object(l.a)(Object(l.a)({},r.form),e)}))}});return Object(n.jsxs)("form",{onSubmit:function(e){e.preventDefault(),o.validate()&&a(Object(l.a)(Object(l.a)({},r),{},{log:r.log.concat("Result: ".concat(JSON.stringify(r.form)))}))},children:[Object(n.jsx)("h3",{children:"Example Form"}),o.createFormItem("firstname",{required:!0,adaptor:function(e){return e.target.value},meta:{label:"First Name"}})((function(e){var t=e.errorText,r=e.meta.label,a=Object(s.a)(e,["errorText","meta"]);return Object(n.jsx)(O,Object(l.a)(Object(l.a)({label:r},a),{},{errorText:t||""}))})),o.createFormItem("lastname",{required:!0,adaptor:function(e){return e.target.value},meta:{label:"Last Name"}})((function(e){var t=e.errorText,r=e.meta.label,a=Object(s.a)(e,["errorText","meta"]);return Object(n.jsx)(O,Object(l.a)(Object(l.a)({label:r},a),{},{errorText:t||""}))})),Object(n.jsx)("input",{className:m.a.submit,type:"submit",value:"Submit"}),Object(n.jsx)("section",{children:r.log.map((function(e,t){return Object(n.jsx)("p",{children:e},t)}))})]})},O=function(e){var t=e.name,r=e.label,a=e.errorText,c=Object(s.a)(e,["name","label","errorText"]);return Object(n.jsxs)("label",{className:m.a.input,children:[Object(n.jsx)("span",{className:m.a.inputLabel,children:r}),Object(n.jsx)("input",Object(l.a)({id:t},c)),Object(n.jsx)("div",{className:m.a.error,children:a})]})},x=function(){var e=c.a.useState({field:""}),t=Object(u.a)(e,2),r=t[0],a=t[1],o=Object(j.useForm)({values:r,onChange:function(e){return a(Object(l.a)(Object(l.a)({},r),e))}});return Object(n.jsx)("div",{children:o.createFormItem("field",{adaptor:h,meta:{label:"Field"},required:!0,validationMessages:{required:function(e){var t=e.meta.label;return"Yo, ".concat(t," is required")}},custom:function(e){return"3"===e?"3 is not allowed!":""},customAsync:function(e){return f(1e3).then((function(){return"4"===e?"Promise 4 is not allowed!":null}))},validation:{type:"whitespace"}})((function(e){var t=e.meta.label,r=e.errorText,a=e.isLoading,c=Object(s.a)(e,["meta","errorText","isLoading"]);return Object(n.jsxs)("label",{children:[Object(n.jsx)("span",{children:t}),Object(n.jsx)("input",Object(l.a)({},c)),a?Object(n.jsx)("span",{children:"... loading"}):null,Object(n.jsx)("span",{children:r})]})}))})},h=function(e){return e.target.value},f=function(e){return new Promise((function(t){return setTimeout(t,e)}))},p=function(){return Object(n.jsxs)("section",{children:[Object(n.jsxs)("header",{children:[Object(n.jsx)("h1",{children:"use-form-ts"}),Object(n.jsx)("p",{children:"lightweight useForm hook for creating basic forms with TypeScript"})]}),Object(n.jsxs)("section",{children:[Object(n.jsx)("h2",{children:"useForm.ts"}),Object(n.jsx)("p",{children:"Forms should be straight forward, just useForm and form.createFormItem to pass form state around."})]}),Object(n.jsx)("section",{children:"Example:"}),Object(n.jsx)(d,{}),Object(n.jsx)("section",{children:"Kitchen Sink:"}),Object(n.jsx)(x,{})]})};function v(){return Object(n.jsx)("div",{className:"App",children:Object(n.jsx)(p,{})})}i.a.render(Object(n.jsx)(c.a.StrictMode,{children:Object(n.jsx)(v,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},4:function(e,t,r){e.exports={input:"ExampleForm_input__1I4Jb",inputLabel:"ExampleForm_inputLabel__2gPgw",error:"ExampleForm_error__k0GOK",submit:"ExampleForm_submit__3u5ML"}}},[[21,1,2]]]);
//# sourceMappingURL=main.44cd3fa1.chunk.js.map