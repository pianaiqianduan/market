export default ({

    // 头部导航的内容
    changeHeader(state, msg) {
        state.headerMsg = msg
    },

    // 头部导航后边的内容是否显示
    changeHeaderRight(state, msg) {
        state.headerRightShow = msg
    },

    //头部导航返回按钮是否显示
    headerLeftShow(state, msg) {
        state.headerLeftShow.showBack = msg
    },

    //改变头部导航右边的内容
    changeHeaderMsg(state, msgs) {
        if (!state.isChangeT) {
            let flag = false
            for (let i in state.flowList) {
                if (!flag) {
                    if (state.flowList[i].nouse.length == 0 && state.flowList.length - 1 == i) {
                        state.isAddModle = false
                        break
                    } else if (state.flowList[i].nouse.length > 0) {
                        state.isAddModle = true
                        flag = true
                        if (msgs == '完成') {
                            // 更改模板按钮的状态、导航头部右侧的信息、全选按钮的状态、单个按钮的选中状态
                            state.isAddShow = false
                            state.headerRightMsg = msgs
                            state.isChecked = false
                            deleteItemChecked(state)
                        } else if (msgs == '删除') {
                            state.isAddShow = true
                            state.headerRightMsg = msgs
                        }
                    }
                }
            }
        } else {
            if (state.flowList.nouse.length > 0) {
                state.isAddModle = true
                if (msgs == '完成') {
                    // 更改模板按钮的状态、导航头部右侧的信息、全选按钮的状态、单个按钮的选中状态
                    state.isAddShow = false
                    state.headerRightMsg = msgs
                    state.isChecked = false
                    deleteItemChecked(state)
                } else if (msgs == '删除') {
                    state.isAddShow = true //添加按钮是否显示
                    state.headerRightMsg = msgs //修改头部右侧信息
                }
            }
        }

    },

    //判断所请求的流程是有有额度
    changeIsNull(state, msg) {
        state.isNull = msg
    },

    //接口是否请求成功
    isaxios(state, msg) {
        state.isaxios = msg
    },

    // 获取到流程及其包含的产品
    flowList(state, msg) {
        if (state.isChangeT) {
            state.isChange = false
            state.flowList = msg
        } else {
            state.isChange = false
            for (let i in msg) {
                msg[i].advancePrice = 0;
                if (i == msg.length - 1) {
                    state.flowList = msg
                }
            }
        }
    },


    // 判断用户再哪个流程中新增的模板
    productList(state, msg) {
        let arrList = state.flowList
        for (let j in arrList) {
            if (arrList[j].pk_busitype == msg) {
                if (arrList[j].nouse.length > 0) {
                    for (let k in arrList[j].nouse) {
                        if (arrList[j].nouse[k].allPrice == 0 && k == arrList[j].nouse.length - 1) {
                            state.beforeModal = true;
                        } else if (arrList[j].nouse[k].allPrice != 0 && k == arrList[j].nouse.length - 1) {
                            state.beforeModal = false;
                            let obj = {
                                sj: state.plannelIndex++
                            };
                            arrList[j].nouse.push(obj)
                        }
                    }
                } else {
                    state.beforeModal = false;
                    let obj = {
                        sj: state.plannelIndex++
                    };
                    arrList[j].nouse.push(obj)
                }

            }
        }
    },

    // 挂载的时候修改nouse中的数据
    changeNouse(state, msg) {
        for (let j in state.flowList) {
            if (state.flowList[j].pk_busitype == msg.key) {
                for (let k in state.flowList[j].nouse) {
                    if (state.flowList[j].nouse[k].value == undefined) {
                        state.flowList[j].nouse[k].key = msg.key;
                        state.flowList[j].nouse[k].value = msg.value;
                        state.flowList[j].nouse[k].allPrice = msg.allPrice;
                    }
                }
            }
        }

    },

    // 点击选中修改nouse中的数据，加checked属性,并实时监听是否全选
    checkedItem(state, msg) {
        let flag = false;
        if (!state.isChangeT) {
            for (let i in state.flowList) {
                if (state.flowList[i].pk_busitype == msg.key) {
                    for (let k in state.flowList[i].nouse) {
                        if (state.flowList[i].nouse[k].value == msg.value) {
                            state.flowList[i].nouse[k].checked = true;
                            if (!flag) {
                                if (k == state.flowList[i].nouse.length - 1) {
                                    state.isChecked = true
                                }
                            }
                        } else {
                            if (state.flowList[i].nouse[k].checked) {
                                if (!flag) {
                                    if (k == state.flowList[i].nouse.length - 1) {
                                        state.isChecked = true
                                    }
                                }
                            } else {
                                flag = true
                            }
                        }
                    }
                } else {
                    if (state.flowList[i].nouse.length > 0) {
                        state.isChecked = false;
                        for (let m in state.flowList[i].nouse) {
                            if (state.flowList[i].nouse[m].value == msg.value) {
                                state.flowList[i].nouse[m].checked = true;
                                if (!flag) {
                                    if (m == state.flowList[i].nouse.length - 1) {
                                        state.isChecked = true
                                    }
                                }
                            } else {
                                if (state.flowList[i].nouse[m].checked) {
                                    if (!flag) {
                                        if (m == state.flowList[i].nouse.length - 1) {
                                            state.isChecked = true
                                        }
                                    }
                                } else {
                                    flag = true
                                }
                            }
                        }
                    }
                }
            }
        } else {
            if (state.flowList.pk_busitype == msg.key) {
                for (let j in state.flowList.nouse) {
                    if (state.flowList.nouse[j].value == msg.value) {
                        state.flowList.nouse[j].checked = true;
                        if (!flag) {
                            if (j == state.flowList.nouse.length - 1) {
                                state.isChecked = true
                            }
                        }
                    } else {
                        if (state.flowList.nouse[j].checked) {
                            if (!flag) {
                                if (j == state.flowList.nouse.length - 1) {
                                    state.isChecked = true
                                }
                            }
                        } else {
                            flag = true
                        }
                    }
                }
            }
        }

    },


    // 点击取消选中修改nouse中的数据，删除checked属性
    cancelItem(state, msg) {
        // 首先更改全选按钮的状态
        state.isChecked = false
        if (!state.isChangeT) {
            for (let i in state.flowList) {
                if (state.flowList[i].pk_busitype == msg.key) {
                    for (let k in state.flowList[i].nouse) {
                        if (state.flowList[i].nouse[k].value == msg.value && state.flowList[i].nouse[k].checked == true) {
                            delete state.flowList[i].nouse[k].checked
                        }
                    }
                }
            }
        } else {
            if (state.flowList.pk_busitype == msg.key) {
                for (let n in state.flowList.nouse) {
                    if (state.flowList.nouse[n].value == msg.value && state.flowList.nouse[n].checked == true) {
                        delete state.flowList.nouse[n].checked
                    }
                }
            }
        }
    },


    // 点击删除按钮
    deleteItem(state) {
        deleteItem(state)
    },

    //全选按钮在选中状态下执行
    changeDisabled(state, msg) {
        state.isChecked = true
        let flag = false
        if (!state.isChangeT) {
            for (let i in state.flowList) {
                if (!flag) {
                    if (state.flowList[i].nouse.length == 0 && state.flowList.length - 1 == i) {
                        state.isChecked = !msg
                        break
                    } else if (state.flowList[i].nouse.length > 0) {
                        flag = true
                        state.itemChecked = msg
                    }
                }
            }
        } else {

            if (!flag) {
                if (state.flowList.nouse.length == 0) {
                    state.isChecked = !msg
                } else if (state.flowList.nouse.length > 0) {
                    flag = true
                    state.itemChecked = msg
                }
            }

        }
    },

    // 全选按钮在点击事件不选中中执行修改itemChecked，用于监听
    changeFalse(state, msg) {
        state.itemChecked = msg
    },

    // 获取产品组,判断是否请求成功
    pricegroupcorp(state, msg) {
        state.pricegroupcorp = msg
    },

    // 点击数量修改advancePrice
    advancePrice(state, msg) {
        if (!state.isChangeT) {
            for (let i in state.flowList) {
                if (state.flowList[i].pk_busitype == msg.modalId) {
                    let opt = 0;
                    for (let k in state.flowList[i].nouse) {
                        if (state.flowList[i].nouse[k].value == msg.itemId) {
                            let arr = []
                            let arrTj = []
                            let objName = {}
                            let objNum = {}
                            let objPrice = {}
                            objName.label = '产品名称';
                            objName.value = msg.name;
                            objNum.label = '产品数量';
                            objNum.value = 'x' + msg.num;
                            objPrice.label = '产品单价';
                            objPrice.value = msg.priceItem + '元'

                            // 总提交数组 ---产品信息
                            let objTj = {}
                            objTj.staunitid = msg.staunitid;
                            objTj.elseunitid = msg.elseunitid;
                            objTj.prtyid4 = msg.prtyid4;
                            objTj.id = msg.id;
                            objTj.cpricetariffid = msg.cpricetariffid;
                            objTj.cpricetypeid = msg.cpricetypeid;
                            objTj.nprice = msg.priceItem;
                            objTj.pricepolicyid = msg.pricepolicyid;
                            objTj.nnumber = msg.num;
                            objTj.nmny = msg.allPrice;
                            objTj.newdisnum = msg.newdisnum
                            objTj.sington_conversion = msg.sington_conversion

                            arr.push(objName);
                            arr.push(objNum);
                            arr.push(objPrice);
                            arrTj.push(objTj)
                            state.flowList[i].nouse[k].num = msg.num
                            state.flowList[i].nouse[k].arr = arr
                            state.flowList[i].nouse[k].arrTj = arrTj
                            state.flowList[i].nouse[k].allPrice = 0;
                            state.flowList[i].nouse[k].allPrice = msg.allPrice
                        }
                        opt = opt + state.flowList[i].nouse[k].allPrice
                    }
                    // 单个流程总计
                    state.flowList[i].advancePrice = opt
                }
            }
        } else {
            if (state.flowList.pk_busitype == msg.modalId) {
                let opt = 0;
                for (let j in state.flowList.nouse) {
                    if (state.flowList.nouse[j].value == msg.itemId) {
                        let arr = []
                        let arrTj = []
                        let objName = {}
                        let objNum = {}
                        let objPrice = {}
                        objName.label = '产品名称';
                        objName.value = msg.name;
                        objNum.label = '产品数量';
                        objNum.value = 'x' + msg.num;
                        objPrice.label = '产品单价';
                        objPrice.value = msg.priceItem + '元'
                        arr.push(objName);
                        arr.push(objNum);
                        arr.push(objPrice);
                        state.flowList.nouse[j].arr = arr
                        state.flowList.nouse[j].num = msg.num
                            // 总提交数组 ---产品信息
                        if (state.flowList.nouse[j].arrTj) {
                            state.flowList.nouse[j].arrTj[0].nnumber = msg.num;
                            state.flowList.nouse[j].arrTj[0].nmny = msg.allPrice;
                        } else {
                            let objTj = {}
                            objTj.staunitid = msg.staunitid;
                            objTj.elseunitid = msg.elseunitid;
                            objTj.prtyid4 = msg.prtyid4;
                            objTj.id = msg.id;
                            objTj.cpricetariffid = msg.cpricetariffid;
                            objTj.cpricetypeid = msg.cpricetypeid;
                            objTj.nprice = msg.priceItem;
                            objTj.pricepolicyid = msg.pricepolicyid;
                            objTj.nnumber = msg.num;
                            objTj.nmny = msg.allPrice;
                            objTj.newdisnum = msg.newdisnum
                            objTj.sington_conversion = msg.sington_conversion
                            arrTj.push(objTj)
                            state.flowList.nouse[j].arrTj = arrTj
                        }
                        state.flowList.nouse[j].allPrice = 0;
                        state.flowList.nouse[j].allPrice = msg.allPrice
                    }
                    opt = opt + Number(state.flowList.nouse[j].allPrice)
                }
                // 单个流程总计
                state.flowList.advancePrice = opt
            }
        }
    },

    // 改变之前的模板是否填写完的状态
    changeModal(state, msg) {
        state.beforeModal = msg
    },

    // 获取车型信息
    models(state, msg) {
        for (let i in msg) {
            let opt = {};
            opt.key = msg[i].pk_vehicletype
            opt.value = msg[i].vvhcltypename
            state.models.push(opt)
        }
    },

    // 添加地址信息
    saveAddres(state, msg) {
        if (localStorage.addres) {
            let arr = JSON.parse(localStorage.addres)
            arr.push(msg)
            localStorage.addres = JSON.stringify(arr)
        } else {
            let arr = []
            arr.push(msg)
            localStorage.addres = JSON.stringify(arr)
        }
    },

    // 总提交数据 ---车型主键和名称
    car(state, msg) {
        state.vcar = msg //车型主键
        for (let i in state.models) {
            if (state.models[i].key == msg) {
                state.vdef8 = state.models[i].value //车型名称
                break
            }
        }
    },

    // 总数据提交 ---最佳送货日期
    date(state, msg) {
        state.kpdate = msg
    },

    // 总提交数据 ---获取用户信息编码
    peopleCode(state, msg) {
        state.ccustomerid = msg.pk_currtype1;
        state.cdeptid = msg.pk_currtype1;
        state.cemployeeid = msg.pk_resppsn1;
        state.coperatorid = "";
        state.creceiptareaid = msg.pk_areacl;
        state.creceiptcorpid = msg.pk_cumandoc;
        state.creceiptcustomerid = msg.pk_cumandoc;
        state.csalecorpid = msg.pk_salestru;
        state.dbilldate = msg.dbilldate;
        state.dmakedate = msg.makedate;
        state.nexchangeotobrate = "";
        state.pk_calbody = msg.pk_calbody
        state.pk_currtype1 = msg.pk_currtype1
        state.cdeptid = msg.pk_respdept1
        state.ccustomerid = msg.pk_cumandoc
    },

    // 总提交 ---备注信息
    text(state, msg) {
        state.vnote = msg
    },

    // 总提交 ---单据状态
    changeStatus(state, msg) {
        state.status = msg
        state.hasStatus = true
    },

    // 点击不同订单号修改产品组
    products(state, msg) {
        state.products = []
        for (let i in msg) {
            let arr = []
            let obj1 = {};
            obj1.label = "产品名称";
            obj1.value = msg[i].invname;
            let obj2 = {};
            obj2.label = "产品规格";
            obj2.value = msg[i].invspec;
            let obj3 = {};
            obj3.label = "产品数量";
            obj3.value = 'x' + msg[i].NNUMBER;
            let obj4 = {};
            obj4.label = "产品总额";
            obj4.value = msg[i].NMNY + '元';
            let obj5 = {};
            obj5.label = "产品单价";
            obj5.value = msg[i].nprice + '元';

            arr.push(obj1);
            arr.push(obj2);
            arr.push(obj3);
            arr.push(obj5);
            arr.push(obj4);
            state.products.push(arr);
        }
    },

    // 修改订单
    changeDetail(state, msg) {
        let arr = [];
        let obj1 = {};
        obj1.label = "经销商名称";
        obj1.value = msg.custname;
        let obj2 = {};
        obj2.label = "送货地址";
        obj2.value = msg.vreceiveaddress;
        let obj3 = {};
        obj3.label = "最佳送货日期";
        obj3.value = msg.dabatedate;
        let obj4 = {};
        obj4.label = "车型";
        obj4.value = msg.vdef8;
        let obj5 = {};
        obj5.label = "联系人电话";
        obj5.value = msg.vdef6
        arr.push(obj1)
        arr.push(obj2)
        arr.push(obj3)
        arr.push(obj4)
        arr.push(obj5)
        localStorage.changeDetail = JSON.stringify(arr)
    },

    // 计算订单总额
    rental(state, msg) {
        let opt = 0
        for (let i in msg) {
            opt += Number(msg[i].NMNY)
        }
        state.rental = opt + '元'
    },

    // 获取用户点击的是哪个id
    whichId(state, msg) {
        state.whichId = msg
    },

    // 真正的修改订单 --判断哪个流程
    changeFlowList(state, msg) {
        let arr = JSON.parse(localStorage.busilist)
        if (arr.busilist) {
            for (let i in arr.busilist) {
                if (arr.busilist[i].pk_busitype == msg.pk_busitype) {
                    sessionStorage.changeFlow = JSON.stringify(arr.busilist[i])
                        // state.flowList = state.flowList[i] //修改flowList
                    if (localStorage.addresChecked) {
                        let obj = JSON.parse(localStorage.addresChecked)
                        obj.name = msg.vdef5 //修改经销商名称
                        obj.phone = msg.vdef6 //修改联系电话
                        obj.addres = msg.vreceiveaddress //修改地址
                        obj.namePhone = msg.vdef5 + ',' + msg.vdef6
                        localStorage.addresChecked = JSON.stringify(obj)
                    }

                    state.vcar = msg.pk_defdoc8 //修改车型主键
                    state.vdef8 = msg.vdef8 //修改车型名称
                    state.kpdate = msg.dabatedate //修改期待送货日期
                    if (msg.vnote == "null") { //修改备注信息
                        state.vnote = ''
                    } else {
                        state.vnote = msg.vnote
                    }
                    state.status = msg.fstatus //修改单据状态
                    state.isChange = true //用户真正的点击了修改，用来判断下个接口是否可以请求
                    break
                }
            }
        }

    },

    //真正的订单修改 ---修改产品
    Nouse(state, msg) {
        state.flowList = JSON.parse(sessionStorage.changeFlow)
        let opt = 0
        for (let k in msg) {
            msg[k].sj = k
            msg[k].allPrice = msg[k].NMNY
            msg[k].key = state.flowList.pk_busitype
            msg[k].value = k
            opt += Number(msg[k].NMNY)
        }
        state.flowList.advancePrice = opt
        state.flowList.nouse = msg
        state.isChangeT = true
        state.flowList.mny = Number(state.flowList.mny)
        localStorage.changeFlowList = JSON.stringify(state.flowList)
    },

    // 修改模板下 --判断用户再哪个流程中新增的模板
    productList2(state, msg) {
        let arrList = state.flowList
        if (arrList.pk_busitype == msg) {
            if (arrList.nouse.length > 0) {
                for (let k in arrList.nouse) {
                    if (arrList.nouse[k].allPrice == 0 && k == arrList.nouse.length - 1) {
                        state.beforeModal = true;
                    } else if (arrList.nouse[k].allPrice != 0 && k == arrList.nouse.length - 1) {
                        state.beforeModal = false;

                        let obj = {};
                        state.plannelIndex = arrList.nouse.length
                        obj.sj = state.plannelIndex++
                            arrList.nouse.push(obj)

                    }
                }
            }

        }

    },

    //修改模板下 --挂载的时候修改nouse中的数据
    changeNouse2(state, msg) {
        let opt = 0;
        if (state.flowList.pk_busitype == msg.key) {
            for (let k in state.flowList.nouse) {
                if (state.flowList.nouse[k].value == undefined) {
                    state.flowList.nouse[k].key = msg.key;
                    state.flowList.nouse[k].value = msg.value;
                    state.flowList.nouse[k].allPrice = 0;
                } else {
                    if (state.flowList.nouse[k].arr && state.flowList.nouse.arrTj) {

                    } else {
                        let arr = []
                        let arrTj = []
                        let objName = {}
                        let objNum = {}
                        let objPrice = {}
                        objName.label = '产品名称';
                        objName.value = state.flowList.nouse[k].invname;
                        objNum.label = '产品数量';
                        objNum.value = 'x' + state.flowList.nouse[k].NNUMBER;
                        objPrice.label = '产品单价';
                        objPrice.value = state.flowList.nouse[k].nprice + '元'

                        // 总提交数组 ---产品信息
                        let objTj = {}
                        objTj.staunitid = state.flowList.nouse[k].staunitid;
                        objTj.elseunitid = state.flowList.nouse[k].elseunitid;
                        objTj.prtyid4 = state.flowList.nouse[k].prtyid4;
                        objTj.id = state.flowList.nouse[k].pk_invbasdoc;
                        objTj.cpricetariffid = state.flowList.nouse[k].cpricetariffid;
                        objTj.cpricetypeid = state.flowList.nouse[k].cpricetypeid;
                        objTj.nprice = state.flowList.nouse[k].nprice;
                        objTj.pricepolicyid = state.flowList.nouse[k].pricepolicyid;
                        objTj.nnumber = state.flowList.nouse[k].NNUMBER;
                        objTj.nmny = state.flowList.nouse[k].allPrice;
                        objTj.newdisnum = state.flowList.nouse[k].newdisnum
                        objTj.sington_conversion = state.flowList.nouse[k].sington_conversion

                        arr.push(objName);
                        arr.push(objNum);
                        arr.push(objPrice);
                        arrTj.push(objTj)

                        state.flowList.nouse[k].num = state.flowList.nouse[k].NNUMBER
                        state.flowList.nouse[k].arr = arr
                        state.flowList.nouse[k].arrTj = arrTj
                        opt = opt + Number(state.flowList.nouse[k].allPrice)
                            // 单个流程总计
                        state.flowList.advancePrice = opt
                    }

                }
            }
        }


    },

    //更改isChangeT的状态
    changIsChangeT(state, msg) {
        state.isChangeT = msg
    },

    //需要缓存的页面name
    keepAlive(state, msg) {
        state.keepAlive.push(msg)
    },

    //动态删除页面name
    changekeepAlive(state, msg) {
        if (state.keepAlive) {
            for (let n in state.keepAlive) {
                if (state.keepAlive[n] == msg) {
                    state.keepAlive.splice(n, 1)
                    break
                }
            }
        }
    },

    //登录状态
    logined(state, msg) {
        state.logined = msg
    },
    changeA(state) {
        deleteA(state)
    },
    changeLogined(state) {
        state.logined = false
    },
    //地址信息是否保存完整
    isSaveAddres(state, msg) {
        state.isSaveAddres = msg
    }
});

