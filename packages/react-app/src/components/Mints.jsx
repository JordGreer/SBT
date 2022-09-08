import { List, Image, Space, Divider, Card } from "antd";
import { useEventListener } from "eth-hooks/events/useEventListener";
import Token from "C:/pr0/scaffold-eth/packages/react-app/src/SBTPicture.png";
import Blockies from "react-blockies";


/**
  ~ What it does? ~

  Displays a lists of events

  ~ How can I use? ~

  <Events
    contracts={readContracts}
    contractName="YourContract"
    eventName="SetPurpose"
    localProvider={localProvider}
    mainnetProvider={mainnetProvider}
    startBlock={1}
  />
**/

export default function Mints({ contracts, contractName, localProvider, startBlock }) {
  // 📟 Listen for broadcast events
  const events = useEventListener(contracts, contractName, "Mint", localProvider, startBlock);

  return (
    <div>
      <Card title="Tokens Minted">
      <List
        bordered
        dataSource={events}
        renderItem={item => {
          return (
            <List.Item key={item.blockNumber}>
              <Space size={5} split={<Divider type="vertical" />} align="center">
              <Blockies seed={item.args[0].toLowerCase()}size={20}scale={2}/>
              <Image src={Token} preview={false}height={40}width={40}/>
              </Space>
            </List.Item>
          );
        }}
      />
      </Card>
    </div>
  );
}
