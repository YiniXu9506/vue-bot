webpackJsonp([1],{

/***/ 119:
/***/ (function(module, exports) {

//
//
//
//
//
//
//

// import headerComponent from './components/header'

// export default {
//   name: 'app', 
//   components: {
//     headerComponent
//   }
// }

/***/ }),

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'sh-table',
  props: ['tableData'],
  data() {
    return {
      data: this.tableData
    };
  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      // this.tableData.handleClick(val);
    },

    handleDetail(row) {
      console.log(row);
      this.tableData.handleClick(row);
    },

    handleButton(row) {
      this.tableData.handleButtonClick(row);
    }
  }
});

/***/ }),

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__request_index__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_table__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_table__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  components: { myTable: __WEBPACK_IMPORTED_MODULE_1__components_table___default.a },
  name: 'expiredMission',
  data() {
    return {
      activeNames: ['1'],
      isShow: false,
      detail: '',
      missionCount: 0,

      tableData: {
        label: ['Mission ID', 'Mission Name', 'Status', 'Scenes', 'Update Time'],
        prop: ['id', 'name', 'status', 'scenes.name', 'update_time'],
        list: [],

        handleClick: function (row) {
          if (row == null) {
            return;
          }
          __WEBPACK_IMPORTED_MODULE_0__request_index__["a" /* default */].getMissionReportByID(row.id).then(result => {
            this.detail = result.data.data;
            this.detail.scenes_name = row.scenes.name;
            this.detail.status = row.status;
            this.detail.slack_channel = row.messager.callback;
            this.detail.id = row.id;
          }).catch(() => {});
          __WEBPACK_IMPORTED_MODULE_0__request_index__["a" /* default */].getMissionDetailByID(row.id).then(result => {
            this.detail.name = result.data.data.name;
            this.detail.pd_version = result.data.data.pd_version;
            this.detail.tidb_version = result.data.data.tidb_version;
            this.detail.tikv_version = result.data.data.tikv_version;
            this.detail.timeout = result.data.data.timeout;
            if (result.data.data.messager.callback == "") {
              this.detail.slack_channel = "#stability_tester";
            } else {
              this.detail.slack_channel = result.data.data.messager.callback;
            }
          }).catch(() => {});
          this.isShow = true;
        }.bind(this),

        handleButtonClick: function (row) {
          if (row == null) {
            return;
          }
          this.$confirm('Set mission ' + row.id + ' isHandled. Continue?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            __WEBPACK_IMPORTED_MODULE_0__request_index__["a" /* default */].handleMission(row.id).then(result => {
              if (result.data.code != 200) {
                this.$notify({
                  title: "ERROR",
                  type: 'error',
                  message: result.data.message,
                  duration: 0
                });
                return;
              }
              this.$notify({
                title: "SUCCESS",
                type: 'success',
                message: 'Set Operation completed'
              });
            }).catch(resp => {
              this.$notify({
                title: "ERROR",
                type: 'error',
                message: resp.message,
                duration: 0
              });
            });
          }).catch(() => {
            this.$notify({
              title: "INFO",
              type: 'info',
              message: 'Set Operation canceled'
            });
          });
        }.bind(this)
      }
    };
  },

  created() {
    __WEBPACK_IMPORTED_MODULE_0__request_index__["a" /* default */].getExpiredMission().then(result => {
      this.tableData.list = result.data.data;
      this.missionCount = this.tableData.list.length;
    }).catch(() => {});
  },

  methods: {}
});

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__request_index__ = __webpack_require__(51);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'mission',
  data() {
    return {
      mission_id: this.$route.query.id,
      dialog: false,
      detail: '',
      dialogData: {
        title: '',
        missionForm: {
          pd_version: '',
          tidb_version: '',
          tikv_version: ''
        },
        missionRules: {
          pd_version: [{
            required: true,
            message: 'Please pd version',
            trigger: 'blur'
          }, {
            min: 1,
            max: 200,
            message: 'Length should be 1 to 200',
            trigger: 'blur'
          }],
          tikv_version: [{
            required: true,
            message: 'Please tikv version',
            trigger: 'blur'
          }, {
            min: 1,
            max: 200,
            message: 'Length should be 1 to 200',
            trigger: 'blur'
          }],
          tidb_version: [{
            required: true,
            message: 'Please tidb version',
            trigger: 'blur'
          }, {
            min: 1,
            max: 200,
            message: 'Length should be 1 to 200',
            trigger: 'blur'
          }]
        }
      }
    };
  },

  created() {
    if (this.mission_id == null || this.mission_id == "") {
      alert("mission id cannot be empty");
      return;
    }

    __WEBPACK_IMPORTED_MODULE_0__request_index__["a" /* default */].getMissionReportByID(this.mission_id).then(result => {
      this.detail = result.data.data;
    }).catch(() => {});
  },

  methods: {
    clickRerun: function () {
      if (this.mission_id == null || this.mission_id == "") {
        alert("mission id cannot be empty");
        return;
      }
      this.dialogData.missionForm.tidb_version = this.detail.tidb_version;
      this.dialogData.missionForm.tikv_version = this.detail.tikv_version;
      this.dialogData.missionForm.pd_version = this.detail.pd_version;

      __WEBPACK_IMPORTED_MODULE_0__request_index__["a" /* default */].replayMissionWithData(this.mission_id, this.dialogData.missionForm).then(result => {
        if (result.data.code != 200) {
          this.$notify({
            title: "ERROR",
            type: 'error',
            message: result.data.message,
            duration: 0
          });
          return;
        }
        this.$notify({
          title: "SUCCESS",
          type: 'success',
          message: 'replay Mission Success!'
        });
        this.clearMissionForm();
      }).catch(resp => {
        this.$notify({
          title: "ERROR",
          type: 'error',
          message: resp.message,
          duration: 0
        });
      });
    },

    clickHold: function () {
      if (this.mission_id == null || this.mission_id == "") {
        alert("mission id cannot be empty");
        return;
      }
      __WEBPACK_IMPORTED_MODULE_0__request_index__["a" /* default */].holdMission(this.mission_id).then(result => {
        if (result.data.code != 200) {
          this.$notify({
            title: "ERROR",
            type: 'error',
            message: result.data.message,
            duration: 0
          });
          return;
        }
        this.$notify({
          title: "SUCCESS",
          type: 'success',
          message: 'hold Mission Success!'
        });
        this.clearMissionForm();
      }).catch(resp => {
        this.$notify({
          title: "ERROR",
          type: 'error',
          message: resp.message,
          duration: 0
        });
      });
    },

    clickCreateMission: function () {
      if (this.mission_id == null || this.mission_id == "") {
        alert("mission id cannot be empty");
        return;
      }
      this.dialogData = Object.assign({}, this.dialogData, {
        title: "Create New Mission With New Version"
      });
      this.dialog = true;
    },
    resetForm(formName) {
      if (this.$refs[formName] != null) {
        this.$refs[formName].resetFields();
      }
    },
    submitForm: function (formName, type) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.createMission();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    clearMissionForm: function () {
      this.dialogData.missionForm = {
        name: '',
        scenes_name: '',
        pd_version: '',
        tidb_version: '',
        tikv_version: '',
        slack_channel: '#stability-test',
        timeout: ''
      };
    },
    createMission: function () {
      //  this.dialogData.missionForm.name = this.detail.name;
      //  this.dialogData.missionForm.scenes_name= this.mission.scenes.name;
      //  this.dialogData.missionForm.timeout = this.detail.timeout; 
      //  this.dialogData.missionForm.slack_channel = this.mission.messager.callback; 
      __WEBPACK_IMPORTED_MODULE_0__request_index__["a" /* default */].replayMissionWithData(this.mission_id, this.dialogData.missionForm).then(result => {
        if (result.data.code != 200) {
          this.$notify({
            title: "ERROR",
            type: 'error',
            message: result.data.message,
            duration: 0
          });
          return;
        }
        this.dialog = false;
        this.$notify({
          title: "SUCCESS",
          type: 'success',
          message: 'Create Mission Success!'
        });
        this.clearMissionForm();
      }).catch(resp => {
        this.$notify({
          title: "ERROR",
          type: 'error',
          message: resp.message,
          duration: 0
        });
      });
    }
  }
});

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_element_ui__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_element_ui___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_element_ui__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_element_ui_lib_theme_default_index_css__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_element_ui_lib_theme_default_index_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_element_ui_lib_theme_default_index_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_vuex__ = __webpack_require__(77);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.




