import { Button, Card, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";
import { SyncOutlined } from "@ant-design/icons";

import { Address, Balance, Events } from "../components";

export default function ExampleUI({
  purpose,
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts,
}) {
  const [mintAddress, setMintAddress] = useState("loading...");
  const [mintIdentity, setMintIdentity] = useState("loading...");
  const [mintScore, setMintScore] = useState("loading...");
  const [mintUrl, setMintUrl] = useState("loading...");
  const [mintTimestamp, setMintTimestamp] = useState("loading...");
  const soulData = [mintIdentity,mintScore,mintUrl,mintTimestamp];
  const eventList = ["Mint","Burn","Update","SetProfile","RemoveProfile"];
  return (
    <div>
      {/*
        ⚙️ Here is an example UI that displays and sets the purpose in your smart contract:
      */}
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
        <h2>Soul Mint UI</h2>
        <Divider />
        <div style={{ margin: 1 }}>
          <Input
            placeholder="Mint Address"
            onChange={e => {
              setMintAddress(e.target.value);
            }}
          />
          <Input
            placeholder="Identity"
            onChange={e => {
              setMintIdentity(e.target.value);
            }}
          />
          <Input
            placeholder="Score"
            onChange={e => {
              setMintScore(e.target.value);
            }}
          />
          <Input
            placeholder="Url"
            onChange={e => {
              setMintUrl(e.target.value);
            }}
          />
          <Input
            placeholder="Timestamp"
            onChange={e => {
              setMintTimestamp(e.target.value);
            }}
          />
          <Button
            style={{marginTop: 8}}
            onClick={async () => {
              const result = tx(writeContracts.YourContract.mint(mintAddress,soulData), update => {
                console.log("📡 Transaction Update:", update);
                if (update && (update.status === "confirmed" || update.status === 1)) {
                  console.log(" 🍾 Transaction " + update.hash + " finished!");
                  console.log(
                    " ⛽️ " +
                      update.gasUsed +
                      "/" +
                      (update.gasLimit || update.gas) +
                      " @ " +
                      parseFloat(update.gasPrice) / 1000000000 +
                      " gwei",
                  );
                }
              });
              console.log("awaiting metamask/web3 confirm result...", result);
              console.log(await result);
            }}
          >
            Mint a Soul!
          </Button>
        </div>
        <Divider />
        Your Address: 
        <Address address={address} ensProvider={mainnetProvider} fontSize={16} />
        <Divider />
        Your Contract Address:
        <Address
          address={readContracts && readContracts.YourContract ? readContracts.YourContract.address : null}
          ensProvider={mainnetProvider}
          fontSize={16}
        />
        <div style={{ margin: 1 }}>  
        </div>
      </div>
      <Divider />
      <div style={{ border: "1px solid #cccccc", padding: 16, width: 400, margin: "auto", marginTop: 64 }}>
      <h2>Events:</h2>
      <Events
        contracts={readContracts}
        contractName="YourContract"
        eventName={eventList}
        localProvider={localProvider}
        mainnetProvider={mainnetProvider}
        startBlock={1}
      />
      </div>
    </div>
  );
}