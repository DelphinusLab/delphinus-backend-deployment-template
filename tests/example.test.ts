import { getConfigByChainName } from "../src/config";
import { L1ClientRole } from "../src/types";

describe("test getConfigByChainName works", () => {
    test("test if it throw error correctly", async () => {
        jest.setTimeout(60000); //1 minute timeout
        try{
            await getConfigByChainName(L1ClientRole.Monitor,"opsten");
        }catch(err){
            if (err instanceof Error) {
                expect(err.message).toEqual("chain name is not matched.");
            }else{
                console.log('Unexpected error', err);
            }
        }
    });

    test("test if works correctly", async () => {
        jest.setTimeout(60000); //1 minute timeout
        const config = await getConfigByChainName(L1ClientRole.Monitor,"ropsten");
        expect(config.deviceId).toEqual("3");
    });
});