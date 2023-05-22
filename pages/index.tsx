import { ConnectWallet, Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { BURNTOCLAIM_NFT_ADDRESS, BURN_NFT_ADDRESS } from "../constants/addresses";

const Home: NextPage = () => {
  const address = useAddress();

  const { contract: burnCollection } = useContract(BURN_NFT_ADDRESS);
  const { contract: burnToClaimCollection } = useContract(BURNTOCLAIM_NFT_ADDRESS);

  async function mintBurnToClaimNFT() {
    const hasApproval = await burnCollection?.call(
      "isApprovedForAll",
      [address,
      BURNTOCLAIM_NFT_ADDRESS]
    );

    if(!hasApproval) {
      const tx = await burnCollection?.call(
        "setApprovalForAll",
        [BURNTOCLAIM_NFT_ADDRESS, true]
      );
    }

    const claimTx = await burnToClaimCollection?.call("claim", [address, 1]);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ConnectWallet/>
        <Web3Button
          contractAddress={BURNTOCLAIM_NFT_ADDRESS}
          action={() => mintBurnToClaimNFT()}
        >Claim</Web3Button>
      </main>
    </div>
  );
};

export default Home;
