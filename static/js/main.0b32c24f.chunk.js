(this["webpackJsonpdemo-form"]=this["webpackJsonpdemo-form"]||[]).push([[0],{1:function(e,t,a){e.exports={input:"ExampleForm_input__1I4Jb",inputLabel:"ExampleForm_inputLabel__2gPgw",error:"ExampleForm_error__k0GOK",submit:"ExampleForm_submit__3u5ML"}},14:function(e,t,a){},15:function(e,t,a){},20:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(5),l=a.n(o),m=(a(14),a(15),a(8)),c=a(2),u=a(7),i=a(1),s=a.n(i),p=a(6),f=function(){var e=r.a.useState({form:{firstname:"",lastname:""},log:[]}),t=Object(u.a)(e,2),a=t[0],n=t[1],o=Object(p.useForm)({values:a.form,onChange:function(e){return n(Object(c.a)({},a,{form:Object(c.a)({},a.form,{},e)}))}});return r.a.createElement("form",{onSubmit:function(e){e.preventDefault(),o.validate()&&n(Object(c.a)({},a,{log:a.log.concat("Result: ".concat(JSON.stringify(a.form)))}))}},r.a.createElement("h3",null,"Example Form"),o.createFormItem("firstname",{required:!0,adaptor:function(e){return e.target.value}})((function(e){var t=e.props,a=t.value,n=t.onChange,o=t.name,l=e.errorText;return r.a.createElement(E,{label:"First Name",value:a,onChange:n,name:o,errorText:l||""})})),o.createFormItem("lastname",{required:!0,adaptor:function(e){return e.target.value}})((function(e){var t=e.props,a=t.value,n=t.onChange,o=t.name,l=e.errorText;return r.a.createElement(E,{label:"Last Name",value:a,onChange:n,name:o,errorText:l||""})})),r.a.createElement("input",{className:s.a.submit,type:"submit",value:"Submit"}),r.a.createElement("section",null,a.log.map((function(e,t){return r.a.createElement("p",{key:t},e)}))))},E=function(e){var t=e.name,a=e.label,n=e.errorText,o=Object(m.a)(e,["name","label","errorText"]);return r.a.createElement("label",{className:s.a.input},r.a.createElement("span",{className:s.a.inputLabel},a),r.a.createElement("input",Object.assign({id:t},o)),r.a.createElement("div",{className:s.a.error},n))},b=function(){return r.a.createElement("section",null,r.a.createElement("header",null,r.a.createElement("h1",null,"use-form-ts"),r.a.createElement("p",null,"lightweight useForm hook for creating basic forms with TypeScript")),r.a.createElement("section",null,r.a.createElement("h2",null,"useForm.ts"),r.a.createElement("p",null,"Forms should be straight forward, just useForm and form.createFormItem to pass form state around.")),r.a.createElement("section",null,"Example:"),r.a.createElement(f,null))};function h(){return r.a.createElement("div",{className:"App"},r.a.createElement(b,null))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(h,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e,t,a){e.exports=a(20)}},[[9,1,2]]]);
//# sourceMappingURL=main.0b32c24f.chunk.js.map