// Using ElementUI ui framework in vue



__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_3_element_ui___default.a);

// Using vuex for state-management

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_5_vuex__["a" /* default */]);

// Demo for filter usage
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].filter('santizeAnnotationContent', value => {
  try {
    var x = JSON.parse(value);
    return x.blocks.map(i => i.text).join('\n');
  } catch (e) {
    return value;
  }
});

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].config.productionTip = false;

/* eslint-disable no-new */
const app = new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */],
  data: new __WEBPACK_IMPORTED_MODULE_0_vue__["default"](),
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});

/* harmony default export */ __webpack_exports__["default"] = (app);

/***/ }),

/***/ 174:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 175:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 176:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 177:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 181:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(177)
}
var Component = __webpack_require__(24)(
  /* script */
  __webpack_require__(120),
  /* template */
  __webpack_require__(187),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 182:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(174)
}
var Component = __webpack_require__(24)(
  /* script */
  __webpack_require__(121),
  /* template */
  __webpack_require__(184),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 183:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(176)
}
var Component = __webpack_require__(24)(
  /* script */
  __webpack_require__(122),
  /* template */
  __webpack_require__(186),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 184:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "card"
  }, [_c('el-card', {
    staticClass: "box-card"
  }, [_c('div', [_c('h3', [_vm._v("Expired Mission Count: " + _vm._s(_vm.missionCount))])]), _vm._v(" "), _c('div', [_c('my-table', {
    attrs: {
      "tableData": _vm.tableData
    }
  })], 1)])], 1), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isShow),
      expression: "isShow"
    }],
    staticClass: "sch-detail"
  }, [_c('el-collapse', {
    model: {
      value: (_vm.activeNames),
      callback: function($$v) {
        _vm.activeNames = $$v
      },
      expression: "activeNames"
    }
  }, [_c('el-collapse-item', {
    attrs: {
      "title": "Mission Detail",
      "name": "1"
    }
  }, [_c('div', {
    staticClass: "sch-detail-header"
  }, [_c('div', {
    staticClass: "sch-detail-summery"
  }, [_c('span', [_vm._v("Mission Name:\n              "), _c('strong', [_vm._v(" " + _vm._s(_vm.detail.name))])]), _vm._v(" "), _c('span', [_vm._v("Status:\n              "), _c('strong', [_vm._v(" " + _vm._s(_vm.detail.status))])])])]), _vm._v(" "), _c('div', {
    staticClass: "sch-detail-body"
  }, [_c('pre', [_vm._v(_vm._s(_vm.detail))])])])], 1)], 1)])
},staticRenderFns: []}