function deleteA(state) {
    let flag = false;
    if (!state.isChangeT) {
        for (let t in state.flowList) {
            if (state.flowList[t].nouse.length > 0) {
                for (let h in state.flowList[t].nouse) {
                    if (state.flowList[t].nouse[h].num == 0 || state.flowList[t].nouse[h].num == undefined) {
                        flag = true;
                        break;
                    }
                }
            }
            if (flag) {
                break;
            }
        }
        if (!flag) {
            return
        }
        for (let j in state.flowList) {
            for (let k in state.flowList[j].nouse) {
                if (state.flowList[j].nouse[k].num == 0 || state.flowList[j].nouse[k].num == undefined) {
                    state.flowList[j].nouse.splice(k, 1);
                    break
                }
            }
        }
        return deleteA(state);
    } else {
        if (state.flowList.nouse.length > 0) {
            for (let h in state.flowList.nouse) {
                if (state.flowList.nouse[h].num == 0 || state.flowList.nouse[h].num == undefined) {
                    flag = true;
                    break;
                }
            }
        }
        if (!flag) {
            return
        }
        for (let t in state.flowList.nouse) {
            if (state.flowList.nouse[t].num == 0 || state.flowList.nouse[t].num == undefined) {
                state.flowList.nouse.splice(t, 1);
                break
            }
        }

        return deleteA(state);
    }
}

