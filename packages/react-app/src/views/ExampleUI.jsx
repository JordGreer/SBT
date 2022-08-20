import { Button, Card, Col, Row, DatePicker, Divider, Input, Progress, Slider, Spin, Switch } from "antd";
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
  const [updateAddress, setUpdateAddress] = useState("loading...");
  const [updateIdentity, setUpdateIdentity] = useState("loading...");
  const [updateScore, setUpdateScore] = useState("loading...");
  const [updateUrl, setUpdateUrl] = useState("loading...");
  const [updateTimestamp, setUpdateTimestamp] = useState("loading...");
  const updateSoulData = [updateIdentity,updateScore,updateUrl,updateTimestamp];
  return (
    <div> 
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Soul Mint UI" bordered={false}>
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
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Soul Updating" bordered={false}>
            <Input
              placeholder="Mint Address"
              onChange={e => {
                setUpdateAddress(e.target.value);
              }}
            />
            <Input
              placeholder="Identity"
              onChange={e => {
                setUpdateIdentity(e.target.value);
              }}
            />
            <Input
              placeholder="Score"
              onChange={e => {
                setUpdateScore(e.target.value);
              }}
            />
            <Input
              placeholder="Url"
              onChange={e => {
                setUpdateUrl(e.target.value);
              }}
            />
            <Input
              placeholder="Timestamp"
              onChange={e => {
                setUpdateTimestamp(e.target.value);
              }}
            />
            <Button
              style={{marginTop: 8}}
              onClick={async () => {
                const result = tx(writeContracts.YourContract.update(updateAddress,updateSoulData), update => {
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
              Update Soul!
            </Button>
          </Card>
        </Col>
      </Row>
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