/***/ }),

/***/ 185:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "app-container",
    attrs: {
      "id": "app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ }),

/***/ 186:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "card"
  }, [_c('el-card', {
    staticClass: "box-card"
  }, [_c('div', [_c('span', [_vm._v("Mission: "), _c('strong', [_vm._v(" " + _vm._s(_vm.mission_id) + " ")])])]), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', [_c('el-button', {
    on: {
      "click": _vm.clickRerun
    }
  }, [_vm._v("Rerun")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.clickHold
    }
  }, [_vm._v("Hold")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "success"
    },
    on: {
      "click": _vm.clickCreateMission
    }
  }, [_vm._v("New")])], 1)])], 1), _vm._v(" "), _c('div', [_c('el-dialog', {
    attrs: {
      "title": _vm.dialogData.title,
      "visible": _vm.dialog
    },
    on: {
      "update:visible": function($event) {
        _vm.dialog = $event
      }
    }
  }, [_c('el-form', {
    ref: "dialogData.missionForm",
    attrs: {
      "model": _vm.dialogData.missionForm,
      "rules": _vm.dialogData.missionRules,
      "label-width": "6rem"
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "PD Version:",
      "prop": "pd_version"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "branch:xxx / hash:xxx / latest"
    },
    model: {
      value: (_vm.dialogData.missionForm.pd_version),
      callback: function($$v) {
        _vm.$set(_vm.dialogData.missionForm, "pd_version", $$v)
      },
      expression: "dialogData.missionForm.pd_version"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "TiDB Version:",
      "prop": "tidb_version"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "branch:xxx / hash:xxx / latest"
    },
    model: {
      value: (_vm.dialogData.missionForm.tidb_version),
      callback: function($$v) {
        _vm.$set(_vm.dialogData.missionForm, "tidb_version", $$v)
      },
      expression: "dialogData.missionForm.tidb_version"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "TiKV Version:",
      "prop": "tikv_version"
    }
  }, [_c('el-input', {
    attrs: {
      "placeholder": "branch:xxx / hash:xxx / latest"
    },
    model: {
      value: (_vm.dialogData.missionForm.tikv_version),
      callback: function($$v) {
        _vm.$set(_vm.dialogData.missionForm, "tikv_version", $$v)
      },
      expression: "dialogData.missionForm.tikv_version"
    }
  })], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "dialog-footer",
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('el-button', {
    on: {
      "click": function($event) {
        _vm.dialog = false;
        _vm.clearMissionForm()
      }
    }
  }, [_vm._v("Cancel")]), _vm._v(" "), _c('el-button', {
    on: {
      "click": function($event) {
        _vm.resetForm('dialogData.missionForm')
      }
    }
  }, [_vm._v("Reset")]), _vm._v(" "), _c('el-button', {
    on: {
      "click": function($event) {
        _vm.submitForm('dialogData.missionForm', _vm.dialogData.type)
      }
    }
  }, [_vm._v("OK")])], 1)], 1)], 1)])
},staticRenderFns: []}