// 调用点击删除按钮
function deleteItem(state) {
    let flag = false;
    if (!state.isChangeT) {
        for (let i in state.flowList) {
            if (state.flowList[i].nouse.length > 0) {
                for (let t in state.flowList[i].nouse) {
                    if (state.flowList[i].nouse[t].checked == true) {
                        flag = true;
                        break;
                    }
                }
            }
            if (flag) {
                break;
            }
        }

        if (!flag) {
            // 判断是否全都删除
            let opt = false
            for (let i in state.flowList) {
                if (!opt) {
                    if (state.flowList[i].nouse.length == 0 && state.flowList.length - 1 == i) {
                        state.headerRightMsg = '删除';
                        state.isAddShow = true;
                        state.itemChecked = false;
                        state.isChecked = false;
                        break
                    } else if (state.flowList[i].nouse.length > 0) {
                        opt = true

                    }
                }
            }
            return;
        }
        // 删除模板和计算价格
        for (let i in state.flowList) {
            for (let k in state.flowList[i].nouse) {
                if (state.flowList[i].nouse[k].checked == true) {
                    state.flowList[i].advancePrice = state.flowList[i].advancePrice - state.flowList[i].nouse[k].allPrice;
                    state.flowList[i].nouse.splice(k, 1);
                    break
                }
            }
        }
        return deleteItem(state);
    } else {
        if (state.flowList.nouse.length > 0) {
            for (let m in state.flowList.nouse) {
                if (state.flowList.nouse[m].checked == true) {
                    flag = true;
                    break;
                }
            }
        }

        if (!flag) {
            // 判断是否全都删除
            let opt = false
            if (!opt) {
                if (state.flowList.nouse.length == 0) {
                    state.headerRightMsg = '删除';
                    state.isAddShow = true;
                    state.itemChecked = false;
                    state.isChecked = false;
                } else if (state.flowList.nouse.length > 0) {
                    opt = true

                }
            }
            return;
        }
        // 删除模板和计算价格

        for (let n in state.flowList.nouse) {
            if (state.flowList.nouse[n].checked == true) {
                state.flowList.advancePrice = state.flowList.advancePrice - state.flowList.nouse[n].allPrice;
                state.flowList.nouse.splice(n, 1);
                break
            }
        }

        return deleteItem(state);
    }

}

// 当点击的右上角为完成时，循环删除checked属性
function deleteItemChecked(state) {
    if (!state.isChangeT) {
        // 先删除数据
        for (let i in state.flowList) {
            if (state.flowList[i].nouse.length > 0) {
                for (let k in state.flowList[i].nouse) {
                    if (state.flowList[i].nouse[k].checked == true) {
                        delete state.flowList[i].nouse[k].checked
                    }
                }
            }
        }
        // 再更改状态
        state.itemChecked = false
    } else {
        //先删除checked数据
        if (state.flowList.nouse.length > 0) {
            for (let k in state.flowList.nouse) {
                if (state.flowList.nouse[k].checked == true) {
                    delete state.flowList.nouse[k].checked
                }
            }
        }
        // 再更改状态
        state.itemChecked = false
    }

}