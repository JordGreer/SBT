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
  const [operatorAddress, setOperatorAddress] = useState("loading...");
  const [operatorIdentity, setOperatorIdentity] = useState("loading...");
  const [operatorScore, setOperatorScore] = useState("loading...");
  const [operatorUrl, setOperatorUrl] = useState("loading...");
  const [operatorTimestamp, setOperatorTimestamp] = useState("loading...");
  const operatorData = [operatorIdentity,operatorScore,operatorUrl,operatorTimestamp];
  const eventList = ["Mint","Burn","Update","SetProfile","RemoveProfile"];

  const [userAddress, setUserAddress] =useState("loading...");
  const [userprofilerAddress, setUserProfilerAddress] =useState("loading...");

  const [profileAddress, setProfileAddress] =useState("loading...");
  const [profileIdentity, setProfileIdentity] = useState("loading...");
  const [profileScore, setProfileScore] = useState("loading...");
  const [profileUrl, setProfileUrl] = useState("loading...");
  const [profileTimestamp, setProfileTimestamp] = useState("loading...");
  const profileData = [profileIdentity,profileScore,profileUrl,profileTimestamp];

  return (
    <div> 
      <Space align="center">
      <Card
        title="Create SBT"
        bordered={true} 
        hoverable style={{
          width: 500,
        }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card 
            title="Operator UI" 
            bordered={true} 
            hoverable style={{
              width: 500,
          }}>
            <Input
              placeholder="Mint or update Address"
              onChange={e => {
              setOperatorAddress(e.target.value);
            }}
            />
            <Input
              placeholder="Identity"
              onChange={e => {
                setOperatorIdentity(e.target.value);
              }}
            />
            <Input
              placeholder="Score"
              onChange={e => {
                setOperatorScore(e.target.value);
              }}
            />
            <Input
              placeholder="Url"
              onChange={e => {
                setOperatorUrl(e.target.value);
              }}
            />
            <Input
              placeholder="Timestamp"
              onChange={e => {
                setOperatorTimestamp(e.target.value);
              }}
            />
            <Button
              style={{marginTop: 8}}
              onClick={async () => {
                const result = tx(writeContracts.YourContract.mint(operatorAddress,operatorData), update => {
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
              Mint a Soul
            </Button>
            <Button
              style={{marginTop: 8}}
              onClick={async () => {
                const result = tx(writeContracts.YourContract.update(operatorAddress,operatorData), update => {
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
              Update a Soul
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card 
          title="User UI" 
          bordered={true}
          hoverable style={{
            width: 500,
          }}>
            <Input
              placeholder="Address of soul to Burn or remove profile"
              onChange={e => {
              setUserAddress(e.target.value);
            }}
            />
            <Input
              placeholder="Address of profiler"
              onChange={e => {
              setUserProfilerAddress(e.target.value);
            }}
            />
            <Button
              style={{marginTop: 8}}
              onClick={async () => {
                const result = tx(writeContracts.YourContract.burn(userAddress), update => {
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
              Burn Soul
            </Button>
            <Button
              style={{marginTop: 8}}
              onClick={async () => {
                const result = tx(writeContracts.YourContract.removeProfile(userprofilerAddress,userAddress), update => {
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
              Remove Profile
            </Button>
          </Card>
        </Col>
        <Col>
          <Card
            title="Third Party UI" 
            bordered={true}
            hoverable style={{
              width: 500,
            }}>
            <Input
              placeholder="Profile address"
              onChange={e => {
              setProfileAddress(e.target.value);
            }}
            />
            <Input
              placeholder="Profile Identity"
              onChange={e => {
                setProfileIdentity(e.target.value);
              }}
            />
            <Input
              placeholder="Profile Score"
              onChange={e => {
                setProfileScore(e.target.value);
              }}
            />
            <Input
              placeholder="Profile Url"
              onChange={e => {
                setProfileUrl(e.target.value);
              }}
            />
            <Input
              placeholder="Profile Timestamp"
              onChange={e => {
                setProfileTimestamp(e.target.value);
              }}
            />
            <Button
              style={{marginTop: 8}}
              onClick={async () => {
                const result = tx(writeContracts.YourContract.setProfile(profileAddress,profileData), update => {
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
              Set Profile
            </Button>
          </Card>
        </Col>
      </Row>
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