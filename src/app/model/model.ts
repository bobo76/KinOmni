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

export class ActivationParametersDto {
    quantity: number;
    group: string;
    domainList: number[];
    vagueId: string;
}

export interface ActivationDto{
    activationCode: number;
    unitNo: string;
    DdteCreated: Date;
    groupName: string;
    domainsList: string;
}

export interface UserSearchDto{
    useNo: string;
    groupNo: number;
    firstName: string;
    lastName: string;
    login: string;
    creationDate: Date;
    mailName: string;
    licence: string;
    domNo: number;
}

export interface UserDto {
    useNo: string;
    groupNo: number;
    firstName: string;
    lastName: string;
    login: string;
    creationDate: Date;
    userLastUpdate: Date;
    rxNo: number;
    lastLogin: Date;
    acountLocked: boolean;
    isActive: boolean;
    activateInterraction: boolean;
    licence: string;
    sendToFacturaitonNet: boolean;
    factNetUsr: string;
    factNetPsw: string;
    factNetGroup: string;
    billRequestLocation: string;
    ramqUser: string;
    ramqType: string;
    ramqSync: boolean;
    showBilling: boolean;
    mailName: string;
    mailPassword: string;
    mailDomain: number | null;
    receiveLabMail: number;
    fowardMail: string;
    partialLabMailRecall: number | null;
    anormalLabMail: string;
    otherLabMail: string;
    userLabId: string;
    email: string;
    receiveAnormalLabMail: boolean;
    managePatientWithoutFile: boolean;
    defautKeyboardMode: boolean;
    licenceType: number;
    activationDate: Date | null;
    resetPassword: boolean;
    isService: boolean;
    meddialogActive: boolean;
    domNo: number;
    deletedDate: Date | null;
    deletedByUseNo: string;
    deletedBy: UserSearchDto;
}