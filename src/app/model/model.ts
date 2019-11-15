export class InformationsDto {
    environement: string;
}

export class UnitSearchDto {
    unitId: number;
    uinNo: string;
    machineName?: any;
    description?: any;
}

export class UnitDto {
    unitId: number;
    uinNo: string;
    machineName?: string;
    description?: string;
    osVersionName?: string;
    settingNo: number;
    command?: string;
    logEmail?: string;
    autoSendLog: boolean;
    enableApplicationUpdate: boolean;
    applicationVersion?: string;
    currentApplicationVersion: number;
    currentDLLVersion: number;
    currentDataVersionDf: number;
    currentDataVersionEn: number;
    primaryULR?: string;
    secondaryULR?: string;
    vagueID?: string;
    previousVagueID?: string;
    deviceIDChangeCount: number;
    remoteInkRecognition: boolean;
    isNew: boolean;
}

export class UnitDomain {
    unitNo: string;
    domNo: number;
    domainName: string;
}

export class DomainSearchDto {
    domNo: number;
    grpDomNo: number;
    domName: string;
}

export interface DomainDto {
    domNo: number;
    grpDomNo: number;
    domName: string;
    ramqMachine: string;
    ramqPsw: string;
    ramqNoGmf: string;
    ramqPointService: string;
    ramqPointServiceOther: string;
    factNetUserName: string;
    optionMobile: boolean;
    ramqSync: boolean;
    immActivated: boolean;
    optionSyra: boolean;
    optMessageLog: boolean;
    optSmartBarCode: boolean;
    optionShowMobileEmbedded: boolean;
    domainGroup: DomainGroupDto;
    phyAccount: number;
    proAccount: number;
    secAccount: number;
    phyAccountPartial: number;
    proAccountPartial: number;
    secAccountPartial: number;
}

export interface DomainGroupDto {
    grpDomNo: number;
    ramqUser: string;
    ramqSyncDate: Date;
    ramqSync: boolean;
}

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token?: string;
}

export interface unitTableDto {
    id: number;
    deploymentDate: Date;
    vagueID: string;
    description: string;
}

export class ActivationDto {
    quantity: number;
    group: string;
    domainList: number[];
    vagueId: string;
}