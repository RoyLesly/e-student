// import {PaymentOperation, RandomGenerator} from '@hachther/mesomb';


// export const getApplicationStatus = async () => {
//     const payment = new PaymentOperation({applicationKey: process.env.P_APPLIATION_KEY, accessKey: process.env.P_ACCESS_KEY, secretKey: process.env.P_SECRET_KEY});
// }


// export const collectMoney = async ({amount, service, payer}) => {
//     try {
//         const payment = await new PaymentOperation({applicationKey: process.env.P_APPLIATION_KEY, accessKey: process.env.P_ACCESS_KEY, secretKey: process.env.P_SECRET_KEY});
//         const response = await payment.makeCollect({amount: amount, service: service, payer: payer, nonce: RandomGenerator.nonce()});
//         console.log(response, 24)
//         return { operation: response.isOperationSuccess(), transaction: response.isTransactionSuccess() }
//     } catch (error) {
//         var err = {...error}
//         if (err?.code?.includes("low-balance-payer")){
//             return { operation: false, transaction: "low-balance-payer" }
//         }
//         if (err?.code?.includes("ENOTFOUND")){
//             return { operation: false, transaction: "ENOTFOUND" }
//         }
//         if (err?.code?.includes("could-not-perform-transaction")){
//             return { operation: false, transaction: "Cancel By User" }
//         }
//         if (err?.code?.includes("invalid-amount")){
//             return { operation: false, transaction: "The-amount-should-be-greater-than-10-XAF" }
//         }
//         console.log(error)
//         return { operation: false, transaction: "Failed Operation" }
//     }
// }


// export const depositMoney = async ({amount, service, reciever}) => {
//     const payment = new PaymentOperation({applicationKey: process.env.P_APPLIATION_KEY, accessKey: process.env.P_ACCESS_KEY, secretKey: process.env.P_SECRET_KEY});
//     const response = await payment.makeDeposit({amount: amount, service: service, receiver: reciever, nonce: RandomGenerator.nonce()});
// }
