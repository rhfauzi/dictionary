
export const getConstant = {
	toSlocDefault: 'GS00',
	docTypeDefault: 'ZDST',
	fromSlocDefault: 'GS00',
	orderTypeDefault: 'ZOP1',
	receiveBranchIdDefault: 'P104',
	supplyBranchIdDefault: 'P105',
	matDocTypeDefault: 'WA',

	get getToSloc() { return this.toSlocDefault },
	set setToSloc(val) { this.toSlocDefault = val },

	get getDocType() { return this.docTypeDefault },
	set setDocType(val) { this.docTypeDefault = val },

	get getFromSloc() { return this.fromSlocDefault },
	set setFromSloc(val) { this.fromSlocDefault = val },

	get getOrderType() { return this.orderTypeDefault },
	set setOrderType(val) { this.orderTypeDefault = val },

	get getReceiveBranchId() { return this.receiveBranchIdDefault },
	set setReceiveBranchId(val) { this.receiveBranchIdDefault = val },

	get getSupplyBranchId() { return this.SupplyBranchIdDefault },
	set setSupplyBranchId(val) { this.SupplyBranchIdDefault = val },
}

export let toSlocDefault = getConstant.toSlocDefault;
export let fromSlocDefault = 'GS00'
export let docTypeDefault = getConstant.getDocType;
export let orderTypeDefault = 'ZOP1';
export let receiveBranchIdDefault = 'P104';
export let supplyBranchIdDefault = 'P105';
export let matDocTypeDefault = 'WA';



export let SEARCH_BRANCH = 'Search By Branch'
export let SEARCH_SUPPLYING_BRANCH = 'Search By Receiving Branch'
export let SEARCH_RECEIVING_BRANCH = 'Search By Supplying Branch'
export let SEARCH_MATERIAL = 'Search By Material'
export let SEARCH_MATERIAL_DATE = 'Search By Material Date'
export let SEARCH_POSTING_DATE = 'Search By Posting Date'
export let SEARCH_STATUS = 'Search By Status'
export let SEARCH_MOVEMENT_TYPE = 'Search By Movement Type'
export let SEARCH_SLOC = 'Search By Sloc'
export let SEARCH_TO_SLOC = 'Search By To Sloc'
export let SEARCH_FROM_SLOC = 'Search By From Sloc'
export let SEARCH_REQUIREMENT_DATE = 'Search By Requirement Date'
export let SEARCH_SUPPLYING_SLOC = 'Search By Supplying Sloc'
export let SEARCH_RECEIVING_SLOC = 'Search By Receiving Sloc'



export const MOVEMENT_TYPE_OPTIONS = [
	{ label: '101 - GR goods receipt', value: '101', menu: ["list-swap-handling", "goods-receipt"] },
	{ label: '311 - TF trfr within plant', value: '311', menu: ["list-swap-handling"] },
	{ label: '313 - Transfer posting Sloc to Sloc', value: '313', menu: ["list-swap-handling", "stock-reservation", "approval-stock-reservation"] },
	{ label: '555 - GI scrapping blocked', value: '555', menu: ["list-swap-handling"] },
	{ label: '601 - GD goods issue:delvy', value: '601', menu: ["list-swap-handling"] },
	{ label: '602 - RE goods deliv. rev.', value: '602', menu: ["list-swap-handling"] },
	{ label: '641 - TF to stck in trans.', value: '641', menu: ["list-swap-handling"] },
	{ label: 'Z71 - GR Phys. Inv', value: 'Z71', menu: ["list-swap-handling"] },
	{ label: 'Z72 - RE GR Phys. Inv', value: 'Z72', menu: ["list-swap-handling"] },
	{ label: '101 - GR Principal', value: '101', menu: ["material-document"] },
	{ label: '122 - GR Return Principal', value: '122', menu: ["material-document"] },
	{ label: '601 - PGI Delivery', value: '601', menu: ["material-document"] },
	{ label: '555 - GI Disposal', value: '555', menu: ["material-document"] },
	{ label: 'Z54 - GI Intra Sloc', value: 'Z54', menu: ["material-document"] },
	{ label: 'Z53 - GR Intra Sloc', value: 'Z53', menu: ["material-document"] },
	{ label: '602 - Cancel Good Issue', value: '602', menu: ["material-document"] },
	{ label: 'Z71 - GR Adjustment', value: 'Z71', menu: ["material-document"] },
	{ label: 'Z72 - GR Return Adjustment', value: 'Z72', menu: ["material-document"] },
	{ label: '641 - PGI DO STO', value: '641', menu: ["material-document"] },
	{ label: '313 - I101- ntra Sloc', value: '313', menu: ["material-document"] },
	{ label: '122 - RE return to vendor', value: '122', menu: ["goods-receipt", "gr-return"] },
	{ label: 'Z54 - GR Phys. Inv', value: 'Z54', menu: ["goods-issue-intra-sloc", "goods-receipt-intra-sloc"] },
	{ label: '555 - Withdrawal for scrapping from blocked stock', value: '555', menu: ["gi-disposal"] },
	{ label: '311 - TR Transfer in SLoc', value: '311', menu: ["swap-handling"] }
]


export const STATUS_OPTIONS = [
	{ label: 'PGI Done', value: '07', menu: ['do-sto'] },

	{ label: 'Done', value: '03', menu: ["po-sto", "approval", "approval-stock-reservation", "transfer-to-gs", 'stock-opname', 'stock-adjustment'] },
	{ label: 'Done', value: '01', menu: ["swap-handling", "goods-receipt", "gr-return", 'do-sto', 'good-issue', 'good-receipt-intra-branch'] },

	{ label: 'Approved', value: '01', menu: ['gi-disposal', "po-sto", "approval", "stock-reservation"] },
	{ label: 'Approved', value: '03', menu: ['approval-stock-opname', 'approval-stock-adjustment'] },

	{ label: 'Waiting For Approval', value: '00', menu: ['gi-disposal', "po-sto", "approval", "stock-reservation", "approval-stock-reservation"] },
	{ label: 'Waiting For Approval', value: '01', menu: ['stock-adjustment', 'approval-stock-adjustment'] },
	{ label: 'Waiting For Approval', value: '02', menu: ['stock-opname', 'approval-stock-opname'] },

	{ label: 'Delivery', value: '14', menu: ['good-receipt-intra-branch'] },

	{ label: 'Pending', value: '00', menu: ["swap-handling", 'do-sto', "transfer-to-gs", 'stock-opname'] },

	{ label: 'Cancelled', value: '02', menu: ["swap-handling", "goods-receipt", "gr-return", 'do-sto', 'good-issue', "approval-stock-reservation"] },
	{ label: 'Cancelled', value: '04', menu: ['stock-opname', 'stock-adjustment'] },

	{ label: 'Rejected', value: '02', menu: ['gi-disposal', "po-sto", "approval", "stock-reservation"] },
	{ label: 'Rejected', value: '05', menu: ['stock-opname', 'approval-stock-opname', 'approval-stock-adjustment'] },


]



export const STATUS_SWAPHANDLING = {
	APPROVED: "03", REJECTED: "02"
}
