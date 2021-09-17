import { IErrorInfo } from '../type'
import { CloudBase } from '../cloudbase'

export class TcbError extends Error {
    public readonly code: string
    public readonly message: string
    public readonly requestId: string

    public constructor(error: IErrorInfo) {
        super(error.message)
        this.code = error.code
        this.message = error.message
        this.requestId = error.requestId
    }
}

export const filterValue = function filterValue(o, value) {
    for (let key in o) {
        if (o[key] === value) {
            delete o[key]
        }
    }
}

export const filterUndefined = function(o) {
    return filterValue(o, undefined)
}

export const E = (errObj: IErrorInfo) => {
    return new TcbError(errObj)
}

export const checkIsInScf = () => {
    const { TENCENTCLOUD_RUNENV } = CloudBase.getCloudbaseContext()
    return TENCENTCLOUD_RUNENV === 'SCF'
}

export const checkIsInContainer = () => {
    return !!process.env.KUBERNETES_SERVICE_HOST
}

export function second(): number {
    // istanbul ignore next
    return Math.floor(new Date().getTime() / 1000)
}

export function processReturn(throwOnCode: boolean, res: any) {
    if (throwOnCode === false) {
        // 不抛报错，正常return，兼容旧逻辑
        return res
    }

    throw E({ ...res })
}

export function getServerInjectUrl(): string {
    const tcbContextConfig = getTcbContextConfig()
    return tcbContextConfig['URL'] || ''
}

export function getTcbContextConfig(): any {
    try {
        const { TCB_CONTEXT_CNFG } = CloudBase.getCloudbaseContext()

        if (TCB_CONTEXT_CNFG) {
            // 检查约定环境变量字段是否存在
            return JSON.parse(TCB_CONTEXT_CNFG)
        }
        return {}
    } catch (e) {
        /* istanbul ignore next */
        console.log('parse context error...')
        /* istanbul ignore next */
        return {}
    }
}

/* istanbul ignore next */
export function getWxUrl(config: any): string {
    const protocal = config.isHttp === true ? 'http' : 'https'
    let wxUrl = protocal + '://tcb-open.tencentcloudapi.com/admin'
    if (checkIsInScf()) {
        wxUrl = 'http://tcb-open.tencentyun.com/admin'
    }
    return wxUrl
}