/***/ }),

/***/ 187:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('el-table', {
    ref: "singleTable",
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.data.list,
      "highlight-current-row": ""
    },
    on: {
      "current-change": _vm.handleCurrentChange
    }
  }, [_vm._l((_vm.data.prop), function(item, index) {
    return _c('el-table-column', {
      key: index,
      attrs: {
        "prop": item,
        "label": _vm.data.label[index]
      }
    })
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "fixed": "right",
      "label": "Operations"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-button', {
          attrs: {
            "type": "text",
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.handleDetail(scope.row)
            }
          }
        }, [_vm._v("Detail")]), _vm._v(" "), _c('el-button', {
          attrs: {
            "type": "text",
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.handleButton(scope.row)
            }
          }
        }, [_vm._v("Handle")])]
      }
    }])
  })], 2)], 1)
},staticRenderFns: []}

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);

const Proxy = '/api';

// Mock.mock(/\/api\/mission\/period\/[\w-]+/, "get", {
//   "status": 200,
//   "message": "",
//   "data|3-5": [{
//     'id|+1': 1,
//     'name': '@word',
//     'status|1': ["RUNNING", "ERROR", "FINISHED"],
//     'create_time': '2017-11-06 17:33:02',
//     "scenes": {
//       "name": "stability"
//     },
//     "messager": {
//       "callback": "#stability_tester"
//     }
//   }]
// })

