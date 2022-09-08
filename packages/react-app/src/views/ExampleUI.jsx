import { Button, Card, Input, Layout, Image, Row, Divider, List } from "antd";
import React, { useState } from "react";
import { utils } from "ethers";
import { MinusSquareTwoTone, SyncOutlined } from "@ant-design/icons";
import Token from "C:/pr0/scaffold-eth/packages/react-app/src/SBTPicture.png";
import { useContractReader} from "eth-hooks";


import { Address, Balance, Events, Mints } from "../components";
import { useEventListener } from "eth-hooks/events/useEventListener";

export default function ExampleUI({
  purpose,
  address,
  mainnetProvider,
  localProvider,
  yourLocalBalance,
  price,
  tx,
  readContracts,
  writeContracts
  
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

  const [profileAddress, setProfileAddress] =useState("loading address...");
  const [profileIdentity, setProfileIdentity] = useState("loading...");
  const [profileScore, setProfileScore] = useState("loading...");
  const [profileUrl, setProfileUrl] = useState("loading...");
  const [profileTimestamp, setProfileTimestamp] = useState("loading...");
  const profileData = [profileIdentity,profileScore,profileUrl,profileTimestamp];

  const [sbtName, setSbtName] = useState("loading...");
  const [sbtTicker, setSbtTicker] = useState("loading...");

  const { Header, Footer, Sider, Content } = Layout;

  const soulName = useContractReader(readContracts,"YourContract","name");
  const soulTicker = useContractReader(readContracts,"YourContract","ticker");
  const soulOperator = useContractReader(readContracts,"YourContract","operator");


  return (
    <div>
      <Layout>
      <Sider>
      <Mints
        contracts={readContracts}
        contractName="YourContract"
        localProvider={localProvider}
        mainnetProvider={mainnetProvider}
        startBlock={1} 
        />
      </Sider>
      <Content>
      <Row justify="space-evenly">
      {/* this card is not working properly, trying to create the token first,
      thus giving msg.sender the operator status,
      currently using workaround by hardcoding
      persoal address in constructor (cheating)*/}
      <Card
        title="Create SBT"
        bordered={true} 
        hoverable style={{
          width: 500,
        }}>
          <Input
              placeholder="Name of SBT"
              onChange={e => {
                setSbtName(e.target.value);
            }}
            />
            <Input
              placeholder="Ticker"
              onChange={e => {
                setSbtTicker(e.target.value);
              }}
            />
            <Button
              style={{marginTop: 8}}
              onClick={async () => {
                const result = tx(writeContracts.YourContract.constructor(sbtName,sbtTicker), update => {
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
              Create SBT
            </Button>
      </Card>
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
      <Card
        title="Events"
        bordered={true} 
        hoverable style={{
          width: 500,
        }}>
        <Events
          contracts={readContracts}
          contractName="YourContract"
          eventName={eventList}
          localProvider={localProvider}
          mainnetProvider={mainnetProvider}
          startBlock={1}
        />
        
      </Card>
      <Card>
      <div>  
        {soulName && soulTicker && soulOperator ? (
          <div>
            <Image src={Token} preview={false} />
            <Divider/>
            <span>
              Soul Name: {soulName}
            </span>
            <Divider/>
            <span>
              Soul Ticker: {soulTicker}
            </span>
            <Divider/>
            <span>
              Soul Operator: {soulOperator}
            </span>
            <Divider/>
            <span>
              
            </span>
            </div>
          ) : (
            <span>
              No token detected, either none are minted or useContractReader incorrectly!
            </span>
          )
          }
      </div>
      </Card>
      <Card>
        
      </Card>
      </Row>
      </Content>
      </Layout>
    </div>
  )
}