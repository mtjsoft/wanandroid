export interface IKeyValue {
    [key: string]: any
}

export interface ICredentialsInfo {
    private_key_id: string
    private_key: string
    env_id?: string
}

export interface ICloudBaseConfig extends IKeyValue {
    debug?: boolean
    timeout?: number
    isHttp?: boolean
    secretId?: string
    secretKey?: string
    envName?: string | Symbol
    region?: string
    env?: string | Symbol
    sessionToken?: string
    serviceUrl?: string
    headers?: any
    proxy?: string
    version?: string
    credentials?: ICredentialsInfo
    throwOnCode?: boolean // 错误回包(带code) throw
    keepalive?: boolean // 是否开启keep alive
    /**
     * 获取跨帐号调用信息
     */
    getCrossAccountInfo?: () => Promise<ICrossAccountInfo>
}

export interface IRequestInfo {
    // 初始化配置
    config: ICloudBaseConfig
    // 请求方法 get post
    method: string
    // 业务逻辑自定义请求头
    headers: any
    // 业务逻辑自定义参数
    params: ICustomParam
    // 自定义api url
    customApiUrl?: string
    // 不参与签名项
    unSignedParams?: any
    // 是否为formData (wx.openApi formData:true)
    isFormData?: boolean
    // 用户自定义配置项
    opts?: any
}

export interface ICommonParam {
    action: string
    envName?: string | Symbol
    timestamp?: number
    eventId?: string
    wxCloudApiToken?: string
    tcb_sessionToken?: string
    authorization?: string
    sessionToken?: string
    sdk_version?: string
}

export interface ICustomParam extends ICommonParam {
    [propName: string]: any
}

export interface IRetryOptions {
    retries?: number
    factor?: number
    minTimeout?: number
    maxTimeout?: number
    randomize?: boolean

    timeouts?: number[]

    timeoutOps?: {
        timeout: number
        cb: Function
    }
}

interface ICrossAccountInfo {
    /**
     * 帐号凭证
     */
    credential: {
        secretId: string
        secretKey: string
        token: string
    }
    /**
     * 认证信息加密
     */
    authorization: {
        mpToken?: string // base64 buffer
    }
}

export interface ICustomReqOpts {
    timeout?: number
    // 重试选项，优先级高于全局配置
    retryOptions?: IRetryOptions
    /**
     * 获取跨帐号调用信息
     */
    getCrossAccountInfo?: () => Promise<ICrossAccountInfo>
}

export interface IErrorInfo {
    code?: string
    message?: string
    requestId?: string
}

export interface ICustomErrRes {
    [propName: string]: any
}

export interface IUploadFileRes {
    fileID: string
}

export interface IDeleteFileRes {
    fileList: Array<any>
    requestId: string
}

export interface IGetFileUrlRes {
    fileList: Array<any>
    requestId: string
}

export interface IDownloadFileRes {
    fileContent: Buffer
    message: string
}

export interface IReqOpts {
    proxy?: string
    qs?: any
    json?: boolean
    body?: any
    formData?: any
    encoding?: any
    keepalive?: boolean
    url: string
    method?: string
    timeout?: number
    headers?: any
}

export interface IReqHooks {
    handleData?: (res: any, err: any, response: any, body: any) => any
}

export interface IContextParam {
    memory_limit_in_mb: number
    time_limit_in_ms: number
    request_id?: string
    environ?: any
    environment?: any
    function_version: string
    function_name: string
    namespace: string
}

export interface ICallWxOpenApiOptions {
    apiName: string
    apiOptions?: any
    cgiName?: string
    requestData: any
}

export interface ISCFContext {
    memoryLimitInMb: number
    timeLimitIns: number
    requestId: string
    functionVersion: string
    namespace: string
    functionName: string
    environ?: IEnvironmentInfo
    environment?: IEnvironmentInfo
}

export interface IEnvironmentInfo {
    WX_CLIENTIP?: string
    WX_CLIENTIPV6?: string
    WX_APPID?: string
    WX_OPENID?: string
    WX_API_TOKEN?: string
    WX_CONTEXT_KEYS?: string[]
    TCB_ENV: string
    TCB_SEQID: string
    TRIGGER_SRC: string
    TCB_SESSIONTOKEN?: string
    TCB_SOURCE?: string
    TCB_CONTEXT_KEYS: string[]
    TENCENTCLOUD_SECRETID: string
    TENCENTCLOUD_SECRETKEY: string
    TENCENTCLOUD_SESSIONTOKEN: string
    SCF_NAMESPACE: string
}

// 最完整的环境变量类型汇总
export interface ICompleteCloudbaseContext {
    TENCENTCLOUD_RUNENV: string
    SCF_NAMESPACE: string
    TCB_CONTEXT_KEYS: string[]
    TENCENTCLOUD_SECRETID: string
    TENCENTCLOUD_SECRETKEY: string
    TENCENTCLOUD_SESSIONTOKEN: string
    TRIGGER_SRC: string
    WX_TRIGGER_API_TOKEN_V0?: string
    WX_CLIENTIP?: string
    WX_CLIENTIPV6?: string
    WX_CONTEXT_KEYS: string[]
    _SCF_TCB_LOG?: string
    LOGINTYPE?: string
    WX_APPID?: string
    WX_OPENID?: string
    WX_UNIONID?: string
    WX_API_TOKEN?: string
    TCB_ENV: string
    TCB_SEQID: string
    QQ_OPENID?: string
    QQ_APPID?: string
    TCB_UUID?: string
    TCB_ISANONYMOUS_USER?: string
    TCB_SESSIONTOKEN?: string
    TCB_CUSTOM_USER_ID?: string
    TCB_SOURCE_IP?: string
    TCB_SOURCE?: string
    TCB_ROUTE_KEY?: string
    TCB_HTTP_CONTEXT?: string
    TCB_CONTEXT_CNFG?: string
    TCB_TRACELOG?: string
}