// Mock.mock(`${Proxy}/mission`, "get", {
//   "status": 200,
//   "message": "",
//   "data|3-5": [{
//     'id|+1': 1,
//     'name': '@word',
//     'status|1': ["RUNNING", "ERROR", "FINISHED"],
//     'create_time': '2017-11-06 17:33:02',
//     "scenes": {
//       "name": "stability"
//     },
//     "messager": {
//       "callback": "#stability_tester"
//     }
//   }]
// })

// Mock.mock(/\/api\/mission\/\d/, {
//   "status": 200,
//   "message": "",
//   "data": {
//     "id": 1,
//     "name": "pyy-M",
//     "scenes": {
//       "id": 5,
//       "name": "pyy-test",
//       "desc": "pyy's stability test arrangement",
//       "creator": "pyy"
//     },
//     "create_time": "2017-10-26 17:33:02",
//     "update_time": "2017-10-26 17:43:55",
//     "status": "RUNNING",
//     "message": "",
//     "pd_version": "hash:838f93c075f91df943470970f3d71b593004de5b",
//     "tidb_version": "hash:27eedda83505d55914c912ae482c182f0e598da8",
//     "tikv_version": "hash:3857ee60db755291ff2de1999ccb4ef9bc77af0f",
//     "timeout": "10m0s",
//     "messager": {
//       "type": "",
//       "callback": "#stability_tester"
//     },
//     "information-report": "",
//     "boxes": {
//       "pyy": {
//         "name": "pyy",
//         "namespace": "pyy-m-pyy-yahdig",
//         "cluster": {
//           "id": 40
//         }
//       }
//     }

//   }
// })

// Mock.mock(/\/api\/mission\/\d\/stop/, {
//   "status": 200,
//   "message": "OK"
// })

// Mock.mock(`${Proxy}/case/template`, "get", {
//   "status": 200,
//   "message": "",
//   'data|4-6': [{
//     'id|+1': 1,
//     'name': '@word',
//     'creator': 'cwen',
//     'create_time': '2017-10-26 17:33:02',
//     'type|1': ["auxiliary tool", "test case"]
//   }]
// })

// Mock.mock(/\/api\/case\/template\/[\w-]+/, "get", {
//   "status": 200,
//   "message": "",
//   "data": {
//     "id": 1,
//     "name": "bank2",
//     "creator": "cwen",
//     "create_time": "2017-10-17 10:27:23",
//     "update_time": "2017-10-17 10:27:23",
//     "desc": "bank template",
//     "type": "test case",
//     "source": {
//       "binary_name": "bank2",
//       "type": "binary",
//       "url": "http://pingcap-dev.hk.ufileos.com/buildbot/pingcap/octopus/7fbccc0cfb535c19247aca515d5ea42f424d46d7/centos7/case-octopus-bank2.tar.gz",
//       "git_value": ""
//     },
//     "args": ""
//   }
// })

// Mock.mock(`${Proxy}/case/template`, "post", {
//   "status": 200,
//   "message": "",
//   "data": {
//     "id": 10,
//     "name": "bank2",
//     "creator": "cwen",
//     "create_time": "2017-10-17 10:27:23",
//     "update_time": "2017-10-17 10:27:23",
//     "desc": "bank template",
//     "type": "test case",
//     "source": {
//       "binaryname": "bank2",
//       "type": "binary",
//       "url": "http://pingcap-dev.hk.ufileos.com/buildbot/pingcap/octopus/7fbccc0cfb535c19247aca515d5ea42f424d46d7/centos7/case-octopus-bank2.tar.gz",
//       "git_value": ""
//     },
//     "args": ""
//   }
// })

// Mock.mock(/\/api\/case\/template\/[\w-]+/, "delete", {
//   "status": 200,
//   "message": "OK",
// })

