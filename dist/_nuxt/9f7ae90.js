(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{624:function(e,t,n){var content=n(625);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(26).default)("50788f08",content,!0,{sourceMap:!1})},625:function(e,t,n){var o=n(25)(!1);o.push([e.i,".v-autocomplete.v-input>.v-input__control>.v-input__slot{cursor:text}.v-autocomplete input{align-self:center}.v-autocomplete.v-select.v-input--is-focused input{min-width:64px}.v-autocomplete:not(.v-input--is-focused).v-select--chips input{max-height:0;padding:0}.v-autocomplete--is-selecting-index input{opacity:0}.v-autocomplete.v-text-field--enclosed:not(.v-text-field--solo):not(.v-text-field--single-line):not(.v-text-field--outlined) .v-select__slot>input{margin-top:24px}.v-autocomplete.v-text-field--enclosed:not(.v-text-field--solo):not(.v-text-field--single-line):not(.v-text-field--outlined).v-input--dense .v-select__slot>input{margin-top:20px}.v-autocomplete:not(.v-input--is-disabled).v-select.v-text-field input{pointer-events:inherit}.v-autocomplete__content.v-menu__content,.v-autocomplete__content.v-menu__content .v-card{border-radius:0}",""]),e.exports=o},638:function(e,t,n){"use strict";n.r(t);n(31),n(5);var o={name:"autocomplete",props:{outlined:Boolean,solo:Boolean,rounded:Boolean,value:String,icon:Boolean,hideDetails:Boolean},data:function(){return{socios:[],isLoading:!1,search:"",result:{}}},methods:{},watch:{search:function(e){var t=this;if(!this.isLoading){this.isLoading=!0;var n="?_where[_or][0][name_contains]=".concat(e,"&_where[_or][1][last_name_contains]=").concat(e);this.$axios.get("/socios/".concat(n)).then((function(data){t.socios=data.data})).catch((function(e){console.log(e)})).finally((function(){return t.isLoading=!1}))}},result:function(e){console.log(e),this.$emit("input",e)}}},l=n(77),r=n(94),c=n.n(r),h=(n(14),n(9),n(17),n(12),n(18),n(2)),d=(n(63),n(11),n(88),n(164),n(209),n(46),n(58),n(624),n(606)),f=n(584),m=n(70),v=n(1);function I(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function x(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?I(Object(source),!0).forEach((function(t){Object(h.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):I(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var y=x(x({},d.b),{},{offsetY:!0,offsetOverflow:!0,transition:!1}),S=d.a.extend({name:"v-autocomplete",props:{allowOverflow:{type:Boolean,default:!0},autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:function(e,t,n){return n.toLocaleLowerCase().indexOf(t.toLocaleLowerCase())>-1}},hideNoData:Boolean,menuProps:{type:d.a.options.props.menuProps.type,default:function(){return y}},noFilter:Boolean,searchInput:{type:String}},data:function(){return{lazySearch:this.searchInput}},computed:{classes:function(){return x(x({},d.a.options.computed.classes.call(this)),{},{"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1})},computedItems:function(){return this.filteredItems},selectedValues:function(){var e=this;return this.selectedItems.map((function(t){return e.getValue(t)}))},hasDisplayedItems:function(){var e=this;return this.hideSelected?this.filteredItems.some((function(t){return!e.hasItem(t)})):this.filteredItems.length>0},currentRange:function(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems:function(){var e=this;return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter((function(t){var n=Object(v.s)(t,e.itemText),text=null!=n?String(n):"";return e.filter(t,String(e.internalSearch),text)}))},internalSearch:{get:function(){return this.lazySearch},set:function(e){this.lazySearch!==e&&(this.lazySearch=e,this.$emit("update:search-input",e))}},isAnyValueAllowed:function(){return!1},isDirty:function(){return this.searchIsDirty||this.selectedItems.length>0},isSearching:function(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps:function(){var e=d.a.options.computed.$_menuProps.call(this);return e.contentClass="v-autocomplete__content ".concat(e.contentClass||"").trim(),x(x({},y),e)},searchIsDirty:function(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem:function(){var e=this;return this.multiple?null:this.selectedItems.find((function(i){return e.valueComparator(e.getValue(i),e.getValue(e.internalValue))}))},listData:function(){var data=d.a.options.computed.listData.call(this);return data.props=x(x({},data.props),{},{items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch}),data}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused:function(e){e?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.blur(),this.updateSelf())},isMenuActive:function(e){!e&&this.hasSlot&&(this.lazySearch=null)},items:function(e,t){t&&t.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!e.length||this.activateMenu()},searchInput:function(e){this.lazySearch=e},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created:function(){this.setSearch()},destroyed:function(){document.removeEventListener("copy",this.onCopy)},methods:{onFilteredItemsChanged:function(e,t){var n=this;if(e!==t){if(!this.autoSelectFirst){var o=t[this.$refs.menu.listIndex];o?this.setMenuIndex(e.findIndex((function(i){return i===o}))):this.setMenuIndex(-1),this.$emit("update:list-index",this.$refs.menu.listIndex)}this.$nextTick((function(){n.internalSearch&&(1===e.length||n.autoSelectFirst)&&(n.$refs.menu.getTiles(),n.autoSelectFirst&&e.length&&(n.setMenuIndex(0),n.$emit("update:list-index",n.$refs.menu.listIndex)))}))}},onInternalSearchChanged:function(){this.updateMenuDimensions()},updateMenuDimensions:function(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex:function(e){this.searchIsDirty||(this.multiple&&e===v.y.left?-1===this.selectedIndex?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&e===v.y.right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:e!==v.y.backspace&&e!==v.y.delete||this.deleteCurrentItem())},deleteCurrentItem:function(){var e=this.selectedIndex,t=this.selectedItems[e];if(this.isInteractive&&!this.getDisabled(t)){var n=this.selectedItems.length-1;if(-1!==this.selectedIndex||0===n){var o=e!==this.selectedItems.length-1?e:e-1;this.selectedItems[o]?this.selectItem(t):this.setValue(this.multiple?[]:null),this.selectedIndex=o}else this.selectedIndex=n}},clearableCallback:function(){this.internalSearch=null,d.a.options.methods.clearableCallback.call(this)},genInput:function(){var input=f.a.options.methods.genInput.call(this);return input.data=Object(m.a)(input.data,{attrs:{"aria-activedescendant":Object(v.q)(this.$refs.menu,"activeTile.id"),autocomplete:Object(v.q)(input.data,"attrs.autocomplete","off")},domProps:{value:this.internalSearch}}),input},genInputSlot:function(){var slot=d.a.options.methods.genInputSlot.call(this);return slot.data.attrs.role="combobox",slot},genSelections:function(){return this.hasSlot||this.multiple?d.a.options.methods.genSelections.call(this):[]},onClick:function(e){this.isInteractive&&(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.isAppendInner(e.target)||this.activateMenu())},onInput:function(e){if(!(this.selectedIndex>-1)&&e.target){var t=e.target,n=t.value;t.value&&this.activateMenu(),this.multiple||""!==n||this.deleteCurrentItem(),this.internalSearch=n,this.badInput=t.validity&&t.validity.badInput}},onKeyDown:function(e){var t=e.keyCode;!e.ctrlKey&&[v.y.home,v.y.end].includes(t)||d.a.options.methods.onKeyDown.call(this,e),this.changeSelectedIndex(t)},onSpaceDown:function(e){},onTabDown:function(e){d.a.options.methods.onTabDown.call(this,e),this.updateSelf()},onUpDown:function(e){e.preventDefault(),this.activateMenu()},selectItem:function(e){d.a.options.methods.selectItem.call(this,e),this.setSearch()},setSelectedItems:function(){d.a.options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch:function(){var e=this;this.$nextTick((function(){e.multiple&&e.internalSearch&&e.isMenuActive||(e.internalSearch=!e.selectedItems.length||e.multiple||e.hasSlot?null:e.getText(e.selectedItem))}))},updateSelf:function(){(this.searchIsDirty||this.internalValue)&&(this.multiple||this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem:function(e){return this.selectedValues.indexOf(this.getValue(e))>-1},onCopy:function(e){var t,n;if(-1!==this.selectedIndex){var o=this.selectedItems[this.selectedIndex],l=this.getText(o);null==(t=e.clipboardData)||t.setData("text/plain",l),null==(n=e.clipboardData)||n.setData("text/vnd.vuetify.autocomplete.item+plain",l),e.preventDefault()}}}}),D=n(408),_=n(192),w=n(211),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("v-autocomplete",{staticClass:"font-weight-light",attrs:{"hide-details":e.hideDetails,items:e.socios,dense:"",loading:e.isLoading,"search-input":e.search,"hide-no-data":"","item-value":"id","item-text":"name",placeholder:"Buscar socios...",solo:"",outlined:e.outlined,rounded:e.rounded,"background-color":"white"},on:{"update:searchInput":function(t){e.search=t},"update:search-input":function(t){e.search=t},keyup:function(t){if(!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter"))return null;e.result=e.search}},scopedSlots:e._u([e.icon?{key:"append-outer",fn:function(){return[n("v-slide-x-reverse-transition",{attrs:{mode:"out-in"}},[n("v-btn",{attrs:{text:""},on:{click:function(t){return e.emitSearch()}}},[n("v-icon",[e._v("search")])],1)],1)]},proxy:!0}:null],null,!0),model:{value:e.result,callback:function(t){e.result=t},expression:"result"}})],1)}),[],!1,null,null,null);t.default=component.exports;c()(component,{VAutocomplete:S,VBtn:D.a,VIcon:_.a,VSlideXReverseTransition:w.d})}}]);