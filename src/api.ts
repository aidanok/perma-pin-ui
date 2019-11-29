

const BASE_URL = process.env.VUE_APP_API_ENDPOINT;
console.log(process.env); 
console.info(`BASE API URL: ${BASE_URL}`);


export async function pinExisting(cid: string) {
  const result = await fetch(`${BASE_URL}/pin/${cid}`, { method: 'POST' }).then(x => x.json());
  console.info(result);
  console.info(`Pin result`);
  return result; 
}

export async function checkForPending(txid: string) {
  let result = 202;
  while (result == 202) {
    result = await fetch(`${BASE_URL}/checkpending/${txid}`, { method: 'GET' }).then(x => x.json()).then(x => x.status);
    if (result == 202) {
      await new Promise(res => setTimeout(res, 45000));
    }
  }
  return result; 
}

export async function getWalletInfo() {
  return fetch(`${BASE_URL}/walletinfo`).then(x => x.json());
}