// Mock.mock(`${Proxy}/cluster/template`, "get", {
//   "status": 200,
//   "message": "",
//   "data|4-6": [{
//     "name": '@name',
//     "creator": "cwen",
//     "desc": '@string',
//     "pd": 3,
//     "tidb": 3,
//     "tikv": 5,
//     "config_map": "latest-config-template"
//   }]
// })

// Mock.mock(/\/api\/cluster\/template\/[\w-]+/, "get", {
//   "status": 200,
//   "message": "",
//   "data": {
//     "id": 1,
//     "name": "simple-cluster",
//     "desc": "simple cluster",
//     "creator": "cwen",
//     "create_time": "2017-10-17 15:31:16",
//     "update_time": "2017-10-17 15:31:16",
//     "pd": 3,
//     "tidb": 3,
//     "tikv": 5,
//     "config_map": "tidb-instance-config-template",
//     "desc": "this cluster for test stability-test"

//   }
// })


// Mock.mock(/\/api\/cluster\/template\/[\w-]+/, "delete", {
//   "status": 200,
//   "message": "OK"
// })

// Mock.mock(`${Proxy}/cluster/template`, "post", {
//   "status": 200,
//   "message": "",
//   "data": {
//     "id": 10,
//     "name": "simple-cluster",
//     "desc": "simple cluster",
//     "creator": "cwen",
//     "create_time": "2017-10-17 15:31:16",
//     "update_time": "2017-10-17 15:31:16",
//     "pd": 3,
//     "tidb": 3,
//     "tikv": 5,
//     "config_map": "tidb-instance-config-template",
//     "desc": "this cluster for test stability-test"
//   }
// })

// Mock.mock(`${Proxy}/scenes`, "get", {
//   "status": 200,
//   "message": "",
//   "data|4-6": [{
//     "name": '@name',
//     "desc": "statbility",
//     "creator": "cwen",
//     "create_time": "2017-10-17 15:31:16",
//     "boxes": {
//       "test": {
//         "name": '@name',
//         "cluster_template": "simple-cluster",
//         "case_templates": [
//           "bank2"
//         ]
//       }
//     }
//   }]
// })

// Mock.mock(/\/api\/scenes\/[\w-]+/, "get", {
//   "status": 200,
//   "message": "",
//   "data": {
//     "id": 2,
//     "name": 'stability-test',
//     "desc": "statbility",
//     "creator": "cwen",
//     "create_time": "2017-10-17 15:31:16",
//     "update_time": "2017-10-17 15:31:16",
//     "boxes": [{
//       "name": 'simple-test',
//       "cluster_template": "simple-cluster",
//       "case_templates": [
//         "bank2"
//       ]
//     }]
//   }
// })

// Mock.mock(/\/api\/scenes\/[\w-]+/, "delete", {
//   "status": 200,
//   "message": "OK"
// })

// Mock.mock(`${Proxy}/scenes`, "post", {
//   "status": 200,
//   "data": {
//     "id": 10,
//     "name": 'stability-test',
//     "desc": "statbility",
//     "creator": "cwen",
//     "create_time": "2017-10-17 15:31:16",
//     "update_time": "2017-10-17 15:31:16",
//     "boxes": [{
//       "name": 'simple-test',
//       "cluster_template": "simple-cluster",
//       "case_templates": [
//         "bank2"
//       ]
//     }]
//   }
// })

// Mock.mock(`${Proxy}/mission/filter`, "get", {
//   "status": 200,
//   'data|4-6': [{
//     'id|+1': 1,
//     'name': '@word',
//     'status|1': ["RUNNING", "ERROR", "FINISHED"],
//     'start_time': '2017-11-06 17:33:02'
//   }]
// })

// Mock.mock(`${Proxy}/release`, "get", {
//   "status": 200,
//   "message": "OK"
// })

