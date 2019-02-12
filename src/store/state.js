import { isAbsolute } from "path";
export default ({
    //头部左侧是否显示返回按钮
    headerLeftShow: { showBack: true, preventGoBack: false },
    // 头部信息
    headerMsg: '',
    // 头部右侧是否显示内容
    headerRightShow: false,
    // 头部右侧默认显示内容
    headerRightMsg: '删除',

    //流程接口是否请求成功--默认没有请求成功
    isaxios: false,

    // 初始化流程和其产品为空
    flowList: '',

    //请求到的流程产品是否为空(默认有额度)
    isNull: true,

    // 监听用户是否加载模板
    isAddModle: false,

    // 动态向模板中加值
    plannelIndex: 0,

    // 添加按钮是否显示
    isAddShow: true,

    // 初始化全选按钮没有被选中
    isChecked: false,

    // 单个按钮的初始化没有选中
    itemChecked: false,

    // 产品组
    pricegroupcorp: '',

    // 之前的模板是否填写完
    beforeModal: false,

    // 提交的时候判断是否有空模板
    isNullModal: false,

    // 车型
    models: [],

    // 用户修改的是哪个地址
    modif: '',

    // 提交总数据
    tj: {},

    // 订单状态
    hasStatus: false,

    // 车型主键
    vcar: "",

    // 车型名称
    vdef8: "",

    // 最佳送货日期
    kpdate: "",

    // 备注信息
    vnote: "",

    // 单据状态
    status: "",

    // 用户编码字段
    ccustomerid: "",
    cdeptid: "",
    cemployeeid: "",
    coperatorid: "",
    creceiptareaid: "",
    creceiptcorpid: "",
    creceiptcustomerid: "",
    csalecorpid: "",
    dbilldate: "",
    dmakedate: "",
    nexchangeotobrate: "",
    pk_calbody: "",
    pk_currtype1: "",
    cdeptid: "",
    ccustomerid: "",

    // 点击订单号查看订单产品信息
    products: [],

    // 计算订单中的订单总额
    rental: '',

    // 判断订单号点击的是哪个id
    whichId: '',

    // 判断用户有没有点击真正的修改
    isChange: false,

    //真正的修改接口调用完
    isChangeT: false,

    //可缓存的页面name集合
    keepAlive: [],

    //登录状态
    logined: sessionStorage.logined,

    //用户地址信息是否保存成功
    isSaveAddres: false
})