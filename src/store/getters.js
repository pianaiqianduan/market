export default ({

    // 判断删除按钮是否显示
    radioShow(state) {
        if (state.headerRightMsg == '完成') {
            return true
        } else {
            return false
        }
    },

    // 头部右侧是否显示内容 根据页面是否加载到数据来判断
    headerRightShow(state) {
        if (state.flowList) {
            return true
        } else {
            return false
        }
    },

    // 所有流程总计
    grossMoney(state) {
        if (!state.isChangeT) {
            let opt = 0;
            for (let i in state.flowList) {
                opt = opt + state.flowList[i].advancePrice;
                if (i == state.flowList.length - 1) {
                    return opt;
                }
            }
        } else {
            let opt = 0;
            opt = state.flowList.advancePrice;
            return opt

        }
    },

    // 判断提交的时候流程中的模板是否有未填写的
    isNullModal(state, getters) {
        if (!state.isChangeT) {
            for (let i in state.flowList) {
                if (getters.grossMoney > 0) {
                    for (let k in state.flowList[i].nouse) {
                        if (state.flowList[i].nouse[k].allPrice == 0 && k == state.flowList[i].nouse.length - 1) {
                            return false
                        } else if (state.flowList[i].nouse[k].allPrice != 0 && k == state.flowList[i].nouse.length - 1) {
                            return true
                        }
                    }
                }
            }
        } else {
            if (getters.grossMoney > 0) {
                for (let k in state.flowList.nouse) {
                    if (state.flowList.nouse[k].allPrice == 0 && k == state.flowList.nouse.length - 1) {
                        return false
                    } else if (state.flowList.nouse[k].allPrice != 0 && k == state.flowList.nouse.length - 1) {
                        return true
                    }
                }
            }
        }
    },
    // 判断流程中的预订单占用额度和信用额度
    isGreater(state) {
        if (!state.isChangeT) {
            for (let i in state.flowList) {
                if (state.flowList[i].nouse.length > 0) {
                    for (let k in state.flowList[i].nouse) {
                        if (state.flowList[i].advancePrice > 0) {
                            if (state.flowList[i].advancePrice > state.flowList[i].mny) {
                                return true
                            } else {
                                return false
                            }
                        }
                    }
                }
            }
        } else {
            if (state.flowList.advancePrice > 0) {
                if (state.flowList.advancePrice > state.flowList.mny) {
                    return true
                } else {
                    return false
                }
            }
        }

    },
    // 总提交数据
    tjDate(state) {
        if (!state.isChangeT) {
            let tjDate = {};
            tjDate.lists = [];
            for (let i in state.flowList) {
                if (state.flowList[i].nouse.length > 0) {
                    let obj = {}
                    obj.matnrList = []
                    obj.rows = state.flowList[i].nouse.length
                    obj.pk_busitype = state.flowList[i].pk_busitype;
                    for (let k in state.flowList[i].nouse) {
                        obj.matnrList.push(state.flowList[i].nouse[k].arrTj[0])
                    }
                    tjDate.lists.push(obj)
                }

            }
            return tjDate
        } else {
            let tjDate = {};
            tjDate.lists = [];
            if (state.flowList.nouse.length > 0) {
                let obj = {}
                obj.matnrList = []
                obj.rows = state.flowList.nouse.length
                obj.pk_busitype = state.flowList.pk_busitype;
                for (let j in state.flowList.nouse) {
                    obj.matnrList.push(state.flowList.nouse[j].arrTj[0])
                }
                tjDate.lists.push(obj)
            }
            return tjDate
        }
    }
})