// Mock.mock(/\/api\/mission\/[\w-]+/, "get", {
//   "status": 200,
//   'data|4-6': [{
//     'id|+1': 1,
//     'name': '@word',
//     'status|1': ["RUNNING", "ERROR", "FINISHED"],
//     'start_time': '2017-11-06 17:33:02'
//   }]
// })

class Ajax {
  getMissions() {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(`${Proxy}/mission`);
  }

  getMissionReportByID(id) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(`${Proxy}/mission/${id}/report`);
  }

  getMissionDetailByID(id) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(`${Proxy}/mission/${id}`);
  }

  stopMissionByID(id) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${Proxy}/mission/${id}/stop`);
  }

  startMission(data) {
    console.log(data);
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${Proxy}/mission`, data);
  }

  updateMission(data) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.put(`${Proxy}/mission/${data.id}`, data);
  }

  getCasesTemplate() {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(`${Proxy}/case/template`);
  }

  getCaseTemplateByName(name) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(`${Proxy}/case/template/${name}`);
  }

  createCaseTemplate(data) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${Proxy}/case/template`, data);
  }

  updateCaseTemplate(data) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.put(`${Proxy}/case/template`, data);
  }

  deleteCaseTemplate(name) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.delete(`${Proxy}/case/template/${name}`);
  }

  getClustersTemplate() {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(`${Proxy}/cluster/template`);
  }

  getClusterTemplateByName(name) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(`${Proxy}/cluster/template/${name}`);
  }

  deleteClusterTemplate(name) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.delete(`${Proxy}/cluster/template/${name}`);
  }

  setClusterTemplate(data) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${Proxy}/cluster/template`, data);
  }

  getScenes() {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(`${Proxy}/scenes`);
  }

  getScenesByName(name) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(`${Proxy}/scenes/${name}`);
  }

  deleteScenes(name) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.delete(`${Proxy}/scenes/${name}`);
  }

  setScenes(data) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${Proxy}/scenes`, data);
  }

  searchMission(filter) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${Proxy}/mission/filter`, filter);
  }

  getMissionByPeriod(period) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(`${Proxy}/mission/period/${period}`);
  }

  release(data) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${Proxy}/release`, data);
  }

  replayMission(id) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${Proxy}/mission/${id}/replay/false`);
  }

  replayMissionWithData(id, data) {
    console.log(data);
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${Proxy}/mission/${id}/replay/false`, data);
  }

  holdMission(id) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${Proxy}/mission/${id}/hold`);
  }

  getExpiredMission() {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.get(`${Proxy}/mission/expired`);
  }

  handleMission(id) {
    return __WEBPACK_IMPORTED_MODULE_0_axios___default.a.post(`${Proxy}/mission/${id}/handle`);
  }
}
/* harmony default export */ __webpack_exports__["a"] = (new Ajax());

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_MissionView__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_MissionView___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__views_MissionView__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_ExpiredMission__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_ExpiredMission___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__views_ExpiredMission__);





__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

const NotFoundView = __WEBPACK_IMPORTED_MODULE_0_vue__["default"].component('NotFoundView', {
  template: '<h1>...Ops, 404</h1>'
});

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  routes: [
  // {
  //   path: '/view',
  //   name: 'Hello',
  //   component: Hello
  // },
  { path: '/', redirect: '/bot/mission/expired' }, {
    path: '/404',
    name: 'NotFoundView',
    component: NotFoundView
  }, {
    path: '/bot/mission',
    name: 'MissionView',
    component: __WEBPACK_IMPORTED_MODULE_2__views_MissionView___default.a
  }, {
    path: '/bot/mission/expired',
    name: 'ExpiredMission',
    component: __WEBPACK_IMPORTED_MODULE_3__views_ExpiredMission___default.a
  }]
}));

/***/ }),

/***/ 75:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(175)
}
var Component = __webpack_require__(24)(
  /* script */
  __webpack_require__(119),
  /* template */
  __webpack_require__(185),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ })

},[123]);
//# sourceMappingURL=app.1a0164794c835e3cc12c.js.map